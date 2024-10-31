<template>
    <q-item v-bind="$attrs" clickable>
        <q-item-section avatar top>
            <base-avatar v-if="authenStore.loginedAvatar" class="shadow-5" :src="authenStore.loginedAvatar" size="36px"/>
        </q-item-section>
        <q-item-section v-if="$q.screen.gt.xs">
            <q-item-label lines="1">
                <span class="cursor-pointer text-weight-bold">
                    {{ authenStore.loginedDisplay }}
                </span>
            </q-item-label>
            <q-item-label caption :lines="1">
                Sofware Engineer
            </q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-icon :name="biChevronExpand" size="16px" />
        </q-item-section>
        <q-menu>
            <q-list style="min-width: 260px">
                <q-item clickable v-close-popup :to="`/user/${authenStore.auth?.id}`">
                    <q-item-section avatar>
                        <base-avatar v-if="authenStore.loginedAvatar" :src="authenStore.loginedAvatar" size="36px"
                            rounded />
                        <q-icon v-else :name="biPersonSquare" />
                    </q-item-section>
                    <q-item-section>{{ t('base.yourProfile') }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                    <q-item-section avatar>
                      <q-icon
                        :name="langugeAndThemeStore.theme == 'dark' ? biMoon : biSun"
                      />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label lines="1">
                            {{ t('base.appearance') }} :
                            {{ t(`theme.${langugeAndThemeStore.theme}`) }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-icon :name="biChevronRight" />
                    </q-item-section>
                    <q-menu :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'" self="top start">
                        <q-list style="min-width: 150px">
                            <q-item clickable v-for="theme in availableThemes" :key="theme.key"
                                @click="langugeAndThemeStore.setThemeSetting(theme.key)">
                                <q-item-section avatar>
                                    <q-icon :name="theme.icon" />
                                </q-item-section>
                                <q-item-section>{{ t(theme.text) }}</q-item-section>
                                <q-item-section v-if="theme.key == langugeAndThemeStore.themeSetting" side>
                                    <q-icon :name="biCheck2" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-item>
                <q-item clickable>
                    <q-item-section avatar>
                        <q-icon :name="biTranslate" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label lines="1">
                            {{ t('base.language') }} :
                            {{ currenLocale ? currenLocale.name : '' }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-icon :name="biChevronRight" />
                    </q-item-section>
                    <q-menu :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'" self="top start">
                        <q-list style="min-width: 150px">
                            <q-item clickable v-for="lang in availableLocales" :key="lang.iso"
                                @click="langugeAndThemeStore.setLocale(lang.iso)">
                                <q-item-section>{{ lang.name }}</q-item-section>
                                <q-item-section v-if="lang.iso == langugeAndThemeStore.locale" side>
                                    <q-icon :name="biCheck2" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-item>

                <q-separator />
                <q-item clickable v-close-popup>
                    <q-item-section avatar>
                        <q-icon :name="biQuestionCircle" />
                    </q-item-section>
                    <q-item-section>{{ t('base.help') }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/settings">
                    <q-item-section avatar>
                        <q-icon :name="biGear" />
                    </q-item-section>
                    <q-item-section>{{ t('base.setting') }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="signOut">
                    <q-item-section avatar>
                        <q-icon :name="biBoxArrowRight" />
                    </q-item-section>
                    <q-item-section>{{ t('base.logout') }}</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-item>

</template>

<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useAuth } from '@/composables/useAuth';
import { useLang } from '@/composables/useLang';
import { availableLocales } from '@/utils/lang';
import { availableThemes } from '@/utils/theme';
import {
  biBoxArrowRight,
  biCheck2,
  biChevronExpand,
  biChevronRight,
  biGear,
  biMoon,
  biPersonSquare,
  biQuestionCircle, biSun,
  biTranslate
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useAuthenStore } from 'stores/authenStore';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { computed } from 'vue';
defineProps({
    hambergerMenu: {
        type: Boolean,
        default: true,
    },
    showLogo: {
        type: Boolean,
        default: true,
    },
    frontend: {
        type: Boolean,
        default: true,
    },
    showTogleDrawer: {
        type: Boolean,
        default: false,
    },
    reveal: {
        type: Boolean,
        default: false,
    },
    bordered: {
        type: Boolean,
        default: false,
    },
});
const $q = useQuasar();
const { t } = useLang();
const authenStore = useAuthenStore();
const langugeAndThemeStore = useLangugeAndThemeStore();
const { signOut } = useAuth();
const currenLocale = computed(() =>
    availableLocales.find((t) => t.iso == langugeAndThemeStore.locale),
);
</script>
