#!/usr/bin/env bash
set -Eeuo pipefail

ROOT=/opt/zfkaccountants
COMPOSE="$ROOT/compose/docker-compose.prod.yml"
TAGS="$ROOT/compose/image-tags.env"
PREVIOUS="$ROOT/compose/image-tags.previous.env"
LOCK="$ROOT/compose/deploy.lock"

usage() { echo "Usage: deploy.sh [--backend IMAGE] [--frontend IMAGE] [--infra]" >&2; exit 2; }
backend_image=""
frontend_image=""
infra=false
while (($#)); do
  case "$1" in
    --backend) (($# >= 2)) || usage; backend_image=$2; shift 2 ;;
    --frontend) (($# >= 2)) || usage; frontend_image=$2; shift 2 ;;
    --infra) infra=true; shift ;;
    *) usage ;;
  esac
done
[[ -n "$backend_image" || -n "$frontend_image" || "$infra" == true ]] || usage
for image in "$backend_image" "$frontend_image"; do
  [[ -z "$image" || "$image" =~ ^abdullahibnasiddiquie/zfkaccountants-(backend|frontend):[0-9a-f]{40}$ ]] || { echo "Invalid immutable image reference: $image" >&2; exit 2; }
done

exec 9>"$LOCK"
flock -x 9
[[ -f "$TAGS" ]] || { echo "Missing $TAGS" >&2; exit 1; }
cp "$TAGS" "$PREVIOUS"
chmod 600 "$PREVIOUS"
set -a
source "$TAGS"
set +a
BACKEND_IMAGE=${backend_image:-$BACKEND_IMAGE}
FRONTEND_IMAGE=${frontend_image:-$FRONTEND_IMAGE}
tmp=$(mktemp "$ROOT/compose/image-tags.env.XXXXXX")
trap 'rm -f "$tmp"' EXIT
printf 'BACKEND_IMAGE=%s\nFRONTEND_IMAGE=%s\n' "$BACKEND_IMAGE" "$FRONTEND_IMAGE" > "$tmp"
chmod 600 "$tmp"
mv "$tmp" "$TAGS"

compose() { docker compose --env-file "$TAGS" -f "$COMPOSE" "$@"; }
on_error() {
  echo "Deployment failed; recent application logs:" >&2
  compose logs --tail=80 backend frontend tracking-worker >&2 || true
  echo "Previous image references are in $PREVIOUS. Database migrations are not automatically reversible." >&2
}
trap on_error ERR
compose config --quiet
DOCKER_CONFIG="$HOME/.docker-zfkaccountants" compose pull postgres redis backend frontend tracking-worker
compose up -d --wait --wait-timeout 180 postgres redis
bash "$ROOT/scripts/backup.sh"
compose run --rm --no-deps backend python manage.py migrate --noinput
compose run --rm --no-deps backend python manage.py collectstatic --noinput
compose up -d --no-deps backend tracking-worker frontend
for i in {1..36}; do
  if curl -fsS --max-time 5 http://127.0.0.1:8005/health/ready/ >/dev/null && curl -fsS --max-time 5 http://127.0.0.1:3005/health >/dev/null; then
    break
  fi
  ((i < 36)) || { echo "Loopback health checks failed" >&2; exit 1; }
  sleep 5
done
curl -fsS --max-time 10 https://api.zfkaccountants.com/health/ready/ >/dev/null
curl -fsS --max-time 10 https://zfkaccountants.com/health >/dev/null
echo "DEPLOYMENT SUCCESSFUL: $BACKEND_IMAGE $FRONTEND_IMAGE"
