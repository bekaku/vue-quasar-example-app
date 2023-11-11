<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card flat bordered class="content-limit">
          <q-card-section> </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { usePaging } from '@/composables/usePaging';
import { useSort } from '@/composables/useSort';
import { Permission } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import PermissionService from '@/api/PermissionService';
import { biArrowLeft, biPlus } from '@quasar/extras/bootstrap-icons';
const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue'),
);
const BaseLoadmore = defineAsyncComponent(
  () => import('@/components/BaseLoadmore.vue'),
);
const BaseSpinner = defineAsyncComponent(
  () => import('@/components/base/BaseSpinner.vue'),
);
const { t } = useLang();
const { pages, resetPaging } = usePaging(5);
const { sort } = useSort({
  column: 'id',
  mode: 'desc',
});

const { setTitle } = useAppMeta();
setTitle(`${t('model_files_manager')} | ${t('app.name')}`);
const { findAll } = PermissionService();
const isInfiniteDisabled = ref(false);
const fristLoaded = ref(false);
const loading = ref(false);

// const reponseItem = ref<IApiListResponse<Permission>>();
const items = ref<Permission[]>([]);

const pageParam = computed(
  () =>
    `?page=${pages.value.current > 0 ? pages.value.current - 1 : 0}&size=${
      pages.value.itemsPerPage
    }&sort=${sort.value.column},${sort.value.mode}`,
);
onMounted(async () => {
  loadData();
});
const resetData = () => {
  resetPaging();
  items.value = [];
  fristLoaded.value = false;
  isInfiniteDisabled.value = false;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const doRefresh = async (event: any) => {
  resetData();
  await loadData();
  if (event) {
    event.target.complete();
  }
};
const loadData = async () => {
  const res = await findAll(pageParam.value);
  console.log('findAll', res);
  if (res) {
    items.value.push(...res.dataList);
    if (res.last || res.totalElements == 0) {
      isInfiniteDisabled.value = true;
    }
  } else {
    isInfiniteDisabled.value = true;
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  return new Promise((resolve) => {
    resolve(true);
  });
};
const loadNextPage = async () => {
  pages.value.current++;
  loading.value = true;
  await loadData();
  loading.value = false;
};
</script>
