<template>
  <q-card flat>
    <q-form @submit="onSubmit" ref="formPwd">
      <!-- <div class="q-pa-md text-center">
        <div class="text-body1">
          {{ t('authen.forgotPwdTitle') }}
        </div>
        <div class="text-subtitle2 text-muted">
          {{ t('authen.forgotPwdSubtitle') }}
        </div>
      </div> -->
      <q-card-section>
        <app-alert
          dense
          type="is-warning"
          :icon="biShieldLock"
          :message="t('authen.helper2')"
          radius
          class="q-mb-md"
        >
        </app-alert>
        <div class="row">
          <div v-if="showCurrentPassword" class="col-12 col-md-12">
            <q-input
              :readonly="loading"
              outlined
              dense
              autocomplete="off"
              v-model="currentPassword"
              :type="showPassword ? 'text' : 'password'"
              :label="t('authen.currentPassword')"
              :rules="[(val) => requireField(val, t('authen.currentPassword'))]"
            >
              <template v-slot:prepend>
                <q-icon :name="biShieldLock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? biEye : biEyeSlash"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12 q-py-sm">
            <q-input
              class="q-pt-md"
              :readonly="loading"
              outlined
              dense
              autocomplete="off"
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
              :label="t('authen.newPassword')"
              :rules="[
                (val) => requireField(val, t('authen.newPassword')),
                (val) => validatePasswordStrongV2(val) || t('authen.helper2'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template v-slot:append>
                <q-icon v-if="isValidPwd" :name="biCheck" color="positive" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              class="q-pt-md"
              :readonly="loading"
              outlined
              dense
              autocomplete="off"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              :label="t('authen.confirmPassword')"
              :rules="[
                (val) => requireField(val, t('authen.confirmPassword')),
                (val) =>
                  validateTheSamePwd(val) || t('error.passwordNotMatchNew'),
              ]"
            >
              <template v-slot:prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template v-slot:append>
                <q-icon v-if="isSamePwd" :name="biCheck" color="positive" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="showLogout">
        <div>
          <q-checkbox
            v-model="logoutAllDevice"
            :label="t('authen.logoutAll')"
          />
        </div>
      </q-card-section>

      <q-card-actions :align="actionAlign">
        <q-btn unelevated type="submit" color="primary" :label="submitLabel" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import {
  biCheck,
  biLock,
  biShieldLock,
  biEye,
  biEyeSlash,
} from '@quasar/extras/bootstrap-icons';
import { computed, defineAsyncComponent, ref } from 'vue';
const AppAlert = defineAsyncComponent(
  () => import('@/components/base/AppAlert.vue'),
);
interface Props {
  submitLabel?: string;
  actionAlign?: 'center' | 'left' | 'right';
  showCurrentPassword?: boolean;
  showLogout?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  actionAlign: 'center',
  showCurrentPassword: false,
  showLogout: false,
});
const { t } = useLang();
const { validatePasswordStrongV2, requireField } = useValidation();
const showPassword = ref(false);

const currentPassword = defineModel<string>('currentPassword');
const newPassword = defineModel<string>('newPassword');
const logoutAllDevice = defineModel<boolean>('logoutAllDevice');
const loading = defineModel<boolean>('loading');

const confirmPassword = ref('');
const emit = defineEmits<{
  onSubmit: [void];
}>();
const validateTheSamePwd = (pwd: string) => pwd === newPassword.value;
const isValidPwd = computed(() =>
  newPassword.value ? validatePasswordStrongV2(newPassword.value) : false,
);
const isSamePwd = computed(
  () =>
    confirmPassword.value &&
    newPassword.value &&
    newPassword.value === confirmPassword.value,
);
const onSubmit = () => {
  if (!newPassword.value) {
    return;
  }
  emit('onSubmit');
};
</script>

<style scoped></style>
