import { Breadcrumb } from '@/types/common';
import { PageIdParamiter } from '@/utils/constant';
import {
    biPeople,
    biUiChecks,
    biCalculator,
    biArrowsCollapse,
    biDiagram3,
} from '@quasar/extras/bootstrap-icons';
export const TAB_COMPANY_CONFIG: Breadcrumb[] = [
    {
        label: 'base.pont',
        to: `/test-config/:${PageIdParamiter}/point`,
        icon: biPeople,
        translateLabel: true,
        params: [PageIdParamiter]
    },
    {
        label: 'base.photo',
        to: `/test-config/:${PageIdParamiter}/photo`,
        icon: biUiChecks,
        translateLabel: true,
        params: [PageIdParamiter]
    },
    {
        label: 'base.video',
        to: `/test-config/:${PageIdParamiter}/video`,
        icon: biCalculator,
        translateLabel: true,
        params: [PageIdParamiter]
    },
    {
        label: 'base.hashtag',
        to: `/test-config/:${PageIdParamiter}/tags`,
        icon: biArrowsCollapse,
        translateLabel: true,
        params: [PageIdParamiter]
    },
    {
        label: 'base.message',
        to: `/test-config/:${PageIdParamiter}/message`,
        icon: biDiagram3,
        translateLabel: true,
        params: [PageIdParamiter]
    },
];