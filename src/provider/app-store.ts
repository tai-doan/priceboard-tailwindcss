import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils";
import { APP_CONSTANT } from "../utils/constant";

interface AppState {
  theme: string;
  volumeUnit: VolumeUnit;
  priceUnit: PriceUnit;
  valueUnit: ValueUnit;
  toggleTheme: () => void;
  getTheme: () => void;
}

type VolumeUnit = '1' | '10' | '100';
type PriceUnit = '1' | '1000';
type ValueUnit = '1000000' | '1000000000';

export const getVolumeFractionSizeFormat = (value: VolumeUnit): number => {
  if (value === '100') return 2;
  if (value === '10') return 1;
  return 0;
}

export const getPriceFractionSizeFormat = (value: PriceUnit): number => {
  if (value === '1000') return 4;
  return 0;
}

// Hàm để lấy <html> element
const getHtmlElement = (): HTMLElement => {
  return document.documentElement;
};

// Hàm để áp dụng theme từ localStorage
export const applyStoredTheme = (): void => {
  const theme = getLocalStorage(APP_CONSTANT.THEME);
  const html = getHtmlElement();

  if (theme === 'dark') {
    html.classList.remove('light');
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    setLocalStorage(APP_CONSTANT.THEME, 'light');
  }
};

// Hàm init thông tin store ban đầu
export const initStoreApp = () => {
  const volume = getLocalStorage(APP_CONSTANT.VOLUME_UNIT);
  if (!volume) {
    setLocalStorage(APP_CONSTANT.VOLUME_UNIT, '10');
  }
  const price = getLocalStorage(APP_CONSTANT.PRICE_UNIT);
  if (!price) {
    setLocalStorage(APP_CONSTANT.PRICE_UNIT, '1000');
  }
  const value = getLocalStorage(APP_CONSTANT.VALUE_UNIT);
  if (!value) {
    setLocalStorage(APP_CONSTANT.VALUE_UNIT, '1000000');
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: getLocalStorage(APP_CONSTANT.THEME) ?? 'light',
  getTheme: () => get().theme,
  toggleTheme: () => {
    const html = getHtmlElement();
    const isDark = html.classList.contains('dark');

    if (isDark) {
      html.classList.remove('dark');
      html.classList.add('light');
      setLocalStorage(APP_CONSTANT.THEME, 'light');
      set({ theme: 'light' });
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      setLocalStorage(APP_CONSTANT.THEME, 'dark');
      set({ theme: 'dark' });
    }
  },
  volumeUnit: getLocalStorage(APP_CONSTANT.VOLUME_UNIT) as VolumeUnit ?? '10',
  priceUnit: getLocalStorage(APP_CONSTANT.PRICE_UNIT) as PriceUnit ?? '1000',
  valueUnit: getLocalStorage(APP_CONSTANT.VALUE_UNIT) as ValueUnit ?? '1000000',
}));
