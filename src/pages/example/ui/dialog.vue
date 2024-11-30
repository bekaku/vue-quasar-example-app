<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section class="q-gutter-md">
                <div class="text-h6">Dialog</div>
                <q-separator />
                <UiButton label="Dialog" @click="dialog = true" />
                <UiButton label="Dialog persistent" @click="dialog2 = true" />

                <p>Size</p>
                <UiButton label="Small" @click="dialogSmall = true" />
                <UiButton label="Medium" @click="dialogMedium = true" />
                <UiButton label="Full Width" @click="dialogFullWidth = true" />
                <UiButton label="Full Height" @click="dialogFullHeight = true" />
                <UiButton label="Full Width and Height" @click="dialogFullWidthHeight = true" />
                <UiButton label="Maximize" @click="dialogMaximize = true" />
            </q-card-section>

            <q-card-section class="q-gutter-md">
                <div class="text-h6">Pop confirm</div>
                <q-separator />
                <UiButton label="Delete item" color="negative" :icon="biTrash">
                    <base-pop-confirm :title="t('base.deleteConfirm')" confirm-color="negative"
                        @onChange="onPopConfirmChange">
                    </base-pop-confirm>
                </UiButton>

                <UiButton label="Custom label">
                    <base-pop-confirm title="Custom label" confirm-color="teal" label-confirm="Custom confirm"
                        cancelColor="grey" label-cancel="Blaa" @onChange="onPopConfirmChange">
                    </base-pop-confirm>
                </UiButton>
                <UiButton label="More custom">
                    <base-pop-confirm title="Addon label" @onChange="onPopConfirmChange" width="350px">
                        <q-input v-model="text" outlined label="This input overide title prop" />
                        <template #bottom>
                            bottom slot
                        </template>
                    </base-pop-confirm>
                </UiButton>
            </q-card-section>

            <q-card-section class="q-gutter-md">
                <div class="text-h6">Menu</div>
                <q-separator />
                <q-btn dense :icon="biThreeDots" flat label="Show menu">
                    <base-menu :items="menus" @on-click="onMenuClick"></base-menu>
                </q-btn>
                <q-item clickable>
                    <q-item-section>
                        Q-item Menu v-model
                    </q-item-section>
                    <q-item-section side>
                        <q-btn dense :icon="biThreeDots" round flat @click="openMenu($event)"></q-btn>
                        <q-menu v-model="showMenu" cover anchor="top middle">
                            <base-menu-item v-for="(item, index) in menus2" :key="`app-menu-${item.value}-${index}`"
                                :item="item" @click="onMenuClick(item.value)" v-close-popup /> 
                            </q-menu>
                    </q-item-section>
                </q-item>
            </q-card-section>
        </q-card>

        <base-dialog v-if="dialog" v-model="dialog" title="Dialog title" :icon="biPencil">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.

            </q-card-section>
        </base-dialog>

        <base-dialog v-if="dialog2" v-model="dialog2" title="Dialog persistent" :persistent="true">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
            <q-card-actions align="right">
                <q-btn noCaps flat label="Cancel" color="primary" v-close-popup />
                <q-btn noCaps flat label="Turn on Wifi" color="negative" v-close-popup />
            </q-card-actions>
        </base-dialog>

        <base-dialog v-if="dialogSmall" v-model="dialogSmall" title="Dialog Small" dialog-style="width: 300px;">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogMedium" v-model="dialogMedium" title="Dialog Medium"
            dialog-style="width: 700px; max-width: 80vw;">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogFullWidth" v-model="dialogFullWidth" title="Dialog fullWidth" fullWidth>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogFullHeight" v-model="dialogFullHeight" title="Dialog fullHeight" fullHeight>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogFullWidthHeight" v-model="dialogFullWidthHeight" title="Dialog Full Width Height"
            fullHeight fullWidth>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogMaximize" v-model="dialogMaximize" title="Dialog Maximize" maximized can-maximized>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
    </q-page>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/base/BaseDialog.vue';
import BaseMenu from '@/components/base/BaseMenu.vue';
import BaseMenuItem from '@/components/base/BaseMenuItem.vue';
import BasePopConfirm from '@/components/base/BasePopConfirm.vue';
import UiButton from '@/components/quasar/Button.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { LabelValue } from '@/types/common';
import { biCopy, biPencil, biThreeDots, biTrash } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Dialog | ${t('app.name')}`);
const dialog = ref<boolean>(false);
const dialog2 = ref<boolean>(false);

const dialogSmall = ref<boolean>(false);
const dialogMedium = ref<boolean>(false);
const dialogFullWidth = ref<boolean>(false);
const dialogFullHeight = ref<boolean>(false);
const dialogFullWidthHeight = ref<boolean>(false);
const dialogMaximize = ref<boolean>(false);
const text = ref();

const menus = ref<LabelValue<number>[]>([
    {
        label: 'Edit',
        description: 'edit this item',
        avatar: '',
        icon: biPencil,
        fetch: false,
        value: 1
    },
    {
        label: 'Delete',
        description: 'Delete this item',
        avatar: '',
        icon: biTrash,
        fetch: false,
        value: 2
    },
    {
        label: 'Copy',
        description: 'Copy this item',
        avatar: '',
        icon: biCopy,
        fetch: false,
        value: 3
    }
]);
const menus2: LabelValue<number>[] = [
    {
        label: 'Cody Fisher',
        value: 1,
        description: 'Fisher',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg'
    },
    {
        label: 'Robert Fox',
        value: 2,
        description: 'Fox',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    },
    {
        label: 'Esther Howard',
        value: 3,
        description: 'Howard',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    },
    {
        label: 'Darlene Robertson',
        value: 4,
        description: 'Robertson',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    },
    {
        label: 'Ralph Edwards',
        value: 5,
        description: 'Edwards',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png'
    },
];
const showMenu = ref(false);
const onPopConfirmChange = (status: boolean) => {
    console.log('onPopConfirmChange', status)
}
const onMenuClick = (value: number) => {
    console.log('onMenuClick', value);
    showMenu.value=false;
}
const openMenu = (event: any) => {
  if (event) {
    event.stopImmediatePropagation();
  }
  showMenu.value = true;
};
</script>
