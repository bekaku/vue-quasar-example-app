<template>
  <q-page padding>
    <crud-api-list
      :icon="biShieldCheck"
      :title="t('model_permission')"
      :crud-name="crudName"
      :loading="loading"
      :frist-load="fristLoad"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="filteredList"
      show-search-text-box
      @on-item-click="onItemClick"
      @on-item-copy="onItemCopy"
      @on-page-no-change="onPageNoChange"
      @on-items-perpage-change="onItemPerPageChange"
      @on-sort="onSort"
      @on-sort-mode="onSortMode"
      @on-reload="onReload"
      @update-search="filterText = $event"
      @on-advance-search="onAdvanceSearch"
      @on-keyword-search="onKeywordSearch"
      @on-item-delete="onItemDelete"
      @on-new-form="onNewForm"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { useCrudList } from '@/composables/useCrudList';
import type { Permission } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import type { ICrudListHeader } from '@/types/common';
import { CrudListDataType, ICrudListHeaderOptionSearchType } from '@/types/common';
import CrudApiList from '@/components/base/CrudApiList.vue';
import { biShieldCheck } from '@quasar/extras/bootstrap-icons';
useAppMeta();
const { t } = useLang();
const headers = ref<ICrudListHeader[]>([
  {
    label: 'model_permission_id',
    column: 'id',
    type: CrudListDataType.NUMBER_FORMAT,
    options: {
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.NUMBER,
      searchModel: '',
      searchOperation: '=',
    },
  },
  {
    label: 'model_permission_name',
    column: 'code',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':',
    },
  },
  {
    label: 'model_permission_description',
    column: 'description',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
    },
  },
  {
    label: 'model_permission_frontEnd',
    column: 'frontEnd',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: false,
      searchOperation: '=',
    },
  },
  {
    label: 'base.tool',
    type: CrudListDataType.BASE_TOOL,
    options: {
      fillable: true,
      editButton: true,
      deleteButton: true,
      copyButton: true,
      align: 'center',
    },
  },
]);
const {
  loading,
  fristLoad,
  pages,
  sort,
  onPageNoChange,
  onItemPerPageChange,
  onSort,
  onSortMode,
  onReload,
  filteredList,
  filterText,
  onAdvanceSearch,
  onItemDelete,
  onNewForm,
  onItemClick,
  onItemCopy,
  crudName,
  onKeywordSearch,
} = useCrudList<Permission>(
  {
    crudName: 'permission',
    apiEndpoint: '/api',
    fetchListOnload: true,
    defaultSort: {
      column: 'code',
      mode: 'asc',
    },
  },
  headers,
);
// const crud = reactive(
//   useCrudApi<Permission>(
//     {
//       actionList: '/api/permission',
//       fetchListOnload: true,
//       defaultSort: {
//         column: 'code',
//         mode: 'asc',
//       },
//     },
//     headers
//   )
// );
onMounted(async () => {
  console.log('PermissionList onMounted');
});

// const mockItem = {
//   dataList: [
//     {
//       id: 1,
//       code: 'api_client_list',
//       remark: null,
//       description: 'Api client(รายการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 3,
//       code: 'api_client_manage',
//       remark: null,
//       description: 'Api client(จัดการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 2,
//       code: 'api_client_view',
//       remark: null,
//       description: 'Api client(ดูข้อมูล)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 16,
//       code: 'backend_login',
//       remark: null,
//       description: 'เข้าสู่ระบบ',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 13,
//       code: 'file_manager_list',
//       remark: null,
//       description: 'ไฟล์(รายการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 15,
//       code: 'file_manager_manage',
//       remark: null,
//       description: 'ไฟล์(จัดการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 14,
//       code: 'file_manager_view',
//       remark: null,
//       description: 'ไฟล์(ดูข้อมูล)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 25,
//       code: 'files_directory_list',
//       remark: null,
//       description: 'โฟลเดอร์ไฟล์(รายการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 27,
//       code: 'files_directory_manage',
//       remark: null,
//       description: 'โฟลเดอร์ไฟล์(จัดการ)',
//       operationType: 1,
//       frontEnd: false,
//     },
//     {
//       id: 26,
//       code: 'files_directory_view',
//       remark: null,
//       description: 'โฟลเดอร์ไฟล์(ดูข้อมูล)',
//       operationType: 1,
//       frontEnd: false,
//     },
//   ],
//   totalPages: 2,
//   totalElements: 20,
//   last: false,
// };
</script>
