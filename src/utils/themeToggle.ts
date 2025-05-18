// themeToggle.ts

// Hàm để lấy <html> element
const getHtmlElement = (): HTMLElement => {
    return document.documentElement;
  };

  // Hàm để áp dụng theme từ localStorage
  export const applyStoredTheme = (): void => {
    const theme = localStorage.getItem('theme');
    const html = getHtmlElement();

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  // Hàm để toggle theme
  export const toggleTheme = (): void => {
    const html = getHtmlElement();
    const isDark = html.classList.contains('dark');

    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
