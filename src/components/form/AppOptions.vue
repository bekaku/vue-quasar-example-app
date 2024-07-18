<template>
    <q-select :label="label" :dense="dense" :outlined="outlined" :filled="filled" v-model="modelValue"
        option-value="value" option-label="label" emit-value map-options :use-chips="useChips" :multiple="multiple"
        :readonly="readonly" :use-input="canFilter" :options="options" @filter="filterFn" input-debounce="0"
        :rules="[required ? requiredSelect : ({} as any)]" :dropdown-icon="biChevronExpand">
        <template #prepend>
            <slot name="prepend">
                <q-icon v-if="icon" :name="icon" />
            </slot>
        </template>

        <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section v-if="scope.opt.avatar" avatar>
                    <base-avatar v-if="scope.opt.avatar" fetch-image :src="scope.opt.avatar" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-italic text-grey">
                    {{ t('error.dataNotfound') }}
                </q-item-section>
            </q-item>
        </template>
        <template v-if="clearable" v-slot:append>
            <q-icon v-if="modelValue !== null" class="cursor-pointer" :name="biX"
                @click.stop.prevent="modelValue = null" />
        </template>
        <template #after>
            <slot name="after"> </slot>
        </template>
    </q-select>
</template>

<script setup lang="ts" generic="T">
import { useLang } from '@/composables/useLang';
import { LabelValue } from '@/types/common';
import { onMounted, ref, Ref } from 'vue';
import { biChevronExpand, biX } from '@quasar/extras/bootstrap-icons';
import { useValidation } from '@/composables/useValidation';
import BaseAvatar from '@/components/base/BaseAvatar.vue';

const { requiredSelect } = useValidation();

interface Props {
    items: LabelValue<any>[];
    label?: string;
    optionValue?: string;
    optionLabel?: string;
    readonly?: boolean;
    dense?: boolean;
    outlined?: boolean;
    filled?: boolean;
    canFilter?: boolean;
    clearable?: boolean;
    required?: boolean;
    multiple?: boolean;
    useChips?: boolean;
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    optionValue: 'value',
    optionLabel: 'label',
    readonly: false,
    dense: true,
    canFilter: true,
    clearable: true,
    required: false,
    multiple: false,
    useChips: false,
    outlined: true,
});
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();
const options = ref<LabelValue<any>[]>([]);
onMounted(() => {
    options.value = props.items;
});
const filterFn = (val: string, update: any) => {
    if (val === '') {
        update(() => {
            options.value = props.items;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        options.value = props.items.filter((v: LabelValue<T>) =>
            v.label.toLowerCase().includes(needle),
        );
    });
};
</script>

<style scoped></style>