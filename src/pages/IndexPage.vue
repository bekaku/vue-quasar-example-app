<template>
  <q-page>
    <div ref="indexPageTopRef"></div>
    <q-scroll-observer @scroll="onScroll" />
    <div class="row">
      <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
        <div class="row justify-end">
          <feed-left class="fixed" />
        </div>
      </div>
      <div class="col-12 col-md-6 app-feed-page">
        <q-infinite-scroll
          ref="homeInfinityScroll"
          @load="loadNextPage"
          :offset="250"
        >
          <!-- <q-card v-if="!$q.screen.gt.sm" flat bordered class="q-mb-md">
        <profile-card
          :avatar-image="authenStore.loginedAvatar"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          description="Software Engineer"
          height="100px"
          avatar-top="50px"
          avatar-size="65px"
          descriptionStyle="margin-top:25px"
          show-medal
        />
      </q-card> -->
          <q-no-ssr>
            <feed-statistic />
          </q-no-ssr>
          <feed-post-area v-if="fristLoaded" />
          <feed-sort
            :model-value="sortType"
            :sort-top-type="topType"
            @update:modelValue="(type: FeedSortType) => onSortType(type)"
            @update:sortTopTime="(time: FeedSortTopType) => onSortTopTime(time)"
          ></feed-sort>

          <skeleton-post
            v-if="!fristLoaded"
            :show="true"
            :items="5"
          ></skeleton-post>
          <template v-else>
            <template v-if="posts.length > 0">
              <post-item
                v-for="(item, index) in posts"
                :key="`feed-post-${item.id}`"
                :item-key="`feed-post-${item.id}`"
                :post="item"
                :index="index"
                :show-action-comment="false"
                :time-distace-format="true"
                show-action-share
                show-action-comment-box
              ></post-item>
            </template>
            <template v-else>
              <app-result status="empty" :description="t('postDataNotfound')" />
            </template>
          </template>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
      <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
        <feed-right class="fixed" />
      </div>
    </div>

    <q-page-sticky
      v-if="showGotTopBtn"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab :icon="biArrowUp" @click="goToTop" color="primary">
        <q-tooltip>{{ t('base.toTop') }}</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <app-dialog
      v-if="showSetting"
      :model-value="showSetting"
      :full-width="false"
      :full-height="false"
      :title="t('app.name')"
      @on-close="showSetting = false"
      @on-hide="showSetting = false"
      :persistent="true"
      transition-show="fade"
      transition-hide="fade"
      dialog-style="min-width:550px"
    >
      <Suspense>
        <template #default>
          <SettingPersonal @on-finish="showSetting = false" />
        </template>
        <template #fallback>
          <div class="text-center">
            <q-spinner-dots color="primary" size="2em" />
          </div>
        </template>
      </Suspense>
    </app-dialog>
  </q-page>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  defineAsyncComponent,
  onBeforeUnmount,
} from 'vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { PostDataDto, FeedSortType, FeedSortTopType } from '@/types/models';

import PostDataService from '@/api/PostDataService';
import { useNewPostStore } from '@/stores/newPostStore';
import { useAuthenStore } from '@/stores/authenStore';
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
import { biArrowUp } from '@quasar/extras/bootstrap-icons';
// component
// import AppDialog from '@/components/base/AppDialog.vue';
const AppDialog = defineAsyncComponent(
  () => import('@/components/base/AppDialog.vue'),
);
const FeedPostArea = defineAsyncComponent(
  () => import('@/components/feed/FeedPostArea.vue'),
);
const PostItem = defineAsyncComponent(
  () => import('@/components/post/PostItem.vue'),
);
const SkeletonPost = defineAsyncComponent(
  () => import('@/components/skeleton/SkeletonPost.vue'),
);
const FeedSort = defineAsyncComponent(
  () => import('@/components/feed/FeedSort.vue'),
);
const FeedRight = defineAsyncComponent(
  () => import('@/components/feed/FeedRight.vue'),
);
const FeedLeft = defineAsyncComponent(
  () => import('@/components/feed/FeedLeft.vue'),
);
const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue'),
);
const FeedStatistic = defineAsyncComponent(
  () => import('@/components/feed/FeedStatistic.vue'),
);
const SettingPersonal = defineAsyncComponent(
  () => import('@/components/settings/SettingPersonal.vue'),
);
useAppMeta();
const authenStore = useAuthenStore();
const newPostStore = useNewPostStore();
const { findAllFeedPost } = PostDataService();
const { t } = useLang();
const { scrollToTop } = useBase();
const posts = ref<PostDataDto[]>([] as PostDataDto[]);
const isInfiniteDisabled = ref(false);
const currentPage = ref(1);
const currentPageSize = ref(5);

const sortType = ref<FeedSortType>('NEW_POST');
const topType = ref<FeedSortTopType>('TODAY');
const fristLoaded = ref(false);
const homeInfinityScroll = ref();
const timeOutRef = ref<any>();
const indexPageTopRef = ref();
const showGotTopBtn = ref(false);
const showSetting = ref(false);
const fetchData = async () => {
  const items = await findAllFeedPost(
    currentPage.value,
    currentPageSize.value,
    sortType.value,
    topType.value,
  );
  if (items) {
    if (items.length > 0) {
      posts.value.push(...items);
    }
    if (items.length == 0) {
      stopInfinityScroll();
    }
  } else {
    stopInfinityScroll();
  }

  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  return new Promise((resolve) => {
    resolve(true);
  });
};
const stopInfinityScroll = () => {
  if (homeInfinityScroll.value) {
    homeInfinityScroll.value.stop();
  }
};
const resumeInfinityScroll = () => {
  if (homeInfinityScroll.value) {
    homeInfinityScroll.value.resume();
  }
};
onMounted(async () => {
  //check initial config
  if (authenStore && authenStore.auth && authenStore.auth.userData) {
    if (!authenStore.auth.userData.initialConfig) {
      showSetting.value = true;
    }
  }
  await fetchData();
});
const onRefresh = async () => {
  currentPage.value = 1;
  posts.value = [];
  isInfiniteDisabled.value = false;
  fristLoaded.value = false;
  resumeInfinityScroll();
  await fetchData();
  return new Promise((resolve) => {
    resolve(true);
  });
};
const loadNextPage = async (index: number, done: any) => {
  if (fristLoaded.value) {
    currentPage.value++;
    await fetchData();
  }

  done();
};
const onSortType = async (t: FeedSortType) => {
  sortType.value = t;

  timeOutRef.value = setTimeout(() => {
    onRefresh();
  }, 50);
};
const onSortTopTime = async (t: FeedSortTopType) => {
  topType.value = t;
  timeOutRef.value = setTimeout(() => {
    onRefresh();
  }, 300);
};
const onPostFinish = (p: PostDataDto) => {
  if (p) {
    posts.value.unshift(p);
    // posts.value = [p, ...posts.value];
  }
};
const goToTop = () => {
  if (indexPageTopRef.value) {
    scrollToTop(indexPageTopRef.value);
  }
};
const onScroll = (info: any) => {
  if (info && info.position && info.position.top > 100) {
    showGotTopBtn.value = true;
  } else {
    showGotTopBtn.value = false;
  }
};
watch(newPostStore, (state) => {
  if (state.newPost) {
    onPostFinish(state.newPost);
    state.clearNewPost();
  }
});
const clearTo = () => {
  if (timeOutRef.value) {
    clearTimeout(timeOutRef.value);
    timeOutRef.value = null;
  }
};
onBeforeUnmount(() => {
  clearTo();
});
</script>
