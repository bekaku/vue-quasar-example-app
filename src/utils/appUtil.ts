import {
  AppException,
  ResponseMessage,
  IHrefTarget,
  ServerException,
} from '@/types/common';
import {
  RefreshTokenResponse,
  IMenuPageItem,
  FeedType,
  EmojiType,
  IListResponse,
} from '@/types/models';
import { addDateByDays, getCurrentTimestamp } from '@/utils/dateUtil';
import {
  biFiletypePdf,
  biFiletypeXlsx,
  biFileWord,
  biFileEarmarkPpt,
  biFileEarmarkImage,
  biFileEarmarkZip,
  biPaperclip,
} from '@quasar/extras/bootstrap-icons';
import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  ExpireCookieDays,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
} from '@/utils/constant';
export const isNumber = (value: string | number): boolean => {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/**
 * 
 * @param name 
 * @returns 
 * ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
    └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
       │         │         │            │           no _ or . at the end
       │         │         │            │
       │         │         │            allowed characters
       │         │         │
       │         │         no __ or _. or ._ or .. inside
       │         │
       │         no _ or . at the beginning
       │
       username is 4-20 characters long
 */
export const validateUsername = (name: string) => {
  return String(name)
    .toLowerCase()
    .match(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);
  // .match(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,20}[a-zA-Z0-9]$/);
};
export const isAppException = (obj: any): obj is AppException => {
  return (
    obj.status !== undefined &&
    obj.message !== undefined &&
    obj.errors !== undefined
  );
};
export const isServerException = (obj: any): obj is ServerException => {
  return (
    obj.status !== undefined &&
    obj.message !== undefined &&
    obj.error !== undefined &&
    obj.timestamp !== undefined &&
    obj.path !== undefined
  );
};
export const isServerResponseMessage = (obj: any): obj is ResponseMessage => {
  return obj.status !== undefined && obj.message !== undefined;
};
export const isListResponse = (obj: any): obj is IListResponse => {
  return (
    obj.dataList !== undefined &&
    obj.last !== undefined &&
    obj.totalElements !== undefined &&
    obj.totalPages !== undefined
  );
};
export const openUrlInNewTab = (
  href: string,
  iTarget: IHrefTarget = '_blank',
  ev: Event | undefined = undefined
) => {
  Object.assign(document.createElement('a'), {
    target: iTarget,
    href,
  }).click();
  if (ev) {
    ev.stopImmediatePropagation();
  }
};
export const setAuthCookies = (
  cookies: any,
  authResponse: RefreshTokenResponse
) => {
  if (cookies) {
    cookies.set(AppAuthTokenKey, authResponse.authenticationToken, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthRefeshTokenKey, authResponse.refreshToken, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthTokenExpireKey, authResponse.expiresAt, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthTokenCreatedKey, Date.now().toString(), {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });
  }
};
export const checkExpansionChildActive = (
  currentUrlPath: string,
  items: IMenuPageItem[]
) => {
  let active = false;
  for (const page of items) {
    if (page.to == currentUrlPath) {
      active = true;
      break;
    }
  }

  return active;
};

export const isEmpty = (value: any) => {
  if (typeof value === 'number') {
    return false;
  } else if (typeof value === 'string') {
    return value.trim().length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return value == null || Object.keys(value).length === 0;
  } else if (typeof value === 'boolean') {
    return false;
  } else {
    return !value;
  }
};
export const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};
export const convertStringToNumber = (n: string | undefined): number => {
  return n ? +n : 0;
};
export const snakeToCamel = (str: string) =>
  str
    ? str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
    : '';
export const isImageFile = (f: File) => {
  if (!f) {
    return false;
  }
  return /^image\/\w+/.test(f.type);
};
export const getFileTypeIcon = (t: string) => {
  const type = t.toLowerCase();
  let icon = '';
  switch (type) {
    case 'pdf':
    case 'application/pdf':
      icon = biFiletypePdf;
      break;
    case 'xls':
    case 'xlsx':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      icon = biFiletypeXlsx;
      break;
    case 'doc':
    case 'docx':
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
      icon = biFileWord;
      break;
    case 'ppt':
    case 'pptx':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'vnd.openxmlformats-officedocument.presentationml.presentation':
      icon = biFileEarmarkPpt;
      break;
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
      icon = biFileEarmarkImage;
      break;
    case 'application/x-zip-compressed':
    case 'application/x-rar':
    case 'x-rar':
      icon = biFileEarmarkZip;
      break;
    default:
      icon = biPaperclip;
      break;
  }
  return icon;
};
export const catchUrlFromText = (inputText: string) => {
  return inputText.match(/\bhttps?:\/\/\S+/gi);
};
export const urlify = (
  inputText: string,
  linkColor: string | undefined = undefined
) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return inputText.replace(urlRegex, (url) => {
    return `<a class="app-text-link ${linkColor ? linkColor : ''
      }" href="${url}" target="_blank">${url}</a>`;
  });
};

