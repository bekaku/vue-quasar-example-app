<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { usePagefecth } from '@/composables/usePageFetch';
import { Permission } from '@/types/models.ts';
import { defineAsyncComponent, onMounted } from 'vue';
import BaseScrollArea from '@/components/base/BaseScrollArea.vue';

const Paging = defineAsyncComponent(
  () => import('@/components/base/Paging.vue'),
);
const BaseSpinner = defineAsyncComponent(
  () => import('@/components/base/BaseSpinner.vue'),
);
const BaseResult = defineAsyncComponent(
  () => import('@/components/base/BaseResult.vue'),
);
const BaseLoadmore = defineAsyncComponent(
  () => import('@/components/base/BaseLoadmore.vue'),
);
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Use pagefecth | ${t('app.name')}`);

const {
  firstLoaded,
  pages,
  dataList,
  loadData,
  onPageChange,
  onPerPageChange,
} = usePagefecth<Permission>({
  urlEndpoint: '/api/permission',
  defaultSort: { column: 'id', mode: 'desc' },
  itemsPerPage: 4,
});

const {
  isInfiniteDisabled,
  loading,
  firstLoaded: firstLoaded2,
  dataList: dataList2,
  loadData: loadData2,
  onNextPage,
} = usePagefecth<Permission>({
  urlEndpoint: '/api/permission',
  defaultSort: { column: 'id', mode: 'desc' },
  itemsPerPage: 4,
  concatList: true,
});
onMounted(() => {
  loadData();
  loadData2();
});
</script>
<template>
  <q-page padding>
    <q-card flat bordered class="content-limit">
      <q-card-section>
        <q-toolbar>
          <q-toolbar-title> Use pagefecth</q-toolbar-title>
          <q-space />
        </q-toolbar>
        <q-separator />
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="text-h5 q-ma-sm">Paging</div>
            <template v-if="!firstLoaded">
              <base-spinner></base-spinner>
            </template>
            <template v-else>
              <base-result
                v-if="dataList.length === 0"
                status="empty"
                :description="t('error.dataNotfound')"
              />
              <template v-else>
                <q-list>
                  <q-item
                    v-for="(item, index) in dataList"
                    :key="`${index}-${item.id}`"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ item.description }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ item.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <Paging
                  v-model="pages"
                  :boundary-numbers="false"
                  @update:current="onPageChange"
                  @update:per-page="onPerPageChange"
                ></Paging>
              </template>
            </template>
          </q-card-section>
        </q-card>

        <q-card class="q-my-md">
          <q-card-section>
            <div class="text-h5 q-ma-sm">Loadmore</div>
            <template v-if="!firstLoaded2">
              <base-spinner></base-spinner>
            </template>
            <template v-else>
              <base-result
                v-if="dataList2.length === 0"
                status="empty"
                :description="t('error.dataNotfound')"
              />
              <template v-else>
                <base-scroll-area height="250px">
                  <q-list>
                    <q-item
                      v-for="(item2, index2) in dataList2"
                      :key="`${index2}-${item2.id}`"
                    >
                      <q-item-section side>
                        {{index2+1}}
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ item2.description }}
                        </q-item-label>
                        <q-item-label caption>
                          {{ item2.code }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </base-scroll-area>
                <base-loadmore
                  v-if="!isInfiniteDisabled"
                  :loading="loading"
                  :frist-loaded="firstLoaded2"
                  :is-infinite-disabled="isInfiniteDisabled"
                  :label="t('base.loadMore')"
                  @on-next-page="onNextPage"
                  button
                  show-icon
                  full-width
                >
                </base-loadmore>
              </template>
            </template>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<style lang="scss" scoped></style>
