<template>
  <div class="q-pa-md q-gutter-sm" v-if="items.length > 0" :class="{ 'limit-tabs': !$q.screen.gt.xs }">
    <q-tabs :dense="dense" inline-label outside-arrows mobile-arrows active-color="primary">
      <q-route-tab v-for="(item, index) in items" :key="index" :icon="item.icon"
        :label="item.translateLabel ? t(item.label) : item.label" :to="getLink(item)" />
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { Breadcrumb } from '@/types/common';
import { useQuasar } from 'quasar';
import { PropType, ref } from 'vue';

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
const tab = ref();
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
</script>
<style scoped lang="scss">
.limit-tabs {
  max-width: 100vw;
}
</style>
