FROM node:21 as builder

ENV NODE_ENV builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN touch .env && echo "DATABASE_URL=${DATABASE_URL}" >> .env

RUN yarn install --frozen-lockfile --production=false

RUN npx kysely-codegen

COPY --chown=node:node . .
# RUN npx nx reset
RUN npx nx build api --skip-nx-cache --verbose

USER node

FROM node:21

ENV NODE_ENV production

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/yarn.lock ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/apps/api/ ./dist/

EXPOSE 4000

CMD ["node", "dist/main.js"]
