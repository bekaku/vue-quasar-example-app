<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Swipper </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <div class="row">
                    <div class="col col-md-6 q-pa-sm">
                        <q-card>
                            <div class="q-pa-md text-h5">
                                Simple
                            </div>
                            <q-card-section>
                                <base-swiper-slides :paramiters="slideOpts">
                                    <swiper-slide v-for="(item, i) in items" :key="i">
                                        <q-card flat class="text-center" :style="defualtStyle">
                                            <ripple-item>
                                                <base-avatar rounded :src="item.image" :size="56">
                                                </base-avatar>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label lines="1">
                                                            {{ item.name }}
                                                        </q-item-label>
                                                        <q-item-label caption lines="1" class="q-text-caption">
                                                            {{ item.time }}
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </ripple-item>
                                        </q-card>
                                    </swiper-slide>
                                </base-swiper-slides>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col col-md-6 q-pa-sm">
                        <q-card>
                            <div class="q-pa-md text-h5">
                                Virtical
                            </div>
                            <q-card-section>
                                <base-swiper-slides :paramiters="slideOptsVertical" style="height: 450px;">
                                    <swiper-slide v-for="(item, i) in items" :key="`virtical-${i}`">
                                        <q-card flat class="text-center" :style="defualtStyle">
                                            <ripple-item>
                                                <base-avatar rounded :src="item.image" :size="56">
                                                </base-avatar>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label lines="1">
                                                            {{ item.name }}
                                                        </q-item-label>
                                                        <q-item-label caption lines="1" class="q-text-caption">
                                                            {{ item.time }}
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </ripple-item>
                                        </q-card>
                                    </swiper-slide>
                                </base-swiper-slides>
                            </q-card-section>
                        </q-card>
                    </div>

                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import RippleItem from '@/components/base/RippleItem.vue';
import BaseSwiperSlides from '@/components/base/SwiperSlides.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { SlideOptions } from '@/types/common';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Swipper | ${t('app.name')}`);

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
const defualtStyle = {
    minHeight: '100px',
};
const slideOpts: SlideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4.7,
    spaceBetween: 5,
    centeredSlides: false,
    navigation: true,
    autoplay: false,
    // style: {
    //     '--swiper-navigation-color': '#00aba9',
    //     '--swiper-pagination-color': '#00aba9',
    // },
    pagination: true,
    paginationDynamic: true,
    paginationType: 'bullets',
    // direction: 'vertical',
    effect: 'slide',
    zoom: true
};
const slideOptsVertical: SlideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3.7,
    spaceBetween: 5,
    centeredSlides: false,
    navigation: false,
    autoplay: false,
    pagination: true,
    paginationDynamic: true,
    paginationType: 'bullets',
    direction: 'vertical',
    effect: 'slide',
    zoom: true
};
</script>

<style lang="scss" scoped></style>