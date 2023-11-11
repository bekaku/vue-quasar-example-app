/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js
const { configure } = require('quasar/wrappers');
const path = require('path');
module.exports = configure(function (ctx) {
  return {
    eslint: {
      // fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true,
    },
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'i18n',
      'axios',
      'requireAuth',
      // { path: 'swiper', server: false },
      // { path: 'emojiMart', server: false },
      { path: 'apexcharts', server: false },
      { path: 'vueSlicksort', server: false },
      { path: 'vueZoomer', server: false },
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss', 'typography.sass'],
    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font',
      // 'mdi-v6',
      'bootstrap-icons',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },
      alias: {
        '@': path.join(__dirname, './src'),
      },
      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      vitePlugins: [
        // [
        //   '@intlify/vite-plugin-vue-i18n',
        //   {
        //     include: path.resolve(__dirname, './src/i18n/**'),
        //   },
        // ],
        // [
        //   '@vitejs/plugin-vue',
        //   {
        //     script: {
        //       defineModel: false,
        //       propsDestructure: true,
        //     },
        //   },
        // ],
      ],
      env: {
        // API: 'http://192.168.7.230:8080',
        // cdnBaseUrl: 'http://192.168.7.230:8080',

        API: 'http://localhost:8080',
        cdnBaseUrl: 'http://localhost:8080',

        // API: 'https://api.supersynapse.net',
        // cdnBaseUrl: 'https://cdn.supersynapse.net',

        // API: ctx.dev ? 'http://localhost:8080' : 'https://api.supersynapse.net',
        // cdnBaseUrl: ctx.dev
        //   ? 'http://localhost:8080'
        //   : 'https://cdn.supersynapse.net',

        TIME_OUT: 5 * 60000, // 60000 = 1 minute, 0 = no timeout
        API_CLIENT: 'default',
        appVersion: '1.1.2.1',
        codeVersion: 21,
        feedPostPerPage: 5,
        commentsPerPage: 3,
        webAppUrl: 'https://app.supersynapse.net',
        androidStoreLink:
          'https://play.google.com/store/apps/details?id=com.grandats.supersynapse&pli=1',
        iOSStoreLink:
          'https://apps.apple.com/us/app/supersynapse/id6443715498?ls=1',
      },
    },
    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        // brand: {
        //   primary: '#00D1B2',
        //   secondary: '#3273DC',
        //   accent: '#9C27B0',
        //   dark: '#1d1d1d',
        //   positive: '#23D160',
        //   negative: '#FF3860',
        //   info: '#209CEE',
        //   warning: '#FF9F43',
        // },
        loadingBar: {
          color: 'primary',
        },
      },

      lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: [
        'QBtn',
        'QPage',
        'QCard',
        'QCardSection',
        'QDrawer',
        'QScrollArea',
        'QList',
        'QItem',
        'QItemSection',
        'QIcon',
        'QItemLabel',
        'QSeparator',
        'QHeader',
        'QSpace',
        'QInput',
        'QTooltip',
        'QBadge',
        'QAvatar',
        'QMenu',
        'QCardActions',
        'QForm',
        'QPageContainer',
        'QLayout',
        'QToolbarTitle',
        'QToolbar',
        'QExpansionItem',
        'QInput',
        'QImg',
        'QCarousel',
        'QCarouselSlide',
        'QDialog',
        'QSpinner',
        'QSpinnerDots',
        'QMarkupTable',
        'QSkeleton',
        'QPagination',
        'QToggle',
        'QSelect',
        'QPopupProxy',
        'QDate',
        'QField',
        'QTabs',
        'QTabPanels',
        'QTabPanel',
        'QRouteTab',
        'QPageSticky',
        'QSpinnerDots',
        'QLinearProgress',
        'QNoSsr',
        'QFile',
        'QCarousel',
        'QCarouselSlide',
        'QInnerLoading',
        'QKnob',
        'QVirtualScroll',
        'QSlider',
        'QScrollObserver',
        'QOptionGroup',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
      ],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Loading',
        'Notify',
        'Dialog',
        'Meta',
        'Cookies',
        'LoadingBar',
        'LocalStorage',
      ],
      iconSet: 'bootstrap-icons', // Quasar icon set
    },
    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: false, // opens browser window automatically
      port: ctx.mode.spa ? 8000 : ctx.mode.pwa ? 9000 : 9100,
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: ['heartBeat', 'hinge', 'lightSpeedInLeft'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      extendSSRWebserverConf(/*esbuildConf*/) {},
      extendPackageJson(/*json*/) {},

      pwa: false,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,
      prodPort: 3000, // The default port that the production server should use
      /**
       * Manually handle the store hydration instead of letting Quasar CLI do it.
       * For Pinia: store.state.value = window.__INITIAL_STATE__
       * For Vuex: store.replaceState(window.__INITIAL_STATE__)
       */
      // manualStoreHydration: true,
      maxAge: 0,
      middlewares: [
        // ctx.prod ? 'compression' : '',
        'render', // keep this as last one
        // 'logger',
      ],
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar-starter-template',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ['my-content-script'],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
