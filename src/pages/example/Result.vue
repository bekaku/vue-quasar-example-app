<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Result </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <q-card bordered flat>
                    <app-result :description="t('error.dataNotfound')" status="empty"/>
                </q-card>
                
                <q-card bordered flat>
                    <app-result title="403" description="Forbidden" status="403"/>
                </q-card>
               
                <q-card bordered flat>
                    <app-result title="404" description="Not found" status="404"/>
                </q-card>
                <q-card bordered flat>
                    <app-result description="Error" status="error"/>
                </q-card>
                <q-card bordered flat>
                    <app-result description="Info" :icon="biImage" status="info"/>
                </q-card>
                <q-card bordered flat>
                    <app-result description="Success" status="success"/>
                </q-card>
                <q-card bordered flat>
                    <app-result description="Warning" status="warning"/>
                </q-card>
               
                <!-- <app-result :description="t('error.dataNotfound')">
                    <template #extra>
                        <q-icon :name="biEmojiSmile"></q-icon>
                    </template>
                </app-result> -->
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import AppResult from '@/components/base/AppResult.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biEmojiSmile, biImage, biSend } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Result | ${t('app.name')}`);
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>