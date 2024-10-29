import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { usePermissionStore } from '@/stores/permissionStore';
import { useBase } from './useBase';
export const useRequiredAuth = () => {
  const { appGoto } = useBase();
  const route = useRoute();
  const permissionStore = usePermissionStore();
  watchEffect(async () => {
    const pageMeta = (route?.meta)
    if (pageMeta != undefined) {
      if (pageMeta?.requireAuth === true) {
        const permissions = pageMeta?.permission;
        const state = await permissionStore.isHaveMultiPermission(permissions as string[])
        if (!state) {
          appGoto('/error?code=401');
        }
      }
    }
  })
};
