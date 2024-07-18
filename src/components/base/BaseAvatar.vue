<template>
    <q-avatar :size="`${size}px`" :square="square" :rounded="rounded" v-bind="$attrs" :color="color">
        <slot>
            <template v-if="!fetchImage">
                <q-img :src="src" :spinner-color="spinnerColor" no-native-menu />
            </template>
            <template v-else>
                <app-image v-if="src" :src="src" :ratio="1"></app-image>
            </template>
            <slot name="extra"></slot>
        </slot>
    </q-avatar>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import AppImage from '@/components/base/AppImage.vue';

defineProps({
    src: {
        type: String as PropType<string>,
        default: undefined
    },
    spinnerColor: {
        type: String as PropType<string>,
        default: 'white'
    },
    color: {
        type: String as PropType<string>,
        default: undefined
    },
    imgBg: {
        type: String as PropType<string>,
        default: 'bg-grey-8'
    },
    ratio: {
        type: Number as PropType<number | undefined>,
        default: 4 / 3
    },
    size: {
        type: Number,
        default: 32
    },
    square: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: Boolean,
        default: false
    },
    fetchImage: {
        type: Boolean,
        default: false
    }
});
</script>
<style lang="scss" scoped>
.bordered {
    border: 2px solid #fff
}
</style>