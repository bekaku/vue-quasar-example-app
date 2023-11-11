<template>
  <div
    :style="`
      height: ${size}px;
      background-image: linear-gradient(to right, #00aba9, #ffffff);
      `"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 2,
  },
});
</script>
