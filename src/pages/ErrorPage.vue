<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result
      status="error"
      icon-size="256px"
      :title="code || t('error.error')"
      :description="message"
    >
      <template #extra>
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
import { ref, computed } from 'vue';
import { useBase } from '@/composables/useBase';
import AppResult from 'components/base/AppResult.vue';
import { useLang } from '@/composables/useLang';
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
const { t } = useLang();
const { WeeGetQuery } = useBase();
useMeta({
  title: t('error.error'),
});

const code = ref(WeeGetQuery('code'));
const message = computed(() => {
  return code.value ? t(`http.${code.value}`) : undefined;
});
</script>
