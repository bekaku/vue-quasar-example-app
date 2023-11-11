<template>
  <div class="row" v-if="pages">
    <div class="col">
      <div class="q-pa-lg flex flex-center">
        <q-select
          dense
          outlined
          :label="t('paging.rowsPerPage')"
          class="q-mx-lg"
          v-model="pages.itemsPerPage"
          :options="pages.perPageList"
          option-value="value"
          option-label="text"
          emit-value
          map-options
          style="min-width: 145px; max-width: 200px"
        />
        <q-pagination
          v-if="pages"
          v-model="pages.current"
          direction-links
          boundary-links
          :outline="outline"
          :boundary-numbers="boundaryNumbers"
          :max="pages.totalPages"
          :max-pages="maxPages"
          :color="color"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, watch } from 'vue';
import { useLang } from '@/composables/useLang';
import { IPagination } from '@/types/common';
const props = defineProps({
  modelValue: {
    type: Object as PropType<IPagination>,
  },
  maxPages: {
    type: Number as PropType<number>,
    default: 7,
  },
  boundaryNumbers: {
    type: Boolean,
    default: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
});
const { t } = useLang();
const emit = defineEmits<{
  (e: 'update:modelValue', page: IPagination | undefined): void;
  (e: 'update:current', value: number | undefined): void;
  (e: 'update:perPage', value: number | undefined): void;
}>();
const pages = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

watch(
  () => pages.value?.current,
  (v) => {
    emit('update:current', v);
  },
);
watch(
  () => pages.value?.itemsPerPage,
  (v) => {
    emit('update:perPage', v);
  },
);
</script>
