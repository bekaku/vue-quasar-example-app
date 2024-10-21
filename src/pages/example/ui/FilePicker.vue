<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> file-picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-12 q-pa-md">
                        <div class="text-h5">
                            Simple Picker
                        </div>
                        <ui-file-picker multiple v-model="files" v-model:fileItems="filesPreview" :icon="biFileArrowUp"
                            show-preview :accept="FileExtensionAccept" @on-file-add="onFileAdd"
                            :label="t('base.chooseFile')" />
                        <ui-button class="q-my-md" @click="onSubmit">
                            Submit
                        </ui-button>
                        <q-separator />
                    </div>
                    <div class="col-12 q-pa-md">
                        <div class="text-h5">
                            Custom Ui
                        </div>
                        <ui-file-picker ref="filePickerCustomUiRef" multiple v-model:fileItems="customFiles"
                            :accept="FileExtensionAccept" @on-file-add="onCustomFileAdd">
                            <ui-button class="q-my-md" @click="openPicker" outline :icon="biUpload"
                                label="Open Picker" />
                        </ui-file-picker>
                        <FilesPreview :items="customFiles" @on-remove="onCustomRemove" col="col-4 col-md-2 q-pa-md" />
                        <q-separator />
                    </div>
                    <div class="col-12 q-pa-md">
                        <div class="text-h5 q-pb-md">
                            Custom Ui2
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 q-pa-md">
                                <ui-file-picker style="display: none;" ref="filePickerCustomUi2Ref" multiple
                                    v-model:fileItems="custom2Files" :accept="FileExtensionAccept"
                                    :max-files="5"
                                    @on-file-add="onCustomFileAdd2">
                                </ui-file-picker>



                                <q-input outlined v-model="message" type="textarea" autogrow label="Type message">
                                    <template #prepend>
                                        <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
                                    </template>
                                    <template #before>
                                        <ui-button round flat :icon="biImage" color="grey-7" @click="openPicker2" />
                                        <ui-button round flat :icon="biEmojiSmile" color="grey-7" />
                                    </template>
                                    <template #after>
                                        <ui-button flat round :icon="biSend" color="primary">
                                            <q-tooltip>
                                                Send
                                            </q-tooltip>
                                        </ui-button>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-md-6 q-pa-md">
                                <q-list v-if="custom2Files != undefined && custom2Files.length > 0">
                                    <ui-scroll-area height="250px">
                                        <files-preview-item-alt v-for="(f, fileIndex) in custom2Files"
                                        :key="`f-${f.id}-${fileIndex}`" :item="f" :index="fileIndex"
                                        @on-remove="onCustomRemove2" dense image-size="100px" show-delete>
                                    </files-preview-item-alt>
                                    </ui-scroll-area>
                                    
                                </q-list>
                            </div>
                        </div>

                    </div>
                </div>

            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import UiButton from '@/components/quasar/Button.vue';
import UiFilePicker from '@/components/quasar/FilePicker.vue';
import UiScrollArea from '@/components/quasar/ScrollArea.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { FileManagerDto } from '@/types/models';
import { FileExtensionAccept } from '@/utils/constant';
import { biFileArrowUp, biUpload, biSend, biEmojiSmile, biImage } from '@quasar/extras/bootstrap-icons';
import { ref, useTemplateRef } from 'vue';
import { useAuthenStore } from '@/stores/authenStore';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import FilesPreview from '@/components/base/FilesPreview.vue';
import FilesPreviewItemAlt from '@/components/base/FilesPreviewItemAlt.vue';

const authenStore = useAuthenStore();
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`File picker | ${t('app.name')}`);

const files = ref<File[]>([]);
const filesPreview = ref<FileManagerDto[]>([]);


const filePickerCustomUiRef = useTemplateRef('filePickerCustomUiRef');
const customFiles = ref<FileManagerDto[]>([]);

const filePickerCustomUi2Ref = useTemplateRef('filePickerCustomUi2Ref');
const custom2Files = ref<FileManagerDto[]>([]);
const message = ref();
const onFileAdd = (items: File[]) => {
    console.log('onFildAdd', items);
}
const onSubmit = () => {
    console.log('onSubmit', files.value, 'filesPreview', filesPreview.value);
}

//custom ui
const openPicker = () => {
    if (filePickerCustomUiRef.value) {
        filePickerCustomUiRef.value.openFilePicker();
    }
}
const onCustomFileAdd = (items: File[]) => {
    console.log('onCustomFileAdd', items);
}
const onCustomRemove = (index: number) => {
    if (!customFiles.value) {
        return;
    }
    customFiles.value.splice(index, 1);
};
//custom2 ui
const openPicker2 = () => {
    if (filePickerCustomUi2Ref.value) {
        filePickerCustomUi2Ref.value.openFilePicker();
    }
}
const onCustomFileAdd2 = (items: File[]) => {
    console.log('onCustomFileAdd', items);
}
const onCustomRemove2 = (index: number) => {
    if (!custom2Files.value) {
        return;
    }
    custom2Files.value.splice(index, 1);
};
</script>

<style lang="scss" scoped></style>