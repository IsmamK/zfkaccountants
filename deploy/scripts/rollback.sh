#!/usr/bin/env bash
set -Eeuo pipefail
ROOT=/opt/zfkaccountants
TAGS="$ROOT/compose/image-tags.env"
PREVIOUS="$ROOT/compose/image-tags.previous.env"
exec 9>"$ROOT/compose/deploy.lock"
flock -x 9
[[ -s "$PREVIOUS" ]] || { echo "No previous image references" >&2; exit 1; }
tmp=$(mktemp "$ROOT/compose/image-tags.env.XXXXXX")
cp "$TAGS" "$tmp"
cp "$PREVIOUS" "$TAGS"
cp "$tmp" "$PREVIOUS"
rm "$tmp"
chmod 600 "$TAGS" "$PREVIOUS"
compose() { docker compose --env-file "$TAGS" -f "$ROOT/compose/docker-compose.prod.yml" "$@"; }
compose config --quiet
DOCKER_CONFIG="$HOME/.docker-zfkaccountants" compose pull backend frontend tracking-worker
compose up -d --no-deps backend tracking-worker frontend
for i in {1..36}; do
  if curl -fsS --max-time 5 http://127.0.0.1:8005/health/ready/ >/dev/null && curl -fsS --max-time 5 http://127.0.0.1:3005/health >/dev/null; then
    echo "Rollback application health checks passed. Check migration compatibility separately."
    exit 0
  fi
  ((i < 36)) || { compose logs --tail=80 backend frontend tracking-worker; exit 1; }
  sleep 5
done
