<template>
  <div v-if="title">
    {{ title }}
  </div>
  <q-toggle v-if="!useCheckbox" v-model="modelValue" :checked-icon="biCheck" :color="color" :size="size" keep-color :label="modelValue
      ? trueLabel
        ? trueLabel
        : t('base.enable')
      : falseLabel
        ? falseLabel
        : t('base.disable')
    " :unchecked-icon="biX" />

  <q-checkbox v-else v-model="modelValue" :color="color" :size="size" :label="modelValue 
      ? trueLabel
        ? trueLabel
        : t('base.enable')
      : falseLabel
        ? falseLabel
        : t('base.disable')
    " />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { biCheck, biX } from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
defineProps({
  // modelValue: Boolean,
  title: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  trueLabel: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  falseLabel: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'xl',
  },
  useCheckbox: {
    type: Boolean,
    default: false,
  },
});
const { t } = useLang();
// defineEmits(['update:modelValue']);
const modelValue = defineModel<boolean>();
</script>
