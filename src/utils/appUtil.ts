import {
  AppException,
  IHrefTarget,
  ISortModeType,
  ResponseMessage,
  ServerException,
} from '@/types/common';
import {
  EmojiType,
  FeedType,
  IListResponse,
  IMenuPageItem
} from '@/types/models';
import {
  AppAuthRefeshTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthTokenExpireKey,
  AppAuthTokenKey,
  SucureDeviceIdAtt
} from '@/utils/constant';
import { getCurrentTimestamp } from '@/utils/dateUtil';
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
export const formatBytes = (bytes: any, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
  // return val.split(/[\s\n\r]/gim).filter((v) => v.startsWith('#'));
  // return extractHashtagsStartingWithLetter(val)
  return val.split(/[\s\n\r]/gim).filter((v) => {
    if (v.startsWith('#')) {
      // Check if the character following '#' is not a digit (0-9)
      return !(/^\#\d/.test(v));
    }
    return false;
  });
};
export const extractHashtagsStartingWithLetter = (str: string): string[] => {
  // Regular expression to match hashtags starting with a letter
  // const regex = /#[a-zA-Z]\w*/g;
  const regex = /(^|\s)(#[^0-9]\w*)/g;

  // Use match() to find all matches in the string
  const hashtags = str.match(regex);

  return hashtags || []; // Return an empty array if no hashtags are found
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
export const detroyAuthCookie = (cookies: any) => {
  if (cookies) {
    cookies.remove(AppAuthTokenKey, { path: '/', });
    cookies.remove(AppAuthRefeshTokenKey, { path: '/', });
    cookies.remove(AppAuthTokenExpireKey, { path: '/', });
    cookies.remove(AppAuthTokenCreatedKey, { path: '/', });
    if (process.env.SERVER) {
      cookies.remove(SucureDeviceIdAtt, { path: '/', });
    }
    // cookies.remove(AppAuthTokenKey, { path: '/', domain: !devMode ? AppDomain : undefined, });
    // cookies.remove(AppAuthRefeshTokenKey, { path: '/', domain: !devMode ? AppDomain : undefined, });
    // cookies.remove(AppAuthTokenExpireKey, { path: '/', domain: !devMode ? AppDomain : undefined, });
    // cookies.remove(AppAuthTokenCreatedKey, { path: '/', domain: !devMode ? AppDomain : undefined, });
  }
}
export const sortedArray = <T>(list: any[], filedName: string, mode: ISortModeType): Promise<T> => {
  return new Promise((resolve) => {
    let finalList: any[] = [];
    if (list && list.length > 0) {
      if (mode === 'asc') {
        finalList = list.sort((a, b) => a[filedName] - b[filedName]);
      } else {
        finalList = list.sort((a, b) => b[filedName] - a[filedName]);
      }
    }
    resolve(finalList as T);
  });
};
export const isEmptyVal = (val: any) => {
  return !val || val == 'null' || val == null || val == '' || val == undefined || val == 'undefined';
};

export const escapeHtml = (unsafe: string | undefined) => {
  if (!unsafe) {
    return '';
  }
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return unsafe.replace(/[&<>"']/g, (char) => map[char]);
};
export const unescapeHtml = (safe: string | undefined) => {
  if (!safe) {
    return '';
  }
  const map: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': '\''
  };
  return safe.replace(/&(amp|lt|gt|quot|#039);/g, (entity) => map[entity]);
};