import { defineStore } from 'pinia';
import { IMenu } from '@/types/models';
export const useDrawerStore = defineStore('drawerStore', {
  state: () => {
    return {
      drawers: [] as IMenu[],
      frontendDrawers: [] as IMenu[],
    };
  },
  getters: {},
  actions: {
    setDrawers(items: IMenu[]) {
      this.drawers = items;
    },
    setFrontendDrawers(items: IMenu[]) {
      this.frontendDrawers = items;
    },
    logout() {
      this.drawers = [];
      this.frontendDrawers = [];
    },
  },
});
