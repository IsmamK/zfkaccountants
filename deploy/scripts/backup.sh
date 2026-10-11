#!/usr/bin/env bash
set -Eeuo pipefail
ROOT=/opt/zfkaccountants
DEST="$ROOT/backups"
TAGS="$ROOT/compose/image-tags.env"
mkdir -p "$DEST"
chmod 700 "$DEST"
stamp=$(date -u +%Y%m%dT%H%M%SZ)
tmp="$DEST/postgres-$stamp.sql.gz.part"
trap 'rm -f "$tmp"' EXIT
docker compose --env-file "$TAGS" -f "$ROOT/compose/docker-compose.prod.yml" exec -T postgres sh -c 'exec pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip -9 > "$tmp"
gzip -t "$tmp"
mv "$tmp" "${tmp%.part}"
tar -C "$ROOT/data" -czf "$DEST/media-$stamp.tar.gz" media
chmod 600 "$DEST"/*.gz
find "$DEST" -maxdepth 1 -type f \( -name 'postgres-*.sql.gz' -o -name 'media-*.tar.gz' \) -mtime +14 -delete
