<template>
  <q-card flat bordered class="q-mb-md">
    <template
      v-if="
        item.searchType == 'POST' ||
        item.searchType == 'THEME' ||
        item.searchType == 'HASHTAG'
      "
    >
      <q-item :to="getLink">
        <q-item-section avatar top>
          <q-avatar color="primary" text-color="white" rounded size="100px">
            <q-icon :name="getIcon" />
          </q-avatar>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="3">
            <div v-html="text"></div>
          </q-item-label>
          <q-item-label v-if="item.userRefDto">
            <ProfileItem :button="false" :item="item.userRefDto"></ProfileItem>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="getType">
          <q-chip class="q-mt-md" color="primary" outline>
            {{ t(getType) }}
          </q-chip>
        </q-item-section>
      </q-item>
    </template>
    <template v-else-if="item.searchType == 'PROFILE'">
      <q-card-section>
        <q-item>
          <q-item-section v-if="item.avatar" avatar>
            <q-avatar rounded size="100px">
              <q-img :src="item.avatar?.thumbnail" />
            </q-avatar>
          </q-item-section>
          <q-item-section top>
            <template v-if="item.userRefDto">
              <q-item-label class="text-weight-bold cursor-pointer">
                <profile-name :user="item.userRefDto" color="text-black">
                </profile-name>
              </q-item-label>
              <q-item-label v-if="item.userRefDto.positionName" caption>
                {{ item.userRefDto.positionName }}
              </q-item-label>
            </template>
            <q-item-label v-else>
              <div class="text-h6">
                {{ item.searchResult }}
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section side v-if="getType">
            <q-chip class="q-mt-md" color="primary" outline>
              {{ t(getType) }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-card-section>
    </template>
  </q-card>
</template>
<script setup lang="ts">
import { PropType, computed, defineAsyncComponent } from 'vue';
import { ISearch } from '@/types/models';
import { useLang } from '@/composables/useLang';
import {
  biPeople,
  biPencil,
  biHash,
  biFileEarmarkText,
} from '@quasar/extras/bootstrap-icons';
const ProfileName = defineAsyncComponent(
  () => import('@/components/profile/ProfileName.vue'),
);
const ProfileItem = defineAsyncComponent(
  () => import('@/components/user/ProfileItem.vue'),
);
const props = defineProps({
  q: {
    type: String as PropType<string | null | undefined>,
    default: '',
  },
  item: {
    type: Object as PropType<ISearch>,
    default: () => null,
  },
});
const { t } = useLang();
const text = computed(() => {
  if (props.item && props.item.searchResult) {
    if (!props.q) {
      return props.item.searchResult;
    }
    return props.item.searchResult.replaceAll(
      props.q,
      `<span class='text-weight-bold text-blue'>${props.q}</span>`,
    );
  }
  return undefined;
});
const getIcon = computed(() => {
  if (props.item.searchType == 'PROFILE') {
    return biPeople;
  } else if (props.item.searchType == 'POST') {
    return biPencil;
  } else if (props.item.searchType == 'HASHTAG') {
    return biHash;
  } else if (props.item.searchType == 'THEME') {
    return biFileEarmarkText;
  }
  return undefined;
});
const getType = computed(() => {
  if (props.item.searchType == 'PROFILE') {
    return 'base.profile';
  } else if (props.item.searchType == 'POST') {
    return 'post';
  } else if (props.item.searchType == 'HASHTAG') {
    return 'base.hashtag';
  } else if (props.item.searchType == 'THEME') {
    return 'organizeTheme';
  }
  return undefined;
});
const getLink = computed(() => {
  if (props.item.searchType == 'POST') {
    return `/post/view/${props.item.searchId}`;
  } else if (props.item.searchType == 'HASHTAG') {
    return `/hashtag/${props.item.searchId}`;
  } else if (props.item.searchType == 'THEME') {
    return `/company-theme/post/${props.item.searchId}`;
  }
  return undefined;
});
</script>
