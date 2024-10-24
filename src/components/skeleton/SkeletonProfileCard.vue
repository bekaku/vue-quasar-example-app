<template>
  <div v-if="vertical" class="row" v-bind="$attrs">
    <div class="col-12">
      <q-card fl:bordered="bordered" :flat="flat" :square="square">
        <q-skeleton :height="`${height}px`" square />
        <q-card-section>
          <q-skeleton type="text" />
          <q-skeleton type="text" style="width: 50%" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-else :class="colClass">
    <q-card :bordered="bordered" :flat="flat" :square="square">
      <q-skeleton :height="`${height}px`" square />
      <q-card-section>
        <q-skeleton type="text" />
        <q-skeleton type="text" style="width: 50%" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  flat: {
    type: Boolean,
    default: true,
  },
  square: {
    type: Boolean,
    default: true,
  },
  height: {
    type: Number,
    default: 100,
  },
  colClass: {
    type: String,
    default: 'col-12 col-md-12 q-pa-sm',
  },
});
</script>
