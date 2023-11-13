<template>
  <q-btn class="q-mx-sm" flat :round="btnRound" :icon="icon" :label="label">
    <q-menu>
      <q-list :style="`min-width: ${width}px`" :dense="listDense">
        <q-item-label header>{{ t('base.filterField') }}</q-item-label>
        <q-separator />
        <q-item
          tag="label"
          clickable
          v-for="(f, fi) in fillableHeaders"
          :key="'fill-fields-' + fi"
        >
          <q-item-section side top>
            <q-checkbox v-model="f.options.fillable" />
          </q-item-section>
          <q-item-section>
            {{ t(f.label) }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-tooltip>{{ t('base.filterField') }}</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { ICrudListHeader } from '@/types/common';
import { biFilter } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  headers: {
    type: Array as PropType<ICrudListHeader[]>,
    default: () => [],
  },
  icon: {
    type: String,
    default: biFilter,
  },
  label: {
    type: String,
    default: undefined,
  },
  width: {
    type: Number,
    default: 200,
  },
  listDense: {
    type: Boolean,
    default: true,
  },
  btnRound: {
    type: Boolean,
    default: true,
  },
});
defineEmits(['on-sort-column', 'on-sort-mode']);
const { t } = useLang();
const fillableHeaders = computed(() => {
  const headers = props.headers;
  return headers.filter(
    (c) =>
      c.options &&
      (c.options.fillable === true || c.options.fillable === false),
  );
});
</script>
