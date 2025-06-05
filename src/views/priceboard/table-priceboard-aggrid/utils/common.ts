import type { ColumnState } from "ag-grid-community";
import type {
  BoardKey,
  BrokerFunction,
  IAccount,
  IBrokerPhoneCode,
  IWatchlist,
} from "../interfaces/common";
import { getKey } from "../utils";

export function handleError(error: Error, componentStack: string) {
  console.error(error);
}

export function isBlank(str?: string) {
  return str == null || /^\s*$/.test(str);
}

export function formatGender(str?: string) {
  if (str === "001") {
    return "Male";
  } else {
    return "Female";
  }
}

export function calculatorAdvanceFee(
  requestAmt: number,
  days: number,
  feeRate: number,
  minFeeAmt: number,
  maxFeeAmt: number,
) {
  return Math.min(
    Math.max((requestAmt * days * feeRate) / 360 / 100, minFeeAmt),
    maxFeeAmt,
  );
}

export function formatEnDisplay(str?: string) {
  return str
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
}

export function upperFirstLetter(data: string) {
  if (/\S[ ]/.test(data) || /\S[_]/.test(data)) {
    return data;
  }
  const result = data.toLowerCase();
  return result.charAt(0).toUpperCase() + data.slice(1);
}

export function maskingEmail(data: string) {
  return data.split("@")[0].replace(/.{4}$/, "****") + "@" + data.split("@")[1];
}

export function maskingNumber(data: string) {
  return data.replace(/\d{4}$/, "****");
}

export function getPrefixNumber(value?: number, failoverValue: string = "0") {
  if (value == null || isNaN(value)) {
    return failoverValue;
  }

  let data = value.toString().split(".");

  return data[0] || failoverValue;
}

