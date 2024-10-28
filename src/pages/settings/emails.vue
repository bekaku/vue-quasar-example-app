<template>
  <div class="q-pl-lg">
    <q-card flat bordered>
      <SettingEmail />
      <q-separator />
      <SettingPhone class="q-mt-md" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useAppMeta } from '@/composables/useAppMeta';
const SettingEmail = defineAsyncComponent(
  () => import('@/components/settings/SettingEmail.vue')
);
const SettingPhone = defineAsyncComponent(
  () => import('@/components/settings/SettingPhone.vue')
);
useAppMeta();
</script>
