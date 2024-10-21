<template>
  <template v-if="item?.isImage || item?.image">
    <app-image
      v-bind="$attrs"
      :src="getImagePath"
      :fetch="fetch"
      :ratio="ratio"
      :style="{ maxHeight: imageHeight || imageSize, maxWidth: imageSize }"
      class="cursor-pointer" @click="onClick($event, index)">
      <q-btn v-if="showDelete" @click="onRemove($event, index)" class="absolute all-pointer-events" name="info"
             style="top: 8px; left: 8px" round size="sm" :icon="biTrashFill" color="negative">
      </q-btn>
    </app-image>
    <q-item :dense="dense" v-bind="$attrs" v-if="showName || showSize" class="q-pa-none">
      <q-item-section>
        <q-item-label v-if="showName" lines="1" :class="textColor">
          <slot name="fileName">
            {{ item.fileName }}
          </slot>
        </q-item-label>
        <q-item-label v-if="showSize" caption>
          <slot name="size">
            {{ formatSize ? formatBytes(item.fileSize) : item.fileSize+' b' }}
          </slot>
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>
  <template v-else>
    <div class="text-center">
      <q-icon v-bind="$attrs" class="cursor-pointer" @click="onClick($event, index)" :size="iconSize"
              :name="getFileTypeIcon(item.fileMime)">
        <q-btn v-if="showDelete" @click="onRemove($event, index)" class="absolute all-pointer-events" name="info"
               style="top: 8px; left: 8px" round size="sm" :icon="biTrashFill" color="negative">
        </q-btn>
        <q-tooltip v-if="showTooltip && item.fileName">
          {{ item.fileName }}
        </q-tooltip>
      </q-icon>
      <q-item :dense="dense" v-if="showName || showSize" class="q-pa-none">
        <q-item-section>
          <q-item-label v-if="showName" lines="1" :class="textColor">
            <slot name="fileName">
              {{ item.fileName }}
            </slot>
          </q-item-label>
          <q-item-label v-if="showSize" caption :class="textColor">
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

  </template>
</template>

<script setup lang="ts">
import AppImage from '@/components/base/AppImage.vue';
import { FileManagerDto } from '@/types/models';
import { formatBytes } from '@/utils/appUtil';
import { getFileTypeIcon } from '@/utils/fileUtils';
import { biTrashFill } from '@quasar/extras/bootstrap-icons';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  showDelete?: boolean;
  col?: string;
  item: FileManagerDto;
  index: number;
  formatSize?: boolean;
  fetch?: boolean;
  useThumbnail?: boolean;
  showName?: boolean;
  showSize?: boolean;
  imageSize?: string;
  imageHeight?: string;
  iconSize?: string;
  textColor?: string;
  dense?: boolean;
  showTooltip?: boolean;
  ratio?: number;
}>(), {
  showDelete: true,
  col: 'col-3 q-pa-md',
  ratio: 4/3,
  formatSize: true,
  fetch: false,
  showName: true,
  showSize: true,
  useThumbnail: false,
  showTooltip: false,
  dense: true,
  imageSize: '125px',
  iconSize: '4em'
});
const emit = defineEmits(['on-remove', 'on-click']);
const getImagePath = computed(() => props.useThumbnail && props.item.fileThumbnailPath ? props.item.fileThumbnailPath : props.item.filePath);
const onRemove = (event: any, index: number) => {
  emit('on-remove', index);
  if (event) {
    event.stopImmediatePropagation();
  }
};
const onClick = (event: any, index: number) => {
  emit('on-click', index);
  if (event) {
    event.stopImmediatePropagation();
  }
};
</script>
