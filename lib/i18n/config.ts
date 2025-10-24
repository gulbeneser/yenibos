export const locales = ['tr', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
};

export const localePrefix = 'as-needed';

export function isLocale(value: string | null | undefined): value is Locale {
  if (!value) {
    return false;
  }

  return (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}
