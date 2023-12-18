# develop stage
# FROM node:18 AS build
# FROM node:latest AS build
FROM node:20 AS build
# FROM node:18-alpine as build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /app

COPY package*.json /app
RUN npm install @quasar/cli -g
RUN npm install
# RUN npm ci --only=production
COPY . /app

# FROM build as local-deps-stage
RUN quasar build -m ssr

# FROM node:18-bullseye-slim
FROM node:20-alpine
ENV TZ=Asia/Bangkok
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezon

RUN npm install pm2 -g
ENV NODE_ENV production
# COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist/ssr /app
COPY --chown=node:node --from=build /app/ecosystem.config.js /app

# CMD ["pm2-runtime", "index.js"]
CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["dumb-init", "node", "index.js"]

# dev stage
# FROM local-deps-stage as dev-stage
# RUN quasar dev -m ssr