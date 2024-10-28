<template>
  <div class="q-pa-md q-gutter-sm" v-if="breadcrumbs.length > 0">
    <q-breadcrumbs>
      <template v-slot:separator>
        <template v-if="showSeparator">
          <q-icon
            v-if="separatorIcon"
            class="text-muted"
            :name="separatorIcon"
          />
          <template v-else> <span class="text-muted">/</span></template>
        </template>
      </template>
      <template v-for="(item, index) in breadcrumbs" 
      :key="`breadcrumb-${index}-${item.to}`">
      <q-breadcrumbs-el
        :label="item.translateLabel ? t(item.label) : item.label"
        :icon="item.icon"
        :to="getLink(item)"
        exact
      />
      </template>
      <!-- <app-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :item="item"
      >
      </app-breadcrumb-item> -->
      <slot name="extra"> </slot>
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { Breadcrumb } from '@/types/common';
import { PropType } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
// import AppBreadcrumbItem from '@/components/base/AppBreadcrumbItem.vue';
import { usePermissionStore } from '@/stores/permissionStore';
defineProps({
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => [],
  },
  showSeparator: {
    type: Boolean,
    default: true,
  },
  separatorIcon: {
    type: String,
  },
});
const permisisonStore = usePermissionStore();
const { t } = useLang();
const { WeeGetParam, WeeGetQuery } = useBase();
const getLink = (item: Breadcrumb) => {
  let link = item.to;
  if (link) {
    const params = item.params;
    if (params && params.length > 0) {
      for (const p of params) {
        const paramValue = WeeGetParam(p);
        if (paramValue) {
          link = link.replaceAll(`:${p}`, paramValue);
        }
      }
    }
    const queries = item.queries;
    if (queries && queries.length > 0) {
      for (const q of queries) {
        const queryValue = WeeGetQuery(q);
        if (queryValue) {
          link = link.replaceAll(`{${q}}`, queryValue);
        }
      }
    }
  }
  return link;
};
const canShow = (item: Breadcrumb) => {
  if (item.permissions == undefined) {
    return true;
  }
  if (item.frontend == true) {
    return permisisonStore.isHaveFrontendMultiPermission(item.permissions);
  }
  return permisisonStore.isHaveMultiPermission(item.permissions);
};
</script>
