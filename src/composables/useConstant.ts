import { useLang } from './useLang';
import {
  biPerson,
  biTextParagraph,
  biList,
  biFonts,
  biGrid3x3,
  biReception0,
  biUiRadios,
  biCalendarEvent,
  biClock,
  biUpload,
  // biCameraVideo,
  biGeoAlt,
} from '@quasar/extras/bootstrap-icons';
import { company } from '@/utils/appPermissionList';
import {
  IFormPostType,
  NotifyPeriodItem,
  ActionPlanTargetTypeItem,
  OptionItems,
  IAxisItem,
  IDScoreDevideTypeItem
} from '@/types/models';

export const useConstant = () => {
  const { t } = useLang();
  const postLevelsTypes = [
    {
      label: t('model.company.post_level_organize'),
      value: 1,
    },
    {
      label: t('model.company.post_level_public'),
      value: 2,
    },
  ];
  const resetPrizeTypes = [
    {
      label: t('week1'),
      value: 1,
    },
    {
      label: t('weeks', { week: 2 }),
      value: 2,
    },
    {
      label: t('month1'),
      value: 3,
    },
  ];
  const deLogPeriodTypes = [
    {
      label: t('week1'),
      value: 1,
    },
    {
      label: t('month1'),
      value: 2,
    },
  ];

  const customerManageMenuItems = [
    {
      label: t('manageCompanyUser'),
      link: '/backend/company-users/',
      icon: biPerson,
      permission: company.manage,
    },
  ];
  const formPostTypes: IFormPostType[] = [
    {
      label: t('model.cardFromType.TITLE'),
      value: 'TITLE',
      icon: biFonts,
    },
    {
      label: t('model.cardFromType.FREE_TEXT'),
      value: 'FREE_TEXT',
      icon: biTextParagraph,
    },
    {
      label: t('model.cardFromType.FREE_TEXT_SHORT'),
      value: 'FREE_TEXT_SHORT',
      icon: biList,
    },
    {
      label: t('model.cardFromType.ROW_COLUMN'),
      value: 'ROW_COLUMN',
      icon: biGrid3x3,
    },
    {
      label: t('model.cardFromType.LINEAR_SCALE'),
      value: 'LINEAR_SCALE',
      icon: biReception0,
    },
    {
      label: t('model.cardFromType.RADIO'),
      value: 'RADIO',
      icon: biUiRadios,
    },
    {
      label: t('model.cardFromType.DATE'),
      value: 'DATE',
      icon: biCalendarEvent,
    },
    {
      label: t('model.cardFromType.TIME'),
      value: 'TIME',
      icon: biClock,
    },
    {
      label: t('model.cardFromType.FILE'),
      value: 'FILE',
      icon: biUpload,
    },
    // {
    //   label: t('model.cardFromType.YOUTUBE_LINK'),
    //   value: 'YOUTUBE_LINK',
    //   icon: biCameraVideo,
    // },
    {
      label: t('model.cardFromType.MAP_LAT_LNG'),
      value: 'MAP_LAT_LNG',
      icon: biGeoAlt,
    },
  ];
  const notifyPeriodList: NotifyPeriodItem[] = [
    {
      label: t('model.company_theme.no_progress'),
      value: 'NO_PROGRESS',
    },
    {
      label: '1 ' + t('date.week'),
      value: 'EVERY_1WEEK',
    },
    {
      label: '2 ' + t('date.week'),
      value: 'EVERY_2WEEK',
    },
    {
      label: '3 ' + t('date.week'),
      value: 'EVERY_3WEEK',
    },
    {
      label: '4 ' + t('date.week'),
      value: 'EVERY_4WEEK',
    },
    {
      label: '5 ' + t('date.week'),
      value: 'EVERY_5WEEK',
    },
    {
      label: '6 ' + t('date.week'),
      value: 'EVERY_6WEEK',
    },
  ];
  const actionPlanTargetTypeItems: ActionPlanTargetTypeItem[] = [
    {
      label: t('targetTypeSimple'),
      value: 'SIMPLE',
    },
    {
      label: t('targetTypeValue'),
      value: 'VALUE',
    },
    {
      label: t('targetTypePercentage'),
      value: 'PERCENTAGE',
    },
  ];
  const actionPlanProgressTypeItems: OptionItems[] = [
    {
      label: t('actionReportAcumulative'),
      description: t('actionReportAcumulativeDetail'),
      value: true,
    },
    {
      label: t('actionReportSeparator'),
      description: t('actionReportSeparatorDetail'),
      value: false,
    },
  ];
  const axisList: IAxisItem[] = [
    { label: t('xAxis'), value: 'x' },
    { label: t('yAxis'), value: 'y' },
  ];
  const scoreDevideTypeList: IDScoreDevideTypeItem[] = [
    { label: t('devideTypeHeadCount'), value: 'HEAD_COUNT' },
    { label: t('devideTypePost'), value: 'POST' },
  ];
  return {
    postLevelsTypes,
    resetPrizeTypes,
    deLogPeriodTypes,
    customerManageMenuItems,
    formPostTypes,
    notifyPeriodList,
    actionPlanTargetTypeItems,
    axisList,
    scoreDevideTypeList,
    actionPlanProgressTypeItems
  };
};
