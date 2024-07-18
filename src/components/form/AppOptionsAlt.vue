<template>
    <q-select :label="label" dense outlined v-model="modelValue" :options="items" option-value="value"
        option-label="label" emit-value map-options :dropdown-icon="biChevronExpand">
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-italic text-grey">
                    {{ t('error.dataNotfound') }}
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script setup lang="ts" generic="T">
import { useLang } from '@/composables/useLang';
import { LabelValue } from '@/types/common';
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';

interface Props {
    items: T[];
    label?: string;
    optionValue?: string;
    optionLabel?: string;
}
withDefaults(defineProps<Props>(), {
    optionValue: 'value',
    optionLabel: 'label',
});
const { t } = useLang();
const modelValue = defineModel<T>();
</script>

<style scoped></style>