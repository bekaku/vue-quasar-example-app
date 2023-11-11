<template>
  <q-page class="row items-center justify-evenly">
    <p>Theme Page</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableLocales } from '@/utils/lang';
import { useMeta } from 'quasar';
export default defineComponent({
  components: {},
  setup() {
    useMeta({
      title: 'I18n Page',
    });
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableLocales };
  },
});
</script>
