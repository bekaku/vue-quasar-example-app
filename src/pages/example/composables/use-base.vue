<template>
  <q-page padding>
    <q-card flat bordered class="content-limit">
      <q-card-section>
        <q-toolbar>
          <q-toolbar-title> Use base</q-toolbar-title>
          <q-space />
        </q-toolbar>
        <q-separator />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-btn
          label="show loading"
          color="primary"
          unelevated
          @click="loader"
        />
        <q-btn label="show toast" color="warning" @click="toaster" />
        <q-btn label="show confirm" color="negative" @click="confirm" />
        <q-btn label="show confirm Custom Btn" @click="confirm2" />
        <q-input v-model="textModel" outlined style="width: 250px">
          <template v-slot:append>
            <q-btn flat round :icon="biCopy" @click="onCopyText">
            </q-btn>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { biCopy } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';

const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Use base | ${t('app.name')}`);

const { appLoading, appToast, appConfirm, writeToClipboard } = useBase();
const textModel = ref<string>('Text to copy');
const confirm = async () => {
  const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
  if (conf) {
    appToast('Confirm', { type: 'positive', multiLine: false });
  } else {
    appToast('Cancel', { type: 'negative', multiLine: false });
  }
};
const confirm2 = async () => {
  const conf = await appConfirm(
    t('app.monogram'),
    t('base.deleteConfirm'),
    {
      textColor: 'white',
      flat: false,
      noCaps: true,
      color: 'positive',
      label: 'Acknowledge',
    },
    {
      textColor: 'white',
      flat: false,
      color: 'negative',
      label: 'Just text',
      noCaps: true,
    },
  );
  console.log(conf);
};
const loader = () => {
  appLoading();
  setTimeout(() => {
    appLoading(false);
  }, 3000);
};
const toaster = () => {
  appToast('this is a toast', {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    multiLine: false,
    color: 'primary',
    timeout: 5000,
    position: 'right',
  });
};
const onCopyText = async () => {
  await writeToClipboard(textModel.value);
};
</script>

<style lang="scss" scoped></style>
