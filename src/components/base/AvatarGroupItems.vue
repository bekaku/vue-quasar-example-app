<template>
  <div v-bind="$attrs" class="row items-center cursor-pointer">

    <span class="q-mr-xs text-caption text-muted">
      <q-icon v-if="showIcon" class="q-mr-xs" :name="icon" />
      {{ label ? label : '' }}
    </span>
    <base-avatar-group
      v-if="avatarItems.length > 0"
      :items="avatarItems"
      :size="size"
      :limit-user="limitUser"
    >
    </base-avatar-group>
<!--    <span v-if="moreNo > 0" :style="`left: -${avatarItems.length * 4}px`"-->
<!--          class="relative-position text-muted">+{{ moreNo }}</span>-->
  </div>
</template>
<script setup lang="ts">
import BaseAvatarGroup from '@/components/base/BaseAvatarGroup.vue';
import { biPeople } from '@quasar/extras/bootstrap-icons';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  items: string[];
  height?: number;
  limitUser?: number;
  icon?: string;
  showIcon?: boolean;
  label?: string;
  size?: number;
}>(), {
  height: 450,
  limitUser: 5,
  size: 32,
  icon: biPeople,
  showIcon: true
});
const moreNo = computed(() => {
  if (!props.items) {
    return 0;
  }
  const total = props.items.length || 0;
  const limit = props.limitUser;
  const diff = total - limit;
  return diff > 0 ? diff : 0;
});
const avatarItems = computed((): string[] => {
  if (!props.items) {
    return [];
  }
  const limit = props.limitUser ? props.limitUser : 10;
  const imageList = props.items.slice(0, limit);
  const items: string[] = [];
  for (const img of imageList) {
    items.push(img);
  }
  return items;
});
</script>
