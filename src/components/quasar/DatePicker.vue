<template>
  <!-- :readonly="!required"
  :rules="required ? [required] : undefined"
  -->
  <q-field outlined bottom-slots :label="title" stack-label>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ convertDateFormatToThai(modelValue) }}
      </div>
    </template>
    <template v-slot:append>
      <q-btn flat round :icon="biCalendarWeek" :disable="disable" color="primary" dense>
        <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
        <q-popup-proxy ref="dateProxy" transition-show="scale" transition-hide="scale">
          <!--          @update:model-value="(value: any) => (dateProxy.hide())"-->
          <q-date v-model="modelValue" mask="YYYY-MM-DD" :first-day-of-week="0" :locale="datePickerLocale"
            @update:model-value="onClosePicker" :options="dateList.length > 0 ? limitDates : options">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>
    <template v-slot:after>
      <q-btn v-if="modelValue" flat round :icon="biX" size="xs" @click="clear" />
    </template>
    <template v-slot:hint v-if="required && !modelValue">
      <span class="text-negative">
        {{ t('error.validateRequireChoose') }}
      </span>
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { biCalendarWeek, biX } from '@quasar/extras/bootstrap-icons';
import { useBase } from '@/composables/useBase';
import { convertDateFormatToThai } from '@/utils/dateUtil';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  minDate: {
    type: String, //yyy-mm-dd 2022-06-16
    default: undefined
  },
  maxDate: {
    type: String, //yyy-mm-dd 2022-06-16
    default: undefined
  },

  dateList: {
    type: Array as PropType<string[]>, //['2022-06-01','2022-06-16','2022-06-20','2022-06-30']
    default: () => []
  },
  dense: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});
const modelValue = defineModel<string | undefined | null>();
const dateProxy = ref<any>(null);
const emit = defineEmits(['update:modelValue']);
const limitDates = props.dateList?.map((item: any) => {
  return item.replaceAll('-', '/');
});

const { t } = useLang();
const { datePickerLocale } = useBase();
const clear = () => {
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
  } else if (props.maxDate) {
    return date <= props.maxDate.replaceAll('-', '/');
  }

  return true;
};
const onClosePicker = (value: any) => {
  if (dateProxy.value) {
    dateProxy.value.hide();
  }
};
</script>
