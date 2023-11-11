<template>
  <iframe
    v-if="latLong"
    width="100%"
    :height="height"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    :src="`https://maps.google.com/maps?q=${latLong}&hl=es;z=14&amp;output=embed&zoom=${zoom}`"
    style="border: 0"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  >
  </iframe>
</template>

<script setup lang="ts">
defineProps({
  latLong: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 300,
  },
  zoom: {
    type: Number,
    default: 10,
  },
});
</script>
