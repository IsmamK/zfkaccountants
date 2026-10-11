#!/usr/bin/env bash
set -Eeuo pipefail
ROOT=/opt/zfkaccountants
sudo install -m 755 "$ROOT/certbot/zfkaccountants-renew-hook.sh" /etc/letsencrypt/renewal-hooks/deploy/zfkaccountants-renew-hook.sh
sudo install -m 644 "$ROOT/systemd/zfkaccountants-backup.service" /etc/systemd/system/zfkaccountants-backup.service
sudo install -m 644 "$ROOT/systemd/zfkaccountants-backup.timer" /etc/systemd/system/zfkaccountants-backup.timer
sudo systemctl daemon-reload
sudo systemctl enable --now zfkaccountants-backup.timer
sudo systemctl is-active --quiet zfkaccountants-backup.timer
