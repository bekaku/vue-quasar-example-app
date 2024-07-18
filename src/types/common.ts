/* eslint-disable @typescript-eslint/no-explicit-any */

// enum
export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export enum CrudListDataType {
  TEXT,
  HTML,
  IMAGE,
  AVATAR,
  STATUS,
  DATE,
  DATE_TIME,
  LINKABLE,
  BASE_TOOL,
  NUMBER_FORMAT,
  ICON,
  FUNCTION,
}
// type
export type Date = string;
export type SearchOperation = ':' | '>' | '>=' | '<' | '<=' | '=' | '!=';
export interface ChoosePhotoItem {
  webPath?: string;
  file?: File;
}
export type IHttpStatus =
  | 'OK'
  | 'CREATED'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'BAD_REQUEST'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR';
export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type IThemeSettingOptions = 'dark' | 'light' | 'system' | 'realtime';
export type ITheme = 'dark' | 'light';
export type ILanguge = 'en' | 'th';
export type ICrudAction = 'new' | 'view' | 'copy';
export type GenerateLinkType = 'post' | 'profile';
export type EmojiSet = 'native' | 'apple' | 'facebook' | 'google' | 'twitter';
export type IResult =
  | '404'
  | '403'
  | '500'
  | '418'
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'empty';
export type IAlert =
  | 'is-primary'
  | 'is-link'
  | 'is-info'
  | 'is-success'
  | 'is-warning'
  | 'is-danger'
  | 'is-light';
export type IHrefTarget = '_blank' | '_parent' | '_self' | '_top';
export type IconColor = 'grey' | 'color' | 'white' | 'outline';
export type ISsIcons =
  | 'action'
  | 'action_2'
  | 'add'
  | 'admin'
  | 'avatar'
  | 'adopt'
  | 'avatar'
  | 'block'
  | 'celebrate'
  | 'chat'
  | 'checkin'
  | 'comment'
  | 'company'
  | 'd_act'
  | 'd_engage'
  | 'd_keep'
  | 'd_learn'
  | 'd_use'
  | 'emoji_care'
  | 'emoji_fighting'
  | 'emoji_laugh'
  | 'emoji_learner'
  | 'emoji_learner_2'
  | 'emoji_like'
  | 'emoji_love'
  | 'emoji_sad'
  | 'emoji_wow'
  | 'empty_box'
  | 'engage'
  | 'follow_post'
  | 'help'
  | 'home'
  | 'inprogress'
  | 'like'
  | 'notification'
  | 'order'
  | 'order_command'
  | 'order_recive'
  | 'overdue'
  | 'post'
  | 'pre_emoji'
  | 'prize'
  | 'prize_2'
  | 'prize_3'
  | 'prize_4'
  | 'prize_grey'
  | 'report'
  | 'reward_trade'
  | 'sad_man'
  | 'search'
  | 'share'
  | 'tag'
  | 'team_leader'
  | 'team_member'
  | 'theme'
  | 'theme_leader'
  | 'tick'
  ;
export type JwtStatus = 'VALID' | 'EXPIRED' | 'NO_EXPIRATION_TIME' | 'INVALID';
// interface
export interface ILocales {
  name: string;
  iso: string;
  flag: string;
}
// export interface ILocales {
//   [key: string]: {
//     name: string;
//     iso: string;
//     flag: string;
//   };
// }
export interface LocaleOption {
  id: string;
  name: string;
}

