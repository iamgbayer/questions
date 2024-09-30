FROM node:21 as builder

ENV NODE_ENV builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY apps/api/schema.graphql ./schema.graphql

RUN yarn install --frozen-lockfile --production=false

COPY --chown=node:node . .
RUN npx nx reset
RUN npx nx build api --skip-nx-cache --verbose

COPY libs/domain/src/prisma/client ./client

USER node

FROM node:21

ENV NODE_ENV production

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/yarn.lock ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/apps/api/ ./dist/
COPY --from=builder --chown=node:node /app/schema.graphql ./dist/

# @todo - this is a hack to get the prisma client to work, pointing to the right path
COPY --from=builder --chown=node:node /app/client ./libs/domain/src/prisma/client

EXPOSE 4000

CMD ["node", "dist/main.js"]
