import { RouteRecordRaw } from 'vue-router';
import {
  PermissionPermission,
  UserPermission,
  RolePermission,
  BackendLogin,
} from '@/utils/appPermissionList';
import {
  PermissionFormBreadcrumb,
  RoleFormBreadcrumb,
  UserFormBreadcrumb,
  ExampleBtnBreadcrumb,
  ExampleSelectBreadcrumb
} from '@/breadcrumbs/AppBreadcrumbs';
import {
  TabCompanyConfig
} from '@/breadcrumbs/AppTabs';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefultLayout.vue'),
    meta: {
      requireAuth: true,
      permission: [BackendLogin]
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: 'permission',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_permission',
              permission: [PermissionPermission.list]
            },
            component: () => import('@/pages/permission/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_permission',
              permission: [PermissionPermission.view],
              breadcrumbs: PermissionFormBreadcrumb,
              tabs: TabCompanyConfig
            },
            component: () => import('@/pages/permission/view.vue'),
          },
        ]
      },
      {
        path: 'role',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_role',
              permission: [RolePermission.list]
            },
            component: () => import('@/pages/role/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_role',
              permission: [RolePermission.view],
              breadcrumbs: RoleFormBreadcrumb,
            },
            component: () => import('@/pages/role/view.vue'),
          },
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_user',
              permission: [UserPermission.list],
            },
            component: () => import('@/pages/user/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_user',
              permission: [UserPermission.view],
              breadcrumbs: UserFormBreadcrumb,
            },
            component: () => import('@/pages/user/view.vue'),
          },
        ]
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/pages/SearchPage.vue'),
      },
      {
        path: '/example',
        children: [
          {
            path: 'content-text',
            meta: {
              name: 'ExampleContentText',
            },
            component: () => import('@/pages/example/content-text.vue'),
          },
          {
            path: 'emoji-picker',
            meta: {
              name: 'ExampleEmojiPicker',
            },
            component: () => import('@/pages/example/emoji-picker.vue'),
          },
          {
            path: 'image-cropper',
            meta: {
              name: 'ExampleImageCropper',
            },
            component: () => import('@/pages/example/image-cropper.vue'),
          },
          {
            path: 'image-view',
            meta: {
              name: 'ExampleImageView',
            },
            component: () => import('@/pages/example/image-view.vue'),
          },
          {
            path: 'markdown-editor',
            meta: {
              name: 'ExampleMarkdownEditor',
            },
            component: () => import('@/pages/example/markdown-editor.vue'),
          },
          {
            path: 'result',
            meta: {
              name: 'ExampleResult',
            },
            component: () => import('@/pages/example/result.vue'),
          },
          {
            path: 'swiper',
            meta: {
              name: 'ExampleSwipper',
            },
            component: () => import('@/pages/example/swipper.vue'),
          },
          {
            path: 'sort-items',
            meta: {
              name: 'ExampleSortItems',
            },
            component: () => import('@/pages/example/sort-items.vue'),
          },
          {
            path: 'virtual-scroller',
            meta: {
              name: 'ExampleVirtualScroller',
            },
            component: () => import('@/pages/example/virtual-scroller.vue'),
          },
          {
            path: 'composables',
            children: [
              {
                path: 'use-axios',
                meta: {
                  name: 'ExampleComposablesUseAxios',
                },
                component: () => import('@/pages/example/composables/use-axios.vue'),
              },
              {
                path: 'use-base',
                meta: {
                  name: 'ExampleComposablesUseBase',
                },
                component: () => import('@/pages/example/composables/use-base.vue'),
              },
              {
                path: 'use-pagefecth',
                meta: {
                  name: 'ExampleComposablesUsePagefecth',
                },
                component: () => import('@/pages/example/composables/use-pagefecth.vue'),
              },
            ]
          },
          {
            path: 'ui',
            children: [
              {
                path: 'avatar',
                meta: {
                  name: 'ExampleUiAvatar',
                  breadcrumbs: ExampleBtnBreadcrumb,
                },
                component: () => import('@/pages/example/ui/avatar.vue'),
              },
              {
                path: 'button',
                meta: {
                  name: 'ExampleUiButton',
                  breadcrumbs: ExampleBtnBreadcrumb,
                },
                component: () => import('@/pages/example/ui/button.vue'),
              },
              {
                path: 'select',
                meta: {
                  name: 'ExampleUiSelect',
                  breadcrumbs: ExampleSelectBreadcrumb,
                },
                component: () => import('@/pages/example/ui/select.vue'),
              },
              {
                path: 'date-picker',
                meta: {
                  name: 'ExampleUiDatePicker',
                },
                component: () => import('@/pages/example/ui/date-picker.vue'),
              },
              {
                path: 'toggle',
                meta: {
                  name: 'ExampleUitoggle',
                },
                component: () => import('@/pages/example/ui/toggle.vue'),
              },
              {
                path: 'file-picker',
                meta: {
                  name: 'ExampleUiFilePicker',
                },
                component: () => import('@/pages/example/ui/file-picker.vue'),
              },
            ],
          },
        ]
      },
    ],
  },
  {
    path: '/chats',
    meta: { requireAuth: true },
    component: () => import('layouts/ChatsLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/chats/index.vue')
      },
    ]
  },
  {
    path: '/settings',
    meta: { requireAuth: true },
    component: () => import('layouts/UserSettingLayout.vue'),
    children: [
      { path: '', redirect: '/settings/profile' },
      {
        path: 'profile',
        meta: { pageName: 'page.settingsPublicProfile' },
        component: () => import('@/pages/settings/profile.vue'),
      },
      {
        path: 'notifications',
        meta: { pageName: 'page.settingsNotification' },
        component: () => import('@/pages/settings/notifications.vue'),
      },
      {
        path: 'security',
        meta: { pageName: 'page.settingsSecurity' },
        component: () => import('@/pages/settings/security.vue'),
      },
      {
        path: 'emails',
        meta: { pageName: 'page.settingsEmail' },
        component: () => import('@/pages/settings/emails.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/pages/auth/login.vue') },
      {
        path: 'login2',
        component: () => import('@/pages/auth/login2.vue'),
      },
    ],
  },
  {
    path: '/feed',
    component: () => import('@/layouts/FeedLayout.vue'),
    meta: { requireAuth: true },
    children: [{ path: '', component: () => import('@/pages/feed/index.vue') }],
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: () => import('@/pages/ErrorPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
  { path: '/error500', component: () => import('@/pages/Error500Page.vue') },
  { path: '/test', component: () => import('@/pages/TestPage.vue') },
];

export default routes;