export interface RequestType {
  API: string;
  baseURL?: string;
  method: IMethod;
  body?: any;
  contentType?: string;
  responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';
}
export interface ApiResponse {
  response?: any;
  error?: any;
}
export interface ResponseMessage {
  status: IHttpStatus;
  message?: string;
  timestamp: string;
}
export interface DefaultAxiosInstance {
  Accept: string;
  //   baseURL: string;
  'Content-Type': string;
  'X-language': string;
  'Code-Version': number;
  'X-Api-Client': string;
  Authorization?: string;
}
export interface UserCredentialPicture {
  path: string;
  x: string;
  xx: string;
  xxx: string;
}
export interface UserCredential {
  id: number | string;
  username: string;
  email: string;
  rolesText?: string;
  status: boolean;
  picture: UserCredentialPicture;
  userRoles?: string[];
  apiKey: string;
}
export interface AppException {
  status: string;
  message: string;
  errors?: string[];
  timestamp?: string;
}
export type ISortModeType = 'asc' | 'desc';
export interface ISort {
  mode?: ISortModeType;
  column?: string;
}
export interface ISortMode {
  label: string;
  value: ISortModeType;
}
export interface ILabelValue {
  label: string;
  value: string | number | boolean;
}
export interface LabelValue<Type> {
  label: string;
  description?: string;
  avatar?: string;
  icon?: string;
  fetch?: boolean;
  value: Type;
}
export interface ITextValue {
  text: string;
  value: number | string;
}
export interface IPagination {
  current: number;
  itemsPerPage: number;
  totalPages: number;
  totalElements?: number;
  last?: boolean;
  perPageList: ITextValue[];
}
export interface CrudListApiOptions {
  apiEndpoint?: string;
  crudName?: string;
  actionList?: string;
  actionDelete?: string;
  actionPost?: string;
  actionPut?: string;
  actionGetOne?: string;
  additionalUri?: string;
  defaultSort?: ISort;
  itemsPerPage?: number;
  fetchListOnload?: boolean;
  pageAble?: boolean;
  pageStartZero?: boolean;
  sortAble?: boolean;
}
export interface CrudFormApiOptions {
  apiEndpoint?: string;
  crudName?: string;
  fetchDataLink?: string;
  backLink?: string;
  backToPreviousPath?: boolean;
  actionList?: string;
  actionPost?: string;
  actionPut?: string;
  actionDelete?: string;
  fectchDataOnLoad?: boolean;
  autoPageTitle?: boolean;
  preventRedirectToList?: boolean;
  requestEntityName?: string;
  methodPutIncludeId?: boolean;
}
export type ResponseDataType = 'arraybuffer' | 'blob' | 'json' | 'download' | 'axiosresponse';
export type FileType = 'pdf' | 'msexcel' | 'msword' | 'mspowerpoint' | 'image' | 'zip' | 'unknown';
export type IAlign = 'center' | 'left' | 'right';
export type ChatHistoryTab = 'ALL' | 'GROUP' | 'FAVORITE';
export enum ICrudListHeaderOptionSearchType {
  TEXT,
  NUMBER,
  BOOLEAN,
  DATE,
  DATETIME,
}
export interface ICrudListHeaderOption {
  searchable?: boolean;
  fillable?: boolean;
  sortable?: boolean;
  external?: boolean; //LINKABLE
  editButton?: boolean; //BASE_TOOL
  deleteButton?: boolean; //BASE_TOOL
  copyButton?: boolean; //BASE_TOOL
  square?: boolean; //AVATAR,
  rounded?: boolean; //AVATAR,
  size?: string; //AVATAR 45px,
  style?: string; //'height: auto; width: 100px' for IMAGE,
  align?: IAlign; //'center', center left right
  searchType?: ICrudListHeaderOptionSearchType;
  searchModel?: any;
  searchColunm?: string;
  sortColunm?: string;
  searchOperation?: SearchOperation;
  noChangeSearchOperation?: boolean;
  searchOperationReadonly?: boolean;
  maxWidth?: string;//250px
  toolTip?: boolean;
  func?: any;
}
export interface ICrudListHeader {
  column?: string;
  label: string;
  type: CrudListDataType;
  options: ICrudListHeaderOption;
}
export interface UseMetaOptions {
  additionalTitle?: string;
  manualSet?: boolean;
}
export interface NotifyOptions {
  icon?: string;
  caption?: string;
  avatar?: string;
  color?: string;
  textColor?: string;
  type?: 'positive' | 'negative' | 'warning' | 'info';
  timeout?: number;
  progress?: boolean;
  multiLine?: boolean;
  spinner?: boolean;
  html?: boolean;
  hideClose?: boolean;
  position?:
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center';
  actions?: any[];
}
export interface RequestDto {
  [key: string]: any;
}
export interface IFile {
  type: string;
  size: number;
  icon: string;
  name?: string;
  filePath?: string | null;
}
export interface ServerException {
  status: number | string;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
export interface CacheDateAndKey {
  key: string;
  date: string | number;
}
export interface SlideOptions {
  keyboard?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  scrollbar?: boolean;
  zoom?: boolean;
  initialSlide?: number;
  lazy?: boolean;
  freeMode?: boolean;
  style?: string;
  speed?: number;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  centeredSlides?: boolean;
  autoplay?: boolean;
  modules?: SlideModule[];
}
export type SlideModule =
  | 'Autoplay'
  | 'Keyboard'
  | 'Scrollbar'
  | 'Zoom'
  | 'Navigation';
export interface Country {
  code: CountryCode;
  no: number;
  name: string;
}
export interface Breadcrumb {
  label: string;
  translateLabel?: boolean;
  icon?: string;
  to?: string;
  params?: string[];
  queries?: string[];
}
export interface RefeshTokenStatus {
  status: boolean;
  fourceLogout: boolean;
  token?: string;
}
export interface ForgotPasswordRequest {
  email: string;
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export type CountryCode =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';