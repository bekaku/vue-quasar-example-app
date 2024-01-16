<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, onBeforeUnmount } from 'vue';
import { AppSetup } from './utils/app';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { useAuthenStore } from 'stores/authenStore';
import { ITheme } from '@/types/common';
import { useRouter } from 'vue-router';
import { useDrawerStore } from '@/stores/drawerStore';
import { usePermissionStore } from '@/stores/permissionStore';
import { usePreFetch } from '@/composables/usePreFetch';
import { IAcl } from '@/types/models';
import { useInitAuth } from '@/composables/useInitAuth';
import { useBase } from './composables/useBase';
export default defineComponent({
  name: 'App',
  async preFetch({ ssrContext, redirect }) {
    const authenStore = useAuthenStore();

    const refreshTokenReponse = await authenStore.refreshToken(ssrContext);
    console.log('refreshTokenReponse', refreshTokenReponse);
    if (
      refreshTokenReponse &&
      !refreshTokenReponse.status &&
      refreshTokenReponse.fourceLogout
    ) {
      redirect({ path: '/auth/login' });
    }

    const drawerStore = useDrawerStore();
    const permissionStore = usePermissionStore();
    const { callAxios } = usePreFetch(ssrContext, redirect);
    if (!authenStore.auth) {
      const { init } = useInitAuth(ssrContext, redirect);
      const userData = await init();
      if (userData) {
        authenStore.setAuthen(userData);
        // fetch user permission for backend
        const acl = await callAxios<IAcl>({
          API: '/api/permission/userAcl',
          method: 'GET',
        });
        console.log('App > preFetch');
        if (acl) {
          if (acl.menus && acl.menus.length > 0) {
            drawerStore.setDrawers(acl.menus);
          }
          if (acl.permissions && acl.permissions.length > 0) {
            permissionStore.setPermissions(acl.permissions);
          }
        }
      }
    }
  },
  setup() {
    const { WeeGoTo } = useBase();
    const router = useRouter();
    const authenStore = useAuthenStore();
    const $q = useQuasar();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    AppSetup();

    onMounted(() => {
      if (!$q.screen.gt.xs) {
        // langugeAndThemeStore.setLeftDrawer(false);
      }
      window.onpopstate = () => {
        if (
          router.options.history.state.forward == '/auth/login' &&
          !authenStore.auth
        ) {
          window.history.forward();
        }
        // if (
        //   authenStore.auth !== undefined &&
        //   this.$route.path == '/login'
        // ) {
        //   this.$router.push('/');
        // }
        // if (authenStore.auth === undefined) {
        //   WeeGoTo('/auth/login', true);
        // }
      };
    });

    const setDark = (theme: ITheme) => {
      if (theme == 'dark') {
        $q.dark.set(true);
      } else {
        $q.dark.set(false);
      }
    };
    setDark(langugeAndThemeStore.theme as ITheme);
    watch(langugeAndThemeStore, (state) => {
      setDark(state.theme as ITheme);
    });
    watch(authenStore, (state) => {
      if (state && state.sessionExpired) {
        WeeGoTo('/auth/login', true);
      }
    });
    onBeforeUnmount(() => {
      if (authenStore && authenStore.refreshTokenTimeout) {
        authenStore.stopRefreshTokenTimer();
      }
    });
    return {};
  },
});
</script>
