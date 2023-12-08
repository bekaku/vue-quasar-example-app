<template>
  <div class="q-pa-md q-gutter-sm" v-if="items.length > 0">
    <q-tabs :dense="dense" inline-label>
      <q-route-tab
        v-for="(item, index) in items"
        :key="index"
        :icon="item.icon"
        :label="item.translateLabel ? t(item.label) : item.label"
        :to="getLink(item)"
      />
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Breadcrumb } from '@/types/common';
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
defineProps({
  items: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => [],
  },
  dense: {
    type: Boolean,
    default: true,
  },
});
const { t } = useLang();
const { WeeGetParam } = useBase();
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
