<template>
  <span class="text-muted text-weight-light relative-position" style="top: 1px">
    <q-icon :name="biDot" color="text-muted" />
  </span>
</template>
<script setup lang="ts">
import { biDot } from '@quasar/extras/bootstrap-icons';
defineProps({
  size: {
    type: Number,
    default: 11,
  },
});
</script>
