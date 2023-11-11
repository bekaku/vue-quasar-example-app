<template>
  <q-card flat class="full-height">
    <p>{{ t('app.name') }}</p>
    <q-icon :name="biFile" />

    <p>{{ email }}</p>

    <q-btn @click="onCLose" label="Submit" />
  </q-card>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { ISortMode } from '@/types/common';
import { biFile } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object as PropType<ISortMode>,
    default: undefined,
    required: true,
  },
  todos: {
    type: Array as PropType<ISortMode[]>,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
});
const email = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
const emit = defineEmits(['on-close', 'update:modelValue']);
// const emit = defineEmits<{
//   (e: 'on:remove', index: number): void;
// }>();
const { t } = useLang();
const onCLose = () => {
  emit('on-close');
};
</script>
