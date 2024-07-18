<template>
    <q-img v-if="loading" :spinner-color="spinnerColor" :placeholder-src="placHolder" :ratio="ratio" v-bind="$attrs"
        loading="lazy">
        <div class="absolute-full flex flex-center">
            <q-inner-loading showing label-class="text-white" />
        </div>
    </q-img>
    <q-img v-else :src="srcUrl" :placeholder-src="placHolder" :spinner-color="spinnerColor" :ratio="ratio"
        v-bind="$attrs" loading="lazy">
        <template v-slot:error>
            <div class="absolute-full flex flex-center bg-primary text-white">
                <q-icon :name="biCardImage" class="q-mr-sm" size="md" />
                Cannot load
                image
            </div>
        </template>
        <slot></slot>
    </q-img>
</template>

<script setup lang="ts">
/*
 <AppImage
          src="http://localhost:8080/cdn/images/202211/145_1668642842865_fe718909cb0d4bd88e17c8568fe12e2f.jpg"
          style="height: 250px; max-width: 250px"
          fetch
        />
        <app-image :src="crudEntity.companyLogo.image" style="max-height: 250px; max-width: 250px" fetch alt="user_img" :ratio="0"></app-image>
*/
import { watchEffect, onBeforeUnmount, onMounted, ref } from 'vue';
import { biCardImage } from '@quasar/extras/bootstrap-icons';
import FileManagerService from '@/api/FileManagerService';
import { FileManagerDto } from '@/types/models';
// const props = defineProps({
//   src: {
//     type: String as PropType<string>,
//     default: undefined,
//   },
//   placHolder: {
//     type: String as PropType<string>,
//     default: undefined,
//   },
//   spinnerColor: {
//     type: String as PropType<string>,
//     default: 'white',
//   },
//   cssClass: {
//     type: String as PropType<string>,
//     default: 'bg-black',
//   },
//   ratio: {
//     type: Number as PropType<number | undefined>,
//     default: 4 / 3,
//   },
// });
interface Props {
    src: string;
    fetch?: boolean;
    placHolder?: string;
    spinnerColor?: string;
    cssClass?: string;
    ratio?: number;//4 / 3
}

const props = withDefaults(defineProps<Props>(), {
    spinnerColor: 'white',
    cssClass: 'bg-black',
    ratio: 4 / 3,
    fetch: true
});
const { fethCdnData } = FileManagerService();
const loading = ref(true);
const srcUrl = ref<any>();
const firstLoaded = ref(false);
onMounted(async () => {
    await onFetchImage();
});
watchEffect(() => {
    if (firstLoaded.value) {
        onFetchImage();
    }
});
const onFetchImage = async () => {
    if (!props.src) {
        loading.value = false;
        return;
    }
    if (props.fetch) {
        const res = await fethCdnData(props.src);
        if (res) {
            srcUrl.value = res;
        }
    } else {
        srcUrl.value = props.src;
    }
    loading.value = false;
    if (!firstLoaded.value) {
        firstLoaded.value = true;
    }
};
onBeforeUnmount(() => {
    srcUrl.value = undefined;
});
</script>