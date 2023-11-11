<template>
  <q-card style="min-height: 250px">
    <q-card-section>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-12">
            <q-input
              bottom-slots
              v-model="searchItem.q"
              :label="t('searchHelp')"
              clearable
              outlined
            >
              <template v-slot:append>
                <q-separator vertical class="q-mx-sm" />
                <q-btn
                  color="primary"
                  rounded
                  flat
                  :icon="biSearch"
                  @click="onSubmit"
                >
                  <q-tooltip>{{ t('base.search') }}</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-item-label header> {{ t('searchType') }}</q-item-label>
            <div class="q-gutter-sm">
              <q-checkbox v-model="searchItem.post" label="Posts" />
              <q-checkbox
                v-model="searchItem.profile"
                :label="t('base.profile')"
              />
              <q-checkbox
                v-model="searchItem.hashTag"
                :label="t('base.hashtag')"
              />
              <q-checkbox v-model="searchItem.theme" label="Comments" />
            </div>
          </div>
          <div class="col-12">
            <q-item-label header> {{ t('searchHistory') }}</q-item-label>
            <q-list dense>
              <template v-if="SearchHistoryList.length > 0">
                <q-virtual-scroll
                  style="max-height: 350px"
                  :items="SearchHistoryList"
                  v-slot="{ item, index }"
                >
                  <q-item :key="index">
                    <q-item-section>
                      <q-item-label>
                        {{ item.q }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                          :icon="biSearch"
                          @click="onSearch(item)"
                          round
                          dense
                          flat
                        />
                        <q-btn
                          dense
                          :icon="biX"
                          round
                          flat
                          @click="removeSearch(index)"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-virtual-scroll>
              </template>
              <template v-else>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>{{
                      t('searchHistoryNotfound')
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-inner-loading
      :showing="loading"
      :label="t('base.pleaseWait')"
      label-class="text-primary"
    />
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { SearchItem } from '@/types/models';
import { useBase } from '@/composables/useBase';
import { useCache } from '@/composables/useCache';
import { biSearch, biX } from '@quasar/extras/bootstrap-icons';
defineProps({
  showHistory: {
    type: Boolean,
    require: true,
  },
});
const { t } = useLang();
const { inputSanitizeHtml } = useBase();
const { SearchHistoryList } = useCache();
const loading = ref(false);
const emit = defineEmits(['on-submit']);
const searchItem = ref<SearchItem>({
  q: '',
  post: true,
  hashTag: true,
  profile: true,
  theme: true,
});
const onSubmit = async () => {
  if (searchItem.value.q) {
    searchItem.value.q = inputSanitizeHtml(searchItem.value.q.trim());
    if (searchItem.value.q.length >= 4) {
      loading.value = true;
      await onAddHistory(searchItem.value);
      loading.value = false;
      onSearch(searchItem.value);
    }
  }
};
const onAddHistory = (qItem: SearchItem) => {
  return new Promise((resolve) => {
    const itemExist = SearchHistoryList.value.find((t) => t.q == qItem.q);
    if (!itemExist) {
      SearchHistoryList.value.push(qItem);
    }
    resolve(true);
  });
};
const onSearch = (qItem: SearchItem) => {
  emit('on-submit', qItem);
};
const removeSearch = (index: number) => {
  if (SearchHistoryList.value.length > 0) {
    SearchHistoryList.value.splice(index, 1);
  }
};
</script>
<style lang="sass" scoped>
.dialog-card
  width: 100%
  max-width: 650px
  min-width: 450px
</style>
