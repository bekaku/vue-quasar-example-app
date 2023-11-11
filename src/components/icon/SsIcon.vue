<template>
  <template v-if="icon">
    <img
      :style="`width: ${size}px ; height: auto`"
      :src="`/icons/ss/${icon}${color != 'color' ? '_' + color : ''}.png`"
    />
    <!-- <ion-img
        :style="`width: ${size}px ; height: auto`"
        :src="`/icons/ss/${icon}${color == 'grey' ? '_grey' : ''}.png`"
      >
      </ion-img> -->
  </template>
</template>
<script setup lang="ts">
/*
  <ss-icon icon="action" :size="55" color="grey" />
    */
import { PropType } from 'vue';
import { IconColor, ISsIcons } from '@/types/common';
defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String as PropType<IconColor>,
    default: 'color',
  },
  icon: {
    type: String as PropType<ISsIcons | undefined>,
    default: undefined,
  },
});
</script>
