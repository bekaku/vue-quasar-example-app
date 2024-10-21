<template>
  <q-list v-bind="$attrs" padding>
    <slot name="before"></slot>
    <template v-if="menuItems.length > 0">
      <template v-for="(item, index) in menuItems" :key="`parent-${index}`">
        <q-separator v-if="item.border" />
        <template v-if="item.header">
          <q-item-label header>
            {{ item?.translate !== false ? t(`${item.header}`) : item.header }}
          </q-item-label>
        </template>
        <template v-if="item.pages && item.pages.length > 0">
          <template v-for="(page, pageIndex) in item.pages" :key="`parent-${index}-page-${pageIndex}`">
            <template v-if="!page.items">
              <menu-item :dark-text="darkText" :light-text="lightText" :item="page"></menu-item>
            </template>
            <template v-else>
              <q-expansion-item :icon="page.icon" :label="page?.translate !== false ? t(`${page.title}`) : page.title"
                :default-opened="checkExpansionChildActive(currentUrlPath, page.items)" :expand-icon="mdiChevronDown" :expanded-icon="mdiChevronUp" expand-icon-class="text-muted">
                <q-list clickable v-ripple class="q-pl-sm">
                  <menu-item v-for="(pageItem, pageItemIndex) in page.items"
                    :key="`parent-${index}-page-${pageIndex}-sub-${pageItemIndex}`" :light-text="lightText"
                    :dark-text="darkText" :item="pageItem"></menu-item>
                </q-list>

              </q-expansion-item>
            </template>
          </template>
        </template>
      </template>
    </template>
    <slot name="after"></slot>
  </q-list>
</template>

<script setup lang="ts">
import MenuItem from '@/components/base/MenuItem.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { IMenu } from '@/types/models';
import { checkExpansionChildActive } from '@/utils/appUtil';
import { mdiChevronDown, mdiChevronUp } from '@quasar/extras/mdi-v7';
import { biChevronExpand, biChevronUp } from '@quasar/extras/bootstrap-icons';
import { computed } from 'vue';

const { menuItems, dark = false } = defineProps<{
  menuItems: IMenu[];
  darkText?: string;
  lightText?: string;
  dark?: boolean;
}>();
const { t } = useLang();
const { getCurrentPath } = useBase();
const currentUrlPath = computed(() => getCurrentPath(false));
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
    border-color: rgba(0, 0, 0, .24)
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
