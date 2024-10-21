<template>
  <q-layout view="hHh LpR fFf">
  <!-- <q-layout view="lHh Lpr lff"> -->
    <app-header
      :frontend="false"
      :show-togle-drawer="true"
      :show-logo="true"
      bordered
    />
    <backend-drawer />

    <q-page-container>
      <layout-breadcrumb-tab />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import BackendDrawer from '@/components/base/BackendDrawer.vue';
import LayoutBreadcrumbTab from '@/components/base/LayoutBreadcrumbTab.vue';
import { usePermissionStore } from '@/stores/permissionStore';
import { BACKEND_LOGIN } from '@/utils/appPermissionList';
defineOptions({
  preFetch({ /*ssrContext, redirect*/ redirect, }) {
    const permissionStore = usePermissionStore();
    if (!permissionStore.isHavePermission(BACKEND_LOGIN)) {
      redirect({ path: '/auth/login' });
    }
  },
});
</script>
