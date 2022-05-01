const ACCEPT_LOCALES = ['ru', 'en-US'] as const;
export const DEFAULT_LOCALE = ACCEPT_LOCALES[1];
export type AcceptLocales = typeof ACCEPT_LOCALES[number];

export const getLocale = (): AcceptLocales => {
  if (ACCEPT_LOCALES.find((locale) => locale === navigator.language))
    return navigator.language as typeof ACCEPT_LOCALES[number];

  return DEFAULT_LOCALE;
};
