#!/usr/bin/env bash
set -Eeuo pipefail

ROOT=/opt/zfkaccountants
owner=$(id -un)
group=$(id -gn)
sudo install -d -m 755 -o "$owner" -g "$group" "$ROOT"
for path in compose env nginx scripts systemd data data/postgres data/media data/static acme acme/.well-known acme/.well-known/acme-challenge backups; do
  install -d -m 755 "$ROOT/$path"
done
chmod 700 "$ROOT/env" "$ROOT/backups"
sudo chown 10001:10001 "$ROOT/data/media" "$ROOT/data/static"
sudo chmod 755 "$ROOT/data/media" "$ROOT/data/static"
umask 077

secret() { python3 -c 'import secrets; print(secrets.token_urlsafe(48))'; }
fernet() { python3 -c 'import base64,os; print(base64.urlsafe_b64encode(os.urandom(32)).decode())'; }

if [[ ! -e "$ROOT/env/postgres.env" ]]; then
  db_password=$(secret)
  printf 'POSTGRES_DB=zfkaccountants\nPOSTGRES_USER=zfkaccountants\nPOSTGRES_PASSWORD=%s\n' "$db_password" > "$ROOT/env/postgres.env"
fi
if [[ ! -e "$ROOT/env/backend.env" ]]; then
  source "$ROOT/env/postgres.env"
  revalidate_secret=$(secret)
  cat > "$ROOT/env/backend.env" <<EOF
DEBUG=False
SECRET_KEY=$(secret)
ALLOWED_HOSTS=api.zfkaccountants.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://zfkaccountants.com,https://www.zfkaccountants.com
CSRF_TRUSTED_ORIGINS=https://zfkaccountants.com,https://www.zfkaccountants.com
FRONTEND_URL=https://zfkaccountants.com
FRONTEND_REVALIDATE_URL=http://frontend:3000/api/revalidate
REVALIDATE_SECRET=$revalidate_secret
POSTGRES_DB=zfkaccountants
POSTGRES_USER=zfkaccountants
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_SSLMODE=disable
REDIS_URL=redis://redis:6379/0
SECURE_PROXY_SSL_HEADER=True
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=300
TRACKING_SECRET_KEY=$(fernet)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
FORM_NOTIFICATION_EMAIL=
DJANGO_LOG_LEVEL=INFO
EOF
  printf 'NEXT_PUBLIC_API_URL=https://api.zfkaccountants.com\nNEXT_PUBLIC_SITE_URL=https://zfkaccountants.com\nREVALIDATE_SECRET=%s\n' "$revalidate_secret" > "$ROOT/env/frontend.env"
fi
if [[ ! -e "$ROOT/compose/image-tags.env" ]]; then
  printf 'BACKEND_IMAGE=abdullahibnasiddiquie/zfkaccountants-backend:REPLACE\nFRONTEND_IMAGE=abdullahibnasiddiquie/zfkaccountants-frontend:REPLACE\n' > "$ROOT/compose/image-tags.env"
fi
chmod 600 "$ROOT"/env/*.env "$ROOT/compose/image-tags.env"
install -d -m 700 "$HOME/.docker-zfkaccountants"
echo "Project directories and runtime secrets prepared at $ROOT"
