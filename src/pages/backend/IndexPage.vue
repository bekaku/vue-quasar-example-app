<template>
  <q-page padding>
    <q-card elavated>
      <q-card-section>
        <p><q-icon :name="biHouseDoor" /> {{ pageName }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { biHouseDoor } from '@quasar/extras/bootstrap-icons';
useMeta({
  title: 'Index Page',
});
const pageName = ref('Backend Dashboard');
</script>
