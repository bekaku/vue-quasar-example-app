import { ISearch } from '@/types/models';
// import { useAxios } from '@/composables/useAxios';
export default () => {
  // const { callAxiosV2 } = useAxios();
  const searchApi = async (
    page: number,
    size: number,
    q: string
  ): Promise<ISearch[] | null> => {
    console.log(`searchApi :${page}, size: ${size}, q: ${q}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1500);
    });
    // return await callAxiosV2<ISearch[]>({
    //   API: `/api/search/v2?page=${page}&size=${size}&${q}`,
    //   method: 'GET',
    // });
  };
  return {
    searchApi,
  };
};