export function formatNumber(
  value?: number,
  digit?: number,
  offsetRate?: number,
  toFixed?: boolean,
  failoverValue: string = "0",
  roundMode: "round" | "floor" | "ceil" = "round",
) {
  if (value == null || isNaN(value)) {
    return failoverValue;
  }

  let data = value;

  if (offsetRate != null) {
    data = value / offsetRate;
  }

  let tempValueString = data.toString();
  let prefix = "";

  if (tempValueString[0] === "-") {
    prefix = "-";
    tempValueString = tempValueString.substring(1, tempValueString.length);
  }

  try {
    const tempValue = Number(tempValueString);
    let fractionDigit = 0;

    const roundingFunction =
      roundMode === "round"
        ? Math.round
        : roundMode === "floor"
          ? Math.floor
          : Math.ceil;

    if (digit != null) {
      fractionDigit = digit;
    }
    if (fractionDigit > 0) {
      const temp = +`${roundingFunction(
        Number(`${Number(tempValue.toString())}e+${fractionDigit}`),
      )}e-${fractionDigit}`;
      let fractionString = "";
      let i = "";
      if (toFixed === true) {
        i = temp.toFixed(fractionDigit);
        fractionString = i.substring(i.indexOf("."), i.length);
        i = i.substring(0, i.indexOf("."));
      } else {
        i = temp.toString();
        if (temp.toString().indexOf(".") > 1) {
          fractionString = temp
            .toString()
            .substring(temp.toString().indexOf("."), temp.toString().length);
          i = temp.toString().substring(0, temp.toString().indexOf("."));
        }
      }
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + fractionString;
    } else {
      const temp = +`${roundingFunction(
        Number(`${Number(tempValue.toString())}e+${fractionDigit}`),
      )}e-${fractionDigit}`;
      const i = temp.toString();
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } catch {
    return "";
  }
}

export function getMap<T extends { readonly s: string }>(list: T[]) {
  if (!list) {
    return {};
  }

  return list.reduce<{ readonly [s: string]: T }>(
    (map: { readonly [s: string]: T }, item: T) => {
      const result = { ...map, [item.s]: item };
      return result;
    },
    {},
  );
}

export function translateLocaleText(key: string, defaultValue: string) {
  return key || defaultValue;
}

export const truncateText = (
  str: string | undefined,
  n: number,
  useWordBoundary = false,
  usePeriodBoundary = false,
  isEllipsis = true,
) => {
  if (str == null) {
    return "";
  }

  if (str.length <= n) {
    return str;
  }

  let result = "";
  const ellipsis = "...";
  const subString = str.substr(0, n - 1); // the original check

  if (useWordBoundary) {
    result = subString.substr(0, subString.lastIndexOf(" "));
  } else if (usePeriodBoundary) {
    result = subString.substr(0, subString.lastIndexOf(".") + 1);
  } else {
    result = subString;
  }

  return isEllipsis ? result + ellipsis : result;
};

export const arrayToObject = <T>(array: T[], key: keyof T) =>
  array.reduce<{ readonly [s: string]: T }>(
    // @ts-ignore
    (mutableVal, curr) => ({ ...mutableVal, [curr[key as string]]: curr }),
    {},
  );

export const removeFalsy = <T>(obj: T): T => {
  const mutableObj = {};
  // @ts-ignore
  Object.keys(obj).forEach((prop) => {
    // @ts-ignore
    if (obj[prop] != null) {
      // @ts-ignore
      mutableObj[prop] = obj[prop];
    }
  });
  return mutableObj as T;
};

export const nameof = <T>(name: keyof T) => name;

export function arrayMoveItem<T>(
  localArr: T[],
  fromIndex: number,
  toIndex: number,
) {
  toIndex = toIndex !== -1 ? toIndex : localArr.length - 1;
  if (fromIndex === toIndex) {
    return;
  }
  const current: T = localArr[fromIndex];
  if (toIndex > fromIndex) {
    for (let i = fromIndex; i < toIndex; i++) {
      localArr[i] = localArr[i + 1];
    }
    localArr[toIndex] = current;
  } else {
    for (let i = fromIndex; i > toIndex; i--) {
      localArr[i] = localArr[i - 1];
    }
    localArr[toIndex] = current;
  }
  return localArr;
}

export const formatRouteName = (...routes: string[]) => "/" + routes.join("/");

export const getRoute = (
  navConfig: unknown[],
  route?: string,
  subRoute?: string,
  accountType?: string,
  isAuthenticated?: boolean,
) => {
  const navBar = navConfig.find(
    (val) =>
      // @ts-ignore
      (val.accountType === accountType || val.systemType == null) &&
      // @ts-ignore
      val.route === route &&
      // @ts-ignore
      val.isAuthenticated === isAuthenticated,
  );
  let verifiedRoute: string | undefined;
  // @ts-ignore
  let title = navBar?.tab[0]?.title ?? "";

  if (navBar == null) {
    return { title, route: verifiedRoute };
  }

  // @ts-ignore
  const tab = navBar.tab.find((val) => val.route === subRoute);
  // @ts-ignore
  const subTabs = navBar.tab.find((val) =>
    // @ts-ignore
    val.subTab?.find((el) => el.route === subRoute),
  );

  if (tab != null) {
    title = tab.title;
    verifiedRoute = tab.route;
  }

  if (subTabs != null) {
    // @ts-ignore
    const subTab = subTabs.subTab?.find((val) => val.route === subRoute);
    if (subTab != null) {
      title = subTab.title;
      verifiedRoute = subTab.route;
    }
  }
  return { title, route: verifiedRoute };
};

export const priceClassRules = (price?: number, symbol?: unknown) =>
  price != null && symbol != null
    ? // @ts-ignore
      price === symbol.re
      ? // @ts-ignore
        globalStyles.Ref
      : // @ts-ignore
        price === symbol.ce
        ? // @ts-ignore
          globalStyles.Ceil
        : // @ts-ignore
          price === symbol.fl
          ? // @ts-ignore
            globalStyles.Floor
          : // @ts-ignore
            symbol.re != null && price > symbol.re
            ? // @ts-ignore
              globalStyles.Up
            : // @ts-ignore
              symbol.re != null && price < symbol.re
              ? // @ts-ignore
                globalStyles.Down
              : // @ts-ignore
                globalStyles.Default
    : "";

export const combineSymbolData = (newValue: unknown, oldValue?: unknown) => {
  if (oldValue == null) {
    return newValue;
  }

  return {
    ...oldValue,
    // @ts-ignore
    ...newValue,
    // @ts-ignore
    ...(newValue.re && { re: newValue.re }),
    // @ts-ignore
    ...(newValue.ce && { ce: newValue.ce }),
    // @ts-ignore
    ...(newValue.fl && { fl: newValue.fl }),
    // @ts-ignore
    ...(newValue.tb && { tb: newValue.tb }),
    // @ts-ignore
    ...(newValue.to && { to: newValue.to }),
    // @ts-ignore
    ...(Object.keys(newValue.fr || {}).length === 0 && { fr: oldValue.fr }),
  };
};
export const multiplyBy1000 = (value?: string | number) =>
  formatStringToNumber(value as string) * 1000;

export const multiplyBy1 = (value?: string | number) =>
  formatStringToNumber(value as string) * 1;

export const formatStringToNumber = (
  value?: string | number,
  separator = ",",
) =>
  typeof value === "string"
    ? Number(value?.replace(new RegExp(`\\${separator}`, "g"), ""))
    : value == null
      ? NaN
      : Number(value);

export const parseCookie = (cookie?: string) =>
  cookie
    ?.split(";")
    .map((val) => val.trim().split("="))
    .reduce<
      Array<{
        key: string;
        value: string;
      }>
    >((acc, val) => [...acc, { key: val[0], value: val[1] }], []);

export function roundDown<T>(keys: (keyof T)[], input?: T): T | undefined {
  if (!input) {
    return undefined;
  }
  let roundOutput = { ...input };
  const listKeys = Object.keys(input);
  for (const key of keys) {
    roundOutput = listKeys.includes(key as string)
      ? {
          ...roundOutput,
          // @ts-ignore
          [key]: Math.floor(input[key as string]),
        }
      : { ...roundOutput };
  }

  return roundOutput;
}

export function setColumnConfig(key: string, cols: ColumnState[]) {
  const BOARD_KEY = "BoardKey";
  let mutableColConfigs = getKey<unknown[]>(BOARD_KEY);
  const colIds = cols.map((val) => ({
    colId: val.colId,
    hide: val.hide,
    pinned: val.pinned,
  }));
  if (mutableColConfigs != null) {
    // @ts-ignore
    let config = mutableColConfigs.find((val) => val.key === key);
    if (config != null) {
      config = { ...config, cols: colIds };
      mutableColConfigs = mutableColConfigs.map((val) =>
        // @ts-ignore
        val.key === key && config ? config : val,
      );
    } else {
      config = {
        key,
        cols: colIds,
      };
      mutableColConfigs.push(config);
    }
    // setKey<unknown[]>(BOARD_KEY, mutableColConfigs);
  } else {
    // setKey<unknown[]>(BOARD_KEY, [{ key, cols: colIds }]);
  }
}

export function onRowDragEnd(
  stockCode: string,
  newIndex: number,
  selectedWatchlist: IWatchlist | null,
) {
  if (selectedWatchlist?.data) {
    const currentIndex = selectedWatchlist.data.findIndex(
      (item) => item === stockCode,
    );
    if (currentIndex > -1 && currentIndex !== newIndex) {
      const data = arrayMoveItem(
        selectedWatchlist.data,
        currentIndex,
        newIndex,
      );
      if (selectedWatchlist != null) {
        // store.dispatch(
        //   updateWatchlist(
        //     { ...selectedWatchlist, data },
        //     {
        //       type: ToastType.SUCCESS,
        //       title: "Update Favorite List",
        //       content: "DESTINATION_FAVORITE_LIST_UPDATE_MOVE_SYMBOL",
        //       contentParams: {},
        //       time: new Date(),
        //     },
        //   ),
        // );
      }
    }
  }
}

export function getDayDifference(
  d1: string | Date,
  d2: string | Date,
  limitDateQuery: unknown[],
) {
  let ms1 = new Date(d1).getTime();
  let ms2 = new Date(d2).getTime();
  const dateDifference = Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
  const limitDate = limitDateQuery.find(
    // @ts-ignore
    (ele) => ele.limit_query != null,
    // @ts-ignore
  )?.limit_query;

  if (limitDateQuery.length === 0) return true;
  else if (limitDate != null && dateDifference > limitDate) return false;
  else return true;
}

export function getAuthorizedBroker(
  brokerVerifyPin: IBrokerPhoneCode[],
  selectedAccount: IAccount | null,
  functionBroker: BrokerFunction,
): IBrokerPhoneCode | null {
  if (!selectedAccount) {
    return null;
  }
  const isFunction = brokerVerifyPin.filter(
    (val) =>
      val.function === functionBroker &&
      val.clientID === selectedAccount?.clientID,
  );

  if (isFunction.length > 0) {
    return isFunction[0];
  } else {
    return null;
  }
}

export function checkInclusionOfString(
  currentRouter: string,
  listRouter: string[],
) {
  let value = 0;
  listRouter.forEach((word: string) => {
    value = value + Number(currentRouter.includes(word));
  });
  return value === 1;
}

/**
 * Check if there is no sub M
 * @param accountList the list of sub-accounts
 * @returns true if there is no sub M, false otherwise
 */
export const noSubM = (accountList: any[]) => {
  return accountList.findIndex((el) => el.accountType === "M") === -1;
};

// WEBPACK FOOTER //
// ./src/utils/common.ts
