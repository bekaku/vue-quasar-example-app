<template>
  <!-- class="text-capitalize app-text-link btn--no-hover" -->
  <q-btn
    type="a"
    align="left"
    :class="!$q.dark.isActive ? color : colorDark"
    class="text-capitalize app-text-link btn--no-hover"
    dense
    flat
    :to="to"
    :href="href ? href : undefined"
    :target="external ? '_blank' : undefined"
    :label="label"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IHrefTarget } from '@/types/common';
// import { openUrlInNewTab } from '@/utils/appUtil';
// import {useBase} from '@/composables/useBase';
defineProps({
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
// const { appGoto } = useBase();
// const onOpen = (event: any) => {
//   if (props.to) {
//     appGoto(props.to);
//   } else if (props.href) {
//     openUrlInNewTab(props.href, props.external ? '_blank' : '_self', event);
//   }
//   if (event) {
//     event.stopImmediatePropagation();
//   }
// };
</script>
<style lang="scss" scoped></style>
