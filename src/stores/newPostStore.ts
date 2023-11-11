import { defineStore } from 'pinia';
import { PostDataDto } from '@/types/models';
import { ref } from 'vue';
export const useNewPostStore = defineStore('newPostStore', () => {
  const newPost = ref<PostDataDto | undefined>();
  const counter = ref(0);
  const setNewPost = (p: PostDataDto) => {
    newPost.value = p;
  };
  const clearNewPost = () => {
    newPost.value = undefined;
  };
  const setTest = () => {
    console.log('setTest');
    counter.value++;
  };
  return {
    newPost,
    counter,
    setNewPost,
    clearNewPost,
    setTest,
  };
});
