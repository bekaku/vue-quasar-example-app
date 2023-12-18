import { Device } from '@capacitor/device';
import { ref } from 'vue';
export const useDevice = () => {
  const deviceId = ref();
  const getDeviceInfo = async (): Promise<any> => {
    const info = await Device.getInfo();
    return new Promise((resolve) => {
      resolve(info);
    });
  };
  const getDeviceId = async (): Promise<string | undefined> => {
    const ID = await Device.getId();
    return new Promise((resolve) => {
      deviceId.value = ID ? ID.identifier : undefined;
      resolve(ID ? ID.identifier : undefined);
    });
  };
  const isWeb = async (): Promise<boolean> => {
    const info = await Device.getInfo();
    return new Promise((resolve) => {
      resolve(info.platform == 'web');
    });
  };
  return {
    getDeviceInfo,
    isWeb,
    getDeviceId,
    deviceId
  };
};
