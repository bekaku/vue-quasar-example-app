<template>
  <q-page padding>
    <q-card flat bordered class="wee-container-responsive-center">
      <q-card-section>
        <q-toolbar>
          <q-btn flat :icon="biArrowLeft" :label="t('base.back')" to="/company-theme/view/0" />
          <q-toolbar-title> {{ t('app.name') }} </q-toolbar-title>
          <q-space />
          <q-btn flat :icon="biPlus" :label="t('base.addNew')" to="/company-theme/view/0" />
        </q-toolbar>
        <q-separator />
      </q-card-section>
      <q-card-section>
        <base-result status="empty" :description="t('error.dataNotfound')" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import PermissionService from '@/api/PermissionService';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { IMenu, Permission } from '@/types/models';
import { biArrowLeft, biPlus } from '@quasar/extras/bootstrap-icons';
import { defineAsyncComponent, onMounted, ref } from 'vue';
const BaseResult = defineAsyncComponent(
  () => import('@/components/base/BaseResult.vue'),
);
const { t } = useLang();
const { findAll } = PermissionService();
const item = ref<Permission[]>();
const { setTitle } = useAppMeta();
setTitle(`${t('post')} | ${t('app.name')}`);
onMounted(async () => {
  console.log('onMounted');
  const res = await findAll('');
  if (res) {
    item.value = res.dataList;
  }
});
</script>
