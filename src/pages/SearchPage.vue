<template>
  <q-page padding>
    <q-card flat bordered class="content-limit">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            bottom-slots
            v-model="searchItem.q"
            :label="t('searchHelp')"
            clearable
            outlined
          >
            <template v-slot:append>
              <q-separator vertical class="q-mx-sm" />
              <q-btn
                color="primary"
                rounded
                flat
                :icon="biSearch"
                @click="onSubmit"
              ></q-btn>
            </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="row">
      <div class="col-12 col-md-3 q-pt-md">
        <q-card flat bordered>
          <q-item-label header>{{ t('searchType') }}</q-item-label>
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" :icon="biPeople" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('base.profile') }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-model="searchItem.profile"
                  @update:model-value="onSubmit"
                />
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" :icon="biPencil" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Posts</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-model="searchItem.post"
                  @update:model-value="onSubmit"
                />
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" :icon="biHash" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('base.hashtag') }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-model="searchItem.hashTag"
                  @update:model-value="onSubmit"
                />
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  :icon="biFileEarmarkText"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Comments</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-model="searchItem.theme"
                  @update:model-value="onSubmit"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-12 col-md-9 q-pt-md q-pl-md">
        <skeleton-item v-if="!fristLoaded" :items="3" show></skeleton-item>
        <template v-else-if="items.length > 0">
          <SearchItemComp
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :q="searchItem.q"
          >
          </SearchItemComp>

          <base-loadmore
            v-if="!isInfiniteDisabled"
            :frist-loaded="fristLoaded"
            :is-infinite-disabled="isInfiniteDisabled"
            :label="t('base.loadMore')"
            @on-next-page="loadNextPage"
            button
            show-icon
            full-width
          >
          </base-loadmore>
        </template>
        <template v-else>
          <app-result
            status="empty"
            :description="t('error.dataNotfound')"
          ></app-result>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
import { SearchItem, ISearch } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import SearchService from '@/api/SearchService';
import {
  biSearch,
  biPeople,
  biPencil,
  biHash,
  biFileEarmarkText,
} from '@quasar/extras/bootstrap-icons';
const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue'),
);
const BaseLoadmore = defineAsyncComponent(
  () => import('@/components/base/BaseLoadmore.vue'),
);
const SkeletonItem = defineAsyncComponent(
  () => import('@/components/skeleton/SkeletonItem.vue'),
);
const SearchItemComp = defineAsyncComponent(
  () => import('@/components/search/SearchItem.vue'),
);
const { searchApi } = SearchService();
const { t } = useLang();
const { getQuery, onReplaceUrl } = useBase();
const { setTitle } = useAppMeta();
const items = ref<ISearch[]>([] as ISearch[]);
const isInfiniteDisabled = ref(false);
const currentPage = ref(1);
const currentPageSize = ref(10);
const fristLoaded = ref(false);
const loading = ref(false);
const searchItem = ref<SearchItem>({
  q: '',
  post: true,
  hashTag: true,
  profile: true,
  theme: true,
});
onMounted(async () => {
  await initSearch();
  setTitle(
    `${searchItem.value.q ? searchItem.value.q : '-'} | ${t('base.search')}`,
  );
  onReloadSerach();
});
const initSearch = () => {
  return new Promise((resolve) => {
    const q = getQuery('q');
    const qPost = getQuery('q_post');
    const qProfile = getQuery('q_profile');
    const qHashtag = getQuery('q_hashtag');
    const qTheme = getQuery('q_theme');
    searchItem.value.q = q;
    searchItem.value.profile = qProfile && qProfile == 'true' ? true : false;
    searchItem.value.hashTag = qHashtag && qHashtag == 'true' ? true : false;
    searchItem.value.post = qPost && qPost == 'true' ? true : false;
    searchItem.value.theme = qTheme && qTheme == 'true' ? true : false;
    resolve(true);
  });
};
const param = computed(() =>
  !searchItem.value.q
    ? undefined
    : `_q=${encodeURIComponent(searchItem.value.q)}&q_profile=${
        searchItem.value.profile ? 'true' : 'false'
      }&q_post=${searchItem.value.post ? 'true' : 'false'}&q_hashtag=${
        searchItem.value.hashTag ? 'true' : 'false'
      }&q_theme=${searchItem.value.theme ? 'true' : 'false'}`,
);
const onSubmit = async () => {
  if (searchItem.value.q && searchItem.value.q.length >= 3) {
    onReloadSerach();
  }
};
const onReloadSerach = async () => {
  isInfiniteDisabled.value = false;
  fristLoaded.value = false;
  currentPage.value = 1;
  items.value = [];
  onReplaceSearchUrl();
  await fetchSearching();
};
const fetchSearching = async () => {
  if (!searchItem.value || !searchItem.value.q) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  if (!param.value) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  loading.value = true;
  const res = await searchApi(
    currentPage.value,
    currentPageSize.value,
    param.value,
  );
  if (res) {
    items.value.push(...res);
    if (res.length < currentPageSize.value) {
      isInfiniteDisabled.value = true;
    }
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  loading.value = false;
  return new Promise((resolve) => {
    resolve(true);
  });
};
const loadNextPage = async () => {
  currentPage.value++;
  await fetchSearching();
};
const onReplaceSearchUrl = () => {
  let q = `q=${searchItem.value.q}&q_profile=${
    searchItem.value.profile ? 'true' : 'false'
  }&q_post=${searchItem.value.post ? 'true' : 'false'}&q_hashtag=${
    searchItem.value.hashTag ? 'true' : 'false'
  }&q_theme=${searchItem.value.theme ? 'true' : 'false'}`;

  onReplaceUrl(`/search?${q}`);
};
</script>
