<template>
  <div class="row" v-if="show">
    <div class="col-12">
      <q-item-label v-if="showHeader" header>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item v-for="index in items" :key="index">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="65%" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  show?: boolean
  showHeader?: boolean
  items?: number
}>(), {
  show: true,
  showHeader: false,
  items: 3
})
</script>
