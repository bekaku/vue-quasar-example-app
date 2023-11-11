<template>
  <q-input
    outlined
    :readonly="!timeRequired"
    :dense="dense"
    :model-value="modelValue"
    :label="title"
    :rules="timeRequired ? [required] : undefined"
  >
    <template v-slot:append>
      <q-icon
        v-if="!disable"
        :name="biClock"
        color="primary"
        class="cursor-pointer"
      >
        <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
        <q-popup-proxy
          ref="q-date-search"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            :model-value="modelValue"
            @update:model-value="(value) => $emit('update:modelValue', value)"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                :label="t('base.close')"
                color="primary"
                flat
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:after>
      <q-btn
        v-if="modelValue"
        flat
        round
        :icon="biX"
        size="xs"
        @click="clear"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { biClock, biX } from '@quasar/extras/bootstrap-icons';
import { useValidation } from '@/composables/useValidation';
defineProps({
  modelValue: String,
  title: {
    type: String,
    default: '',
  },
  dense: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  timeRequired: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const { t } = useLang();
const { required } = useValidation();
const clear = () => {
  emit('update:modelValue', '');
};
</script>
