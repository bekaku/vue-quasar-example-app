import { CacheDateAndKey } from '@/types/common';
import {
  DeData,
  IChartDialogue,
  ICountingVo,
  CurrentStats,
  CountingLevelBadgeVo,
  DeRatioDto,
  LoginLogResponse,
  NotificationCount,
  SearchItem,
  UserLevelChartDto,
} from '@/types/models';
import {
  CacheDateCheckKey,
  CacheKey,
  FcmSettingKey,
  FcmTokenKey,
  AppAuthRefeshTokenKey,
  AppAuthTokenKey,
  AppAuthTokenExpireKey,
  AppAuthTokenCreatedKey,
  NotifyKey,
  SearchHistoryKey,
} from '@/utils/constant';
import { getDateNow, getYearNow, getMonthNow } from '@/utils/dateUtil';
import { useStorage } from '@vueuse/core';
import { isObjectEmpty } from '@/utils/appUtil';
export const useCache = () => {
  const SearchHistoryList = useStorage(
    SearchHistoryKey,
    [] as SearchItem[]
  );
  const cacheKeyCheckList = useStorage(
    CacheDateCheckKey,
    [] as CacheDateAndKey[]
  );
  const cacheReportCurrentStats = useStorage(
    CacheKey.REPORT_CURRENT_STATS,
    {} as CurrentStats
  );
  const cacheReportIndividual = useStorage(
    CacheKey.REPORT_INDIVIDUAL,
    {} as DeData
  );
  const cacheReportCurrentDilogue = useStorage(
    CacheKey.REPORT_CURRENT_DIALOGUE,
    {} as IChartDialogue
  );
  const cacheReportCurrentCounting = useStorage(
    CacheKey.REPORT_CURRENT_COUNTING,
    {} as ICountingVo
  );
  const cacheReportCurrentLevelStats = useStorage(
    CacheKey.REPORT_CURRENT_LEVEL_STATS,
    [] as CountingLevelBadgeVo[]
  );
  const cacheYearAvailables = useStorage(
    CacheKey.YEAR_AVAILABLE,
    [] as number[]
  );
  const cacheReportTeamMemberCurrentStats = useStorage(
    CacheKey.REPORT_TEAM_MEMBER_CURRENT_STATS,
    {} as CurrentStats
  );
  const cacheReportTeamLeaderCurrentStats = useStorage(
    CacheKey.REPORT_TEAM_LEADER_CURRENT_STATS,
    {} as CurrentStats
  );
  const cacheReportTeamMember = useStorage(
    CacheKey.REPORT_TEAM_MEMBER,
    {} as DeData
  );
  const cacheReportTeamLeader = useStorage(
    CacheKey.REPORT_TEAM_LEADER,
    {} as DeData
  );
  const cacheReportTeamMemberDilogue = useStorage(
    CacheKey.REPORT_TEAM_MEMBER_DIALOUGE,
    {} as IChartDialogue
  );
  const cacheReportTemLeaderDilogue = useStorage(
    CacheKey.REPORT_TEAM_LEADER_DIALOUGE,
    {} as IChartDialogue
  );
  const cacheReportTeamMemberCounting = useStorage(
    CacheKey.REPORT_TEAM_MEMBER_COUNTING,
    {} as ICountingVo
  );
  const cacheReportTeamLeaderCounting = useStorage(
    CacheKey.REPORT_TEAM_LEADER_COUNTING,
    {} as ICountingVo
  );
  const cacheReportTeamMemberLevelStats = useStorage(
    CacheKey.REPORT_TEAM_MEMBER_LEVEL_STATS,
    [] as CountingLevelBadgeVo[]
  );
  const cacheReportTeamLeaderLevelStats = useStorage(
    CacheKey.REPORT_TEAM_LEADER_LEVEL_STATS,
    [] as CountingLevelBadgeVo[]
  );
  const cacheReportTeamMemberDeRatios = useStorage(
    CacheKey.REPORT_TEAM_MEMBER_DE_RATIOS,
    {} as DeRatioDto
  );
  const cacheReportTeamLeaderDeRatios = useStorage(
    CacheKey.REPORT_TEAM_LEADER_DE_RATIOS,
    {} as DeRatioDto
  );
  const cacheReportCompanyCurrentStats = useStorage(
    CacheKey.REPORT_COMPANY_CURRENT_STATS,
    {} as CurrentStats
  );
  const cacheReportCompany = useStorage(CacheKey.REPORT_COMPANY, {} as DeData);
  const cacheReportCompanyDilogue = useStorage(
    CacheKey.REPORT_COMPANY_DIALOGUE,
    {} as IChartDialogue
  );
  const cacheReportComapnyCounting = useStorage(
    CacheKey.REPORT_COMPANY_COUNTING,
    {} as ICountingVo
  );
  const cacheReportComapnyLevelStats = useStorage(
    CacheKey.REPORT_COMPANY_LEVEL_STATS,
    [] as CountingLevelBadgeVo[]
  );
  const cacheReportUserLevelChart = useStorage(
    CacheKey.REPORT_USER_LEVEL_CHART,
    {} as UserLevelChartDto
  );

  const cacheLoginLog = useStorage(CacheKey.LOGIN_LOG, {} as LoginLogResponse);
  const fcmSetting = useStorage(FcmSettingKey, true as boolean);
  const fcmToken = useStorage(FcmTokenKey, null as string | null | undefined);
  const refeshTokenKey = useStorage<string | null>(AppAuthRefeshTokenKey, null);
  const authTokenKey = useStorage<string | null>(AppAuthTokenKey, null);
  const authTokenExpireKey = useStorage<string | null>(
    AppAuthTokenExpireKey,
    null
  );
  const authTokenCreatedKey = useStorage<string | null>(
    AppAuthTokenCreatedKey,
    null
  );
  const cacheReportCompanyDeRatios = useStorage(
    CacheKey.REPORT_COMPANY_DE_RATIOS,
    {} as DeRatioDto
  );
  const cacheNotifyCount = useStorage(NotifyKey, {} as NotificationCount);

  const findByKey = (k: string): CacheDateAndKey | undefined => {
    if (cacheKeyCheckList.value && cacheKeyCheckList.value.length > 0) {
      return cacheKeyCheckList.value.find((e: CacheDateAndKey) => e.key == k);
    }
    return undefined;
  };
  const findIndexByKey = (k: string): number => {
    if (!cacheKeyCheckList.value) {
      return -1;
    }
    return cacheKeyCheckList.value.findIndex(
      (e: CacheDateAndKey) => e.key == k
    );
  };

  const onRemoveKey = (k: string): void => {
    const index = findIndexByKey(k);
    if (index >= 0) {
      cacheKeyCheckList.value.splice(index, 1);
    }
  };
  const onAddNewKey = (k: string): void => {
    const item = findByKey(k);
    if (!cacheKeyCheckList.value) {
      cacheKeyCheckList.value = [];
    }
    if (!item) {
      const d = getDateNow();
      cacheKeyCheckList.value.push({
        key: k,
        date: d.toLocaleDateString(),
      });
    }
  };
  const onUpdateKey = (
    k: string,
    period: 'DAY' | 'MONTH' | 'YEAR' = 'DAY'
  ): void => {
    onRemoveKey(k);
    if (period == 'DAY') {
      onAddNewKey(k);
    } else if (period == 'MONTH') {
      onAddNewMonthKey(k);
    } else if (period == 'YEAR') {
      onAddNewYearKey(k);
    }
  };
  const canFecthToServerToday = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }

    const d = getDateNow();
    return item.date != d.toLocaleDateString();
  };
  const canFecthToServerMonth = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }
    const m = getMonthNow();
    return item.date != m;
  };
  const onAddNewMonthKey = (k: string): void => {
    const item = findByKey(k);
    if (!item) {
      cacheKeyCheckList.value.push({
        key: k,
        date: getMonthNow(),
      });
    }
  };
  const canFecthToServerYear = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }
    const y = getYearNow();
    return item.date != y;
  };
  const onAddNewYearKey = (k: string): void => {
    const item = findByKey(k);
    if (!item) {
      cacheKeyCheckList.value.push({
        key: k,
        date: getYearNow(),
      });
    }
  };
  const destroyCache = () => {
    cacheKeyCheckList.value = null;
    cacheLoginLog.value = null;
    cacheYearAvailables.value = null;
    destroyReportCache();
    destroyTeamReportCache();
    destroyCompanyReportCache();
  };
  const destroyReportCache = () => {
    return new Promise((resolve) => {
      cacheReportCurrentStats.value = null;
      cacheReportIndividual.value = null;
      cacheReportCurrentDilogue.value = null;
      cacheReportCurrentCounting.value = null;
      cacheReportCurrentLevelStats.value = null;
      cacheReportUserLevelChart.value = null;
      resolve(true);
    });
  };
  const destroyTeamReportCache = () => {
    return new Promise((resolve) => {
      cacheReportTeamMemberCurrentStats.value = null;
      cacheReportTeamLeaderCurrentStats.value = null;
      cacheReportTeamLeader.value = null;
      cacheReportTeamMember.value = null;
      cacheReportTeamMemberDilogue.value = null;
      cacheReportTemLeaderDilogue.value = null;
      cacheReportTeamMemberCounting.value = null;
      cacheReportTeamLeaderCounting.value = null;
      cacheReportTeamMemberLevelStats.value = null;
      cacheReportTeamLeaderLevelStats.value = null;
      cacheReportTeamMemberDeRatios.value = null;
      cacheReportTeamLeaderDeRatios.value = null;

      resolve(true);
    });
  };
  const destroyCompanyReportCache = () => {
    return new Promise((resolve) => {
      cacheReportCompanyCurrentStats.value = null;
      cacheReportCompany.value = null;
      cacheReportCompanyDilogue.value = null;
      cacheReportComapnyCounting.value = null;
      cacheReportComapnyLevelStats.value = null;
      cacheReportCompanyDeRatios.value = null;
      resolve(true);
    });
  };

  const logoutClear = () => {
    cacheNotifyCount.value = null;
    destroyCache();
    destroyReportCache();
    destroyTeamReportCache();
    destroyCompanyReportCache();
  };

  const fetchFromCacheToday = (key: string, cache: any) => {
    const canFetchToServer = canFecthToServerToday(key);
    return !canFetchToServer && cache && !isObjectEmpty(cache);
  };
  const fetchFromCacheMonth = (key: string, cache: any) => {
    const canFetchToServer = canFecthToServerMonth(key);
    return !canFetchToServer && cache && !isObjectEmpty(cache);
  };
  const fetchFromCacheList = (canFetchToServer: boolean, cache: any) => {
    return !canFetchToServer && cache && cache.length > 0;
  };
  return {
    findByKey,
    onAddNewKey,
    onUpdateKey,
    destroyCache,
    canFecthToServerToday,
    canFecthToServerYear,
    cacheReportCurrentStats,
    cacheReportIndividual,
    cacheReportCurrentDilogue,
    cacheReportCurrentCounting,
    cacheReportCurrentLevelStats,
    cacheYearAvailables,
    cacheReportTeamMemberCurrentStats,
    cacheReportTeamLeaderCurrentStats,
    cacheReportTeamMember,
    cacheReportTeamLeader,
    cacheReportTemLeaderDilogue,
    cacheReportTeamMemberDilogue,
    cacheReportTeamMemberCounting,
    cacheReportTeamLeaderCounting,
    cacheReportTeamMemberLevelStats,
    cacheReportTeamLeaderLevelStats,
    cacheReportTeamMemberDeRatios,
    cacheReportTeamLeaderDeRatios,
    cacheReportCompanyCurrentStats,
    cacheReportCompany,
    cacheReportCompanyDilogue,
    cacheReportComapnyCounting,
    cacheReportComapnyLevelStats,
    cacheReportCompanyDeRatios,
    fcmSetting,
    fcmToken,
    refeshTokenKey,
    authTokenKey,
    authTokenExpireKey,
    authTokenCreatedKey,
    cacheLoginLog,
    cacheNotifyCount,
    logoutClear,
    destroyReportCache,
    destroyTeamReportCache,
    destroyCompanyReportCache,
    SearchHistoryList,
    fetchFromCacheToday,
    fetchFromCacheList,
    cacheReportUserLevelChart,
    canFecthToServerMonth,
    fetchFromCacheMonth,
  };
};
