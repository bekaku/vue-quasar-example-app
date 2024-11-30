<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Toggle </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <UiToggle label="Toggle" v-model="toggle" :use-checkbox="true" color="primary" :useLabelTitle="false" size="md" true-label="True label" false-label="False label" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <UiToggle label="Toggle" v-model="toggle" :use-checkbox="false" color="negative" size="md"/>
                    </div>
                    <div class="col-4 q-pa-md">
                        <UiToggle label="Toggle" v-model="toggle" :use-checkbox="toggle" color="negative" size="md" />
                    </div>

                </div>

            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import UiToggle from '@/components/quasar/Toggle.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
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