<template>
  <q-dialog v-model="doalogModel">
    <q-card class="dialog">
      <q-card-section>
        <div class="text-h6 ellipsis">{{ t('sort.sort') }}</div>
      </q-card-section>

      <base-slick v-model="modelValue" :label-key="labelKey" :value-key="valueKey" @on-sorting="onSorting">

      </base-slick>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import BaseSlick from '@/components/base/BaseSlick.vue';
import { useLang } from '@/composables/useLang';
defineProps<{
  labelKey: string;
  valueKey: string;
}>();
const { t } = useLang();
const modelValue = defineModel<any[]>();
const doalogModel = defineModel('doalogModel', {
  type: Boolean,
  default: false,
});
const emit = defineEmits<{
  onSorting: [any[]];
}>();
const onSorting = async (response: any[]) => {
  emit('onSorting', response);
};
</script>

<style lang="sass" scoped>
.dialog
  width: 100%
  max-width: 450px
  min-width: 450px

.sortHelper
  z-index: 9999
</style>
