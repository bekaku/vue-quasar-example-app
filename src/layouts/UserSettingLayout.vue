<template>
  <q-layout view="hHh LpR fFf">
    <base-header :hamberger-menu="false" />
    <q-page-container class="wee-container-responsive-center">
      <q-page padding class="q-ma-md wee-bg-white">
        <div class="row">
          <div class="col-12 col-md-4">
            <user-setting-drawer />
          </div>

          <div class="col-12 col-md-8">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import BaseHeader from '@/components/base/BaseHeader.vue';
import UserSettingDrawer from '@/components/base/UserSettingDrawer.vue';
</script>
