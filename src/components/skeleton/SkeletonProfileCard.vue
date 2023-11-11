<template>
  <div class="row">
    <div class="col-12">
      <q-card flat square>
        <q-skeleton :height="`${height}px`" square />
        <q-card-section>
          <q-skeleton type="text" />
          <q-skeleton type="text" style="width: 50%" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 100,
  },
});
</script>
