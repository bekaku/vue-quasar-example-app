<template>
  <q-item
    v-if="item"
    :to="notificationLink(item.functionCode, item.functionId)"
    @click="onClick"
    :class="
      isDark && !item.readStatus
        ? 'bg-grey-9'
        : !item.readStatus
        ? 'bg-light-blue-2'
        : ''
    "
  >
    <q-item-section avatar>
      <q-avatar size="48px">
        <template v-if="item.fromUser">
          <q-img
            :src="item.fromUser?.avatar?.thumbnail"
            spinner-color="white"
            no-native-menu
          />
        </template>
        <template v-else>
          <q-img src="/icon.png" spinner-color="white" no-native-menu />
        </template>
        <!-- <div class="absolute noti-icon">
          <notify-icon :notify-type="item.functionCode"></notify-icon>
        </div> -->
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="2">
        {{ item.message }}
      </q-item-label>
      <q-item-label caption>
        {{ appFormatDateDistance(item.createdDate) }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <!-- <div class="emoji-circle-icon"> -->
      <notify-icon
        :notify-type="item.functionCode"
        :emoji-type="item.emojiType"
      ></notify-icon>
      <!-- </div> -->
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import { PropType, defineAsyncComponent } from 'vue';
import { NotificationDto } from '@/types/models';
import { useBase } from '@/composables/useBase';
import { useNotification } from '@/composables/useNotification';
import UserNotifyService from '@/api/UserNotifyService';
const NotifyIcon = defineAsyncComponent(
  () => import('@/components/notification/NotifyIcon.vue'),
);
const props = defineProps({
  index: {
    type: Number,
  },
  item: {
    type: Object as PropType<NotificationDto>,
    default: () => null,
  },
});
const { updateReadNotify } = UserNotifyService();
const { notificationLink } = useNotification();
const { appFormatDateDistance, isDark } = useBase();
const emit = defineEmits(['on:click']);
const onClick = () => {
  if (!props.item.readStatus) {
    updateReadNotify(props.item.id);
  }
  emit('on:click', props.index);
};
</script>
<style lang="scss" scoped>
.emoji-circle-icon {
  // top: 30px;
  // left: 25px;
  border-radius: 100%;
  background-color: var(--emoji-icon-bg);
  width: 34px;
  height: 34px;
}
</style>
