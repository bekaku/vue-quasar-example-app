<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { biSearch, biThreeDots } from '@quasar/extras/bootstrap-icons';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { ChatHistoryTab } from '@/types/common';
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatMessage from '@/components/chats/Message.vue';

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
const props = withDefaults(
    defineProps<{
        height?: number;
        autofocus?: boolean;
    }>(),
    {
        height: 450,
        autofocus: false
    }
);
const histotyTab = ref<ChatHistoryTab>('ALL');
const searchText = ref();
onMounted(async () => {
});
</script>
<template>
    <div v-bind="$attrs">


        <q-card flat bordered class="card-bg">
            <q-item class="card-top-bg">
                <q-item-section avatar>
                    <base-avatar :fetch-image="false"
                        src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg" :size="42">
                        <template #extra>
                            <q-badge floating color="positive" rounded transparent class="absolute" style="top: 30px" />
                        </template>
                    </base-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        Cody Fisher
                    </q-item-label>
                    <q-item-label caption lines="1">
                        Software Engineer
                    </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <div class="row">
                        <q-btn flat round :icon="biSearch" size="sm"></q-btn>
                        <q-btn flat round :icon="biThreeDots" size="sm"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-scroll-area style="height: 68vh;" content-active-style="width: 100%;" content-style="width: 100%;">
                <div class="q-pa-md">
                    <chat-message></chat-message>
                </div>
            </q-scroll-area>
        </q-card>
        <ChatInput></ChatInput>
    </div>
</template>
<style lang="scss" scoped>
.card-bg {
    background-color: var(--gray-50);
}

.card-top-bg {
    background-color: #fff;
}

body.body--dark {
    .card-bg {
        background-color: var(--color-dark-800);
    }

    .card-top-bg {
        background-color: var(--color-dark-900);
    }
}
</style>
