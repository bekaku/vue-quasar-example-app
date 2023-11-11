<template>
  <q-img
    :src="src"
    :spinner-color="spinnerColor"
    :class="cssClass"
    :ratio="ratio"
  >
    <template v-slot:error>
      <div class="absolute-full flex flex-center bg-primary text-white">
        <q-icon :name="biCardImage" class="q-mr-sm" size="md" /> Cannot load
        image
      </div>
    </template>
  </q-img>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { biCardImage } from '@quasar/extras/bootstrap-icons';
defineProps({
  src: {
    type: String as PropType<string>,
    default: undefined,
  },
  spinnerColor: {
    type: String as PropType<string>,
    default: 'white',
  },
  cssClass: {
    type: String as PropType<string>,
    default: 'bg-grey-8',
  },
  ratio: {
    type: Number as PropType<number | undefined>,
    default: 4 / 3,
  },
});
</script>
