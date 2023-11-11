<template>
  <app-dialog
    :model-value="show"
    :full-width="false"
    :title="title"
    @on-close="onClose()"
    @on-hide="onClose()"
    :persistent="false"
    :icon="biPeople"
    transition-show="fade"
    dialog-style="width: 550px; max-width: 95vw"
  >
    <div class="row">
      <div class="col-12 q-pa-md">
        <q-input
          dense
          v-model="filterText"
          :label="t('base.search')"
          clearable
          rounded
          outlined
        >
          <template v-slot:prepend>
            <q-icon :name="biSearch" />
          </template>
        </q-input>
      </div>
    </div>
    <!-- <q-scroll-area style="height: 65vh"> 
      
     <profile-item
        v-for="(item, index) in filterItems"
        :key="index"
        :item="item"
        @on-select="$emit('on-select', item)"
      >
      </profile-item>
    -->
    <q-virtual-scroll
      style="max-height: 450px"
      :items="filterItems"
      v-slot="{ item, index }"
    >
      <profile-item
        :key="index"
        :item="item"
        @on-select="$emit('on-select', item)"
      >
      </profile-item>
    </q-virtual-scroll>
    <!-- </q-scroll-area> -->
  </app-dialog>
</template>
<script setup lang="ts">
import { PropType, defineAsyncComponent, computed, ref } from 'vue';
import { UserProfileDto } from '@/types/models';
import { useLang } from '@/composables/useLang';
import { biPeople, biSearch } from '@quasar/extras/bootstrap-icons';
const ProfileItem = defineAsyncComponent(
  () => import('@/components/user/ProfileItem.vue'),
);
const AppDialog = defineAsyncComponent(
  () => import('@/components/base/AppDialog.vue'),
);
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
  items: {
    type: Array as PropType<UserProfileDto[]>,
  },
  title: {
    type: String,
  },
  exceptUserId: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
});
const { t } = useLang();
const filterText = ref<string | null | undefined>('');
const emit = defineEmits(['on-close', 'update:modelValue', 'on-select']);
const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
const filterItems = computed(() => {
  if (!props.items) {
    return [];
  }
  const search = filterText.value
    ? filterText.value.toLowerCase().trim()
    : undefined;
  if (!search) {
    if (props.exceptUserId) {
      return props.items.filter((t) => t.id != props.exceptUserId);
    }
    return props.items;
  }
  if (props.exceptUserId) {
    return props.items.filter(
      (c) =>
        c &&
        c.fullName &&
        c.fullName.toLowerCase().includes(search) &&
        c.id != props.exceptUserId,
    );
  }
  return props.items.filter(
    (c) => c && c.fullName && c.fullName.toLowerCase().includes(search),
  );
});
const onClose = () => {
  filterText.value = '';
  emit('on-close');
  show.value = false;
};
</script>
