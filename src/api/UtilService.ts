import { useAxios } from '@/composables/useAxios';
import { AppVersionDto, OgMeta } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();

  const getOgMeta = async (link: string): Promise<OgMeta | null> => {
    return await callAxios<OgMeta>({
      API: `/api/public/getOgMeta?url=${link}`,
      method: 'GET',
    });
  };
  const getAppVersion = async (): Promise<AppVersionDto | null> => {
    return await callAxios<AppVersionDto>({
      API: '/api/public/appVersion',
      method: 'GET',
    });
  };

  return {
    getOgMeta,
    getAppVersion,
  };
};
