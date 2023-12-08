import { Breadcrumb } from '@/types/common';
import { PageIdParamiter } from '@/utils/constant';
import {
    biPencil,
    biShieldCheck,
    biPeople,
    biPerson
} from '@quasar/extras/bootstrap-icons';
export const detailItemFn = (crud: string): Breadcrumb[] => {
    return [{
        label: 'base.detail',
        to: `/${crud}/view/:${PageIdParamiter}`,
        icon: biPencil,
        translateLabel: true,
        params: [PageIdParamiter],
    }];
}
export const BC_PERMISSION_FROM: Breadcrumb[] = [
    {
        label: 'model_permission',
        to: '/permission',
        // to: `/permission/view/:${PageIdParamiter}?testQuery={testQuery}&testQuery2={testQuery2}`,
        icon: biShieldCheck,
        translateLabel: true,
        // params: [PageIdParamiter],
        // queries: ['testQuery', 'testQuery2']
    },
    ...detailItemFn('permission')
];
export const BC_ROLE_FROM: Breadcrumb[] = [
    {
        label: 'model_role',
        to: '/role',
        icon: biPeople,
        translateLabel: true,
    },
    ...detailItemFn('role')
];
// export const BC_USER_FROM: Breadcrumb[] = [
//     {
//         label: 'model_user',
//         to: '/user',
//         icon: biPerson,
//         translateLabel: true,
//     },
//     {
//         label: 'base.detail',
//         to: `/user/view/:${PageIdParamiter}`,
//         icon: biPencil,
//         translateLabel: true,
//         params: [PageIdParamiter],
//     },
// ];

export const BC_USER_FROM: Breadcrumb[] = [
    {
        label: 'model_user',
        to: '/user',
        // Assuming biPerson is defined elsewhere as an icon
        icon: biPerson,
        translateLabel: true,
    },
    ...detailItemFn('user')
];