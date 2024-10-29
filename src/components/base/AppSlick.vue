<template>
  <div v-bind="$attrs">
    <q-list>
      <SlickList axis="y" v-model:list="modelValue" useDragHandle :distance="1" helperClass="sortHelper">
        <SlickItem v-for="(item, i) in modelValue" :key="item.id" :index="i" class="SortableHelper">

          <slot name="item" v-bind="{ item, inedx: i }">
            <q-item>
              <q-item-section avatar>
                {{ i + 1 }}
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ item[labelKey] }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <DragHandle>
                  <q-btn flat round :icon="biList"> </q-btn>
                </DragHandle>
              </q-item-section>
            </q-item>
            <q-separator />
          </slot>
        </SlickItem>
      </SlickList>
    </q-list>
    <slot name="action">
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat @click="onSorting" color="primary" :label="t('base.save')" />
        <q-btn v-close-popup flat :label="t('base.close')" />
      </q-card-actions>
    </slot>

  </div>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { biList } from '@quasar/extras/bootstrap-icons';
import { DragHandle, SlickItem, SlickList } from 'vue-slicksort';
const props = defineProps<{
  labelKey: string;
  valueKey: string;
}>();
const { t } = useLang();
const modelValue = defineModel<any[]>();
const emit = defineEmits<{
  onSorting: [any[]];
}>();
const setResquest = (): Promise<number[]> => {
  return new Promise((resove) => {
    const list: number[] = [];
    const items = modelValue.value;
    if (items && items.length > 0) {
      for (const item of items) {
        if (item[props.valueKey]) {
          list.push(item[props.valueKey]);
        }
      }
    }

    resove(list);
  });
};
const onSorting = async () => {
  const response = await setResquest();
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
