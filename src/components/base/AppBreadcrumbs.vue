<template>
  <div class="q-pa-md q-gutter-sm" v-if="breadcrumbs.length > 0">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :to="item.to"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Breadcrumb } from '@/types/common';
defineProps({
  breadcrumbs: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => [],
  },
});
</script>
