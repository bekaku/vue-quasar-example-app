<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>FetchData</p>
        <q-btn label="Load data" @click="loadData" />
        <p>Post from prefect {{ post }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import { useBase } from '@/composables/useBase';
import { useAxios } from '@/composables/useAxios';
import { Post } from '@/types/models';
import { useMeta } from 'quasar';
// import { preFetch } from 'quasar/wrappers';
import { useTestPost } from 'stores/testPostStore';
import { usePreFetch } from '@/composables/usePreFetch';
interface ITest {
  camelToSnake: string;
  i18nMessage: string;
  requestFrom: string;
  AUTHORIZATION: string;
  ACCEPT_LANGUGE: string;
  userAgent: string;
}
export default defineComponent({
  components: {},
  // preFetch: preFetch<ITest>(async ({ ssrContext }) => {
  async preFetch({ ssrContext, redirect }) {
    const { callAxios } = usePreFetch(ssrContext, redirect);
    const data = await callAxios<ITest>({
      API: '/test',
      method: 'GET',
    });
    const testPostStore = useTestPost();
    testPostStore.setData(data);
    // const { callAxios } = useAxios();
    // const response = await callAxios<ITest>({
    //   API: '/test',
    //   method: 'GET',
    // });
    // console.log('preFetch', response);
    console.log('preFetch', data);
  },
  setup() {
    const { WeeLoader } = useBase();
    const { callAxios } = useAxios();
    const data = ref<Post[]>([]);

    const dataTest = ref<ITest>();
    const testPostStore = useTestPost();

    useMeta({
      title: testPostStore.item ? testPostStore.item.i18nMessage : 'No Data',
    });

    const post = computed(() => testPostStore.item);

    onBeforeMount(async () => {
      console.log('onBeforeMount', dataTest.value);
    });

    const loadData = async () => {
      WeeLoader();
      // get
      const response = await callAxios<unknown[]>({
        API: '/test',
        method: 'GET',
      });

      // post
      // const response = await callAxios<unknown[]>({
      //   API: '/test/test-post',
      //   method: 'POST',
      //   body: {
      //     userRegister: {
      //       email: 'user01@mydomain.com',
      //       username: null,
      //       password: '1234',
      //       active: true,
      //       selectedRoles: [],
      //       userData: null,
      //     },
      //   },
      // });

      // GET
      // const response = await callAxios<Post[]>({
      //   API: '/posts',
      //   method: 'GET',
      // });

      WeeLoader(false);
      console.log('response', response);
    };

    return { data, loadData, post };
  },
});
</script>
