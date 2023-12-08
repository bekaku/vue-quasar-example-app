<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
    :bordered="bordered"
  >
    <q-scroll-area class="fit">
      <div
        class="text-left q-pa-xs"
        :class="{ 'drawer-card-header': !$q.dark.isActive }"
      >
        <q-btn
          flat
          no-caps
          no-wrap
          class="q-mr-xs full-width"
          :ripple="false"
          to="/"
        >
          <q-avatar style="height: 45px; width: auto" square>
            <img
              :src="
                !$q.dark.isActive
                  ? '/logo/logo-black.png'
                  : '/logo/logo-white.png'
              "
            />
          </q-avatar>
          <q-badge class="q-ml-xs" align="top">{{ t('base.admin') }}</q-badge>
        </q-btn>
      </div>
      <q-list padding>
        <template v-if="drawerStore.drawers.length > 0">
          <template
            v-for="(item, index) in drawerStore.drawers"
            :key="`backend-drawer-${index}`"
          >
            <q-separator v-if="item.border" class="q-my-md" />
            <template v-if="item.header">
              <q-item-label header>
                {{ t(`${item.header}`) }}
              </q-item-label>
            </template>
            <template v-if="item.pages && item.pages.length > 0">
              <template
                v-for="(page, pageIndex) in item.pages"
                :key="`backend-drawer-page-${index}-${pageIndex}`"
              >
                <template v-if="!page.items">
                  <q-item
                    :to="page.to"
                    v-ripple
                    clickable
                    :active-class="
                      page.noActiveLink
                        ? 'q-item-no-link-highlighting'
                        : 'active-menu-link'
                    "
                  >
                    <q-item-section avatar>
                      <q-icon
                        :color="$q.dark.isActive ? 'white' : 'black'"
                        :name="page.icon"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ t(`${page.title}`) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-else>
                  <q-expansion-item
                    :icon="page.icon"
                    :label="t(`${page.title}`)"
                    :default-opened="
                      checkExpansionChildActive(currentUrlPath, page.items)
                    "
                  >
                    <q-list clickable v-ripple class="q-pl-lg">
                      <q-item
                        v-for="(pageItem, pageItemIndex) in page.items"
                        :key="`backend-drawer-page-item-${index}-${pageIndex}-${pageItemIndex}`"
                        :to="pageItem.to"
                        :active-class="
                          pageItem.noActiveLink
                            ? 'q-item-no-link-highlighting'
                            : 'active-menu-link'
                        "
                      >
                        <q-item-section avatar>
                          <q-icon :name="pageItem.icon" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{
                            t(`${pageItem.title}`)
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-expansion-item>
                </template>
              </template>
            </template>
          </template>
        </template>
        <q-separator class="q-mb-md" />
        <q-item clickable to="/feed">
          <q-item-section avatar>
            <q-icon :name="biNewspaper" />
          </q-item-section>
          <q-item-section>Social Feed</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon :name="biQuestionCircle" />
          </q-item-section>
          <q-item-section>{{ t('base.help') }}</q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar>
            <q-icon :name="biGear" />
          </q-item-section>
          <q-item-section>{{ t('base.setting') }}</q-item-section>
        </q-item>
        <q-separator class="q-mt-md q-mb-lg" />
        <div
          class="q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons1"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons2"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a class="YL__drawer-footer-link" href="javascript:void(0)">
              {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
            </a>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { getYearNow } from '@/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import { checkExpansionChildActive } from '@/utils/appUtil';
import { useDrawerStore } from '@/stores/drawerStore';
import { useBase } from '@/composables/useBase';
import {
  biQuestionCircle,
  biGear,
  biNewspaper,
} from '@quasar/extras/bootstrap-icons';
export default defineComponent({
  name: 'AppDrawer',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { getCurrentPath } = useBase();
    const drawerStore = useDrawerStore();
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    const currentUrlPath = getCurrentPath(false);
    return {
      biNewspaper,
      biQuestionCircle,
      biGear,
      langugeAndThemeStore,
      getYearNow,
      t,
      drawerStore,
      checkExpansionChildActive,
      currentUrlPath,
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
      ],
    };
  },
});
</script>
<style lang="sass">
.active-menu-link
  color: $primary
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
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      text-decoration: underline
</style>
