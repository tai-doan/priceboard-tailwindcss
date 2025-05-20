import { setLocalStorage } from ".";
import { APP_CONSTANT } from "./constant";

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
  }
};

// Hàm để toggle theme
export const toggleTheme = (): void => {
  const html = getHtmlElement();
  const isDark = html.classList.contains('dark');

  if (isDark) {
    html.classList.remove('dark');
    html.classList.add('light');
    setLocalStorage(APP_CONSTANT.THEME, 'light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    setLocalStorage(APP_CONSTANT.THEME, 'dark');
  }
};
