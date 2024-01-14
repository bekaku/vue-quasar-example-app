<template>
  <div class="row wee-container-responsive-center">
    <div class="col">
      <q-card flat bordered>
        <slot name="headerCard"> </slot>

        <template v-if="!fristLoad || loading">
          <skeleton-table></skeleton-table>
        </template>
        <template v-else>
          <q-card-section>
            <q-toolbar>
              <q-toolbar-title>
                <template v-if="title">
                  <q-icon :name="icon" /> {{ title }}
                </template>
              </q-toolbar-title>
              <q-input
                v-if="showSearchBtn"
                dense
                outlined
                rounded
                style="width: 350px"
                v-model="filterText"
                :placeholder="t('base.searchThisPage')"
                @update:model-value="updateSearchText"
              >
                <!-- @update:model-value="updateSearchText" -->
                <template v-slot:prepend>
                  <q-icon :name="biSearch" />
                </template>
              </q-input>
              <q-btn
                v-if="isHaveManagePermission && showNewBtn"
                class="q-ml-xs"
                flat
                round
                :icon="biPlus"
                @click="$emit('on-new-form')"
              >
                <q-tooltip>{{ t('base.addNew') }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="showSearchBtn"
                class="q-ml-xs"
                flat
                round
                :icon="biSearch"
                @click="showSearch = !showSearch"
              >
                <q-tooltip>{{ t('base.searchAdvance') }}</q-tooltip>
              </q-btn>
              <app-sort
                :sort="sort"
                :fields="sortableHeaders"
                @on-sort-column="$emit('on-sort', $event)"
                @on-sort-mode="$emit('on-sort-mode', $event)"
              />

              <crud-api-list-header-filter :headers="headers" />

              <q-btn flat round dense :icon="biThreeDotsVertical">
                <q-menu>
                  <q-list style="min-width: 200px" dense>
                    <q-item
                      v-if="isHaveManagePermission && showNewBtn"
                      clickable
                      @click="$emit('on-new-form')"
                      v-close-popup
                    >
                      <q-item-section avatar>
                        <q-icon :name="biPlus" />
                      </q-item-section>
                      <q-item-section>{{ t('base.addNew') }}</q-item-section>
                    </q-item>
                    <q-item
                      v-if="isHaveManagePermission && showCheckbox"
                      clickable
                      @click="onDeleteItemSelected"
                      v-close-popup
                    >
                      <q-item-section avatar>
                        <q-icon :name="biTrash" />
                      </q-item-section>
                      <q-item-section>{{
                        t('base.deleteSeleted')
                      }}</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="showSearch = true">
                      <q-item-section avatar>
                        <q-icon :name="biSearch" />
                      </q-item-section>
                      <q-item-section>{{
                        t('base.searchAdvance')
                      }}</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="$emit('on-reload')" v-close-popup>
                      <q-item-section avatar>
                        <q-icon :name="biArrowClockwise" />
                      </q-item-section>
                      <q-item-section>{{ t('base.reload') }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-toolbar>
            <slot name="extraToolbar"> </slot>
          </q-card-section>

          <q-card-section v-if="showSearch" class="q-mb-lg">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6">
                  {{ t('base.searchAdvance') }}
                </div>
              </q-card-section>
              <q-form @submit="onAdvanceSearch" class="q-pa-md">
                <template v-if="searchableHeaders.length > 0">
                  <div class="row">
                    <template
                      v-for="(searchCol, searchIndex) in searchableHeaders"
                      :key="`advance-search-${searchIndex}`"
                    >
                      <div
                        v-if="searchCol.options"
                        class="col-12 col-md-6 q-pa-sm"
                      >
                        <div class="q-gutter-md row items-center">
                          <!-- <div class="text-subtitle2">
                            {{ t(searchCol.label) }}
                          </div> -->
                          <q-select
                            dense
                            filled
                            :label="t(searchCol.label)"
                            class="q-mx-lg"
                            v-model="searchCol.options.searchOperation"
                            :options="searchOperations"
                            option-value="value"
                            option-label="text"
                            emit-value
                            map-options
                            :readonly="
                              searchCol.options.searchOperationReadonly
                            "
                            style="min-width: 150px"
                          />
                          <template
                            v-if="
                              searchCol.options?.searchType ==
                              ICrudListHeaderOptionSearchType.TEXT
                            "
                          >
                            <q-input
                              outlined
                              dense
                              v-model="searchCol.options.searchModel"
                              type="text"
                              :label="t(searchCol.label)"
                              clearable
                            >
                            </q-input>
                          </template>
                          <template
                            v-else-if="
                              searchCol.options?.searchType ==
                              ICrudListHeaderOptionSearchType.BOOLEAN
                            "
                          >
                            <form-togle
                              :title="t(searchCol.label)"
                              :model-value="searchCol.options.searchModel"
                              @update:modelValue="
                                (newValue: any) =>
                                  (searchCol.options.searchModel = newValue)
                              "
                            />
                          </template>
                          <template
                            v-else-if="
                              searchCol.options?.searchType ==
                              ICrudListHeaderOptionSearchType.NUMBER
                            "
                          >
                            <q-input
                              outlined
                              dense
                              v-model="searchCol.options.searchModel"
                              type="number"
                              :label="t(searchCol.label)"
                            >
                            </q-input>
                          </template>
                          <template
                            v-else-if="
                              searchCol.options?.searchType ==
                              ICrudListHeaderOptionSearchType.DATE
                            "
                          >
                            <template
                              v-if="searchCol.options.searchModel != undefined"
                            >
                              <date-picker
                                dense
                                :modelValue="searchCol.options.searchModel"
                                @update:modelValue="
                                  (newValue) =>
                                    (searchCol.options.searchModel = newValue)
                                "
                                :title="t(searchCol.label)"
                              />
                            </template>
                          </template>
                        </div>
                      </div>
                    </template>
                  </div>
                  <q-separator />
                  <q-card-actions align="center">
                    <q-btn type="submit" flat :icon="biSearch">{{
                      t('base.okay')
                    }}</q-btn>
                    <q-btn flat :icon="biX" @click="showSearch = false">{{
                      t('base.close')
                    }}</q-btn>
                  </q-card-actions>
                </template>
              </q-form>
            </q-card>
          </q-card-section>
          <!-- <q-markup-table v-if="list.length > 0" separator="cell" flat bordered> -->
          <q-markup-table v-if="list.length > 0" separator="cell" flat bordered>
            <thead>
              <slot name="theader">
                <tr>
                  <th v-if="isHaveManagePermission && showCheckbox">
                    <q-checkbox v-model="selectedAll" @click="onCheckedAll">
                      <q-tooltip>
                        {{
                          !selectedAll
                            ? t('base.selectAll')
                            : t('base.deselectAll')
                        }}
                      </q-tooltip>
                    </q-checkbox>
                  </th>
                  <template
                    v-for="(tblHeader, tblIndex) in fillableHeaders"
                    :key="`tblHeader-${tblIndex}`"
                  >
                    <template
                      v-if="tblHeader.type === CrudListDataType.BASE_TOOL"
                    >
                      <th v-if="isHaveManagePermission || isHaveViewPermission">
                        {{ t(tblHeader.label) }}
                      </th>
                    </template>
                    <th v-else>
                      <template
                        v-if="tblHeader.options && tblHeader.options.sortable"
                      >
                        <q-btn
                          @click="
                            $emit(
                              'on-sort',
                              tblHeader.options.sortColunm
                                ? tblHeader.options.sortColunm
                                : tblHeader.column,
                            )
                          "
                          flat
                        >
                          <template
                            v-if="
                              sort.column == tblHeader.options.sortColunm ||
                              sort.column == tblHeader.column
                            "
                          >
                            <q-icon
                              :name="
                                sort.mode == 'desc'
                                  ? biSortAlphaUpAlt
                                  : biSortAlphaDown
                              "
                            ></q-icon>
                          </template>

                          {{ t(tblHeader.label) }}
                        </q-btn>
                      </template>
                      <template v-else>
                        {{ t(tblHeader.label) }}
                      </template>
                    </th>
                  </template>
                </tr>
              </slot>
            </thead>
            <tbody>
              <slot name="tbody" v-bind="{ list, fillableHeaders }">
                <tr v-for="(item, index) in list" :key="`item-tr-${index}`">
                  <td
                    v-if="isHaveManagePermission && showCheckbox"
                    class="text-center"
                  >
                    <q-checkbox v-model="selected" :val="item.id"></q-checkbox>
                  </td>

                  <template
                    v-for="(fillable, bodyIndex) in fillableHeaders"
                    :key="`item-body-${bodyIndex}`"
                  >
                    <template v-if="fillable.options">
                      <template
                        v-if="fillable.type === CrudListDataType.BASE_TOOL"
                      >
                        <td class="text-center">
                          <slot
                            name="baseTool"
                            v-bind="{ item: item, index: index }"
                          >
                            <template
                              v-if="
                                isHaveManagePermission || isHaveViewPermission
                              "
                            >
                              <template
                                v-if="
                                  fillable.options &&
                                  fillable.options.editButton
                                "
                              >
                                <q-btn
                                  v-if="
                                    isHaveManagePermission ||
                                    isHaveViewPermission
                                  "
                                  @click="$emit('on-item-click', index)"
                                  color="primary"
                                  :icon="
                                    isHaveManagePermission ? biPencil : biEye
                                  "
                                  flat
                                  round
                                >
                                  <q-tooltip>
                                    {{
                                      isHaveManagePermission
                                        ? t('base.edit')
                                        : t('base.view')
                                    }}
                                  </q-tooltip>
                                </q-btn>
                              </template>

                              <template
                                v-if="
                                  fillable.options &&
                                  fillable.options.copyButton
                                "
                              >
                                <q-btn
                                  v-if="isHaveManagePermission"
                                  @click="$emit('on-item-copy', index)"
                                  color="primary"
                                  class="q-ml-sm"
                                  :icon="biClipboard"
                                  flat
                                  round
                                >
                                  <q-tooltip>
                                    {{ t('base.copy') }}
                                  </q-tooltip>
                                </q-btn>
                              </template>

                              <template
                                v-if="
                                  fillable.options &&
                                  fillable.options.deleteButton
                                "
                              >
                                <q-btn
                                  v-if="isHaveManagePermission"
                                  @click="onItemDelete(index, true)"
                                  color="negative"
                                  class="q-ml-sm"
                                  :icon="biTrash"
                                  flat
                                  round
                                >
                                  <q-tooltip class="bg-negative">
                                    {{ t('base.delete') }}
                                  </q-tooltip>
                                </q-btn>
                              </template>
                            </template>
                          </slot>
                          <slot
                            name="additionalBaseTool"
                            v-bind="{ item: item, index: index }"
                          >
                          </slot>
                        </td>
                      </template>
                      <td
                        v-else
                        :class="{
                          'text-center':
                            fillable.options &&
                            fillable.options.align == 'center',
                          'text-left':
                            fillable.options &&
                            fillable.options.align == 'left',
                          'text-right':
                            fillable.options &&
                            fillable.options.align == 'right',
                          'long-text-break':
                            fillable.options && fillable.options.maxWidth,
                        }"
                        :style="{
                          maxWidth:
                            fillable.options && fillable.options.maxWidth
                              ? fillable.options.maxWidth
                              : '',
                        }"
                      >
                        <template
                          v-if="fillable.type === CrudListDataType.TEXT"
                        >
                          <template
                            v-if="fillable.options && fillable.options.toolTip"
                          >
                            <span>
                              {{
                                fillable.column
                                  ? getValueByColunm(fillable.column, index)
                                  : ''
                              }}
                              <q-tooltip>
                                {{
                                  fillable.column
                                    ? getValueByColunm(fillable.column, index)
                                    : ''
                                }}
                              </q-tooltip>
                            </span>
                          </template>
                          <template v-else>
                            {{
                              fillable.column
                                ? getValueByColunm(fillable.column, index)
                                : ''
                            }}
                          </template>
                        </template>
                        <template
                          v-else-if="
                            fillable.type === CrudListDataType.FUNCTION &&
                            fillable.options &&
                            fillable.options.func
                          "
                        >
                          <template
                            v-if="
                              fillable.column &&
                              getValueByColunm(fillable.column, index) !=
                                undefined
                            "
                          >
                            {{
                              fillable.options.func(
                                getValueByColunm(fillable.column, index),
                              )
                            }}
                          </template>
                        </template>
                        <template
                          v-else-if="
                            fillable.type === CrudListDataType.NUMBER_FORMAT
                          "
                        >
                          {{
                            fillable.column
                              ? getValueByColunm(
                                  fillable.column,
                                  index,
                                ).toLocaleString()
                              : ''
                          }}
                        </template>
                        <template
                          v-else-if="fillable.type === CrudListDataType.DATE"
                        >
                          {{
                            fillable.column
                              ? dateForMat(
                                  getValueByColunm(fillable.column, index),
                                )
                              : ''
                          }}
                        </template>
                        <template
                          v-else-if="
                            fillable.type === CrudListDataType.DATE_TIME
                          "
                        >
                          {{
                            fillable.column
                              ? datetimeForMat(
                                  getValueByColunm(fillable.column, index),
                                )
                              : ''
                          }}
                        </template>
                        <template
                          v-else-if="fillable.type === CrudListDataType.STATUS"
                        >
                          <q-icon
                            size="sm"
                            :color="
                              fillable.column &&
                              getValueBoolean(fillable.column, index)
                                ? 'positive'
                                : 'grey-4'
                            "
                            :name="biCheckCircle"
                          ></q-icon>
                        </template>
                        <template
                          v-else-if="fillable.type === CrudListDataType.AVATAR"
                        >
                          <q-avatar
                            v-if="
                              fillable.column &&
                              getValueByColunm(fillable.column, index)
                            "
                            :rounded="fillable.options.rounded"
                            :square="fillable.options.square"
                            :size="
                              fillable.options.size
                                ? fillable.options.size
                                : '36px'
                            "
                          >
                            <q-img
                              v-if="
                                fillable.column &&
                                getValueByColunm(fillable.column, index)
                              "
                              :src="getValueByColunm(fillable.column, index)"
                              :alt="'item-img-' + bodyIndex"
                              :ratio="1"
                            />
                            <img
                              v-else
                              src="/avatar_default.png"
                              :alt="'item-img-' + bodyIndex"
                            />
                          </q-avatar>
                        </template>
                        <template
                          v-else-if="fillable.type === CrudListDataType.IMAGE"
                        >
                          <q-img
                            v-if="
                              fillable.column &&
                              getValueByColunm(fillable.column, index)
                            "
                            :src="getValueByColunm(fillable.column, index)"
                            spinner-color="white"
                            class="bg-grey-8"
                            :ratio="4 / 3"
                            :style="
                              fillable.options.size
                                ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                : 'width:55px;height:55px'
                            "
                          />
                          <q-img
                            v-else
                            src="/images/no_picture_thumb.jpg"
                            spinner-color="white"
                            class="bg-grey-8"
                            :ratio="4 / 3"
                            :style="
                              fillable.options.size
                                ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                : 'width:55px;height:55px'
                            "
                          />
                        </template>
                        <template
                          v-else-if="fillable.type === CrudListDataType.ICON"
                        >
                          <q-icon
                            v-if="fillable.column"
                            :name="getValueByColunm(fillable.column, index)"
                          ></q-icon>
                        </template>
                      </td>
                    </template>
                  </template>
                </tr>
              </slot>
            </tbody>
          </q-markup-table>
          <q-card-section v-else class="text-center">
            <app-result status="empty" :description="t('error.dataNotfound')" />
          </q-card-section>
        </template>

        <app-paging
          v-if="showPaging"
          :model-value="pages"
          :boundary-numbers="false"
          @update:current="onPageChange"
          @update:per-page="onPerPageChange"
        ></app-paging>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineAsyncComponent, watch, ref, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import {
  ISort,
  IPagination,
  ICrudListHeader,
  CrudListDataType,
  ICrudListHeaderOptionSearchType,
} from '@/types/common';
import {
  biFile,
  biSearch,
  biSortAlphaDown,
  biSortAlphaUpAlt,
  biTrash,
  biPencil,
  biClipboard,
  biCheckCircle,
  biArrowClockwise,
  biPlus,
  biX,
  biEye,
  biThreeDotsVertical,
} from '@quasar/extras/bootstrap-icons';
import { DEFULT_ITEM_PER_PAGET } from '@/utils/constant';
import { isEmpty } from '@/utils/appUtil';
import { getValFromObjectByPath } from '@/utils/appUtilJs';
import SkeletonTable from '@/components/skeleton/SkeletonTable.vue';
import AppSort from '@/components/base/AppSort.vue';
import AppPaging from '@/components/base/Paging.vue';
import { useBase } from '@/composables/useBase';
import { usePermissionStore } from '@/stores/permissionStore';
import { formatDate, FORMAT_DATE1, FORMAT_DATETIME } from '@/utils/dateUtil';

