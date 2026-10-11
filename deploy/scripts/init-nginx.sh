#!/usr/bin/env bash
set -Eeuo pipefail
ROOT=/opt/zfkaccountants
target=/etc/nginx/sites-available/zfkaccountants.conf
enabled=/etc/nginx/sites-enabled/zfkaccountants.conf

if ! sudo test -e /etc/letsencrypt/live/zfkaccountants.com/fullchain.pem; then
  sudo install -m 644 "$ROOT/nginx/zfkaccountants-bootstrap.conf" "$target"
  if [[ ! -e "$enabled" ]]; then sudo ln -s "$target" "$enabled"; fi
  sudo nginx -t
  sudo systemctl reload nginx
  sudo certbot certonly --webroot -w "$ROOT/acme" --non-interactive --agree-tos \
    --email abdullah.ibna.siddiquie@g.bracu.ac.bd --cert-name zfkaccountants.com \
    -d zfkaccountants.com -d www.zfkaccountants.com -d api.zfkaccountants.com
fi
bash "$ROOT/scripts/apply-nginx.sh"
