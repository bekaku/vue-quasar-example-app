import { useAxios } from '@/composables/useAxios';
import type { Role } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();

  const findAllBackendRole = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllBackend',
      method: 'GET',
    });
  };

  const findAllSystemFrontend = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllSystemFrontend',
      method: 'GET',
    });
  };
  const findAllByCompanyAndFrontend = async (
    companyId: number
  ): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: `/api/role/findAllByCompanyAndFrontend?companyId=${companyId}`,
      method: 'GET',
    });
  };
  const findAllRoleByCompany = async (): Promise<Role[] | null> => {
    return await callAxios<Role[] | null>({
      API: '/api/role/findAllByCompany',
      method: 'GET',
    });
  };
  const findAllByAuthAndFrontend = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllByAuthAndFrontend',
      method: 'GET',
    });
  };

  return {
    findAllBackendRole,
    findAllSystemFrontend,
    findAllByCompanyAndFrontend,
    findAllRoleByCompany,
    findAllByAuthAndFrontend,
  };
};
