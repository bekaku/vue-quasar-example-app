<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Date time picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <ui-date-picker v-model="d" title="Select Date" required @update:model-value="onUpdate" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <ui-time-picker v-model="pickTime" title="Select Date" required @update:model-value="onUpdateTime" />
                    </div>

                </div>
               
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import UiDatePicker from '@/components/quasar/DatePicker.vue';
import UiTimePicker from '@/components/quasar/TimePicker.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { FORMAT_DATE14, getCurrentDateByFormat } from '@/utils/dateUtil';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Date time Picker | ${t('app.name')}`);
const d = ref(getCurrentDateByFormat(FORMAT_DATE14));
const pickTime = ref<string>('');
const onUpdate = (v: string) => {
    console.log('onUpdate', v)
}
const onUpdateTime = (v: string) => {
    console.log('onUpdateTime', v)
}
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>