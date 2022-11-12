FROM node:16.18.0-alpine3.15 AS build

RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
COPY .env.local .env
RUN pnpm build && \
    pnpm prune --prod

FROM node:16.18.0-alpine3.15 AS deploy

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/.next/ ./.next/
COPY --from=build /app/public/ ./public/

ENV NODE_ENV production

CMD [ "npm", "run", "start" ]