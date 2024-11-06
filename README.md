# Vue JS 3 + Typescript + Quasar 2 SSR mode + Docker

A Quasar Project\
[Demo VDO](https://www.linkedin.com/posts/bekaku_full-stack-application-example-starter-github-activity-7129650875781808128-mYg6/?utm_source=share&utm_medium=member_desktop)

# Backend Rest Api

1 Java Springboot [java-spring-boot-starter](https://github.com/bekaku/java-spring-boot-starter)

## Install the dependencies

```bash
yarn
# or
npm install
```


API endpoint at `my-app/env/.env.dev` or `my-app/env/.env.prod`

```js
API= 'http://localhost:8080'
cdnBaseUrl= 'http://localhost:8080'
```

Config your Project at `my-app`/quasar.config.ts

devServer
```js
   devServer: {
      // https: true
      open: false, // opens browser window automatically
      port: ctx.mode.spa ? 8000 : ctx.mode.pwa ? 9000 : 9100,
    },
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev or
yarn dev or
quasar dev
```
Starting webserver at port 8000
### Start the app in development SSR mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev:ssr or
yarn dev:ssr or
quasar dev -m ssr
```
Starting webserver at port 9100
### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
npm run build or
yarn build or
quasar build
```

### Build the SSR app for production

```bash
npm run build:ssr or
yarn build:ssr or
quasar build -m ssr
```

Docker run

```batch
docker-compose build
docker-compose up -d
```

### Customize the configuration

See [Configuring quasar.config.ts](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
