<template>
    <div v-bind="$attrs">
        <slot>
            <div class="row">
                <div class="col-12 q-pa-md" :class="{ 'col-md-4': showPreview }">
                    <q-list bordered class="app-border-radius">
                        <q-item clickable @click="openFilePicker">
                            <q-item-section avatar>
                                <q-icon :name="icon"></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ label ? label : t('base.chooseFile') }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn @click="onClear" round flat :icon="biX" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div v-if="showPreview" class="col-12 col-md-8 q-pa-md">
                    <template v-if="fileItems.length > 0 && modelValue && modelValue.length > 0">
                        <FilesPreview :items="fileItems" @on-remove="onRemoveNewImage" format-size></FilesPreview>
                    </template>
                </div>
            </div>
        </slot>

        <q-file style="display: none" ref="appFileInputRef" filled :max-files="maxFiles" bottom-slots
            v-model="modelImageFiles" :label="label ? label : t('base.chooseFile')" counter :multiple="multiple"
            :accept="!wildcard ? accept : undefined" @rejected="onRejected" @update:model-value="onFileAdded">
        </q-file>
    </div>
</template>
<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
import { onBeforeUnmount, ref } from 'vue';
import { FileManagerDto } from '@/types/models';
import { biPaperclip, biX } from '@quasar/extras/bootstrap-icons';
import FilesPreview from '@/components/base/FilesPreview.vue';
import {
    MaxSelectFiles,
    FileExtensionAccept,
    FileTypeAcceptList,
    LIMIT_FILE_SIZE_MB,
    LIMIT_FILE_SIZE
} from '@/utils/constant';
import { zipFile, isImageFile, getImgUrlFromFile } from '@/utils/fileUtils';

const props = withDefaults(defineProps<{
    multiple: boolean;
    showPreview?: boolean;
    icon?: string;
    label?: string;
    accept?: string;//* = wildcard all extension
    wildcard?: boolean;
    maxFiles?: number;//0 = unlimited pick
}>(), {
    multiple: false,
    showPreview: true,
    maxFiles: MaxSelectFiles,
    icon: biPaperclip,
    accept: FileExtensionAccept
});
const { appToast } = useBase();
const { t } = useLang();
const modelValue = defineModel<any[]>({ default: () => [] });
const fileItems = defineModel<FileManagerDto[]>('fileItems', { default: () => [] });
const modelImageFiles = ref<any[]>([]);
const emit = defineEmits(['onFileAdd']);
const appFileInputRef = ref();
//file upload

const openFilePicker = () => {

    if (props.maxFiles > 0 && modelValue.value && modelValue.value.length == props.maxFiles) {
        appToast(t('error.limitFile2', { total: props.maxFiles }), {
            type: 'negative'
        });
        return;
    }

    if (!appFileInputRef.value) {
        return;
    }
    appFileInputRef.value.$el.click();
};
const onClear = (event: any) => {
    if (event) {
        event.stopPropagation();
    }
    modelValue.value = [];
    modelImageFiles.value = [];
};
const onRejected = (rejectedEntries: any) => {
    appToast(t('error.filesValidationFmt', { total: rejectedEntries.length }), {
        type: 'negative'
    });
};
const validateAndZipFile = async (files: File[]): Promise<any[]> => {
    const list: any[] = [];
    for (const f of files) {
        const type = f.type;
        if (f.size > LIMIT_FILE_SIZE) {
            appToast(t('error.limitEachFile2', [f.name, LIMIT_FILE_SIZE_MB]), {
                multiLine: false,
                type: 'negative'
            });
        } else {
            const allowType = FileTypeAcceptList.includes(type);
            if (!allowType) {
                const ziped = await zipFile(f);
                if (ziped) {
                    list.push(ziped);
                }
            } else {
                list.push(f);
            }
        }

    }
    return new Promise((resolve) => {
        resolve(list);
    });
};
const onFileAdded = async (files: File[]) => {
    const finalFiles = await validateAndZipFile(files);
    emit('onFileAdd', finalFiles);
    if (props.multiple) {
        if (finalFiles && finalFiles.length > 0) {
            for (const f of finalFiles) {
                await onAddFile(f);
            }
        }
    } else if (finalFiles) {
        modelValue.value = [];
        fileItems.value = [];
        await onAddFile(finalFiles);
    }
    modelImageFiles.value = [];
};
const onAddFile = async (f: any) => {
    const isImg = isImageFile(f);
    let url: string | undefined = undefined;
    if (isImg) {
        url = await getImgUrlFromFile(f);
    }
    onAddFilePreview(f, isImg, url);
};
const onAddFilePreview = (
    f: File,
    isImage: boolean,
    pathUrl: string | undefined = undefined
) => {
    if (modelValue.value) {
        modelValue.value.push(f);
        fileItems.value.push({
            id: 0,
            fileMime: f.type,
            fileName: f.name,
            filePath: pathUrl ? pathUrl : '',
            fileThumbnailPath: '',
            fileSize: f.size + '',
            functionId: 0,
            isImage: isImage,
            file: f
        });
    }
};
const onRemoveNewImage = (index: number) => {
    if (!modelValue.value) {
        return;
    }
    modelValue.value.splice(index, 1);
    fileItems.value.splice(index, 1);
};

onBeforeUnmount(() => {
    modelValue.value = [];
    fileItems.value = [];
    modelImageFiles.value = [];
});
defineExpose({
    openFilePicker
});
</script>
