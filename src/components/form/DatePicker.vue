<template>
  <!-- :readonly="!dateRequired" 
  :rules="dateRequired ? [required] : undefined"
  -->
  <q-field outlined bottom-slots :label="title" stack-label>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ convertDateFormatToThai(modelValue) }}
      </div>
    </template>
    <template v-slot:append>
      <q-btn
        flat
        round
        :icon="biCalendarWeek"
        :disable="disable"
        color="primary"
        dense
      >
        <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
        <q-popup-proxy
          ref="q-date-search"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :model-value="modelValue"
            mask="YYYY-MM-DD"
            :locale="datePickerLocale"
            @update:model-value="(value: any) => (modelValue = value)"
            :options="dateList.length > 0 ? limitDates : options"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                :label="t('base.close')"
                color="primary"
                flat
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>
    <template v-slot:after>
      <q-btn
        v-if="modelValue"
        flat
        round
        :icon="biX"
        size="xs"
        @click="clear"
      />
    </template>
    <template v-slot:hint v-if="dateRequired && !modelValue">
      <span class="text-negative">
        {{ t('error.validateRequireField') }}
      </span>
    </template>
  </q-field>
  <!-- <q-input
    outlined
    readonly
    :dense="dense"
    :model-value="dateModel"
    :disable="disable"
    :label="title"
    bottom-slots
  >
    <template v-slot:append>
      {{ convertDateFormatToThai(dateModel) }}
      <q-icon
        v-if="!disable"
        :name="biCalendarWeek"
        color="primary"
        class="cursor-pointer"
      >
        <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
        <q-popup-proxy
          ref="q-date-search"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :model-value="dateModel"
            mask="YYYY-MM-DD"
            :locale="datePickerLocale"
            @update:model-value="(value: any) => (dateModel = value)"
            :options="dateList.length > 0 ? limitDates : options"
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                :label="t('base.close')"
                color="primary"
                flat
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:after>
      <q-btn
        v-if="modelValue"
        flat
        round
        :icon="biX"
        size="xs"
        @click="clear"
      />
    </template>
    <template v-slot:hint v-if="dateRequired && !modelValue">
      <span class="text-negative">
        {{ t('error.validateRequireField') }}
      </span>
    </template>
  </q-input> -->
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { biCalendarWeek, biX } from '@quasar/extras/bootstrap-icons';
import { useBase } from '@/composables/useBase';
import { convertDateFormatToThai } from '@/utils/dateUtil';
// import { useValidation } from '@/composables/UseValidation';
const props = defineProps({
  // modelValue: String as PropType<string | undefined | null>,
  title: {
    type: String,
    default: '',
  },
  minDate: {
    type: String, //yyy-mm-dd 2022-06-16
    default: undefined,
  },
  maxDate: {
    type: String, //yyy-mm-dd 2022-06-16
    default: undefined,
  },

  dateList: {
    type: Array as PropType<string[]>, //['2022-06-01','2022-06-16','2022-06-20','2022-06-30']
    default: () => [],
  },
  dense: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  dateRequired: {
    type: Boolean,
    default: false,
  },
});
const modelValue = defineModel<string | undefined | null>();
// const dateModel = computed({
//   get: () => props.modelValue,
//   set: (val) => emit('update:modelValue', val),
// });
const emit = defineEmits(['update:modelValue']);
const limitDates = props.dateList.map((item: any) => {
  return item.replaceAll('-', '/');
});

const { t } = useLang();
const { datePickerLocale } = useBase();
// const { required } = useValidation();
const clear = () => {
  // emit('update:modelValue', '');
  modelValue.value = '';
};
const options = (date: string) => {
  if (props.minDate && props.maxDate) {
    return (
      date >= props.minDate.replaceAll('-', '/') &&
      date <= props.maxDate.replaceAll('-', '/')
    );
  } else if (props.minDate) {
    return date >= props.minDate.replaceAll('-', '/');
    //return date >= formatDateBy(convertStringToDate(props.minDate), FORMAT_DATE10);
  } else if (props.maxDate) {
    return date <= props.maxDate.replaceAll('-', '/');
  }

  return true;
};
</script>
