<template>
  <q-card v-if="item" flat>
    <q-img spinner-color="white" :src="item.image" style="max-height: 314px" />
    <q-item
      clickable
      :class="!$q.dark.isActive ? 'bg-grey-2' : 'wee-main-bg-color-theme-dark'"
      :href="item.url"
      target="_blank"
    >
      <q-item-section>
        <q-item-label :lines="1">{{ item.domain }}</q-item-label>
        <q-item-label :lines="1">{{ item.title }}</q-item-label>
        <q-item-label caption :lines="2">{{ item.desc }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon :name="biBoxArrowUpRight" />
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { OgMeta } from '@/types/models';
import { biBoxArrowUpRight } from '@quasar/extras/bootstrap-icons';
defineProps({
  item: {
    type: Object as PropType<OgMeta>,
    default: () => null,
  },
});
</script>
