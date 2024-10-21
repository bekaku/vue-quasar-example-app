<template>
  <div class="row items-center" v-bind="$attrs"
    :style="{ minHeight: `${height > 0 ? height : 0}px`, width: 'fit-content' }">
    <slot>
      <q-avatar v-for="(item, index) in avatarItems" :key="index" :size="`${size}px`" :square="square"
        :rounded="rounded" class="overlapping" color="white" :style="`left: -${index * 5}px`">
        <!--      <img :src="item" style="padding: 1px 1px 1px 1px"  alt=""/>-->
        <app-image :src="item" style="padding: 1px 1px 1px 1px" :fetch="fetch" :ratio="1" />
      </q-avatar>
      <slot name="moreNumber">
        <q-avatar v-if="moreNo > 0" :size="size + 'px'" :color="$q.dark.isActive ? 'grey-9' : 'grey-4'"
          :style="`left: -${avatarItems.length * 4}px`" class="relative-position">
          <span :class="$q.dark.isActive ? 'text-white' : 'text-black'">+{{ moreNo }}</span>
        </q-avatar>
      </slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
/*
    <base-avatar-group
      v-if="finalAvatarItems.length > 0"
      :items="finalAvatarItems"
      :size="avatarSize"
    >
    </base-avatar-group>
 */
import { computed, PropType } from 'vue';
import AppImage from '@/components/base/AppImage.vue';
import { useQuasar } from 'quasar';

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  spinnerColor: {
    type: String as PropType<string>,
    default: 'white'
  },
  imgBg: {
    type: String as PropType<string>,
    default: 'bg-grey-8'
  },
  ratio: {
    type: Number as PropType<number | undefined>,
    default: 4 / 3
  },
  size: {
    type: Number,
    default: 32
  },
  limitUser: {
    type: Number,
    default: 5
  },
  height: {
    type: Number,
    default: 0
  },
  square: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  fetch: {
    type: Boolean,
    default: true
  }
});
const $q = useQuasar();
const moreNo = computed(() => {
  if (!props.items) {
    return 0;
  }
  const total = props.items.length || 0;
  const limit = props.limitUser ? props.limitUser : 10;
  const diff = total - limit;
  return diff > 0 ? diff : 0;
});
const avatarItems = computed((): string[] => {
  if (!props.items) {
    return [];
  }
  const limit = props.limitUser ? props.limitUser : 10;
  const images = props.items.slice(0, limit);
  const items: string[] = [];
  for (const item of images) {
    items.push(item);
  }
  return items;
});
</script>
<style lang="sass" scoped>
.overlapping
  // border: 2px solid #fff
  // position: absolute
  position: relative
</style>
