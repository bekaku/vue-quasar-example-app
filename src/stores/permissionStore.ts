import { defineStore } from 'pinia';
export const usePermissionStore = defineStore('permissionStore', {
  state: () => {
    return {
      permissions: [] as string[],
      frontendPermissions: [] as string[],
    };
  },
  getters: {
    isFrontendAdmin: (state) => state.frontendPermissions.length > 1,
  },
  actions: {
    setPermissions(items: string[]) {
      this.permissions = items;
    },
    isHavePermission(code: string): boolean {
      return this.permissions.find((t: string) => t === code) != undefined;
    },
    setFrontendPermissions(items: string[]) {
      this.frontendPermissions = items;
    },
    isHaveFrontendPermission(code: string): boolean {
      return (
        this.frontendPermissions.find((t: string) => t === code) != undefined
      );
    },
  },
});
