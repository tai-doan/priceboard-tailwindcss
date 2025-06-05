import * as dateFns from "date-fns";
import {
  DATE_FORMAT_DISPLAY,
  DATE_FORMAT_INPUT,
  DATE_TIME_FORMAT_INPUT,
  TIME_FORMAT_DISPLAY,
} from "../constants/main";

export function formatDateToString(
  date?: Date,
  formatOutput = DATE_FORMAT_INPUT,
) {
  if (date == null) {
    return date;
  }
  return dateFns.format(date, formatOutput);
}

const t = (key: any, props: any) => String(key);

export function formatNotificationTimeToDisplay(notificationTime: Date) {
  const now = new Date();
  const delta = (now.getTime() - notificationTime.getTime()) / 1000;
  if (delta < 60) {
    return t("SECOND_AGO", { count: Math.round(delta) });
  }
  if (delta < 3600) {
    return t("MINUTE_AGO", { count: Math.round(delta / 60) });
  }
  if (delta <= 86400) {
    return t("HOUR_AGO", { count: Math.round(delta / 3600) });
  }
  return formatDateToString(notificationTime, DATE_FORMAT_DISPLAY);
}

export function formatTimeToDisplay(
  stringInput?: string,
  formatOutput = TIME_FORMAT_DISPLAY,
  formatInput = DATE_TIME_FORMAT_INPUT,
  ignoreTimeZone?: boolean,
) {
  try {
    if (!stringInput) {
      return null;
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    if (ignoreTimeZone !== true) {
      time = dateFns.addHours(time, 7);
    }
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatDateToDisplay(
  stringInput?: string,
  formatOutput = DATE_FORMAT_DISPLAY,
  formatInput = DATE_FORMAT_INPUT,
  ignoreTimeZone?: boolean,
) {
  try {
    if (!stringInput) {
      return null;
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    if (ignoreTimeZone !== true) {
      time = dateFns.addHours(time, 7);
    }
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatStringToDate(
  stringInput: string | undefined,
  formatInput = DATE_FORMAT_INPUT,
) {
  if (stringInput == null) {
    return new Date();
  }

  return dateFns.parse(stringInput, formatInput, new Date());
}

export function addDays(date: Date, day: number) {
  return dateFns.addDays(date, day);
}

export function formatTimeToUTC(a: Date, offsetTimeZone = 0) {
  const year = a.getFullYear();
  const month = a.getMonth();
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return Date.UTC(year, month, date, hour + offsetTimeZone, min, sec);
}

export function getDateAMonthAgo() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
}

export function getLastWorkingDayOfMonth(year: number, month: number): string {
  if (!year || !month) {
    return new Date().toDateString();
  }
  const day = new Date(year, month, 0).getDay();
  const date = new Date(year, month, 0).getDate();
  if (day === 0) {
    return `${date - 2}/${month}/${year}`;
  }
  if (day === 6) {
    return `${date - 1}/${month}/${year}`;
  }
  return `${date}/${month}/${year}`;
}

export function getPreviousDay(date: Date) {
  date.setDate(date.getDate() - 1);
  return date;
}

export function convertStringToDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  if (!day || !month || !year) {
    return new Date(NaN);
  }

  return new Date(year, month - 1, day);
}

/**
 * Get the string representation of a month of given date in this format: mm.
 * @param date could be Date object or string
 * @returns the string representation
 */
export function getMonthString(date: Date | string) {
  let month =
    (typeof date === "string" ? new Date(date).getMonth() : date.getMonth()) +
    1; // getMonth is zero-based so we need to add 1
  return month < 10 ? "0" + month : month + "";
}

// WEBPACK FOOTER //
// ./src/utils/datetime.ts
