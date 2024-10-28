<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Button </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>

                <div class="q-pa-md q-gutter-sm">
                    <ui-button label="Primary" color="primary"></ui-button>
                    <ui-button label="Unelevated" unelevated color="primary"></ui-button>
                    <ui-button label="Outline" outline></ui-button>
                    <ui-button color="white" :unelevated="false" text-color="black" label="Standard"></ui-button>
                    <ui-button color="secondary" label="Secondary"></ui-button>
                    <ui-button color="amber" glossy label="Amber"></ui-button>
                    <ui-button color="brown-5" label="Brown 5"></ui-button>
                    <ui-button color="black" label="Black"></ui-button>
                    <ui-button label="Flat" flat></ui-button>
                    <ui-button label="Icon Left" color="negative" :icon="biGear"></ui-button>
                    <ui-button label="Icon Right" color="warning" :icon-right="biNewspaper"></ui-button>
                    <ui-button label="Icon Both" :icon="biPerson" :icon-right="biQuestionCircle"></ui-button>
                    <ui-button :icon="biPhone" label="Stacked" stack color="purple" />

                    <ui-button round color="primary" :icon="biShop" />
                    <ui-button push color="primary" label="Push Btn" />
                    <ui-button color="amber" square label="Square"></ui-button>
                    <ui-button flat rounded color="primary" label="Flat Rounded" />
                    <ui-button rounded color="teal" label="Rounded" />
                    <ui-button round>
                        <q-avatar size="42px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </ui-button>
                    <ui-button no-caps>
                        Multiline<br>Button
                    </ui-button>
                    <ui-button style="width: 200px">
                        <div class="ellipsis">
                            This is some very long text that is expected to be truncated
                        </div>
                    </ui-button>


                    <ui-button align="left" class="btn-fixed-width" color="primary" label="Align to left" />
                    <ui-button align="right" class="btn-fixed-width" color="secondary" label="Align to right" />
                    <ui-button align="between" class="btn-fixed-width" color="accent" label="Align between"
                        :icon="biAirplane" />
                    <ui-button align="around" class="btn-fixed-width" color="brown-5" label="Align around"
                        :icon="biLightbulb" />

                    <ui-button label="Size xs" size="xs"></ui-button>
                    <ui-button label="Size sm" size="sm"></ui-button>
                    <ui-button label="Size md" size="md"></ui-button>
                    <ui-button label="Size lg" size="lg"></ui-button>
                    <ui-button label="Size xl" size="xl"></ui-button>
                    <ui-button label="Size PX" size="50px"></ui-button>
                    <ui-button label="Click for Loading" :loading="progress" @click="progress = true">
                    </ui-button>
                    <ui-button label="Stop loading" color="negative" @click="progress = false"></ui-button>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import UiButton from '@/components/quasar/Button.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import {
    biAirplane,
    biGear,
    biLightbulb,
    biNewspaper,
    biPerson,
    biPhone,
    biQuestionCircle,
    biShop
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Button | ${t('app.name')}`);
const progress = ref(false);
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>