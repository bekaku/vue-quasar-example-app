<template>
  <div class="q-pa-md q-gutter-sm" v-if="items.length > 0" :class="{ 'limit-tabs': !$q.screen.gt.xs }">
    <q-tabs :dense="dense" inline-label outside-arrows mobile-arrows active-color="primary">
      <template v-for="(item, index) in items"
                :key="index">
        <q-route-tab
          v-if="canShow(item)"
          :icon="item.icon"
          :label="item.translateLabel ? t(item.label) : item.label"
          :to="getLink(item)"
        />
      </template>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { usePermissionStore } from '@/stores/permissionStore';
import { Breadcrumb } from '@/types/common';
import { useQuasar } from 'quasar';
import { PropType } from 'vue';
defineProps({
  items: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => []
  },
  dense: {
    type: Boolean,
    default: true
  }
});
const $q = useQuasar();
const { t } = useLang();
const { WeeGetParam } = useBase();
const permisisonStore = usePermissionStore();
const getLink = (item: Breadcrumb) => {
  let link = item.to;
  const params = item.params;
  if (link && params && params.length > 0) {
    for (const p of params) {
      const paramValue = WeeGetParam(p);
      if (paramValue) {
        link = link.replaceAll(`:${p}`, paramValue);
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
<style scoped lang="scss">
.limit-tabs {
  max-width: 100vw;
}
</style>
