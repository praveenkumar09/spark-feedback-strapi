FROM node:22-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /opt/app
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN mkdir -p public/uploads && npm run build
RUN chmod +x /opt/app/entrypoint.sh
EXPOSE 1337
ENTRYPOINT ["/opt/app/entrypoint.sh"]
