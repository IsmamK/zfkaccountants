#!/bin/sh
set -eu
if [ "${RENEWED_LINEAGE:-}" = /etc/letsencrypt/live/zfkaccountants.com ]; then
  nginx -t
  systemctl reload nginx
fi
