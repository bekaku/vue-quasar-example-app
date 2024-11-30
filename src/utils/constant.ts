export const PrefixKey = '_myappkey_';
export const DefaultLocale = 'th';
export const LocaleKey = PrefixKey + 'locale';
export const ThemeKey = PrefixKey + 'theme';
export const DefaultApiCLient = 'default';
export const AppAuthTokenKey = PrefixKey + '01';
export const AppAuthRefeshTokenKey = PrefixKey + '02';
export const AppAuthDataKey = PrefixKey + '03';
export const AppAuthTokenExpireKey = PrefixKey + '04';
export const AppAuthTokenCreatedKey = PrefixKey + '05';
export const ExpireCookieDays = 30;
export const autoRefeshTokenDays = 30;
export const SearchParamiter = '_q';
export const KeywordParamiter = '_keyword';
export const SearchMinCharactor = 1;
export const PageActionParamiter = 'crud';
export const PageIdParamiter = 'id';
export const BackendRootPath = undefined;
export const AdminRootPath = 'admin';
export const CompanyIdAtt = 'companyId';
export const UserIdAtt = 'userId';
export const ProfileNameAtt = 'userProfileId';
export const CacheDateCheckKey = PrefixKey + '_cache_date_check';
export const FcmTokenKey = PrefixKey + '_mb_fcm';
export const FcmSettingKey = PrefixKey + '_mb_fcm_setting';
export const NotifyKey = PrefixKey + '_mb_notify';
export const SearchHistoryKey = PrefixKey + '_searchs';
export const SucureDeviceIdAtt = '_device_jid';
export const AppDomain = 'your-domain.com';
export const FileNamePrefix = 'app_file';
export const LatestSyncActiveStatusKey = PrefixKey + 'web_latest_sync_active_status';
export const MaxSelectFiles = 10;
export const CacheKey = {
  YEAR_AVAILABLE: PrefixKey + 'year_available',
  REPORT_CURRENT_STATS: PrefixKey + 'cache_1',
  REPORT_INDIVIDUAL: PrefixKey + 'cache_2',
  REPORT_CURRENT_DIALOGUE: PrefixKey + 'cache_3',
  REPORT_CURRENT_COUNTING: PrefixKey + 'cache_4',
  REPORT_CURRENT_LEVEL_STATS: PrefixKey + 'cache_5',
  REPORT_TEAM_MEMBER_CURRENT_STATS: PrefixKey + 'cache_6',
  REPORT_TEAM_LEADER_CURRENT_STATS: PrefixKey + 'cache_7',
  REPORT_TEAM_MEMBER: PrefixKey + 'cache_8',
  REPORT_TEAM_LEADER: PrefixKey + 'cache_9',
  REPORT_TEAM_MEMBER_DIALOUGE: PrefixKey + 'cache_10',
  REPORT_TEAM_LEADER_DIALOUGE: PrefixKey + 'cache_11',
  REPORT_TEAM_MEMBER_COUNTING: PrefixKey + 'cache_12',
  REPORT_TEAM_LEADER_COUNTING: PrefixKey + 'cache_13',
  REPORT_TEAM_MEMBER_LEVEL_STATS: PrefixKey + 'cache_14',
  REPORT_TEAM_LEADER_LEVEL_STATS: PrefixKey + 'cache_15',
  REPORT_TEAM_MEMBER_DE_RATIOS: PrefixKey + 'cache_16',
  REPORT_TEAM_LEADER_DE_RATIOS: PrefixKey + 'cache_17',
  REPORT_COMPANY_CURRENT_STATS: PrefixKey + 'cache_18',
  REPORT_COMPANY: PrefixKey + 'cache_19',
  REPORT_COMPANY_DIALOGUE: PrefixKey + 'cache_20',
  REPORT_COMPANY_COUNTING: PrefixKey + 'cache_21',
  REPORT_COMPANY_LEVEL_STATS: PrefixKey + 'cache_22',
  REPORT_COMPANY_DE_RATIOS: PrefixKey + 'cache_23',
  REPORT_USER_LEVEL_CHART: PrefixKey + 'cache_24',
  REPORT_USER_SCORE_HISTORY: PrefixKey + 'cache_25',
  REPORT_USER_LEVEL_CHART_IN_YEAR: PrefixKey + 'cache_26',
  LOGIN_LOG: PrefixKey + 'login_log',
};
export const FileExtensionAccept =
  '.jpg,.png,.gif,.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar';

export const FileTypeAcceptList = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'application/vnd.rar',
  'application/zip',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
  'text/csv'
];
export const LIMIT_FILE_SIZE_MB = 50;
export const LIMIT_FILE_SIZE = LIMIT_FILE_SIZE_MB * 1024 * 1024;
export const FILES_UPLOAD_ATT = '_filesUploadName';
export const FILES_DIRECTORY_ID_ATT = 'fileDirectoryId';
export const OS_PLATFORM = {
  WEB: 1,
  IOS: 2,
  ANDROID: 3,
};
export const CrudAction = {
  VIEW: 'view',
  NEW: 'new',
  COPY: 'copy',
};
export const DEFULT_ITEM_PER_PAGET = 10;
export const SearchOperation = {
  MATCH: ':',
  GREATER_THAN: '>',
  GREATER_THAN_EQUA: '>=',
  LESS_THAN: '<',
  LESS_THAN_EQUA: '<=',
  EQUA: '=',
  NOT_EQUA: '!=',
};
export const AvatarPlaceHolder128 = 'https://i.pravatar.cc/128';
export const FeedSectionWidth = 300;
export const UserLevelBenefitType = {
  MASTER: 4,
  ADVANCE: 3,
  ACTIVE: 2,
  LEARNER: 1,
  PASSIVE: 0,
};
export const FeelingColors = {
  WARNING: '#ff8a06',
  SUCCESS: '#2dd36f',
  DANGER: '#ec1c27',
};
export const FCM_USER_TOPIC = 'io.synapse.fcm.user.';
export const AUTH_NO_FILTER: string[] = [
  '/auth/login',
  '/error',
];
