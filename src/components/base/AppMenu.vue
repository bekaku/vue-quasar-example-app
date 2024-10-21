<template>
  <q-btn v-bind="$attrs" dense :icon="icon" flat round>
    <q-menu cover anchor="top middle">
      <q-list :style="{minWidth: width+'px'}">
        <app-menu-item v-for="(item, index) in items"
                       :key="`app-menu-${item.value}-${index}`"
                       :item="item"
                       @click="onClick(item.value)"
                       v-close-popup
        />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts" generic="T">
import AppMenuItem from '@/components/base/AppMenuItem.vue';
import { LabelValue } from '@/types/common';
import { biThreeDotsVertical } from '@quasar/extras/bootstrap-icons';

withDefaults(defineProps<{
  items: LabelValue<T>[];
  icon?: string;
  title?: string;
  width?: number;
}>(), {
  icon: biThreeDotsVertical,
  width: 100
});
const emit = defineEmits(['on-click']);
const onClick = (value: T) => {
  emit('on-click', value);
};
</script>

<style scoped></style>
