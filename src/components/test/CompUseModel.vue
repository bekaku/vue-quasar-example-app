<template>
  <input v-model="md" />
</template>
<script setup lang="ts">
import { useModel } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const md = useModel(props, 'modelValue');
console.log(md.value);
</script>