const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue'),
);
const DatePicker = defineAsyncComponent(
  () => import('@/components/form/DatePicker.vue'),
);
const FormTogle = defineAsyncComponent(
  () => import('@/components/form/FormTogle.vue'),
);
const CrudApiListHeaderFilter = defineAsyncComponent(
  () => import('@/components/base/CrudApiListHeaderFilter.vue'),
);
const props = defineProps({
  crudName: {
    type: String,
    default: '',
  },
  viewPermission: {
    type: String,
    default: '',
  },
  managePermission: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: biFile,
  },
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  headers: {
    type: Array as PropType<ICrudListHeader[]>,
    default: () => [],
  },
  sort: {
    type: Object as PropType<ISort>,
    default: null,
  },
  pages: {
    type: Object as PropType<IPagination>,
  },
  fristLoad: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showPaging: {
    type: Boolean,
    default: true,
  },
  isFrontend: {
    type: Boolean,
    default: false,
  },
  showCheckbox: {
    type: Boolean,
    default: true,
  },
  showNewBtn: {
    type: Boolean,
    default: true,
  },
  showSearchBtn: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  'on-page-no-change',
  'on-items-perpage-change',
  'update-search',
  'on-sort',
  'on-sort-mode',
  'on-item-copy',
  'on-item-click',
  'on-item-delete',
  'on-new-form',
  'on-reload',
  'on-advance-search',
]);
const { t, locale } = useLang();
const { searchOperations } = useBase();
const permissionStore = usePermissionStore();
const currentPage = ref(props.pages ? props.pages.current : 1);
const itemPerPage = ref(DEFULT_ITEM_PER_PAGET);
const filterText = ref('');
const selectedAll = ref(false);
const showSearch = ref(false);
const selected = ref<number[]>([]);
const updateSearchText = (val: any) => {
  emit('update-search', val);
};
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
  selected.value = [];
  if (val) {
    for (let i = 0; i < props.list.length; i++) {
      const item = props.list[i];
      if (item) {
        selected.value.push(item.id);
      }
    }
  }
};
const onDeleteItemSelected = () => {
  if (selected.value.length > 0) {
    onItemDelete(selected.value, false);
  }
};
const onItemDelete = (indexOrIds: number | number[], isSingle: boolean) => {
  emit('on-item-delete', indexOrIds, isSingle);
};
const getItemByIndex = (index: number) => {
  const itemList = props.list;
  const item = itemList[index];
  if (!item) {
    return;
  }
  return item;
};
const getValueByColunm = (column: string, index: number) => {
  const item = getItemByIndex(index);
  if (!column || !item) {
    return null;
  }
  const path = column.split('.');
  if (path.length > 1) {
    return getValFromObjectByPath(item, column);
  }
  return !isEmpty(item[column]) ? item[column] : null;
};
const getValueBoolean = (column: string, index: number) => {
  if (!column) {
    return false;
  }
  const val = getValueByColunm(column, index);
  if (!val) {
    return false;
  }
  return val === true;
};
const sortableHeaders = computed(() => {
  const headers = props.headers;
  const filters = headers.filter(
    (c) => c.options && c.options.sortable === true,
  );
  const list = [];
  for (const item of filters) {
    list.push({
      value: item.options.sortColunm ? item.options.sortColunm : item.column,
      label: t(item.label),
    });
  }
  return list;
});
const fillableHeaders = computed(() => {
  const headers: ICrudListHeader[] = props.headers;

  if (!props.headers) {
    return headers;
  }

  return props.headers.length > 0
    ? props.headers.filter((c) => c.options && c.options.fillable === true)
    : headers;
});

