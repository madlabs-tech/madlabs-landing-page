# syntax=docker/dockerfile:1
# The landing page as a static-file container for the shared VPS (hryer/vps-infra,
# project `madlabs-landing`, service `web`). Built in CI, never on the box.
#
# Local build (the design system is a private GitHub Package):
#   NPM_TOKEN=<classic PAT, read:packages> docker build --secret id=npm_token,env=NPM_TOKEN -t madlabs-landing-web .

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# The token lives only for this RUN: written, used and deleted in one layer.
RUN --mount=type=secret,id=npm_token,required=true \
	printf '@hryer:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=%s\n' "$(cat /run/secrets/npm_token)" > ~/.npmrc \
	&& npm ci --no-audit --no-fund \
	&& rm ~/.npmrc
COPY . .
RUN npm run check && npm run build

FROM caddy:2.11.4-alpine
# The official binary carries cap_net_bind_service as a file capability, which
# cannot exec under the box's cap_drop: [ALL] + no-new-privileges. A plain copy
# drops the xattr; we listen on 8080 and need no capability.
RUN cp /usr/bin/caddy /usr/local/bin/caddy-nocap && mv /usr/local/bin/caddy-nocap /usr/bin/caddy
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /srv
EXPOSE 8080
