import { defineStore } from 'pinia';
import { UserDto, UserLevelDto } from '@/types/models';
export const useAuthenStore = defineStore('authenStore', {
  state: () => {
    return {
      auth: undefined as UserDto | undefined,
    };
  },
  getters: {
    tokenKey: (state) => state.auth?.token,
    loginedCover: (state) =>
      state.auth && state.auth.cover?.image ? state.auth.cover?.image : '',
    loginedAvatar: (state) => state.auth?.avatar?.image,
    loginedDisplay: (state) =>
      state.auth?.userData
        ? state.auth.userData.fullName
        : state.auth?.username
        ? state.auth?.username
        : state.auth?.email,
    loginedOrg: (state) =>
      state.auth?.userData ? state.auth?.userData.positionName : '',
    loginedUserLevel: (state): UserLevelDto | undefined =>
      state.auth?.useLevel ? state.auth.useLevel : undefined,
    prizeRemain: (state): number => {
      if (!state.auth) {
        return 0;
      }
      if (!state.auth.userData) {
        return 0;
      }
      if (!state.auth.userData.prizeRemain) {
        return 0;
      }
      if (state.auth.userData.prizeRemain > 0) {
        return state.auth.userData.prizeRemain;
      }
      return 0;
    },
    prizeTotalHave: (state): number => {
      let total = 0;
      if (state.auth && state.auth.userData) {
        if (
          state.auth.userData.specialPrizeQuota &&
          state.auth.userData.specialPrizeQuota > 0
        ) {
          total += state.auth.userData.specialPrizeQuota;
        }
        if (
          state.auth.userData.prizeQuota &&
          state.auth.userData.prizeQuota > 0
        ) {
          total += state.auth.userData.prizeQuota;
        }
      }
      return total;
    },
  },
  actions: {
    setAuthen(item: UserDto) {
      this.auth = item;
    },
    logout() {
      this.auth = undefined;
    },
    decreasePrize() {
      if (
        this.auth &&
        this.auth.userData &&
        this.auth.userData.prizeRemain &&
        this.auth.userData.prizeRemain > 0
      ) {
        this.auth.userData.prizeRemain--;
      }
    },
  },
});
