<script setup lang="ts">
const { lineClamp = 1 } = defineProps<{
  lineClamp?: number;
  maxWidth?: string;
}>();
</script>

<template>
  <div v-bind="$attrs" :class="{'ellipsis-text':lineClamp>0}" :style="maxWidth ? { maxWidth: maxWidth } :{maxWidth:'100%'}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.ellipsis-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: v-bind(lineClamp); /* number of lines to show */
  line-clamp: v-bind(lineClamp);
  -webkit-box-orient: vertical;
  -moz-line-clamp: 4;
  -o-line-clamp: 4;
  -moz-box-orient: vertical;
}
</style>
