<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Image Cropper </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-12 col-md-4">
                        <q-item>
                            <q-item-section avatar top>
                                <q-avatar size="75px" rounded>
                                    <q-img v-if="cropedUrl" spinner-color="white" :src="cropedUrl" />
                                    <q-img v-else spinner-color="white" src="/images/no_picture_thumb.jpg" />
                                    <q-btn color="primary" @click="showImageCroper = true" round size="sm" unelevated
                                        style="left: 50px;" class="absolute-top" :icon="biPencilFill">
                                        <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                                    </q-btn>
                                    <q-btn v-if="cropedFile != undefined" color="negative" @click="onDeleteFile" round
                                        size="sm" unelevated style="left: 100px;" class="absolute-top" :icon="biTrash">
                                        <q-tooltip>{{ t('base.delete') }}</q-tooltip>
                                    </q-btn>
                                </q-avatar>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div class="col-12 col-md-8 q-pa-md">
                        <div class="q-gutter-sm">


                            <q-img v-if="cropedUrl == undefined" spinner-color="white" src="/images/no_picture.jpg" />
                            <template v-if="cropedUrl">
                                <base-image :src="cropedUrl" :ratio="1" alt="1"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="3 / 4" alt="3/4"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="16 / 9" alt="16/9"
                                    style="height: 250px; max-width: 250px" />

                                <p>cover</p>
                                <base-image :src="cropedUrl" fit="cover" alt="contain" />
                                <p>contain</p>
                                <base-image :src="cropedUrl" fit="contain" alt="contain" />
                                <p>fill</p>
                                <base-image :src="cropedUrl" fit="fill" alt="fill" />
                                <p>scale-down</p>
                                <base-image :src="cropedUrl" fit="scale-down" image-bg />
                            </template>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <image-cropper :title="t('cropAvatar')" :dialog="showImageCroper" @on-close="onCloseImageCropper"
            @on-okay="onCropImage" />
    </q-page>
</template>

<script setup lang="ts">
import ImageCropper from '@/components/base/ImageCropper.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { getImgUrlFromFile } from '@/utils/fileUtils';
import { biPencilFill, biTrash } from '@quasar/extras/bootstrap-icons'
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Image Cropper | ${t('app.name')}`);
const showImageCroper = ref(false);
const cropedUrl = ref<string>();
const cropedFile = ref<any>();
const onCloseImageCropper = () => {
    showImageCroper.value = false;
};
const onDeleteFile = () => {
    cropedUrl.value = undefined;
    cropedFile.value = undefined;
}
const onCropImage = async (f: any) => {
    console.log('onCropImage', f);
    const imageUrl = await getImgUrlFromFile(f);
    if (imageUrl) {
        cropedUrl.value = imageUrl;
    }
    cropedFile.value = f;
};
</script>

<style lang="scss" scoped></style>