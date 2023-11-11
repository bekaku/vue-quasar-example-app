import { RouteRecordRaw } from 'vue-router';
import {
  permission,
  user,
  role,
  backend_login,
} from '@/utils/appPermissionList';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BackendLayout.vue'),
    meta: { requireAuth: true, permission: backend_login },
    children: [
      {
        path: '',
        component: () => import('@/pages/backend/IndexPage.vue'),
      },
      {
        path: 'permission',
        meta: { pageName: 'model_permission', permission: permission.list },
        component: () => import('@/pages/backend/permission/List.vue'),
      },
      {
        path: 'permission/:crud/:id/',
        meta: { pageName: 'model_permission', permission: permission.view },
        component: () => import('@/pages/backend/permission/Form.vue'),
      },
      {
        path: 'role',
        meta: { pageName: 'model_role', permission: role.list },
        component: () => import('@/pages/backend/role/List.vue'),
      },
      {
        path: 'role/:crud/:id/',
        meta: { pageName: 'model_role', permission: role.view },
        component: () => import('@/pages/backend/role/Form.vue'),
      },
      {
        path: 'user',
        meta: { pageName: 'model_user', permission: user.list },
        component: () => import('@/pages/backend/user/List.vue'),
      },
      {
        path: 'user/:crud/:id/',
        meta: { pageName: 'model_user', permission: user.view },
        component: () => import('@/pages/backend/user/Form.vue'),
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/pages/SearchPage.vue'),
      },
    ],
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
