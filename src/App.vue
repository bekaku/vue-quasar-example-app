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
import { IAcl, UserDto } from '@/types/models';
import { useBase } from '@/composables/useBase';
import { detroyAuthCookie, isAppException } from '@/utils/appUtil';
import { useExceptionStore } from '@/stores/exceptionStore';
import { Cookies } from 'quasar';
import { AppAuthTokenKey, AUTH_NO_FILTER } from '@/utils/constant';
export default defineComponent({
  name: 'App',
  async preFetch({ currentRoute, ssrContext, redirect }) {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
    const authenStore = useAuthenStore();
    const drawerStore = useDrawerStore();
    const permissionStore = usePermissionStore();
    const { callAxiosProcess } = usePreFetch(ssrContext, redirect);
    if (
      !AUTH_NO_FILTER.find((t) => t == currentRoute.path) &&
      cookies &&
      cookies.get(AppAuthTokenKey) &&
      !authenStore.auth
    ) {
      const refreshTokenReponse = await authenStore.refreshToken(ssrContext);
      if (
        refreshTokenReponse &&
        !refreshTokenReponse.status &&
        refreshTokenReponse.fourceLogout
      ) {
        redirect({ path: '/auth/login' });
      }
      const userDataResponse = await callAxiosProcess<UserDto>({
        API: '/api/user/currentUserData',
        method: 'GET',
      });
      if (
        userDataResponse &&
        userDataResponse.status &&
        userDataResponse.status == 200 &&
        userDataResponse.data &&
        !isAppException(userDataResponse.data)
      ) {
        const userData = userDataResponse.data;
        authenStore.setAuthen(userData);
        // fetch user permission for backend
        const response = await callAxiosProcess<IAcl>({
          API: '/api/permission/userAcl',
          method: 'GET',
        });
        if (
          response &&
          response.status &&
          response.status == 200 &&
          response.data
        ) {
          const acl = response.data;
          if (acl.menus && acl.menus.length > 0) {
            drawerStore.setDrawers(acl.menus);
          }
          if (acl.permissions && acl.permissions.length > 0) {
            permissionStore.setPermissions(acl.permissions);
          }
        }
      } else if (
        userDataResponse &&
        userDataResponse.status &&
        userDataResponse.status == 403
      ) {
        detroyAuthCookie(cookies);
        redirect({ path: '/auth/login' });
      } else {
        redirect(`/error?code=${userDataResponse.status}`);
      }
    }
  },
  setup() {
    const { WeeGoTo, isDevMode } = useBase();
    const exceptionStore = useExceptionStore();
    const router = useRouter();
    const authenStore = useAuthenStore();
    const $q = useQuasar();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    AppSetup();

    onMounted(() => {
      if (
        exceptionStore.error &&
        exceptionStore.error.status &&
        exceptionStore.error.message
      ) {
        WeeGoTo('/error', true);
      }
      if (authenStore.auth) {
        if (isDevMode()) {
          console.log('App.vue > authenStore >', authenStore.auth);
        }
        // authenStore.startRefreshTokenTimer();
      }
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
