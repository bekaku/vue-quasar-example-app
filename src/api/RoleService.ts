import { useAxios } from '@/composables/useAxios';
import { Role } from '@/types/models';
export default () => {
  const { callAxios, validateServerResponse } = useAxios();

  const findAllBackendRole = async (): Promise<Role[]> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllBackend',
      method: 'GET',
    });
  };

  const findAllSystemFrontend = async (): Promise<Role[]> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllSystemFrontend',
      method: 'GET',
    });
  };
  const findAllByCompanyAndFrontend = async (
    companyId: number
  ): Promise<Role[]> => {
    return await callAxios<Role[]>({
      API: `/api/role/findAllByCompanyAndFrontend?companyId=${companyId}`,
      method: 'GET',
    });
  };
  const findAllRoleByCompany = async (): Promise<Role[] | null> => {
    const res = await callAxios<Role[]>({
      API: '/api/role/findAllByCompany',
      method: 'GET',
    });
    return await validateServerResponse<Role[]>(res);
  };
  const findAllByAuthAndFrontend = async (): Promise<Role[] | null> => {
    const res = await callAxios<Role[]>({
      API: '/api/role/findAllByAuthAndFrontend',
      method: 'GET',
    });
    return await validateServerResponse<Role[]>(res);
  };

  return {
    findAllBackendRole,
    findAllSystemFrontend,
    findAllByCompanyAndFrontend,
    findAllRoleByCompany,
    findAllByAuthAndFrontend,
  };
};
