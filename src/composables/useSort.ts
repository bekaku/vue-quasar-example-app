import { ISort, ISortMode, IPagination } from '@/types/common';
import { DEFULT_ITEM_PER_PAGET } from '@/utils/constant';
import { useBase } from './useBase';
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
export const useSort = (defaultSort?: ISort, perPage?: number) => {
  const { WeeGetQuery } = useBase();
  const { t } = useLang();
  const sortMode = ref<ISortMode[]>([
    { value: 'asc', label: t('sort.asc') },
    { value: 'desc', label: t('sort.desc') },
  ]);

  const getNumberQuery = (param: string): number => {
    const pageQuery = WeeGetQuery(param);
    return pageQuery ? +pageQuery : 0;
  };
  const getSortParam = (): ISort | undefined => {
    const sortQuery = WeeGetQuery('sort');
    if (sortQuery) {
      const sortArr = sortQuery.split(',');
      if (sortArr.length == 2) {
        const field = sortArr[0];
        const mode = sortArr[1];
        if (mode == 'asc' || mode == 'desc') {
          return {
            column: field,
            mode: mode,
          };
        }
      }
    }
    return undefined;
  };
  const sortQuery = getSortParam();

  const p = getNumberQuery('page');
  const s = getNumberQuery('size');
  const sortInitial: ISort = {
    column:
      sortQuery && sortQuery.column
        ? sortQuery.column
        : defaultSort && defaultSort.column
          ? defaultSort.column
          : undefined,
    mode:
      sortQuery && sortQuery.mode
        ? sortQuery.mode
        : defaultSort && defaultSort.mode
          ? defaultSort.mode
          : undefined,
  };
  const pagesInitial: IPagination = {
    current: p || 1,
    itemsPerPage:
      s && s <= 50 && s > 0 ? s : perPage ? perPage : DEFULT_ITEM_PER_PAGET,
    totalPages: 0,
    totalElements: 0,
    last: false,
    perPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
    ],
  };
  const sort = ref<ISort>(Object.assign({}, sortInitial));
  const pages = ref<IPagination>(Object.assign({}, pagesInitial));

  const resetSort = () => {
    sort.value = Object.assign({}, sortInitial);
    pages.value = Object.assign({}, pagesInitial);
  };
  return {
    sortMode,
    sort,
    pages,
    resetSort,
  };
};
