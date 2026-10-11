#!/usr/bin/env bash
set -Eeuo pipefail
ROOT=/opt/zfkaccountants
source_file="$ROOT/nginx/zfkaccountants.conf"
target=/etc/nginx/sites-available/zfkaccountants.conf
enabled=/etc/nginx/sites-enabled/zfkaccountants.conf
[[ -s "$source_file" ]] || { echo "Missing Nginx source file" >&2; exit 1; }
[[ -e /etc/letsencrypt/live/zfkaccountants.com/fullchain.pem ]] || { echo "Certificate missing" >&2; exit 1; }
backup=$(mktemp /tmp/zfkaccountants-nginx.XXXXXX)
had_target=false
if sudo test -e "$target"; then sudo cp "$target" "$backup"; had_target=true; fi
rollback() {
  if [[ "$had_target" == true ]]; then sudo cp "$backup" "$target"; else sudo rm -f "$target" "$enabled"; fi
  sudo nginx -t >/dev/null 2>&1 || true
  rm -f "$backup"
}
trap rollback ERR
sudo install -m 644 "$source_file" "$target"
if [[ ! -e "$enabled" ]]; then sudo ln -s "$target" "$enabled"; fi
sudo nginx -t
sudo systemctl reload nginx
trap - ERR
rm -f "$backup"
