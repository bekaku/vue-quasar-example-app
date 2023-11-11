import {
  CrudListApiOptions,
  ICrudListHeader,
  IApiListResponse,
  ISortModeType,
  ResponseMessage,
} from '@/types/common';
import {
  SearchParamiter,
  SearchOperation,
  CrudAction,
} from '@/utils/constant';
import { useSort } from './useSort';
import { useAxios } from '@/composables/useAxios';
import { useBase } from './useBase';
import { useLang } from './useLang';
import { ref, computed, onMounted, Ref, onBeforeUnmount } from 'vue';
import {
  isAppException,
  isServerResponseMessage,
  snakeToCamel,
} from '@/utils/appUtil';
export const useCrudList = <T>(
  options: CrudListApiOptions,
  listHeader?: Ref<ICrudListHeader[]>
) => {
  const { pages, sort, resetSort } = useSort(
    options ? options.defaultSort : undefined,
    options ? options.itemsPerPage : 10
  );
  const { t } = useLang();
  const { WeeGoTo, getCurrentPath, WeeGetQuery, WeeConfirm, WeeLoader, isDevMode } =
    useBase();
  const { callAxios } = useAxios();
  const dataList = ref<T[]>([]);
  const fristLoad = ref(false);
  const loading = ref(false);
  const manualActionList = ref<string>();
  const advanceSearchUri = ref('');
  const filterText = ref('');

  const searchableHeaders = computed(() => {
    const headers: ICrudListHeader[] = [];

    if (!listHeader) {
      return headers;
    }

    return listHeader.value.length > 0
      ? listHeader.value.filter(
        (c) => c.options && c.options.searchable === true
      )
      : headers;
  });
  const validateColunmExist = (colnmName: string): boolean => {
    return (
      searchableHeaders.value.find((c) => c.column === colnmName) != undefined
    );
  };
  const validateQSearch = () => {
    const qParam = WeeGetQuery(SearchParamiter);
    const qParmArray = qParam?.split(',');
    const operations: any = SearchOperation;
    if (qParmArray && qParmArray.length > 0) {
      for (const q of qParmArray) {
        for (const k in operations) {
          setQSearch(q, operations[k]);
        }
      }
    }
  };
  const setQSearch = (q: any, operation: string) => {
    const qSplit = q.split(operation);
    if (qSplit.length == 2) {
      if (validateColunmExist(qSplit[0])) {
        if (!advanceSearchUri.value) {
          advanceSearchUri.value = `&${SearchParamiter}=${q.trim()}`;
        } else {
          advanceSearchUri.value += ',' + q.trim();
        }
      }
    }
  };

  validateQSearch();
  onMounted(async () => {
    if (options.fetchListOnload) {
      await fetchList();
    }
  });

  const listApiEndpoint = computed(() => {
    return options.actionList
      ? options.actionList
      : options.apiEndpoint && options.crudName
        ? options.apiEndpoint + '/' + snakeToCamel(options.crudName)
        : '';
  });
  const deleteApiEndpoint = computed(() => {
    return options.actionDelete
      ? options.actionDelete
      : options.apiEndpoint && options.crudName
        ? options.apiEndpoint + '/' + snakeToCamel(options.crudName)
        : '';
  });

  const pageParam = computed(() => {
    return `${listApiEndpoint.value}?page=${pages.value.current > 0 ? pages.value.current - 1 : 0
      }&size=${pages.value.itemsPerPage}${sort.value.column && sort.value.mode ? '&sort=' + sort.value.column + ',' + sort.value.mode : ''}${advanceSearchUri.value ? advanceSearchUri.value : ''}${options.additionalUri ? '&' + options.additionalUri : ''}`;
  });
  // const pageParam = computed(() => {
  //   return `${listApiEndpoint.value}?page=${pages.value.current > 0 ? pages.value.current - 1 : 0
  //     }&size=${pages.value.itemsPerPage}${sort.value.column && sort.value.mode ? '&sort='+sort.value.column+','+sort.value.mode : ''}&sort=${sort.value.column},${sort.value.mode}${advanceSearchUri.value ? advanceSearchUri.value : ''}${options.additionalUri ? '&' + options.additionalUri : ''}`;
  // });
  const pathParam = computed(() => {
    if (!options) {
      return;
    }
    return `${getCurrentPath(false)}?page=${pages.value.current}&size=${pages.value.itemsPerPage
      }${sort.value.column && sort.value.mode ? '&sort=' + sort.value.column + ',' + sort.value.mode : ''}${advanceSearchUri.value ? advanceSearchUri.value : ''
      }${options.additionalUri ? '&' + options.additionalUri : ''}`;
  });

  const fetchList = async (): Promise<boolean> => {
    if (!pageParam.value) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    loading.value = true;
    const response = await callAxios<IApiListResponse>({
      API: pageParam.value,
      method: 'GET',
    });
    if (isDevMode()) {
      console.log('useCrudList > fetchList : ' + pageParam.value, response);
    }


    return new Promise((resolve) => {
      if (!isAppException(response) && !isServerResponseMessage(response)) {
        dataList.value = response.dataList;
      }

      pages.value.totalPages = response.totalPages;
      pages.value.totalElements = response.totalElements;
      pages.value.last = response.last;

      if (!fristLoad.value) {
        fristLoad.value = true;
      }
      loading.value = false;
      resolve(true);
    });
  };
  const filteredList = computed(() => {
    const list = dataList.value;
    const search = filterText.value
      ? filterText.value.toLowerCase().trim()
      : null;
    if (!search) {
      return list;
    }

    let filters: any = [];
    const searchables = searchableHeaders.value;
    if (searchables.length == 0) {
      return list;
    }

    for (const header of searchables) {
      const col: string | undefined = header.column;
      if (col && list && list.length > 0) {
        const searchList = list.filter(
          (c: any) =>
            c[col] &&
            c[col].toString().toLowerCase().includes(search) &&
            !filters.find((x: any) => x.id === c.id)
        );
        filters = filters.concat(searchList);
      }
    }
    return filters;
  });
  const onPageNoChange = async (pageNo: number) => {
    pages.value.current = pageNo;
    if (!pathParam.value) {
      return;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onItemPerPageChange = async (no: number) => {
    pages.value.itemsPerPage = no;
    if (!pathParam.value) {
      return;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onSort = async (column: string) => {
    if (sort.value.column === column) {
      sort.value.mode = sort.value.mode === 'asc' ? 'desc' : 'asc';
    } else {
      sort.value.column = column;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onSortMode = async (mode: ISortModeType) => {
    sort.value.mode = mode;
    onPasteUrlPathParamAndFetchData();
  };
  const onPasteUrlPathParamAndFetchData = async () => {
    if (!pathParam.value) {
      return;
    }
    WeeGoTo(pathParam.value);
    await fetchList();
  };
  const onAdvanceSearch = (q: string) => {
    advanceSearchUri.value = `&${SearchParamiter}=${q}`;
    onPasteUrlPathParamAndFetchData();
  };
  const onReload = () => {
    advanceSearchUri.value = '';
    pages.value.current = 1;
    dataList.value = [];
    resetSort();
    onPasteUrlPathParamAndFetchData();
  };
  const getItemByIndex = (index: number) => {
    return new Promise((resolve) => {
      const item =
        filteredList.value.length > 0 ? filteredList.value[index] : null;
      resolve(item);
    });
  };
  const getItemIndexById = (id: number): Promise<number> => {
    return new Promise((resolve) => {
      resolve(dataList.value.findIndex((t: any) => t.id === id));
    });
  };
  const onItemDelete = async (
    indexOrIds: number | number[],
    isSingle: boolean
  ) => {
    const conf = await WeeConfirm(t('app.monogram'), t('base.deleteConfirm'));
    if (conf) {
      if (isSingle) {
        const item: any = await getItemByIndex(indexOrIds as number);
        if (item) {
          const i: number = await getItemIndexById(item.id);
          WeeLoader();
          const status = await onDeleteItemSingle(item.id);
          if (status && i != -1) {
            dataList.value.splice(i, 1);
          }
          WeeLoader(false);
        }
      } else {
        WeeLoader();
        for (const id of indexOrIds as number[]) {
          await onDeleteItemSingle(id);
        }
        await fetchList();
        WeeLoader(false);
      }
    }
  };
  const onDeleteItemSingle = async (id: number): Promise<boolean> => {
    const apiEndpoint = `${deleteApiEndpoint.value}/${id}`;
    const response = await callAxios<ResponseMessage>({
      API: apiEndpoint,
      method: 'DELETE',
    });
    // console.log('onDeleteItemSingle', response);
    if (isDevMode()) {
      console.log('useCrudList > onDeleteItemSingle : ', apiEndpoint, response);
    }
    return new Promise((resolve) => {
      resolve(response.status == 'OK');
    });
  };

  const onNewForm = () => {
    if (options.apiEndpoint && options.crudName) {
      WeeGoTo(`${options.crudName.replace('_', '-')}/${CrudAction.NEW}/0`);
    }
  };
  const onItemClick = async (index: number) => {
    const item: any = await getItemByIndex(index);
    if (!item) {
      return;
    }
    if (options.apiEndpoint && options.crudName) {
      WeeGoTo(
        `${options.crudName.replace('_', '-')}/${CrudAction.VIEW}/${item.id}`
      );
    }
  };
  const onItemCopy = async (index: number) => {
    const item: any = await getItemByIndex(index);
    if (!item) {
      return;
    }
    if (options.apiEndpoint && options.crudName) {
      WeeGoTo(
        `${options.crudName.replace('_', '-')}/${CrudAction.COPY}/${item.id}`
      );
    }
  };

  onBeforeUnmount(() => {
    dataList.value = [];
    advanceSearchUri.value = '';
    filterText.value = '';
    manualActionList.value = undefined;
  });

  const methods = {
    onPageNoChange,
    onItemPerPageChange,
    fetchList,
    onSort,
    onSortMode,
    onReload,
    filteredList,
    onAdvanceSearch,
    onItemDelete,
    onNewForm,
    onItemClick,
    onItemCopy,
    getItemByIndex,
  };
  return {
    pages,
    sort,
    resetSort,
    loading,
    fristLoad,
    dataList,
    filterText,
    crudName: options.crudName,
    manualActionList,
    ...methods,
  };
};
