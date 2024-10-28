<template>
  <!-- <q-layout view="hHh LpR fFf"> -->
    <q-layout view="lHh Lpr lff">
    <app-header :frontend="false" :show-togle-drawer="true" :show-logo="true" bordered :hamberger-icon="biWindowSidebar"/>
    <backend-drawer bordered />

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
import { BackendLogin } from '@/utils/appPermissionList';
import {
biWindowSidebar
} from '@quasar/extras/bootstrap-icons';
defineOptions({
  preFetch({ /*ssrContext, redirect*/ redirect, }) {
    const permissionStore = usePermissionStore();
    if (!permissionStore.isHavePermission(BackendLogin)) {
      redirect({ path: '/auth/login' });
    }
  },
});
</script>
