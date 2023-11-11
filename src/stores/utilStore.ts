import { defineStore } from 'pinia';
import { UserProfileDto } from '@/types/models';
export const useUtilStore = defineStore('utilStore', {
  state: () => ({
    subordinates: [] as UserProfileDto[],
    noSubordinates: false as boolean,
    showPostForm: false as boolean,
  }),
  getters: {},
  actions: {
    setSubordinates(users: UserProfileDto[]) {
      this.subordinates = users;
    },
    setNoSubordinates(v: boolean) {
      this.noSubordinates = v;
    },
    onNewPost() {
      this.showPostForm = true;
    },
    onClosePostForm() {
      this.showPostForm = false;
    },
  },
});
