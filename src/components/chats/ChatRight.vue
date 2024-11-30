<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import {
  biArrowRight,
  biBoxArrowRight,
  biCameraVideo,
  biChevronRight,
  biTelephone,
  biThreeDots,
  biVolumeUp
} from '@quasar/extras/bootstrap-icons';
import BaseAvatar from '@/components/base/BaseAvatar.vue';

const BaseResult = defineAsyncComponent(
  () => import('@/components/base/BaseResult.vue')
);
const BaseLoadmore = defineAsyncComponent(
  () => import('@/components/base/BaseLoadmore.vue')
);
const BaseSpinner = defineAsyncComponent(
  () => import('@/components/base/BaseSpinner.vue')
);
const { t } = useLang();
const props = withDefaults(
  defineProps<{
    height?: number;
    autofocus?: boolean;
  }>(),
  {
    height: 450,
    autofocus: false
  }
);
const midiaTab = ref<'MEDIA' | 'DOCS'>('MEDIA');
const notification = ref(true);
onMounted(async () => {
});
const onHMidiaTabChange = (event: any) => {
  console.log('onHMidiaTabChange', event);
};
</script>
<template>
  <q-card v-bind="$attrs" flat class="">
    <q-scroll-area style="height: 90vh;" content-active-style="width: 100%;" content-style="width: 100%;">
      <q-card-section class="text-center">
        <base-avatar :fetch-image="false" src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
          rounded size="75px">
        </base-avatar>
        <div class="text-subtitle1 text-weight-bold q-pt-sm">
          PrimeTek
        </div>
        <div class="text-caption text-muted">
          @primetek
        </div>
        <div class="row justify-center">
          <q-btn flat round :icon="biTelephone" size="sm" />
          <q-btn flat round :icon="biCameraVideo" size="sm" />
          <q-btn flat round :icon="biBoxArrowRight" size="sm" />
          <q-btn flat round :icon="biThreeDots" size="sm" />
        </div>
      </q-card-section>
      <q-list dense>
        <q-item>
          <q-item-section avatar>
            <q-icon :name="biVolumeUp" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notification</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="notification" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              Members(99)
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat label="See All" no-caps class="text-weight-bold q-text-black" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png">
            </base-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Robin Jonas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg">
            </base-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Cameron Williamson</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png">
            </base-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Eleanor Pena</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png">
            </base-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Arlene McCoy</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-tabs class="q-my-sm" dense v-model="midiaTab" inline-label @update:model-value="onHMidiaTabChange">
        <q-tab name="MEDIA" :label="t('chats.media')" class="text-capitalize">
        </q-tab>
        <q-tab name="DOCS" :label="t('chats.files')" class="text-capitalize">
        </q-tab>
      </q-tabs>
      <q-tab-panels v-model="midiaTab" keep-alive>
        <q-tab-panel name="MEDIA">
          <div class="row">
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image1.png"></q-img>
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image2.png"></q-img>
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image3.png"></q-img>
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image4.png"></q-img>
            </div>
            <div class="col-4 q-pa-sm cursor-pointer ">
              <q-img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image5.png"></q-img>
            </div>
            <div class="col-4 q-pa-sm">
              <div v-ripple
                class="text-subtitle1 full-height row items-center justify-center  relative-position q-hoverable cursor-pointer app-border-radius"
                :class="$q.dark.isActive ? 'bg-grey-8' : 'bg-grey-3'">
                <span class="q-focus-helper"></span>
                <div>99+</div>
              </div>
            </div>
          </div>

          <q-btn class="full-width q-mt-md" label="See more" outline :icon-right="biArrowRight" />
        </q-tab-panel>
        <q-tab-panel name="DOCS" style="min-height: 350px">
          DOCS
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-card>
</template>
