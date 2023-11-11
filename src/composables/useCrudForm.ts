import { useAxios } from '@/composables/useAxios';
import { useBase } from './useBase';
import { useLang } from './useLang';
import { biX } from '@quasar/extras/bootstrap-icons';
import {
  PageActionParamiter,
  PageIdParamiter,
  BackendRootPath,
  CrudAction,
} from '@/utils/constant';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import {
  ICrudAction,
  CrudFormApiOptions,
  RequestDto,
  ResponseMessage,
} from '@/types/common';
import {
  isAppException,
  isServerResponseMessage,
  snakeToCamel,
} from '@/utils/appUtil';

import { convertStringToNumber } from '@/utils/appUtil';
export const useCrudForm = <T>(options: CrudFormApiOptions, initialEntity: T) => {
  const { WeeGoTo, WeeGetParam, WeeToast, WeeConfirm, isDevMode } = useBase();
  const { callAxios } = useAxios();
  const { t } = useLang();

  const loading = ref(false);
  const crudId = ref<number>(
    WeeGetParam(PageIdParamiter) != undefined
      ? convertStringToNumber(WeeGetParam(PageIdParamiter))
      : 0
  );

  const crudEntity = ref<any>(Object.assign({}, initialEntity) as T);

  const crudAction = ref<ICrudAction>(
    WeeGetParam(PageActionParamiter) as ICrudAction
  );

  onMounted(async () => {
    if (options.fectchDataOnLoad) {
      preFectData();
    }
  });
  const preFectData = async () => {
    if (
      crudAction.value == CrudAction.VIEW ||
      crudAction.value == CrudAction.COPY
    ) {
      await fetchDataById();
      if (crudAction.value == CrudAction.COPY) {
        crudEntity.value.id = null;
      }
      return new Promise((resolve) => {
        resolve(true);
      });
    } else {
      return new Promise((resolve) => {
        resolve(true);
      });
    }
  };
  const getFetchDataLink = computed(() => {
    if (options.fetchDataLink) {
      return options.fetchDataLink;
    }
    return `${options.apiEndpoint}/${snakeToCamel(
      options.crudName ? options.crudName : ''
    )}/${crudId.value}`;
  });
  const fetchDataById = async () => {
    if (!crudId.value && (!options.apiEndpoint || !options.crudName)) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    loading.value = true;
    const api = getFetchDataLink.value;
    const response = await callAxios<T>({
      API: api,
      method: 'GET',
    });
    if (isDevMode()) {
      console.log('useCrudForm > fetchDataById :', api, response);
    }
    loading.value = false;
    if (!isAppException(response) && !isServerResponseMessage(response)) {
      crudEntity.value = response;
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  const resetEntity = () => {
    /* 3 Ways to Clone Objects in JavaScript
        // "Spread"
        { ...food }

        // "Object.assign"
        Object.assign({}, food)

        // "JSON"
        JSON.parse(JSON.stringify(food))
        */

    // crudEntity.value = JSON.parse(JSON.stringify(initialEntity)); // stop modifing passed value
    crudEntity.value = Object.assign({}, initialEntity) as T;
  };
  const onBack = () => {
    const backLink = options.backLink
      ? options.backLink
      : options.crudName
        ? `${BackendRootPath ? '/' + BackendRootPath : ''}/${options.crudName.replace('_', '-')}`
        : '';
    WeeGoTo(backLink);
  };
  const apiEnpoint = computed(() => {
    if (!options.apiEndpoint || !options.crudName) {
      return;
    }
    if (crudAction.value === CrudAction.VIEW) {
      return options.actionPut
        ? options.actionPut
        : options.apiEndpoint + '/' + snakeToCamel(options.crudName);
    }
    return options.actionPost
      ? options.actionPost
      : options.apiEndpoint + '/' + snakeToCamel(options.crudName);
  });
  const onSubmit = async () => {
    if (!options.apiEndpoint || !options.crudName) {
      return;
    }
    // const requestItem: { [k: string]: T } = {};
    const requestItem: RequestDto = {};
    requestItem[`${snakeToCamel(options.crudName)}`] = crudEntity.value;

    const api = apiEnpoint.value;
    if (!api) {
      return;
    }
    if (isDevMode()) {
      console.log(
        'useCrudFrom > onSubmit',
        crudAction.value === CrudAction.VIEW ? 'PUT' : 'POST',
        requestItem
      );
    }

    loading.value = true;
    const response = await callAxios<any>({
      API: api,
      method: crudAction.value === CrudAction.VIEW ? 'PUT' : 'POST',
      body: requestItem,
    });
    loading.value = false;
    if (isDevMode()) {
      console.log('useCrudFrom > onSubmit > response', response);
    }
    if (isAppException(response)) {
      return;
    }
    if (response && response.id) {
      if (
        crudAction.value === CrudAction.NEW ||
        crudAction.value === CrudAction.COPY
      ) {
        showToast(t('success.insertSuccesfull'));
      } else if (crudAction.value === CrudAction.VIEW) {
        showToast(t('success.updateSuccesfull'));
      }
    }

    if (!options.preventRedirectToList) {
      onBack();
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  };
  const showToast = (message: string) => {
    WeeToast(message, {
      multiLine: false,
      html: true,
      type: 'positive',
      timeout: 3 * 1000,
      position: 'bottom',
      actions: [{ icon: biX, color: 'white' }],
    });
  };
  const deleteApiEndpoint = computed(() => {
    return options.actionDelete
      ? options.actionDelete
      : options.apiEndpoint && options.crudName
        ? `${options.apiEndpoint}/${snakeToCamel(options.crudName)}/${crudId.value
        }`
        : '';
  });
  const onDelete = async () => {
    if (
      crudAction.value != CrudAction.VIEW &&
      !crudEntity.value &&
      crudId.value == 0 &&
      !deleteApiEndpoint.value
    ) {
      return;
    }
    const conf = await WeeConfirm(t('app.monogram'), t('base.deleteConfirm'));
    if (conf) {
      const res = await callAxios<ResponseMessage>({
        API: deleteApiEndpoint.value,
        method: 'DELETE',
      });
      if (isDevMode()) {
        console.log('useCrudFrom > onDelete', deleteApiEndpoint.value, res);
      }
      onBack();
    }
  };

  onBeforeUnmount(() => {
    resetEntity();
  });

  const methods = { onBack, onSubmit, onDelete, fetchDataById, preFectData };
  return {
    loading,
    ...methods,
    crudId,
    crudAction,
    crudEntity,
    crudName: options.crudName,
  };
};