export const roundDecimal = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};
export const blobToFile = (
  b: Blob,
  originalFileName: string
): Promise<File> => {
  return new Promise((resolve) => {
    const file = new File([b as any], originalFileName, {
      type: b.type,
    });
    resolve(file);
  });
};

export const readableNumber = (num: number, digits: number) => {
  if (num < 1000) {
    return num;
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};
export const percentage = (val: number, total: number, decimal = 2): number => {
  if (total === 0) {
    return 0;
  }
  return +((val * 100) / total).toFixed(decimal);
};
export const percentageReturnOne = (
  val: number,
  total: number,
  decimal = 2
): number => {
  const p = percentage(val, total, decimal);
  return p > 0 ? p / 100 : 0;
};
export const removeDecimal = (val: number) => {
  if (val === 0) {
    return 0;
  }
  return Math.trunc(val);
};
export const roundCeilDecimal = (val: number) => {
  if (val === 0) {
    return 0;
  }
  return Math.ceil(val);
};
export const getReactionNameFn = (
  feedType: FeedType,
  emojiType: EmojiType | undefined = undefined
) => {
  if (feedType == 'ACTION') {
    return 'reaction.actioned';
  } else if (feedType == 'SHARE') {
    return 'reaction.shared';
  } else if (feedType == 'LIKE') {
    if (!emojiType) {
      return 'reaction.loved';
    }
    return getEmojiTypeText(emojiType);
  } else if (feedType == 'PRIZE') {
    return 'reaction.prized';
  } else if (feedType == 'ADOPT') {
    return 'reaction.adopted';
  } else if (feedType == 'LEARN') {
    return 'reaction.learned';
  }
  return '';
};
export const extractHashtagsFromString = (val: string): string[] => {
  if (!val) {
    return [];
  }
  return val.split(/[\s\n\r]/gim).filter((v) => v.startsWith('#'));
};
export const extractHashtagsFromStringV2 = (val: string): string[] => {
  if (!val) {
    return [];
  }
  const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  const matches = [];
  let match;

  while ((match = regex.exec(val))) {
    matches.push(match[1]);
  }

  return matches;
};
export const extractHashtagsFromStringV1 = (val: string): string[] => {
  if (!val) {
    return [];
  }
  const res = val.match(/#[^\s#\.\;]*/gim);
  return !res ? [] : res;
};
export const mungeEmailAddress = (s: string) => {
  const i = s.indexOf('@');
  const startIndex = (i * 0.2) | 0;
  const endIndex = (i * 0.9) | 0;
  return (
    s.slice(0, startIndex) +
    s.slice(startIndex, endIndex).replace(/./g, '*') +
    s.slice(endIndex)
  );
};
export const getEmojiTypeIcon = (t: EmojiType | undefined) => {
  if (t == 'CARE') {
    return 'emoji_care';
  } else if (t == 'FIGHTING') {
    return 'emoji_fighting';
  } else if (t == 'LAUGH') {
    return 'emoji_laugh';
  } else if (t == 'SAD') {
    return 'emoji_sad';
  } else if (t == 'WOW') {
    return 'emoji_wow';
  } else {
    return 'emoji_like';
  }
};
export const getEmojiTypeText = (reactType: EmojiType | undefined) => {
  if (reactType == 'CARE') {
    return 'reaction.care';
  } else if (reactType == 'FIGHTING') {
    return 'reaction.fighting';
  } else if (reactType == 'LAUGH') {
    return 'reaction.haha';
  } else if (reactType == 'SAD') {
    return 'reaction.sad';
  } else if (reactType == 'WOW') {
    return 'reaction.wow';
  } else {
    return 'reaction.love';
  }
};
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;;
}

export const downloadURI = async (url: string, fileName: string) => {
  const image = await fetch(url)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = fileName;
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
};

export const generateimageFileName = (prefix: string | undefined = undefined) => {
  return `${prefix ? prefix : 'ss'}_${getCurrentTimestamp()}.jpg`;
};
export const getImgUrlFromFile = (f: any): Promise<string | undefined> => {
  if (!f) {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
  return new Promise((resolve) => {
    // originalimagFile.value = files[0];
    if (/^image\/\w+/.test(f.type)) {
      const url = URL.createObjectURL(f);
      resolve(url);
    }
  });
};
export const numberFormat = (no: number) => {
  return no.toLocaleString();
}
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};