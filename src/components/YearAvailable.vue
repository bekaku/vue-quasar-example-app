<template>
  <!-- <q-tabs
    v-if="yearList.length > 1"
    v-model="year"
    align="left"
    active-color="primary"
    inline-label
    outside-arrows
    mobile-arrows
  >
    <q-tab
      v-for="(y, index) in yearList"
      :key="index"
      :value="y.toString()"
      :name="y"
      :label="y"
    />
  </q-tabs> -->
  <q-btn outline :icon-right="biCaretDown">
    {{ t('base.selectYear') + ' ' + year }}
    <q-menu fit>
      <q-list>
        <q-item
          v-for="(y, index) in yearList"
          :key="index"
          clickable
          v-close-popup
          @click="year = y"
        >
          <q-item-section>
            <q-item-label :class="{ 'text-primary': y == year }">
              {{ y }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="y == year" side>
            <q-icon :name="biCheck2"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import ReportService from '@/api/ReportService';
import { getYearNow } from '@/utils/dateUtil';
import { biCaretDown, biCheck2 } from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
const props = defineProps({
  modelValue: [String, Number],
});
const { findAllAvaiableYear } = ReportService();
const { t } = useLang();
const yearList = ref<number[]>([]);
const emit = defineEmits(['update:modelValue']);
const year = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
onMounted(() => {
  fetchYearAvailable();
});
const fetchYearAvailable = async () => {
  yearList.value = await findAllAvaiableYear();
  if (yearList.value && yearList.value.length > 0) {
    year.value = yearList.value[0].toString();
  } else {
    const currentY = getYearNow();
    year.value = currentY.toString();
  }
  return new Promise((resolve) => {
    resolve(true);
  });
};
</script>
