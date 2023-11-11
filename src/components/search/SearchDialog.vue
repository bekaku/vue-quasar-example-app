<template>
  <app-dialog
    :icon="biSearch"
    :model-value="show"
    :full-width="false"
    :title="t('base.search')"
    @on-close="show = false"
    @on-hide="show = false"
    :persistent="false"
    transition-show="fade"
    transition-hide="fade"
    dialog-style="width: 550px; max-width: 90vw"
  >
    <q-separator />
    <search-form @on-submit="onSubmit"></search-form>
  </app-dialog>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import AppDialog from '@/components/base/AppDialog.vue';
import { useBase } from '@/composables/useBase';
import { SearchItem } from '@/types/models';
import { biSearch } from '@quasar/extras/bootstrap-icons';
const SearchForm = defineAsyncComponent(
  () => import('@/components/search/SearchForm.vue'),
);
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
});
const { WeeGoTo } = useBase();
const { t } = useLang();
const emit = defineEmits(['on-close', 'update:modelValue', 'on-submit']);
const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
const onSubmit = (item: SearchItem) => {
  show.value = false;
  let q = `q=${item.q}&q_profile=${item.profile ? 'true' : 'false'}&q_post=${
    item.post ? 'true' : 'false'
  }&q_hashtag=${item.hashTag ? 'true' : 'false'}&q_theme=${
    item.theme ? 'true' : 'false'
  }`;
  WeeGoTo(`/search?${q}`);
};
</script>
<style lang="sass" scoped>
.dialog-card
  width: 100%
  max-width: 650px
  min-width: 450px
</style>
