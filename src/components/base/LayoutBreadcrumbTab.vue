<template>
  <div v-if="breadcrumbs || tabs" class="row q-mt-lg content-limit">
    <div class="col">
      <q-card flat class="bg-transparent">
        <q-toolbar
          v-if="breadcrumbs && breadcrumbs.length > 0"
          flat
          bordered
          class="rounded-borders"
        >
          <BaseBreadcrumbs
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
          <base-tabs :items="tabs" />
        </q-toolbar>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
const BaseBreadcrumbs = defineAsyncComponent(
  () => import('@/components/base/BaseBreadcrumbs.vue'),
);
const BaseTabs = defineAsyncComponent(
  () => import('@/components/base/BaseTabs.vue'),
);
import { useAppBreadcrumbTabs } from '@/composables/useAppBreadcrumbTabs';
import { defineAsyncComponent } from 'vue';
import { biChevronRight } from '@quasar/extras/bootstrap-icons';
const { breadcrumbs, tabs } = useAppBreadcrumbTabs();
</script>
