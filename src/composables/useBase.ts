/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useLang } from './useLang';
import { ITextValue, NotifyOptions, GenerateLinkType } from '@/types/common';
import { SearchOperation } from '@/utils/constant';
import {
  formatDateTime,
  formatDate,
  formatDistanceFromNow,
} from '@/utils/dateUtil';
import {
  biInfoCircle,
  biCheckCircle,
  biExclamationTriangle,
  biExclamationCircle,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { DOMPurify } from 'boot/dompurify';
import { Clipboard } from '@capacitor/clipboard';
export const useBase = () => {
  const { t, locale } = useLang();
  const $q = useQuasar();
  const route = useRoute();
  const router = useRouter();

  const isDark = computed(() => $q.dark.isActive);
  const getCurrentPath = (fullPath = true) => {
    return fullPath ? route.fullPath : route.path;
  };
  const getPreviousPath = () => {
    return router.options.history.state.back;
  };
  const WeeGetParam = (field: string): string | undefined => {
    if (!field) {
      return undefined;
    }
    return route.params ? (route.params[field] as string) : undefined;
  };
  const WeeGetQuery = (field: string): string | undefined => {
    if (!field) {
      return;
    }
    return route.query ? (route.query[field] as string) : undefined;
  };
  const onReplaceUrl = (url: string) => {
    history.pushState({}, '', url);
  };
  const getParamNumber = (att: string): number => {
    const val = WeeGetParam(att);
    return val != undefined ? +val : 0;
  };
  const getQueryNumber = (att: string): number => {
    const val = WeeGetQuery(att);
    return val != undefined ? +val : 0;
  };
  const WeeGoTo = (link: string | undefined, replace?: boolean): void => {
    if (!link) {
      return;
    }
    if (!replace) {
      router.push(link);
    } else {
      // window.location.replace(link);
      router.replace(link);
      // router.replace({ path: link });
    }
  };

  const WeeLoaderClose = () => {
    if ($q.loading.isActive) {
      $q.loading.hide();
    }
  };
  const WeeLoader = (open = true, message = undefined, delay = 0): void => {
    if (open) {
      WeeLoaderClose();
      $q.loading.show({
        delay: delay, // ms
        message: message === undefined ? t('base.pleaseWait') : message,
      });
    } else {
      WeeLoaderClose();
    }
  };
  /* https://quasar.dev/quasar-plugins/notify
        position > top-left top-right bottom-left bottom-right top bottom left right center
    WeeToast('Quasar Framework Template',{type:'positive', position:'right', color:''});
    WeeToast('Quasar Framework Template',{caption:'5 Minutes ago', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'});
     */
  const WeeToast = (message: string, options: NotifyOptions | undefined) => {
    if (!message) {
      return;
    }
    let icon :string |undefined = undefined;
    if (options && options.type) {
      const t = options.type;
      if (t === 'positive') {
        icon = biCheckCircle;
      } else if (t === 'negative') {
        icon = biExclamationTriangle;
      } else if (t === 'warning') {
        icon = biExclamationCircle;
      } else if (t === 'info') {
        icon = biInfoCircle;
      }
    }
    $q.notify(
      Object.assign(
        {
          message,
          icon,
          timeout: 5000,
          progress: true,
          position: 'bottom',
          multiLine: true,
          actions: !options?.hideClose
            ? [{ icon: biX, color: 'white' }]
            : undefined,
        },
        options
      )
    );
  };

  /**
   * const conf = await WeeConfirm(t('app.monogram'), t('base.deleteConfirm'));
   * @param title
   * @param text
   * @param okBtn
   * @param cancelBtn
   * @returns
   */
  const WeeConfirm = async (
    title: string,
    text: string,
    okBtn = {}, //btn component
    cancelBtn = {} //btn component
  ) => {
    return new Promise((resolve) => {
      $q.dialog({
        title: title,
        message: text,
        ok: Object.assign(
          { textColor: 'primary', flat: true, label: t('base.okay') },
          okBtn
        ),
        // ok: okText===undefined ? tc('okay') : okText,
        cancel: Object.assign(
          { textColor: 'grey', flat: true, label: t('base.cancel') },
          cancelBtn
        ),
        persistent: true,
      })
        .onOk(() => {
          resolve(true);
        })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        })
        .onDismiss(() => {
          resolve(false);
        });
    });
  };
  const searchOperations: ITextValue[] = [
    { text: t('base.match'), value: SearchOperation.MATCH },
    { text: t('base.equa'), value: SearchOperation.EQUA },
    { text: t('base.notEqua'), value: SearchOperation.NOT_EQUA },
    { text: t('base.greaterThan'), value: SearchOperation.GREATER_THAN },
    {
      text: t('base.greaterThanEqua'),
      value: SearchOperation.GREATER_THAN_EQUA,
    },
    { text: t('base.lessThan'), value: SearchOperation.LESS_THAN },
    { text: t('base.lessThanEqua'), value: SearchOperation.LESS_THAN_EQUA },
  ];

  // const datePickerLocale = {
  //   /* starting with Sunday */
  //   days: t('date.days').split('_'),
  //   daysShort: t('date.dayShorts').split('_'),
  //   months: t('date.months').split('_'),
  //   monthsShort: t('date.monthShorts').split('_'),
  //   firstDayOfWeek: 1,
  // };
  const datePickerLocale = computed(() =>
    locale.value
      ? {
        days: t('date.days').split('_'),
        daysShort: t('date.dayShorts').split('_'),
        months: t('date.months').split('_'),
        monthsShort: t('date.monthShorts').split('_'),
        firstDayOfWeek: 1,
      }
      : undefined
  );

  const AppFormatDate = (d: string, fmt: string) => {
    return formatDate(d, fmt, locale.value);
  };
  const AppFormatDateTime = (d: string, fmt: string) => {
    return formatDateTime(d, fmt, locale.value);
  };
  const AppFormatDateDistance = (d: string) => {
    return formatDistanceFromNow(d, locale.value);
  };

  /**
   * <div ref="bottomSection"></div>
   * scrollToTop(bottomSection.value);
   * @param el
   */
  const scrollToTop = (el: Element) => {
    // window.scrollTo(0, 0);
    if (el) {
      // el.scrollIntoView({ behavior: 'smooth' });
      // el.scrollIntoView({ block: 'end', behavior: 'smooth' });
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const isDevMode = () => {
    return process.env.NODE_ENV == 'development';
  };
  const inputSanitizeHtml = (str: string) => {
    if (!str) {
      return '';
    }
    return DOMPurify.sanitize(str,
      {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        ALLOWED_ATTR: ['href', 'class']
      }
    );
  };
  const readableNumber = (num: number, digits: number) => {
    if (num < 1000) {
      return num;
    }
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') +
      (item.symbol ? t('readableNum.' + item.symbol) : '')
      : '0';
  };
  const generateWebLink = (params: string, type: GenerateLinkType) => {
    let appUrl = process.env.webAppUrl;
    if (type == 'post') {
      appUrl += `/post/view/${params}`;
    }
    return appUrl;
  };
  const writeToClipboard = async (text: string) => {
    await Clipboard.write({
      string: text,
    });
    return new Promise((resolve) => {
      resolve(true);
    });
  };
  /**
   * onOpenProfile($event, post.user.id)
   * @param event
   * @param userId
   */
  const onOpenProfile = (
    event: any,
    userId: number | string | null | undefined
  ) => {
    const l = getUserPageLink(userId);
    if (userId && l) {
      WeeGoTo(l);
    }
    if (event) {
      event.stopImmediatePropagation();
    }
  };
  const getUserPageLink = (userId: number | string | null | undefined) => {
    if (userId) {
      return `/user/${userId}`;
    }
    return undefined;
  };
  return {
    WeeGetParam,
    WeeGetQuery,
    WeeGoTo,
    WeeLoader,
    WeeToast,
    WeeConfirm,
    getCurrentPath,
    searchOperations,
    datePickerLocale,
    getParamNumber,
    getQueryNumber,
    getPreviousPath,
    AppFormatDate,
    scrollToTop,
    onReplaceUrl,
    isDevMode,
    inputSanitizeHtml,
    AppFormatDateTime,
    AppFormatDateDistance,
    readableNumber,
    isDark,
    generateWebLink,
    writeToClipboard,
    onOpenProfile,
    getUserPageLink,
  };
};
