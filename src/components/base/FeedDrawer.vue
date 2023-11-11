<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
    :side="side"
    bordered
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item
          v-for="link in links1"
          :key="link.text"
          :to="link.link"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="bi-file" label="Pages">
          <q-list class="q-pl-lg">
            <q-item to="/auth/login" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/auth/login2"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header class="text-weight-bold">Generic</q-item-label>
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>User Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/Maintenance"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-gear" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Maintenance</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label header class="text-weight-bold text-uppercase">
          More from Youtube
        </q-item-label>

        <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { mdiFruitPineapple } from '@quasar/extras/mdi-v7';
import { biHouseDoor } from '@quasar/extras/bootstrap-icons';
type ISideType = 'left' | 'right' | undefined;
defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String as PropType<ISideType>,
    default: 'left',
  },
});
const miniState = ref(true);
const langugeAndThemeStore = useLangugeAndThemeStore();
const links1 = [
  { icon: biHouseDoor, text: 'Home', link: '/' },
  { icon: mdiFruitPineapple, text: 'Pinia Store', link: '/pinia' },
  { icon: 'bi-translate', text: 'I18n', link: '/i18n' },
  {
    icon: 'bi-file-arrow-down',
    text: 'Fetch data',
    link: '/fetch-data',
  },
];
const links2 = [
  { icon: 'bi-folder2', text: 'Library' },
  { icon: 'bi-clock-history', text: 'History' },
  { icon: 'bi-clock', text: 'Watch later' },
  { icon: 'bi-hand-thumbs-up', text: 'Liked videos' },
];
const links3 = [
  { icon: 'bi-play-btn', text: 'Movies & Shows' },
  { icon: 'bi-cast', text: 'Gaming' },
  { icon: 'bi-tv', text: 'Live' },
];
const links4 = [
  { icon: 'bi-gear', text: 'Settings' },
  { icon: 'bi-flag', text: 'Report history' },
  { icon: 'bi-question-circle', text: 'Help' },
  { icon: 'bi-info-square', text: 'Send feedback' },
];
</script>
<style lang="sass">
.menu-list .q-item
  border-radius: 0 32px 32px 0
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
</style>
