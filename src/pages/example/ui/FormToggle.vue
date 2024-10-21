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
                        <ui-togle title="Toggle" v-model="toggle" :use-checkbox="toggle" color="negative" size="md" true-label="Use Checkbox" false-label="Use toggle" />
                    </div>

                </div>

            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import UiTogle from '@/components/quasar/Togle.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { FORMAT_DATE14, getCurrentDateByFormat } from '@/utils/dateUtil';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Toggle | ${t('app.name')}`);
const toggle = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>