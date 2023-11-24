<template>
  <q-layout view="hHh LpR fFf">
    <app-header :frontend="false" :show-togle-drawer="true" />
    <backend-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { usePermissionStore } from '@/stores/permissionStore';
import { BACKEND_LOGIN } from '@/utils/appPermissionList';
export default {
  async preFetch({
    /*ssrContext, redirect*/
    redirect,
  }) {
    const permissionStore = usePermissionStore();
    if (!permissionStore.isHavePermission(BACKEND_LOGIN)) {
      redirect({ path: '/auth/login' });
    }
  },
};
</script>
<script setup lang="ts">
import BackendDrawer from '@/components/base/BackendDrawer.vue';
import AppHeader from '@/components/base/AppHeader.vue';
</script>
