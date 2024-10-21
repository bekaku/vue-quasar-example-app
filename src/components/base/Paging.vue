<template>
  <div class="row" v-if="modelValue">
    <div class="col">
      <div class="q-pa-lg flex flex-center">
        <q-select
          v-if="canChangePerpage"
          dense
          outlined
          :label="t('paging.rowsPerPage')"
          class="q-mx-lg"
          v-model="modelValue.itemsPerPage"
          :options="modelValue.perPageList"
          option-value="value"
          option-label="text"
          emit-value
          map-options
          style="min-width: 155px; max-width: 200px"
          :dropdown-icon="biChevronExpand"
        />
        <q-pagination
          v-model="modelValue.current"
          direction-links
          boundary-links
          :outline="outline"
          :boundary-numbers="boundaryNumbers"
          :max="modelValue.totalPages"
          :max-pages="maxPages"
          :color="color"
          :icon-first="mdiSkipPrevious"
          :icon-last="mdiSkipNext"
          :icon-next="mdiChevronRight"
          :icon-prev="mdiChevronLeft"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { IPagination } from '@/types/common';
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiSkipNext,
  mdiSkipPrevious
} from '@quasar/extras/mdi-v7';
import { PropType, watch } from 'vue';

const props = defineProps({
  // modelValue: {
  //   type: Object as PropType<IPagination>
  // },
  maxPages: {
    type: Number as PropType<number>,
    default: 7
  },
  boundaryNumbers: {
    type: Boolean,
    default: true
  },
  outline: {
    type: Boolean,
    default: false
  },
  canChangePerpage: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'primary'
  }
});
const { t } = useLang();
const modelValue = defineModel<IPagination>();
const emit = defineEmits<{
  (e: 'update:modelValue', page: IPagination | undefined): void;
  (e: 'update:current', value: number | undefined): void;
  (e: 'update:perPage', value: number | undefined): void;
}>();
// const pages = computed({
//   get: () => props.modelValue,
//   set: (val) => emit('update:modelValue', val)
// });

watch(
  () => modelValue.value?.current,
  (v) => {
    emit('update:current', v);
  }
);
watch(
  () => modelValue.value?.itemsPerPage,
  (v) => {
    emit('update:perPage', v);
  }
);
</script>
