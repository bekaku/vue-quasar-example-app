<script setup lang="ts">
const { cursorPointer = true } = defineProps<{
  cursorPointer?: boolean
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    v-ripple
    class="relative-position  q-hoverable"
    :class="{'cursor-pointer' : cursorPointer}"
  >
    <span class="q-focus-helper"></span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
