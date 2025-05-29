import { create } from "zustand";
import { setLocalStorage } from "../utils";
import { APP_CONSTANT } from "../utils/constant";

interface AppState {
  theme: string;
  toggleTheme: () => void;
  getTheme: () => void;
}

// Hàm để lấy <html> element
const getHtmlElement = (): HTMLElement => {
  return document.documentElement;
};

// Hàm để áp dụng theme từ localStorage
export const applyStoredTheme = (): void => {
  const theme = localStorage.getItem(APP_CONSTANT.THEME);
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

export const useAppStore = create<AppState>((set, get) => ({
  theme: localStorage.getItem(APP_CONSTANT.THEME) ?? 'light',
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
  }
}));
