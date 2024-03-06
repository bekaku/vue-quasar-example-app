<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    :maximized="maximized"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :full-width="fullWidth"
    :full-height="fullHeight"
    @hide="$emit('on-hide')"
    @before-hide="$emit('on-before-hide')"
  >
    <q-card :style="dialogStyle" flat bordered :class="dialogClass">
      <q-bar class="bg-transparent q-my-sm">
        <slot name="icon">
          <q-icon v-if="icon" :name="icon" />
        </slot>

        <div>
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <q-space />
        <slot name="toolbarAction">
          <q-btn dense flat :icon="biX" size="md" @click="onClose">
            <q-tooltip>{{ t('base.close') }}</q-tooltip>
          </q-btn>
        </slot>
      </q-bar>
      <slot></slot>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { biFile, biX } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  modelValue: Boolean,
  dialog: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  fullHeight: {
    type: Boolean,
    default: false,
  },
  maximized: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String as PropType<string | undefined>,
    default: biFile,
  },
  title: {
    type: String,
    default: '',
  },
  dialogStyle: {
    type: String,
    default: '',
  },
  dialogClass: {
    type: String,
    default: '',
  },
  transitionShow: {
    type: String,
    default: 'slide-up',
  },
  transitionHide: {
    type: String,
    default: 'slide-down',
  },
});

const emit = defineEmits(['on-close', 'on-hide', 'on-before-hide']);
const { t } = useLang();
const show = ref(false);
watch(
  () => props.dialog,
  (dialog) => {
    show.value = dialog;
  },
);
const onClose = () => {
  emit('on-close');
};
</script>
