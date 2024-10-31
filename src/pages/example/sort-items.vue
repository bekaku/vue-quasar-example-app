<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Sort items </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <div class="row">
                    <div class="col col-md-6 q-pa-sm">
                        <q-card>
                            <div class="q-pa-md text-h5">
                                Dialog
                            </div>
                            <q-card-section>
                                <q-btn @click="sortDialog = true" color="primary" no-caps>Open sort dialog</q-btn>

                                <pre style="max-height: 450px;overflow: auto;" class="bg-black text-light-green-13">
                                    {{ items }}
                                </pre>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col col-md-6 q-pa-sm">
                        <q-card>
                            <q-toolbar>
                                <q-btn flat round dense :icon="biFunnel" />
                                <q-toolbar-title>
                                    Custom UI
                                </q-toolbar-title>
                                <UiTogle v-model="cansort" label="Toggle" :use-checkbox="false"/>
                            </q-toolbar>
                            <q-card-section>
                                <app-slick style="height: 60vh;overflow: auto;" v-model="items" label-key="name" value-key="id" @on-sorting="onSorting">
                                    <template #item="{ item }">
                                        <q-item>
                                            <q-item-section avatar>
                                                <q-avatar>
                                                    <q-img :src="item.image" />
                                                </q-avatar>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>
                                                    {{ item.name }}
                                                </q-item-label>
                                                <q-item-label caption lines="1">
                                                    {{ item.message }}
                                                </q-item-label>
                                            </q-item-section>
                                            <q-item-section v-if="cansort" side>
                                                <DragHandle>
                                                    <q-btn flat round :icon="biList"> </q-btn>
                                                </DragHandle>
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </app-slick>
                            </q-card-section>
                        </q-card>
                    </div>

                </div>
            </q-card-section>
        </q-card>

        <app-slick-dialog v-if="sortDialog" v-model="items" v-model:doalogModel="sortDialog" label-key="name"
            value-key="id" @on-sorting="onSorting">
        </app-slick-dialog>
    </q-page>
</template>

<script setup lang="ts">
import AppSlick from '@/components/base/AppSlick.vue';
import AppSlickDialog from '@/components/base/AppSlickDialog.vue';
import UiTogle from '@/components/quasar/Togle.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biList, biFunnel } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
import { DragHandle } from 'vue-slicksort';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Sort items | ${t('app.name')}`);

const sortDialog = ref(false);
const cansort = ref(false);
const items = ref<any[]>([
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
]);
const onSorting = async (reqList: any[]) => {
    console.log('onSorting', reqList);
    sortDialog.value = false;
};
</script>

<style lang="scss" scoped></style>
