<template>
  <div class="row" v-bind="$attrs" v-if="show">
    <div class="col-12">
      <q-card
        v-for="(item, index) in items"
        :key="index"
        :flat="flat"
        :bordered="bordered"
        class="q-mb-md"
      >
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" animation="fade" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton :height="`${cardHeight}px`" square animation="fade" />

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle2" animation="fade" />
          <q-skeleton
            type="text"
            width="50%"
            class="text-subtitle2"
            animation="fade"
          />
        </q-card-section>
        <q-card-actions align="around">
          <q-skeleton
            type="text"
            style="width: 125px; height: 45px"
            v-for="t in 4"
            :key="t"
          />
        </q-card-actions>
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
  flat: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Number,
    default: 3,
  },
  cardHeight: {
    type: Number,
    default: 200,
  },
});
</script>
