<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useLang } from '@/composables/useLang';
import { useAppMeta } from '@/composables/useAppMeta';
import ChatLeft from '@/components/chats/ChatLeft.vue';
import ChatContent from '@/components/chats/ChatContent.vue';
import ChatRight from '@/components/chats/ChatRight.vue';

const AppResult = defineAsyncComponent(
    () => import('@/components/base/AppResult.vue')
);
const BaseLoadmore = defineAsyncComponent(
    () => import('@/components/BaseLoadmore.vue')
);
const BaseSpinner = defineAsyncComponent(
    () => import('@/components/base/BaseSpinner.vue')
);
const { t } = useLang();

const { setTitle } = useAppMeta();
setTitle(`${t('chats.chats')} | ${t('app.name')}`);
onMounted(async () => {
});
</script>
<template>
    <q-page>
        <q-card flat square style="min-height: 91vh">
            <div class="row">
                <div class="col-12 col-md-3 col-sm-4 q-pa-sm" v-if="$q.screen.gt.xs">
                    <chat-left class="content-limit720">
                    </chat-left>
                </div>
                <div class="col-12 col-md-6 col-sm-8 q-pa-md ">
                    <chat-content class="content-limit ">
                    </chat-content>
                </div>
                <div class="col-12 col-md-3  q-pa-sm" v-if="$q.screen.gt.xs && $q.screen.gt.sm">
                    <chat-right class="content-limit720">
                    </chat-right>
                </div>
            </div>
        </q-card>
    </q-page>
</template>
