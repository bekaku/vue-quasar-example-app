import { defineStore } from 'pinia';
import { PostDataDto } from '@/types/models';
export const newPostStoreBAK = defineStore('newPostStoreBAK', {
  state: () => ({
    newPost: undefined as PostDataDto | undefined,
    testPost: 0 as number,
  }),
  getters: {},
  actions: {
    setTest() {
      this.testPost++;
    },
    setNewPost(p: PostDataDto) {
      this.newPost = p;
      // this.newPost = Object.assign({}, p) as PostDataDto;
      this.testPost++;
    },
    clearNewPost() {
      this.newPost = undefined;
    },
  },
});
