import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useNewPostStore = defineStore('newPostStore', () => {
  const newPost = ref<any | undefined>();
  const counter = ref(0);
  const setNewPost = (p: any) => {
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
