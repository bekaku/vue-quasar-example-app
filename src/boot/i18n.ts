import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
// import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs';

import en from '@/i18n/en.json';
import th from '@/i18n/th.json';
import { LocaleKey, DefaultLocale } from '@/utils/constant';
import { Cookies } from 'quasar';
export default boot(({ app, ssrContext }) => {
  const localeCookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies;
  const i18n = createI18n({
    locale: localeCookies.get(LocaleKey) || DefaultLocale,
    messages: {
      en,
      th,
    },
    legacy: false,
  });

  // Set i18n instance on app
  app.use(i18n);
});
