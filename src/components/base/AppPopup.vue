<template>
  <q-menu :style="{width: `${width}px`}" :dark="dark || isDark">
    <div class="q-pa-md">
      <div class="q-mb-md">
        <slot>
          {{ title }}
        </slot>
      </div>
      <div class="q-mb-md text-center">
      <q-btn v-if="showConfirm"
             :color="confirmColor"
             :disable="disableConfirm"
             :label="labelConfirm ? labelConfirm : t('base.okay')"
             @click="onChange(true)"
             push
             v-close-popup
      />
      <q-btn v-if="showCancel"
             @click="onChange(false)"
             class="q-ml-sm"
             flat
             :color="cancelColor"
             :label="labelCancel ? labelCancel : t('base.cancel')"
             v-close-popup
      />
      </div>
      <slot name="extraButton"></slot>
    </div>
  </q-menu>
</template>

<script setup lang="ts">
/*
<app-popup
        :title="t('wiRequestApproveResendConfirm')"
        confirm-color="primary"
        @onChange="$emit('resend-approve',$event)"
      >
      </app-popup>
*/
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';

const { t } = useLang();
const { isDark } = useBase();


withDefaults(defineProps<{
  title?: string;
  width?: number;
  showConfirm?: boolean;
  disableConfirm?: boolean;
  confirmColor?: string;
  labelConfirm?: string;
  showCancel?: boolean;
  dark?: boolean;
  labelCancel?: string;
  cancelColor?: string;
}>(), {
  dark: false,
  showConfirm: true,
  disableConfirm: false,
  showCancel: true,
  confirmColor: 'primary',
  cancelColor: 'primary',
  width: 250
});
const emit = defineEmits<{
  onChange: [boolean];
  onOkay: [void];
  onCancel: [void];
}>();
const onChange = (status: boolean) => {
  emit('onChange', status);
  if(status){
    emit('onOkay');
  }else{
    emit('onCancel');
  }
};
</script>

<style scoped></style>
