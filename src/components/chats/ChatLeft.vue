<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { biPlus, biSearch } from '@quasar/extras/bootstrap-icons';
import { ChatHistoryTab } from '@/types/common';
import BaseAvatar from '@/components/base/BaseAvatar.vue';

const AppResult = defineAsyncComponent(
    () => import('@/components/base/AppResult.vue')
);
const BaseLoadmore = defineAsyncComponent(
    () => import('@/components/base/BaseLoadmore.vue')
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
const items = [
    {
        id: 1,
        name: 'Cody Fisher',
        time: '12.30',
        new: 9,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
        message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?'
    },
    {
        id: 2,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
        message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀'
    },
    {
        id: 3,
        name: 'Robert Fox',
        time: '12.30',
        new: 8,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
        message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n'
    },
    {
        id: 4,
        name: 'Esther Howard',
        time: '12.30',
        new: 1,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
        message: 'Quick one, team! Anyone'
    },
    {
        id: 5,
        name: 'Darlene Robertson',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
        message: 'ust explored PrimeVue\'s themes'
    },
    {
        id: 6,
        name: 'Ralph Edwards',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
        message: 'PrimeVue is a game-changer, righ'
    },
    {
        id: 7,
        name: 'Darrell Steward',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
        message: 'Reflecting on PrimeVue\'s impact o'
    },
    {
        id: 8,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
        message: 'Let\'s implement PrimeVue'
    },
    {
        id: 9,
        name: 'Cody Fisher',
        time: '12.30',
        new: 9,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
        message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?'
    },
    {
        id: 10,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
        message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀'
    },
    {
        id: 11,
        name: 'Robert Fox',
        time: '12.30',
        new: 8,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
        message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n'
    },
    {
        id: 12,
        name: 'Esther Howard',
        time: '12.30',
        new: 1,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
        message: 'Quick one, team! Anyone'
    },
    {
        id: 13,
        name: 'Darlene Robertson',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
        message: 'ust explored PrimeVue\'s themes'
    },
    {
        id: 14,
        name: 'Ralph Edwards',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
        message: 'PrimeVue is a game-changer, righ'
    },
    {
        id: 15,
        name: 'Darrell Steward',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
        message: 'Reflecting on PrimeVue\'s impact o'
    },
    {
        id: 16,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
        message: 'Let\'s implement PrimeVue'
    }
];
const onHistoryTabChange = (event: any) => {
    console.log('onHistoryTabChange', event);
};
</script>
<template v-bind="$attrs">
    <q-card flat>
        <q-toolbar>
            <q-toolbar-title class="text-weight-bold">
                {{ t('chats.chats') }}
            </q-toolbar-title>
            <q-btn flat round :icon="biPlus"></q-btn>
        </q-toolbar>
        <q-card-section>
            <q-input v-model="searchText" :label="t('base.search')" outlined dense>
                <template #prepend>
                    <q-icon :name="biSearch" />
                </template>
            </q-input>
        </q-card-section>
        <q-tabs class="q-my-sm" dense v-model="histotyTab" inline-label @update:model-value="onHistoryTabChange">
            <q-tab name="ALL" :label="t('chats.all')" class="text-capitalize">
            </q-tab>
            <q-tab name="GROUP" :label="t('chats.groups')" class="text-capitalize">
            </q-tab>
            <q-tab name="FAVORITE" :label="t('chats.favorite')" class="text-capitalize">
            </q-tab>
        </q-tabs>
        <q-tab-panels v-model="histotyTab" keep-alive>
            <q-tab-panel name="ALL" class="q-pa-none">

                <q-list>
                    <q-scroll-area style="height: 61vh;" content-active-style="width: 100%;"
                        content-style="width: 100%;">
                        <q-item v-for="(item, index) in items" :key="`${item.id}-${index}`" clickable>
                            <q-item-section avatar>
                                <base-avatar :fetch-image="false" :src="item.image" :size="42">
                                    <template v-if="item.online" #extra>
                                        <q-badge floating color="positive" rounded transparent class="absolute"
                                            style="top: 30px" />
                                    </template>
                                </base-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ item.name }}
                                </q-item-label>
                                <q-item-label caption lines="1">
                                    {{ item.message }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label caption lines="1">
                                    {{ item.time }}
                                </q-item-label>
                                <q-item-label v-if="item.new > 0" caption>
                                    <q-badge color="negative">
                                        {{ item.new }}
                                    </q-badge>
                                </q-item-label>

                            </q-item-section>
                        </q-item>
                    </q-scroll-area>
                </q-list>

            </q-tab-panel>
            <q-tab-panel name="GROUP">
                GROUP
            </q-tab-panel>
            <q-tab-panel name="FAVORITE">
                FAVORITE
            </q-tab-panel>
        </q-tab-panels>


    </q-card>
</template>
