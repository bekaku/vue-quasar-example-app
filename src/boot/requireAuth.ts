import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import { AppAuthTokenKey } from '@/utils/constant';
import { usePermissionStore } from '@/stores/permissionStore';
// import { useRouter } from 'vue-router';
export default boot(({ router, ssrContext, store, redirect }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const permissionStore = usePermissionStore(store);
  // const router = useRouter();
  router.beforeEach((to, from, next) => {
    // console.log('requireAuth >to ', to);
    if (to.meta.requireAuth === true) {
      if (cookies.get(AppAuthTokenKey)) {
        if (to.meta.permission && !process.env.SERVER) {
          if (to.meta.frontEnd) {
            if (
              permissionStore.isHaveFrontendMultiPermission(
                to.meta.permission as string[]
              )
            ) {
              next();
            } else {
              redirect({ path: '/error', query: { code: '401' } });
            }
          } else {
            if (
              permissionStore.isHaveMultiPermission(to.meta.permission as string[])
            ) {
              next();
            } else {
              // next({
              //   name: 'ErrorPage',
              //   params: { code: '401', message: 'Permission denied' },
              // });
              // redirect({
              //   name: 'ErrorPage',
              //   params: {
              //     code: '401',
              //     message: 'Permission denied',
              //   },
              // });
              redirect({ path: '/error', query: { code: '401' } });
            }
          }
        } else {
          next();
        }
      } else {
        next({
          path: '/auth',
          replace: true,
        });
      }
    } else {
      next();
    }

    // if (to.matched.some((record) => record.meta.requireAuth)) {
    //   if (cookies.get(AppAuthTokenKey)) {
    //     next();
    //   } else {
    //     next({
    //       path: '/auth',
    //       replace: true,
    //     });
    //   }
    // } else {
    //   next();
    // }
  });
});
