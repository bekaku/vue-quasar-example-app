<template>
    <q-select v-bind="$attrs" :label="label" :dense :outlined v-model="modelValue" :options="items" :option-value="optionValue"
        :option-label="optionLabel" emit-value map-options :dropdown-icon="biChevronExpand" :multiple>
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
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';

withDefaults(defineProps<{
    items: T[];
    label?: string;
    optionValue?: string;
    optionLabel?: string;
    dense?: boolean;
    outlined?: boolean;
    multiple?: boolean;
}>(), {
    optionValue: 'value',
    optionLabel: 'label',
    dense: true,
    outlined: true,
    multiple: false,
});


const { t } = useLang();
const modelValue = defineModel<T>();
</script>

<style scoped></style>