import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "admin-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const listeners = new Set<() => void>();

export const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
};

const applyTheme = (theme: Theme) => {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia(DARK_QUERY).matches);
  document.documentElement.classList.toggle("dark", dark);
};

export const setTheme = (theme: Theme) => {
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode etc.) — still apply for this session.
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  // Keep multiple tabs in sync.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system");
  return [theme, setTheme] as const;
};

/**
 * Dark mode is admin-only: the guest pages use a fixed Thanksgiving palette.
 * Adds `.dark` to <html> while the admin layout is mounted (so portals inherit
 * it too), follows OS changes in "system" mode, and removes it on the way out.
 */
export const useAdminDarkMode = () => {
  useEffect(() => {
    applyTheme(readTheme());

    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => applyTheme(readTheme());
    media.addEventListener("change", onChange);
    window.addEventListener("storage", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("storage", onChange);
      document.documentElement.classList.remove("dark");
    };
  }, []);
};

/**
 * Runs in <head> before first paint so a hard load of /admin doesn't flash
 * light. Client-side navigations are handled by useAdminDarkMode instead.
 */
export const themeInitScript = `(function(){try{if(!/^\\/admin(\\/|$)/.test(location.pathname))return;var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(t==="dark"||(t!=="light"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches))document.documentElement.classList.add("dark")}catch(e){}})()`;
