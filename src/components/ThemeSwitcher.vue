<template>
  <div>
    Current themeSetting :
    {{ langugeAndThemeStore.themeSetting + ' , ' + langugeAndThemeStore.theme }}
    <select v-model="langugeAndThemeStore.themeSetting">
      <option
        v-for="theme in availableThemes"
        :key="theme.key"
        :value="theme.key"
      >
        {{ theme.text }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableThemes } from '@/utils/theme';
const langugeAndThemeStore = useLangugeAndThemeStore();
</script>
