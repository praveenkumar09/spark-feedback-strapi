#!/bin/sh
# Create the editor login on first start (ignored if it already exists), then run Strapi.
if [ -n "$STRAPI_ADMIN_EMAIL" ] && [ -n "$STRAPI_ADMIN_PASSWORD" ]; then
  npx strapi admin:create-user --email "$STRAPI_ADMIN_EMAIL" --password "$STRAPI_ADMIN_PASSWORD" --firstname Spark --lastname Editor >/dev/null 2>&1 || true
fi
exec npm run start
