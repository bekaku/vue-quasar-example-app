import { useAxios } from '@/composables/useAxios';
import { FileManagerDto } from '@/types/models';
import { ResponseMessage } from '@/types/common';
import { FILES_UPLOAD_ATT, FILES_DIRECTORY_ID_ATT } from '@/utils/constant';
export default () => {
  const { callAxios, validateServerResponse } = useAxios();
  const uploadApi = async (
    file: any,
    fileDirectoryId = 0
  ): Promise<FileManagerDto | null> => {
    const postData = new FormData();
    postData.append(FILES_UPLOAD_ATT, file);
    postData.append(FILES_DIRECTORY_ID_ATT, fileDirectoryId.toString());
    const res = await callAxios<FileManagerDto>({
      API: '/api/fileManager/uploadApi',
      method: 'POST',
      body: postData,
      baseURL: process.env.cdnBaseUrl,
      contentType: 'multipart/form-data',
    });
    return await validateServerResponse<FileManagerDto>(res);
  };
  const deleteFileApi = async (fileId: number): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/deleteFileApi/${fileId}`,
      method: 'DELETE',
      baseURL: process.env.cdnBaseUrl,
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: process.env.cdnBaseUrl,
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: process.env.cdnBaseUrl,
    });
  };

  return {
    uploadApi,
    updateUserAvatar,
    updateUserCover,
    deleteFileApi
  };
};
