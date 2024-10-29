<script setup lang="ts">

import { biAt, biBook, biEmojiSmile, biImage, biSend, biPaperclip } from '@quasar/extras/bootstrap-icons';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
import {useAuthenStore} from '@/stores/authenStore'
const {t} = useLang();
const message = ref<string>();
const authenStore = useAuthenStore();
const onSubmit=(ev: any)=>{
  if (ev && ev.shiftKey) {
    return;
  }
  console.log('onSubmit', message.value);
  message.value = '';
}
</script>

<template>
  <q-item v-bind="$attrs" dense class="q-pa-none q-mt-md">
    <q-item-section side v-if="authenStore?.auth?.avatar?.thumbnail">
      <base-avatar :src="authenStore?.auth?.avatar?.thumbnail"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <q-input
          v-bind="$attrs"
          outlined
          v-model="message"
          type="textarea"
          autogrow
          :label="t('chats.typeMessage')"
          class="input-emoji"
          @keyup.enter="onSubmit"
          @keyup.shift.enter="onSubmit"
          dense
        >
          <template #after>
            <q-btn flat round :icon="biSend" color="primary"></q-btn>
          </template>
          <template #append>
            <q-btn
              dense
              flat
              round
              :icon="biEmojiSmile"
              size="sm"
            >
            </q-btn>
            <q-btn
              dense
              flat
              round
              :icon="biPaperclip"
              size="sm"
            >
              <q-tooltip>
                {{ t('base.chooseFile') }}
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              round
              :icon="biBook"
              size="sm"
              class="text-capitalize"
            >
              <q-tooltip>
                {{ t('wiSuggest') }}
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.input-bg {
  background-color: #fff;
  padding: 15px 15px;
  border-radius: 10px;
}
body.body--dark {
  .input-bg {
    background-color: var(--color-dark-900);
  }
}
</style>
