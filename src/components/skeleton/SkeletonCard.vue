<template>
  <div class="row" :class="rowCss" v-if="!vertical">
    <div v-for="i in no" :key="i" :class="col">
      <q-card :flat="flat">
        <q-skeleton :height="`${height}px`" />
        <q-item v-if="textNumber>0">
          <q-item-section>
            <q-item-label v-for="tIndex in textNumber" :key="tIndex">
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
  <template v-else>
    <div class="row" :class="rowCss" v-for="i in no" :key="i">
      <div :class="col">
        <q-card :flat="flat">
          <q-skeleton :height="`${height}px`" />
          <q-item v-if="textNumber>0">
            <q-item-section>
              <q-item-label v-for="tIndex in textNumber" :key="tIndex">
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  flat: {
    type: Boolean,
    default: true,
  },
  height: {
    type: Number,
    default: 100,
  },
  no: {
    type: Number,
    default: 1,
  },
  textNumber: {
    type: Number,
    default: 0,
  },
  col: {
    type: String,
    default: 'col-12 col-md-12 q-pa-xs',
  },
  rowCss: {
    type: String,
    default: undefined,
  },
});
</script>