const searchableHeaders = computed(() => {
  const headers: ICrudListHeader[] = props.headers;

  if (!props.headers) {
    return headers;
  }

  return props.headers.length > 0
    ? props.headers.filter((c) => c.options && c.options.searchable === true)
    : headers;
});

const onAdvanceSearch = () => {
  let q = '';
  if (searchableHeaders.value.length > 0) {
    for (const col of searchableHeaders.value) {
      if (col.options) {
        const operation = col.options.searchOperation;
        const searchVal = col.options.searchModel;
        const colunm = col.options.searchColunm
          ? col.options.searchColunm
          : col.column;
        if (operation != undefined && searchVal != undefined) {
          let canAdd = true;
          if (typeof searchVal != 'boolean' && searchVal.length == 0) {
            canAdd = false;
          }

          if (canAdd) {
            if (q) {
              q += ',';
            }
            q += colunm + operation + searchVal;
          }
        }
      }
    }
  }
  emit('on-advance-search', q);
};

const isHaveViewPermission = computed(() => {
  if (!props.isFrontend) {
    return props.viewPermission
      ? permissionStore.isHavePermission(props.viewPermission)
      : props.crudName
        ? permissionStore.isHavePermission(`${props.crudName}_view`)
        : true;
  }
  return props.viewPermission
    ? permissionStore.isHaveFrontendPermission(props.viewPermission)
    : props.crudName
      ? permissionStore.isHaveFrontendPermission(`${props.crudName}_view`)
      : true;
});
const isHaveManagePermission = computed(() => {
  if (!props.isFrontend) {
    return props.managePermission
      ? permissionStore.isHavePermission(props.managePermission)
      : props.crudName
        ? permissionStore.isHavePermission(`${props.crudName}_manage`)
        : true;
  }
  return props.managePermission
    ? permissionStore.isHaveFrontendPermission(props.managePermission)
    : props.crudName
      ? permissionStore.isHaveFrontendPermission(`${props.crudName}_manage`)
      : true;
});
const dateForMat = (d: string, format: string | undefined = undefined) => {
  return d
    ? formatDate(d, format ? format : FORMAT_DATE1, locale.value)
    : undefined;
};
const datetimeForMat = (d: string, format: string | undefined = undefined) => {
  return d
    ? formatDate(d, format ? format : FORMAT_DATETIME, locale.value)
    : undefined;
};
const onPageChange = async (v: number | undefined) => {
  if (v) {
    currentPage.value = v;
  }
};
const onPerPageChange = async (v: number | undefined) => {
  if (v) {
    itemPerPage.value = v;
  }
};
//wathcer
watch(
  () => props.pages,
  (pages) => {
    if (pages) {
      currentPage.value = pages.current;
    }
  },
);
watch(currentPage, (newPage) => {
  if (props.fristLoad) {
    emit('on-page-no-change', newPage);
  }
});
watch(itemPerPage, (newItemPerPage) => {
  if (props.fristLoad) {
    emit('on-items-perpage-change', newItemPerPage);
  }
});
</script>
