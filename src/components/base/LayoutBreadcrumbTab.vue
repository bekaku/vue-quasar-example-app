<template>
  <div v-if="breadcrumbs || tabs" class="row q-mt-lg content-limit">
    <div class="col">
      <q-card flat>
        <q-toolbar
          v-if="breadcrumbs && breadcrumbs.length > 0"
          flat
          bordered
          class="rounded-borders"
        >
          <AppBreadcrumbs
            :breadcrumbs="breadcrumbs"
            :separator-icon="biChevronRight"
          />
        </q-toolbar>
        <q-separator
          v-if="
            tabs && tabs.length > 0 && breadcrumbs && breadcrumbs.length > 0
          "
        />
        <q-toolbar v-if="tabs && tabs.length > 0">
          <app-tabs :items="tabs" />
        </q-toolbar>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
const AppBreadcrumbs = defineAsyncComponent(
  () => import('@/components/base/AppBreadcrumbs.vue'),
);
const AppTabs = defineAsyncComponent(
  () => import('@/components/base/AppTabs.vue'),
);
import { useAppBreadcrumbTabs } from '@/composables/useAppBreadcrumbTabs';
import { defineAsyncComponent } from 'vue';
import { biChevronRight } from '@quasar/extras/bootstrap-icons';
const { breadcrumbs, tabs } = useAppBreadcrumbTabs();
</script>
