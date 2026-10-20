export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "stphncodes-theme";

/** The brand default. Visitors can switch and the choice is remembered per browser. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs inline in <head> before first paint so the chosen theme never flashes.
 * Kept as a plain string because it must execute before React hydrates.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark"){t=${JSON.stringify(DEFAULT_THEME)}}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;
