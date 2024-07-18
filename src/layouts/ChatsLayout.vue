<template>
    <q-layout view="hHh LpR fFf">
        <app-header bordered />
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
</script>