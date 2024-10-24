/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js


import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';

export default configure((ctx) => {
    return {

        eslint: {
            // fix: true,
            // include: [],
            // exclude: [],
            // cache: false,
            // rawOptions: {},
            warnings: true,
            errors: true
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
            { path: 'dompurify', server: false },
            { path: 'pdfVue', server: false },
            { path: 'vueSlicksort', server: false },
            { path: 'vueZoomer', server: false },
            { path: 'VueApexcharts', server: false },
            { path: 'swiper', server: false },
        ],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: ['color.scss', 'app.scss', 'typography.sass'],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v7',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
            // 'roboto-font', // optional, you are not bound to it
            // 'material-icons', // optional, you are not bound to it
            'bootstrap-icons',
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
            target: {
                browser: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
                node: 'node20'
            },
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
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
            extendViteConf(viteConf, { isServer, isClient }) {
                viteConf.esbuild = {
                    supported: {
                        'top-level-await': true
                    }
                };
                viteConf.optimizeDeps = {
                    // include: ['pdfjs-dist'], // optionally specify dependency name
                    esbuildOptions: {
                        supported: {
                            'top-level-await': true
                        }
                    }
                };

                viteConf.server.hmr = {
                    port: 3005,
                };

            },

            viteVuePluginOptions: {
                // script: {
                //   defineModel: true,
                // },
                template: {
                    compilerOptions: {
                        // isCustomElement: (tag) => tag.startsWith('swiper-'),
                        isCustomElement: (tag) =>
                            ['swiper-container', 'swiper-slide'].includes(tag),
                    },
                },
            },
            vitePlugins: [
                // ['@intlify/unplugin-vue-i18n/vite', {
                //     include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
                // }]
            ],
            envFolder: './env', // absolute or relative path to root project folder
            env: {
                //Development
                // API: 'http://localhost:8080',
                // cdnBaseUrl: 'http://localhost:8080',
            },
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
            // https: true,
            open: false, // opens browser window automatically
            port: 9000,
        },

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
            config: {
                loadingBar: {
                    color: 'primary',
                },
            },
            lang: 'en-US', // Quasar language pack
            // iconSet: 'material-icons', // Quasar icon set
            // lang: 'en-US', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],
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

        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: ['heartBeat', 'hinge', 'lightSpeedInLeft'],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
        // sourceFiles: {
        //   rootComponent: 'src/App.vue',
        //   router: 'src/router/index',
        //   store: 'src/store/index',
        //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
        //   pwaServiceWorker: 'src-pwa/custom-service-worker',
        //   pwaManifestFile: 'src-pwa/manifest.json',
        //   electronMain: 'src-electron/electron-main',
        //   electronPreload: 'src-electron/electron-preload'
        //   bexManifestFile: 'src-bex/manifest.json
        // },

        // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
        ssr: {
            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            middlewares: [
                'render' // keep this as last one
            ],

            // extendPackageJson (json) {},
            // extendSSRWebserverConf (esbuildConf) {},

            // manualStoreSerialization: true,
            // manualStoreSsrContextInjection: true,
            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            pwa: false

            // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!
            // will mess up SSR

            // pwaExtendGenerateSWOptions (cfg) {},
            // pwaExtendInjectManifestOptions (cfg) {}
        },

        // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: 'GenerateSW' // 'GenerateSW' or 'InjectManifest'
            // swFilename: 'sw.js',
            // manifestFilename: 'manifest.json'
            // extendManifestJson (json) {},
            // useCredentialsForManifestTag: true,
            // injectPwaMetaTags: false,
            // extendPWACustomSWConf (esbuildConf) {},
            // extendGenerateSWOptions (cfg) {},
            // extendInjectManifestOptions (cfg) {}
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
        electron: {
            // extendElectronMainConf (esbuildConf) {},
            // extendElectronPreloadConf (esbuildConf) {},

            // extendPackageJson (json) {},

            // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
            preloadScripts: ['electron-preload'],

            // specify the debugging port to use for the Electron app when running in development mode
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

                appId: 'quasar-project'
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
        bex: {
            // extendBexScriptsConf (esbuildConf) {},
            // extendBexManifestJson (json) {},

            contentScripts: [
                'my-content-script'
            ]
        }
    }
});
