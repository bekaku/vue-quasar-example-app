import { useAxios } from '@/composables/useAxios';
import { OgMeta, AppVersionDto } from '@/types/models';
export default () => {
  const { callAxios, validateServerResponse } = useAxios();

  const getOgMeta = async (link: string): Promise<OgMeta | null> => {
    const res = await callAxios<OgMeta>({
      API: `/api/public/getOgMeta?url=${link}`,
      method: 'GET',
    });
    return await validateServerResponse<OgMeta>(res);
  };
  const getAppVersion = async (): Promise<AppVersionDto | null> => {
    const res = await callAxios<AppVersionDto>({
      API: '/api/public/appVersion',
      method: 'GET',
    });
    return await validateServerResponse<AppVersionDto>(res);
  };

  return {
    getOgMeta,
    getAppVersion,
  };
};
