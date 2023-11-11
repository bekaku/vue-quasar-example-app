<template>
  <q-page class="window-height row justify-center items-center">
    <div class="row context">
      <div class="col-12 col-md-6 bg-primary">
        <q-card
          square
          flat
          class="q-pb-lg bg-primary"
          v-if="!$q.screen.sm && !$q.screen.xs"
          :style="`max-width: 480px; height: ${cardHeight}`"
        >
          <q-card-section>
            <q-carousel
              autoplay
              infinite
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              navigation
              height="500px"
              class="bg-primary text-white rounded-borders"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <div class="q-mt-md text-center">
                  <img
                    src="/logo/logo-white.png"
                    style="height: 175px; width: auto"
                  />
                  <div class="text-h3 text-weight-bolder">Vue Quasar</div>
                  <div class="text-subtitle1 q-mt-lg">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <img
                  src="/logo/logo-white.png"
                  style="height: 175px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  {{ t('ssDescription') }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
                <img
                  src="/logo/logo-white.png"
                  style="height: 205px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  {{ t('ssDescription2') }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <img
                  src="/logo/logo-white.png"
                  style="height: 175px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  {{ t('ssDescription3') }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card
          square
          flat
          class="q-pa-lg"
          :style="`max-width: 480px; height: ${cardHeight};min-width:350px`"
        >
          <q-toolbar
            class="q-py-xs"
            style="background: none"
            :class="
              $q.dark.isActive
                ? 'wee-second-bg-color-theme-dark text-white'
                : 'text-black'
            "
          >
            <q-space />
            <q-btn
              flat
              no-wrap
              :icon="biTranslate"
              :label="currenLocale ? currenLocale.name : ''"
            >
              <q-icon class="q-ml-sm" :name="biCaretDown" size="16px" />
              <q-menu auto-close>
                <q-list style="min-width: 150px">
                  <q-item
                    clickable
                    v-for="lang in availableLocales"
                    :key="lang.iso"
                    @click="langugeAndThemeStore.setLocale(lang.iso)"
                  >
                    <q-item-section>{{ lang.name }}</q-item-section>
                    <q-item-section
                      v-if="lang.iso == langugeAndThemeStore.locale"
                      side
                    >
                      <q-icon :name="biCheck2" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
          <q-card-section class="text-center">
            <q-img
              src="/logo/logo-black.png"
              spinner-color="white"
              style="height: auto; max-width: 120px"
            />
            <div class="text-h4 text-weight-bolder q-my-md">
              {{ t('base.loginTitle') }}
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              {{ t('base.loginTitle2') }}
            </div>
            <!-- <q-separator /> -->
          </q-card-section>

          <q-form
            @submit="onSubmit"
            @reset="onReset()"
            ref="loginForm"
            class="q-px-sm"
          >
            <q-card-section>
              <q-input
                :readonly="loading"
                outlined
                v-model="email"
                :label="t('base.emailOrUsername')"
                :rules="[required]"
              >
                <template v-slot:prepend>
                  <q-icon :name="biPerson" color="grey-9" />
                </template>
              </q-input>
              <q-input
                class="q-pt-lg"
                :readonly="loading"
                outlined
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :label="t('authen.password')"
                :rules="[required]"
              >
                <template v-slot:prepend>
                  <q-icon :name="biLock" color="grey-9" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? biEye : biEyeSlash"
                    @click="showPassword = !showPassword"
                    class="cursor-pointer"
                    color="grey-9"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn
                unelevated
                :loading="loading"
                size="lg"
                color="primary"
                class="full-width text-white"
                :label="t('authen.login')"
                type="submit"
              />
            </q-card-actions>
          </q-form>

          <!-- <q-card-section class="text-center q-pa-sm">
            <a class="wee-link text-grey-6" href="javascript:void(0)">
              {{ t('authen.forgetPassword') }}
            </a>
          </q-card-section> -->
          <q-card-section class="q-mt-lg text-center">
            <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">
              {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMeta } from 'quasar';
import { getYearNow } from '@/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import {
  biCaretDown,
  biTranslate,
  biCheck2,
  biLock,
  biEye,
  biEyeSlash,
  biPerson,
} from '@quasar/extras/bootstrap-icons';
import { availableLocales } from '@/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import AuthenService from '@/api/AuthenService';
import { useAuth } from '@/composables/useAuth';
const { singin } = AuthenService();
const { setAuthenticationCookies, destroyAuthDataAndRedirect } = useAuth();
const { t } = useLang();
const { required } = useValidation();
const cardHeight = ref('700px');
const email = ref<string | null>('admin');
const password = ref<string | null>('P@ssw0rd');
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginForm = ref(null);
// useMeta({
//   title: `${t('page.login')} | ${t('app.monogram')}`,
// });
const metaData = {
  // sets document title
  title: t('page.login'),
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title: any) => `${title} - Vue Quasar Example`,

  // meta tags
  meta: {
    description: { name: 'description', content: t('ssDescription') },
    keywords: {
      name: 'keywords',
      content: 'Vue Quasar Example, Vue Quasar Example',
    },
    twitterCard: {
      name: 'twitter:card',
      content: 'https://app.yourdomain.com/card.jpg',
    },
    ogTitle: {
      property: 'og:title',
      content: 'Vue Quasar Example',
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://app.yourdomain.com',
    },
    ogType: {
      property: 'og:type',
      content: 'website',
    },
    ogDescription: {
      property: 'og:description',
      content: t('ssDescription'),
    },
    ogImage: {
      property: 'og:image',
      content: 'https://app.yourdomain.com/card.jpg',
    },
  },
};
useMeta(metaData);
onMounted(() => {
  destroyAuthDataAndRedirect(false);
});

const onSubmit = async () => {
  loading.value = true;
  const response = await singin({
    user: {
      emailOrUsername: email.value,
      password: password.value,
      loginFrom: 'WEB',
    },
  });
  loading.value = false;
  if (response.authenticationToken) {
    setAuthenticationCookies(response);
    loading.value = false;
    // redirect to index page
    window.location.replace('/');
  }
};
const onReset = () => {
  email.value = null;
  password.value = null;
  showPassword.value = false;
};

const langugeAndThemeStore = useLangugeAndThemeStore();
const currenLocale = computed(() =>
  availableLocales.find((t) => t.iso == langugeAndThemeStore.locale),
);
const slide = ref('style');
</script>
<style scoped>
/* .context {
  position: absolute;
  z-index: 99999;
}
.area {
  background: #0a66c2;
  background: -webkit-linear-gradient(to left, #cee5fc, #0a66c2);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
} */
</style>
