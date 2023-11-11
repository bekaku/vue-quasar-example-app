<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result
      status="error"
      icon-size="256px"
      :title="code"
      :description="message"
    >
      <template #extra>
        {{ exceptionStore.error }}
        <q-btn
          outline
          :icon="biArrowLeft"
          :label="t('base.back') + t('base.home')"
          to="/"
        />
      </template>
    </app-result>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBase } from '@/composables/useBase';
import AppResult from 'components/base/AppResult.vue';
import { useLang } from '@/composables/useLang';
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
import { useExceptionStore } from '@/stores/exceptionStore';
const { t } = useLang();
const { WeeGetParam } = useBase();
const exceptionStore = useExceptionStore();
useMeta({
  title: t('error.error'),
});
const code = ref(WeeGetParam('code'));
const message = ref(WeeGetParam('message'));
</script>
