<template>
  <router-view />
</template>

<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { usePreFetch } from '@/composables/usePreFetch';
import { useRequiredAuth } from '@/composables/useRequiredAuth';
import { useDrawerStore } from '@/stores/drawerStore';
import { useExceptionStore } from '@/stores/exceptionStore';
import { usePermissionStore } from '@/stores/permissionStore';
import { ITheme } from '@/types/common';
import { IAcl, UserDto } from '@/types/models';
import { detroyAuthCookie, isAppException } from '@/utils/appUtil';
import { AppAuthTokenKey, AUTH_NO_FILTER } from '@/utils/constant';
import { Cookies, useQuasar } from 'quasar';
import { useAuthenStore } from 'stores/authenStore';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AppSetup } from './utils/app';
defineOptions({
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
});

const { appGoto, isDevMode } = useBase();
const exceptionStore = useExceptionStore();
const router = useRouter();
const authenStore = useAuthenStore();
const $q = useQuasar();
const langugeAndThemeStore = useLangugeAndThemeStore();
useRequiredAuth()
AppSetup();

onMounted(() => {
  if (
    exceptionStore.error &&
    exceptionStore.error.status &&
    exceptionStore.error.message
  ) {
    appGoto('/error', true);
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
    //   appGoto('/auth/login', true);
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
    appGoto('/auth/login', true);
  }
});
onBeforeUnmount(() => {
});
</script>
