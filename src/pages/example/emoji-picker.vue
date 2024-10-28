<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Emoji picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>



                <q-input outlined v-model="message" type="textarea" autogrow label="Type message">
                    <template #prepend>
                        <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
                    </template>
                    <template #before>
                        <ui-button round flat :icon="biImage" color="grey-7" />
                        <q-no-ssr>
                            <q-btn round flat :icon="biEmojiSmile" color="grey-7">
                                <q-menu>
                                    <app-emoji-picker :picker-id="`emo-${contentID}`"
                                        :theme="$q.dark.isActive ? 'dark' : 'light'" @on:emojiClick="onEmojiClick">
                                    </app-emoji-picker>
                                </q-menu>
                            </q-btn>
                        </q-no-ssr>
                    </template>
                    <template #after>
                        <ui-button flat round :icon="biSend" color="primary">
                            <q-tooltip>
                                Send
                            </q-tooltip>
                        </ui-button>
                    </template>
                </q-input>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import AppEmojiPicker from '@/components/base/AppEmojiPicker.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import UiButton from '@/components/quasar/Button.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import { biEmojiSmile, biImage, biSend } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { ref, useId } from 'vue';

const authenStore = useAuthenStore();
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`File picker | ${t('app.name')}`);
const $q = useQuasar();
const contentID = useId();
const message = ref();
const onEmojiClick = (emoji: string) => {
    if (!message.value) {
        message.value = '';
    }
    message.value += emoji;
};
</script>

<style lang="scss" scoped></style>