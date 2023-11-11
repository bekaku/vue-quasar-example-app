<template>
  <span>
    <ss-icon
      v-if="notifyType == 'LIKE_POST' || notifyType == 'LIKE_COMMENT'"
      :icon="getEmojiTypeIcon(emojiType)"
      :size="iconSize"
      color="color"
    ></ss-icon>
    <ss-icon
      v-else-if="notifyType == 'COMMENT_POST' || notifyType == 'COMMENT_REPLY'"
      icon="comment"
      :size="iconSize"
      color="color"
    ></ss-icon>
    <ss-icon
      v-else-if="notifyType == 'SHARE'"
      icon="share"
      :size="iconSize"
      color="color"
    ></ss-icon>
    <ss-icon
      v-else-if="notifyType == 'PRIZE_POST' || notifyType == 'PRIZE_COMMENT'"
      icon="prize"
      :size="iconSize"
      color="color"
    >
    </ss-icon>
    <template
      v-else-if="notifyType == 'LEARN_POST' || notifyType == 'LEARN_COMMENT'"
    >
      <ss-icon icon="emoji_learner" :size="iconSize" color="color"></ss-icon>
    </template>

    <ss-icon
      v-else-if="
        notifyType == 'USER_ACTION_POST' ||
        notifyType == 'USER_ACTION_COMMENT' ||
        notifyType == 'CANCEL_ACTION_ASSIGNEE' ||
        notifyType == 'ACTION_ASSIGNEE_UPDATE_PROGRESS' ||
        notifyType == 'ACTION_COMMANDER_UPDATE_PROGRESS' ||
        notifyType == 'USER_ACTION_TAKER_POST' ||
        notifyType == 'USER_ACTION_TAKER_COMMENT' ||
        notifyType == 'ACTION_ASSIGNEE_REJECT' ||
        notifyType == 'ACTION_ASSIGNEE_WARN_UPDATE'
      "
      icon="order"
      :size="iconSize"
      color="color"
    >
    </ss-icon>
    <ss-icon
      v-else-if="
        notifyType == 'USER_ADOPT_POST' || notifyType == 'USER_ADOPT_COMMENT'
      "
      icon="adopt"
      :size="iconSize"
      color="color"
    >
    </ss-icon>
    <ss-icon
      v-else-if="notifyType == 'FOLLOWER_FOR_POST'"
      icon="post"
      :size="iconSize"
      color="outline"
    >
    </ss-icon>
    <template
      v-else-if="
        notifyType == 'THEME_LEADER' ||
        notifyType == 'THEME_LEADER_PROGRESS' ||
        notifyType == 'THEME_POST' ||
        notifyType == 'THEME_OWNER_COMMENT_PROGRESS'
      "
    >
      <!-- <ss-icon icon="theme" :size="iconSize" color="outline"> </ss-icon> -->
      <q-icon
        :name="biFileEarmarkText"
        color="primary"
        style="font-size: 32px"
      ></q-icon>
    </template>
    <template v-else-if="notifyType == 'THEME_LEADER_APROVE'">
      <ss-icon icon="prize" :size="iconSize" color="color"> </ss-icon>
    </template>
    <template v-else-if="notifyType == 'HASHTAG_FOLLOW_POST'">
      <ss-icon icon="tag" :size="iconSize" color="outline"></ss-icon>
    </template>
    <template v-else-if="notifyType == 'REWARD_SHOP_TRADE'">
      <ss-icon icon="reward_trade" :size="iconSize" color="color"> </ss-icon>
    </template>
  </span>
</template>
<script setup lang="ts">
import { PropType, defineAsyncComponent } from 'vue';
import { NotifyFunctionType, EmojiType } from '@/types/models';
import { getEmojiTypeIcon } from '@/utils/appUtil';
import { biFileEarmarkText } from '@quasar/extras/bootstrap-icons';

const SsIcon = defineAsyncComponent(
  () => import('@/components/icon/SsIcon.vue'),
);
defineProps({
  notifyType: {
    type: String as PropType<NotifyFunctionType | undefined>,
    default: () => undefined,
  },
  emojiType: {
    type: String as PropType<EmojiType | undefined>,
    default: () => undefined,
  },
  iconSize: {
    type: Number,
    default: 36,
  },
});
</script>
