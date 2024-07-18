<template>
  <!-- :class="
      $q.dark.isActive
        ? 'wee-second-bg-color-theme-dark text-white'
        : 'bg-white text-black'
    " -->
  <q-header :reveal="reveal" height-hint="58" :bordered="bordered" :elevated="showGotTopBtn" :class="{
    'bg-white text-black': !$q.dark.isActive,
    'wee-second-bg-color-theme-dark text-white': $q.dark.isActive,
  }">
    <q-scroll-observer @scroll="onScroll" />
    <q-toolbar class="q-py-xs">
      <q-btn v-if="showTogleDrawer" dense flat round :icon="biList" @click="
        langugeAndThemeStore.setLeftDrawer(
          !langugeAndThemeStore.leftDrawerOpen,
        )
        " />
      <q-btn v-if="showLogo" flat no-caps no-wrap class="q-mr-xs" :ripple="false" to="/">
        <q-avatar style="height: auto; width: 42px" square>
          <img :src="!$q.dark.isActive
            ? '/logo/logo-black.png'
            : '/logo/logo-white.png'
            " />
        </q-avatar>
      </q-btn>
      <q-btn v-if="$q.screen.gt.xs" flat @click="onOpenSearch" class="text-capitalize">
        <span class="q-mr-sm text-muted">{{
          t('base.search') + ' Vue Quasar'
        }}</span>
        <q-icon :name="biSearch" />
      </q-btn>
      <q-space />

      <div class="q-gutter-md row items-center no-wrap">
        <q-btn round dense flat :icon="biCameraVideo" v-if="$q.screen.gt.sm">
          <q-tooltip>Create a video or post</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biAppIndicator" v-if="$q.screen.gt.sm">
          <q-tooltip>Apps</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biChatDots" v-if="$q.screen.gt.sm" to="/chats">
          <q-tooltip>Messages</q-tooltip>
        </q-btn>
        <q-btn v-if="!$q.screen.gt.xs" round dense flat @click="onOpenSearch">
          <q-icon :name="biSearch" />
        </q-btn>
        <q-btn round dense flat @click="resetBadgeCount" :icon="biBell">
          <q-badge v-if="notify && notify.totalNotify" color="negative" rounded text-color="white" floating>
            {{ notify.totalNotify > 99 ? '99+' : notify.totalNotify }}
          </q-badge>
          <q-tooltip>{{ t('nav.notifications') }}</q-tooltip>
          <q-menu anchor="bottom left" self="top left" :style="{ width: '360px' }">
            <notification-bar-menu></notification-bar-menu>
          </q-menu>
        </q-btn>
        <q-item clickable style="max-width: 225px">
          <q-item-section avatar top>
            <q-avatar size="36px" class="shadow-5">
              <q-img :src="authenStore.auth?.avatar?.thumbnail" />
            </q-avatar>
          </q-item-section>
          <q-item-section v-if="$q.screen.gt.xs">
            <q-item-label lines="1">
              <span class="cursor-pointer text-weight-bold">
                {{ authenStore.loginedDisplay }}
              </span>
            </q-item-label>
            <q-item-label caption :lines="1">
              Sofware Engineer
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biCaretDownFill" size="16px" />
          </q-item-section>
          <q-menu>
            <q-list style="min-width: 260px">
              <q-item clickable v-close-popup :to="`/user/${authenStore.auth?.id}`">
                <q-item-section avatar>
                  <q-avatar size="28px" v-if="authenStore.loginedAvatar">
                    <q-img :src="authenStore.loginedAvatar" />
                  </q-avatar>
                  <q-icon v-else :name="biPersonSquare" />
                </q-item-section>
                <q-item-section>{{ t('base.yourProfile') }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon :name="biMoon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    {{ t('base.appearance') }} :
                    {{ t(`theme.${langugeAndThemeStore.theme}`) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon :name="biChevronRight" />
                </q-item-section>
                <q-menu :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'" self="top start">
                  <q-list style="min-width: 150px">
                    <q-item clickable v-for="theme in availableThemes" :key="theme.key"
                      @click="langugeAndThemeStore.setThemeSetting(theme.key)">
                      <q-item-section avatar>
                        <q-icon :name="theme.icon" />
                      </q-item-section>
                      <q-item-section>{{ t(theme.text) }}</q-item-section>
                      <q-item-section v-if="theme.key == langugeAndThemeStore.themeSetting" side>
                        <q-icon :name="biCheck2" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon :name="biTranslate" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    {{ t('base.language') }} :
                    {{ currenLocale ? currenLocale.name : '' }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon :name="biChevronRight" />
                </q-item-section>
                <q-menu :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'" self="top start">
                  <q-list style="min-width: 150px">
                    <q-item clickable v-for="lang in availableLocales" :key="lang.iso"
                      @click="langugeAndThemeStore.setLocale(lang.iso)">
                      <q-item-section>{{ lang.name }}</q-item-section>
                      <q-item-section v-if="lang.iso == langugeAndThemeStore.locale" side>
                        <q-icon :name="biCheck2" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biQuestionCircle" />
                </q-item-section>
                <q-item-section>{{ t('base.help') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/settings">
                <q-item-section avatar>
                  <q-icon :name="biGear" />
                </q-item-section>
                <q-item-section>{{ t('base.setting') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="signOut">
                <q-item-section avatar>
                  <q-icon :name="biBoxArrowRight" />
                </q-item-section>
                <q-item-section>{{ t('base.logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </div>
    </q-toolbar>
  </q-header>
  <search-dialog v-if="showSearch" :model-value="showSearch"
    @update:modelValue="(newVal: boolean) => (showSearch = newVal)" @on-close="showSearch = false"></search-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import {
  biCaretDownFill,
  biPersonSquare,
  biMoon,
  biTranslate,
  biQuestionCircle,
  biGear,
  biBoxArrowRight,
  biChevronRight,
  biCheck2,
  biList,
  biSearch,
  biBell,
  biCameraVideo,
  biAppIndicator,
  biChatDots,
} from '@quasar/extras/bootstrap-icons';
import { availableThemes } from '@/utils/theme';
import { availableLocales } from '@/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from 'stores/authenStore';
import { useAuth } from '@/composables/useAuth';
import { useNotification } from '@/composables/useNotification';
const NotificationBarMenu = defineAsyncComponent(
  () => import('@/components/notification/NotificationBarMenu.vue'),
);
const SearchDialog = defineAsyncComponent(
  () => import('@/components/search/SearchDialog.vue'),
);
defineProps({
  hambergerMenu: {
    type: Boolean,
    default: true,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  frontend: {
    type: Boolean,
    default: true,
  },
  showTogleDrawer: {
    type: Boolean,
    default: false,
  },
  reveal: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
});
const showGotTopBtn = ref(false);
// const { WeeGoTo } = useBase();
const { notify, resetBadgeCount } = useNotification();
const { t } = useLang();
const authenStore = useAuthenStore();
const langugeAndThemeStore = useLangugeAndThemeStore();
const { signOut } = useAuth();
// const search = ref('');
const showSearch = ref(false);
const currenLocale = computed(() =>
  availableLocales.find((t) => t.iso == langugeAndThemeStore.locale),
);
const onOpenSearch = () => {
  showSearch.value = true;
};
const onScroll = (info: any) => {
  if (info && info.position && info.position.top > 100) {
    showGotTopBtn.value = true;
  } else {
    showGotTopBtn.value = false;
  }
};
</script>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 35%

.div-btn
  display: block
  border-radius: 5px
  height: 65px
</style>
