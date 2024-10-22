import { RouteRecordRaw } from 'vue-router';
import {
  PERMISSION,
  USER,
  ROLE,
  BACKEND_LOGIN,
} from '@/utils/appPermissionList';
import {
  PermissionFormBreadcrumb,
  RoleFormBreadcrumb,
  UserFormBreadcrumb,
  ExampleBtnBreadcrumb,
  ExampleSelectBreadcrumb
} from '@/breadcrumbs/AppBreadcrumbs';
import {
  TAB_COMPANY_CONFIG
} from '@/breadcrumbs/AppTabs';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BackendLayout.vue'),
    meta: {
      requireAuth: true,
      permission: [BACKEND_LOGIN]
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/backend/IndexPage.vue'),
      },
      {
        path: 'permission',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_permission',
              permission: [PERMISSION.list]
            },
            component: () => import('@/pages/backend/permission/List.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_permission',
              permission: [PERMISSION.view],
              breadcrumbs: PermissionFormBreadcrumb,
              tabs: TAB_COMPANY_CONFIG
            },
            component: () => import('@/pages/backend/permission/Form.vue'),
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
              permission: [ROLE.list]
            },
            component: () => import('@/pages/backend/role/List.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_role',
              permission: [ROLE.view],
              breadcrumbs: RoleFormBreadcrumb,
            },
            component: () => import('@/pages/backend/role/Form.vue'),
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
              permission: [USER.list],
            },
            component: () => import('@/pages/backend/user/List.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_user',
              permission: [USER.view],
              breadcrumbs: UserFormBreadcrumb,
            },
            component: () => import('@/pages/backend/user/Form.vue'),
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
            component: () => import('@/pages/example/ContentText.vue'),
          },
          {
            path: 'emoji-picker',
            meta: {
              name: 'ExampleEmojiPicker',
            },
            component: () => import('@/pages/example/EmojiPicker.vue'),
          },
          {
            path: 'image-cropper',
            meta: {
              name: 'ExampleImageCropper',
            },
            component: () => import('@/pages/example/ImageCropper.vue'),
          },
          {
            path: 'ui',
            children: [
              {
                path: 'button',
                meta: {
                  name: 'ExampleUiButton',
                  breadcrumbs: ExampleBtnBreadcrumb,
                },
                component: () => import('@/pages/example/ui/Button.vue'),
              },
              {
                path: 'select',
                meta: {
                  name: 'ExampleUiSelect',
                  breadcrumbs: ExampleSelectBreadcrumb,
                },
                component: () => import('@/pages/example/ui/Select.vue'),
              },
              {
                path: 'date-picker',
                meta: {
                  name: 'ExampleUiDatePicker',
                },
                component: () => import('@/pages/example/ui/DatePicker.vue'),
              },
              {
                path: 'toggle',
                meta: {
                  name: 'ExampleUitoggle',
                },
                component: () => import('@/pages/example/ui/FormToggle.vue'),
              },
              {
                path: 'file-picker',
                meta: {
                  name: 'ExampleUiFilePicker',
                },
                component: () => import('@/pages/example/ui/FilePicker.vue'),
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
        component: () => import('@/pages/chats/Index.vue')
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
        component: () => import('@/pages/settings/Profile.vue'),
      },
      {
        path: 'notifications',
        meta: { pageName: 'page.settingsNotification' },
        component: () => import('@/pages/settings/Notification.vue'),
      },
      {
        path: 'security',
        meta: { pageName: 'page.settingsSecurity' },
        component: () => import('@/pages/settings/Security.vue'),
      },
      {
        path: 'emails',
        meta: { pageName: 'page.settingsEmail' },
        component: () => import('@/pages/settings/Email.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/pages/auth/Login.vue') },
      {
        path: 'login2',
        component: () => import('@/pages/auth/Login2.vue'),
      },
    ],
  },
  {
    path: '/feed',
    component: () => import('@/layouts/FeedLayout.vue'),
    meta: { requireAuth: true },
    children: [{ path: '', component: () => import('@/pages/FeedPage.vue') }],
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
