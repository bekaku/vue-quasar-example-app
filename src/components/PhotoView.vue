<template>
  <q-dialog
    :model-value="show"
    @hide="onClose"
    @before-hide="$emit('on-before-hide')"
    full-width
    full-height
  >
    <q-card class="text-white" dark style="width: 960px; max-width: 80vw">
      <q-toolbar>
        <template v-if="user">
          <q-avatar size="32px">
            <q-img
              class="bg-gray-8"
              :src="user.avatar?.thumbnail"
              spinner-color="white"
              no-native-menu
            />
          </q-avatar>
        </template>

        <q-toolbar-title>
          {{
            `${t('base.photo')} ${slide + 1}/${
              files.length > 0
                ? files.length
                : images.length > 0
                ? images.length
                : 0
            }`
          }}
        </q-toolbar-title>

        <q-btn flat round :icon="biPlus" @click="zoomIn" />
        <q-btn flat round :icon="biDash" @click="zoomOut" />
        <q-btn
          flat
          round
          :icon="biArrowLeft"
          :disable="slide == 0"
          @click="slide = slide - 1"
        />
        <q-btn
          flat
          round
          :icon="biArrowRight"
          :disable="slide == fileZise - 1"
          @click="slide = slide + 1"
        />

        <q-space />
        <q-btn flat round :icon="biThreeDotsVertical">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="download">
                <q-item-section avatar>
                  <q-icon :name="biDownload" />
                </q-item-section>
                <q-item-section> {{ t('base.download') }}</q-item-section>
              </q-item>
              <template
                v-if="
                  showDeleteImage &&
                  authenStore &&
                  authenStore.auth &&
                  (post || comment)
                "
              >
                <q-item clickable v-close-popup @click="deletePhoto">
                  <q-item-section avatar>
                    <q-icon :name="biTrash" />
                  </q-item-section>
                  <q-item-section> {{ t('base.delete') }}</q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat round :icon="biX" @click="onClose" />
      </q-toolbar>

      <div class="row items-center">
        <!-- <q-carousel
            swipeable
            animated
            arrows
            v-model="slide"
            v-model:fullscreen="fullscreen"
            dark
            style="height: 80vh"
          >
            <template v-if="files.length > 0">
              <q-carousel-slide
                v-for="(item, index) in files"
                :key="index"
                :name="index"
                class="column no-wrap flex-center"
              >
                 <q-img :src="item.filePath" fit="contain" class="slide-img" /> 
              </q-carousel-slide>
            </template>
            <template v-else-if="images.length > 0">
              <q-carousel-slide
                v-for="(img, index) in images"
                :key="index"
                :name="index"
                class="column no-wrap flex-center"
              >
                <q-img :src="img.image" fit="contain" class="slide-img" />
              </q-carousel-slide>
            </template>
          </q-carousel> -->
        <v-zoomer-gallery
          style="
            width: 100%;
            height: 85vh;
            background-color: black;
            cursor: pointer;
          "
          ref="vZoomerRef"
          :list="items"
          v-model="slide"
        >
        </v-zoomer-gallery>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { PropType, computed, ref, onMounted } from 'vue';
import { useLang } from '@/composables/useLang';
import {
  FileManagerDto,
  ImageDto,
  UserProfileDto,
  PostDataDto,
  CommentDataDto,
} from '@/types/models';
import {
  biX,
  biThreeDotsVertical,
  biDownload,
  biTrash,
  biPlus,
  biDash,
  biArrowLeft,
  biArrowRight,
} from '@quasar/extras/bootstrap-icons';
import { useAuthenStore } from '@/stores/authenStore';
import { useBase } from '@/composables/useBase';
import { downloadURI, generateimageFileName } from '@/utils/appUtil';
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
  showDeleteImage: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object as PropType<UserProfileDto>,
    default: () => null,
  },
  files: {
    type: Array as PropType<FileManagerDto[]>,
    default: () => [],
  },
  images: {
    type: Array as PropType<ImageDto[]>,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
  post: {
    type: Object as PropType<PostDataDto>,
    default: () => null,
  },
  comment: {
    type: Object as PropType<CommentDataDto>,
    default: () => null,
  },
});
const vZoomerRef = ref();
const authenStore = useAuthenStore();
const emit = defineEmits([
  'on-close',
  'update:showDialog',
  'on-before-hide',
  'on:delete',
]);
const { t } = useLang();
const { WeeConfirm } = useBase();
// const fullscreen = ref(false);
const slide = ref(0);
const items = ref<string[]>([]);
const leftArrowPressed = ref(false);
const rightArrowPressed = ref(false);
onMounted(() => {
  slide.value = props.selectedIndex;
  setList();
  document.addEventListener('keydown', handleKeyDown);
});
const show = computed({
  get: () => props.showDialog,
  set: (val) => emit('update:showDialog', val),
});
const handleKeyDown = (event: any) => {
  if (event.key === 'ArrowLeft') {
    leftArrowPressed.value = true;
    rightArrowPressed.value = false;
    if (slide.value > 0) {
      slide.value--;
    }
  } else if (event.key === 'ArrowRight') {
    leftArrowPressed.value = false;
    rightArrowPressed.value = true;
    if (slide.value < fileZise.value - 1) {
      slide.value++;
    }
  }
};
const onClose = () => {
  show.value = false;
  emit('on-close');
};
const fileZise = computed(() =>
  props.files && props.files.length
    ? props.files.length
    : props.images && props.images.length
    ? props.images.length
    : 0,
);
const setList = () => {
  const list = props.files;
  const images = props.images;
  if (list && list.length > 0) {
    for (const f of list) {
      items.value.push(f.filePath);
    }
  } else if (images && images.length > 0) {
    for (const img of images) {
      items.value.push(img.image);
    }
  }
};
const download = async () => {
  if (items.value.length > 0) {
    const f = items.value[slide.value];
    if (f) {
      downloadURI(f, generateimageFileName());
    }
  }
};
const deletePhoto = async () => {
  const confirm = await WeeConfirm(
    t('app.monogram'),
    t('base.deletePhotoConfirm'),
  );
  if (!confirm) {
    return;
  }
  emit('on:delete', slide.value);
};
const zoomIn = () => {
  if (vZoomerRef.value) {
    vZoomerRef.value.zoomIn();
  }
};
const zoomOut = () => {
  if (vZoomerRef.value) {
    vZoomerRef.value.zoomOut();
  }
};
</script>
<style lang="scss" scoped>
.slide-img {
  max-width: 960px;
}
</style>
