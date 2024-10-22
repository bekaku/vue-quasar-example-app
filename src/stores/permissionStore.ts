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
    isHaveMultiPermission(codes: string[] | undefined): Promise<boolean> {
      if (codes == undefined || codes.length == 0) {
        return new Promise((resolve) => resolve(true));
      }
      return new Promise((resolve) => {
        let isHave = false;
        for (const code of codes) {
          if (!isHave) {
            isHave = this.isHavePermission(code);
            if (isHave) {
              break;
            }
          }
        }
        resolve(isHave);
      })

    },
    setFrontendPermissions(items: string[]) {
      this.frontendPermissions = items;
    },
    isHaveFrontendPermission(code: string): boolean {
      return (
        this.frontendPermissions.find((t: string) => t === code) != undefined
      );
    },
    isHaveFrontendMultiPermission(codes: string[]): boolean {
      let isHave = false;
      for (const code of codes) {
        if (!isHave) {
          isHave = this.isHaveFrontendPermission(code);
          if (isHave) {
            break;
          }
        }
      }
      return isHave;
    },
  },
});
