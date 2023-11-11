<template>
  <q-card flat bordered class="wee-container-responsive-center">
    <q-card-section>
      <slot name="crudFromToolbar">
        <q-toolbar>
          <q-btn
            v-if="isHaveListPermission && showBack"
            @click="$emit('on-back')"
            flat
            round
            :icon="biArrowLeft"
          >
            <q-tooltip>
              {{ t('base.back') }}
            </q-tooltip>
          </q-btn>
          <q-toolbar-title>
            <template v-if="crudAction && showActionText">
              {{
                crudAction === 'new'
                  ? t('base.addNew')
                  : crudAction === 'view'
                  ? t('base.edit')
                  : t('base.copy')
              }}
            </template>
            {{ title }}
          </q-toolbar-title>
          <slot name="toolbarAction">
            <q-icon size="md" :name="icon" />
          </slot>
        </q-toolbar>
      </slot>
    </q-card-section>
    <slot name="crudFrom">
      <q-form @submit="$emit('on-submit')" class="q-gutter-md">
        <slot name="crudFromContent"> </slot>

        <slot name="crudAction">
          <q-separator />
          <q-card-section align="center" class="q-gutter-sm">
            <q-btn
              v-if="isHaveManagePermission && showEdit"
              unelevated
              :icon="biPencil"
              :label="
                t('base.save') + (crudAction === 'view' ? t('base.edit') : '')
              "
              type="submit"
              color="primary"
              :loading="loading"
            />
            <q-btn
              v-if="
                crudAction === 'view' && isHaveManagePermission && showDelete
              "
              unelevated
              :icon="biTrash"
              :label="t('base.delete')"
              color="negative"
              :loading="loading"
              @click="$emit('on-delete')"
            />

            <q-btn
              v-if="isHaveListPermission && showBack"
              :label="t('base.cancel')"
              @click="$emit('on-back')"
              color="primary"
              flat
              class="q-ml-sm"
              :disable="loading"
            />
            <slot name="additionalCrudAction"> </slot>
          </q-card-section>
        </slot>
      </q-form>
    </slot>
  </q-card>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { ICrudAction } from '@/types/common';
import { usePermissionStore } from '@/stores/permissionStore';
import {
  biFile,
  biArrowLeft,
  biTrash,
  biPencil,
} from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  crudName: {
    type: String,
    default: '',
  },
  managePermission: {
    type: String,
    default: '',
  },
  listPermission: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: biFile,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  crudAction: {
    type: String as PropType<ICrudAction>,
    default: undefined,
  },
  isFrontend: {
    type: Boolean,
    default: false,
  },
  showActionText: {
    type: Boolean,
    default: true,
  },
});
defineEmits(['on-back', 'on-submit', 'on-delete']);
const { t } = useLang();
const permissionStore = usePermissionStore();
const isHaveManagePermission = computed(() => {
  if (!props.isFrontend) {
    return props.managePermission
      ? permissionStore.isHavePermission(props.managePermission)
      : props.crudName
      ? permissionStore.isHavePermission(`${props.crudName}_manage`)
      : true;
  }
  return props.managePermission
    ? permissionStore.isHaveFrontendPermission(props.managePermission)
    : props.crudName
    ? permissionStore.isHaveFrontendPermission(`${props.crudName}_manage`)
    : true;
});
const isHaveListPermission = computed(() => {
  if (!props.isFrontend) {
    return props.listPermission
      ? permissionStore.isHavePermission(props.listPermission)
      : props.crudName
      ? permissionStore.isHavePermission(`${props.crudName}_list`)
      : true;
  }
  return props.listPermission
    ? permissionStore.isHaveFrontendPermission(props.listPermission)
    : props.crudName
    ? permissionStore.isHaveFrontendPermission(`${props.crudName}_list`)
    : true;
});
</script>
