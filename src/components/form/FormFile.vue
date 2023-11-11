<template>
  <div class="file-input">
    <input
      type="file"
      :ref="refName"
      v-on:change="onSelected"
      class="file"
      :id="refName"
      :multiple="multiple"
      :accept="allowMimeType.join(',')"
    />
    <label :for="refName">
      <slot name="icon">
        <q-icon :name="biPlusLg"> </q-icon>
      </slot>
      <slot name="label">
        <span v-if="showLabelName" class="q-ml-sm">{{
          t('base.chooseFile')
        }}</span>
      </slot>
    </label>
    <slot name="name">
      <template v-if="fileNameDisplay && showName">
        <div style="width: 100%; overflow: auto">
          {{ fileNameDisplay }}
        </div>
      </template>
    </slot>
    <p v-if="!isAllowFile" class="text-danger q-text-caption">
      {{ t('error.notAllowFIleError', { mimes: allowMimeType.join(',') }) }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { biPlusLg } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
  refName: {
    type: String,
    default: 'fileRef',
  },
  iconColor: {
    type: String,
    default: 'text-muted',
  },
  iconSize: {
    type: Number,
    default: 24,
  },
  showName: {
    type: Boolean,
    default: true,
  },
  showLabelName: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  allowMimeType: {
    type: Array,
    default: () => ['image/jpeg', 'image/png'],
  },
});

const { t } = useLang();
const emit = defineEmits([
  'update:modelValue',
  'on-pick-file',
  'on-delete-file',
]);
// const show = computed({
//   get: () => props.modelValue,
//   set: (val) => emit('update:modelValue', val),
// });
const isAllowFile = ref(true);
const fileNameDisplay = ref('');
const onSelected = (e: any) => {
  // Get the selected file
  const [file] = e.target.files;

  if (file) {
    // Get the file name and size
    const { name: fileName, size, type } = file;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);

    if (props.allowMimeType.indexOf(type) > -1) {
      // Set the text content
      fileNameDisplay.value = `${fileName} - ${fileSize}KB`;
      isAllowFile.value = true;
      if (props.multiple) {
        emit('on-pick-file', e.target.files); //File[]
      } else {
        emit('on-pick-file', e.target.files[0]); //File
      }
    } else {
      isAllowFile.value = false;
    }
  }
};
// const onDelete = () => {
//   fileNameDisplay.value = '';
//   emit('on-delete-file');
// };
</script>
<style lang="scss" scoped>
.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-input label {
  position: relative;
  width: 150px;
  padding: 5px;
  //   height: 50px;
  border-radius: 5px;
  //   background: linear-gradient(40deg, #ff6ec4, #7873f5);
  //   background: var(--app-bg-color);
  //   box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: left;
  justify-content: left;
  //   color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease-out;
}
</style>
