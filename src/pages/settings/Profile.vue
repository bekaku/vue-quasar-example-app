<template>
  <div class="q-pl-lg">
    <q-card square flat class="bg-transparent">
      <q-card-section>
        <div class="text-h6">{{ t('base.editPhoto') }}</div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <q-card class="shadow-up-5" v-if="authenStore.auth">
          <div :style="coverStle"></div>
          <div class="text-white absolute-right q-pa-md">
            <q-btn
              @click="onOpenCropperCover"
              round
              unelevated
              color="pink"
              :icon="biPencilFill"
            >
              <q-tooltip>{{ t('base.changeCover') }}</q-tooltip>
            </q-btn>
          </div>

          <div class="text-white absolute-center">
            <q-avatar size="120px" style="top: 75px" class="shadow-5">
              <q-img spinner-color="white" :src="authenStore.loginedAvatar" />
              <div class="absolute-bottom" style="top: 55px">
                <q-btn
                  @click="onOpenCropper"
                  round
                  :icon="biPencilFill"
                  color="pink"
                >
                  <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                </q-btn>
              </div>
            </q-avatar>
          </div>
        </q-card>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-h6 text-weight-bold q-mt-md">
          {{ authenStore.loginedDisplay }}
        </div>
        <div class="text-muted">{{ t('app.name') }}</div>
      </q-card-section>
    </q-card>
    <SettingPersonal />
  </div>
  <image-cropper
    :title="t('cropAvatar')"
    :dialog="dialog"
    @on-close="dialog = false"
    @on-okay="onOkay"
  />

  <image-cropper-cover
    :title="t('base.changeCover')"
    :dialog="dialogCover"
    @on-close="dialogCover = false"
    @on-okay="onUploadCover"
  />
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from 'stores/authenStore';
import { biPencilFill } from '@quasar/extras/bootstrap-icons';
import FileManagerService from '@/api/FileManagerService';
import UserService from '@/api/UserService';
import { useBase } from '@/composables/useBase';
import { useAppMeta } from '@/composables/useAppMeta';
import ImageCropper from '@/components/base/ImageCropper.vue';
import ImageCropperCover from '@/components/ImageCropperCover.vue';
const SettingPersonal = defineAsyncComponent(
  () => import('@/components/settings/SettingPersonal.vue'),
);
useAppMeta();
const { t } = useLang();
const { appLoading } = useBase();
const { uploadApi } = FileManagerService();
const { updateUserAvatar, updateUserCover } = UserService();
const authenStore = useAuthenStore();
const dialog = ref(false);
const dialogCover = ref(false);
const onOkay = async (f: any) => {
  appLoading();
  const response = await uploadApi(f);
  if (response && authenStore.auth && response.id) {
    //update avatar id to user
    await updateUserAvatar(response.id);
    //update user data in pinia store
    const authItem = authenStore.auth;
    if (authItem.avatar) {
      authItem.avatar.thumbnail = response.fileThumbnailPath;
      authItem.avatar.image = response.filePath;
    }
  }
  appLoading(false);
};
const onOpenCropper = () => {
  dialog.value = true;
};
const onOpenCropperCover = () => {
  dialogCover.value = true;
};
const onUploadCover = async (f: any) => {
  appLoading();
  const response = await uploadApi(f);
  if (response && authenStore.auth && response.id) {
    //update cover id to user
    await updateUserCover(response.id);
    //update user data in pinia store
    const authItem = authenStore.auth;
    authItem.cover = {
      thumbnail: response.fileThumbnailPath,
      image: response.filePath,
    };
  }
  appLoading(false);
};
const coverStle = computed(() => {
  return `height: 175px;
            background: url(${
              authenStore.loginedCover ? authenStore.loginedCover : '/cover.jpg'
            }), linear-gradient(to right, #000, #000);
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;`;
});
</script>
<style scoped></style>
