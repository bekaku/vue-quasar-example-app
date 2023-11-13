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

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Start the app in development SSR mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m ssr
```

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
quasar build
```

### Build the SSR app for production

```bash
quasar build -m ssr
```
Docker run 
```batch
docker-compose build
docker-compose up -d
```
### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
