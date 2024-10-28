<template>
  <!-- :class="
      $q.dark.isActive
        ? 'wee-second-bg-color-theme-dark text-white'
        : 'bg-white text-black'
    " -->
  <q-header :reveal="reveal" height-hint="58" :bordered="bordered" :elevated="showGotTopBtn" :class="{
    'wee-second-bg-color-theme-dark text-white': $q.dark.isActive,
    'bg-white text-black': !$q.dark.isActive,
  }">
    <q-scroll-observer @scroll="onScroll" />
    <q-toolbar class="q-py-xs">
      <q-btn v-if="showTogleDrawer" dense flat round :icon="hambergerIcon" @click="
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
        <user-nav-setting v-if="showUserSetting" style="max-width: 225px" />
      </div>
    </q-toolbar>
  </q-header>
  <search-dialog v-if="showSearch" :model-value="showSearch"
    @update:modelValue="(newVal: boolean) => (showSearch = newVal)" @on-close="showSearch = false"></search-dialog>
</template>

<script setup lang="ts">
import UserNavSetting from '@/components/user/UserNavSetting.vue';
import { useLang } from '@/composables/useLang';
import { useNotification } from '@/composables/useNotification';
import {
  biAppIndicator,
  biBell,
  biCameraVideo,
  biChatDots,
  biList,
  biSearch
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { defineAsyncComponent, ref } from 'vue';
const NotificationBarMenu = defineAsyncComponent(
  () => import('@/components/notification/NotificationBarMenu.vue'),
);
const SearchDialog = defineAsyncComponent(
  () => import('@/components/search/SearchDialog.vue'),
);

const { bordered = false, reveal = false, showTogleDrawer = false, showLogo = true, showUserSetting = true, hambergerIcon=biList } = defineProps<{
  bordered?: boolean;
  reveal?: boolean;
  showTogleDrawer?: boolean;
  frontend?: boolean;
  showLogo?: boolean;
  hambergerMenu?: boolean;
  hambergerIcon?: string;
  hambergerIconOff?: string;
  showUserSetting?: boolean;
}>();

const $q = useQuasar();
const showGotTopBtn = ref(false);
// const { WeeGoTo } = useBase();
const { notify, resetBadgeCount } = useNotification();
const { t } = useLang();
const langugeAndThemeStore = useLangugeAndThemeStore();
// const search = ref('');
const showSearch = ref(false);
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
