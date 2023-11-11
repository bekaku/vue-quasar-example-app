<template>
  <a
    href="javascript:void(0)"
    @click="onGo"
    class="app-text-link"
    :class="!$q.dark.isActive ? color : colorDark ? colorDark : color"
    >{{ label }}</a
  >
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useBase } from '@/composables/useBase';
import { IHrefTarget } from '@/types/common';
import { openUrlInNewTab } from '@/utils/appUtil';

const props = defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'text-muted',
  },
  colorDark: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<IHrefTarget>,
    default: '_blank',
  },
});
const { WeeGoTo } = useBase();
const onGo = () => {
  if (props.href && props.external) {
    openUrlInNewTab(props.href, props.target);
  } else if (props.to) {
    WeeGoTo(props.to);
  }
};
</script>
