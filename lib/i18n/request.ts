import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import deMessages from '../../locales/de.json';
import enMessages from '../../locales/en.json';
import trMessages from '../../locales/tr.json';
import { defaultLocale, locales } from './config';
import type { Locale } from './config';

const loadedMessages = {
  de: deMessages,
  en: enMessages,
  tr: trMessages,
} as const;

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale as Locale;
  const resolvedLocale: Locale = locales.includes(candidate)
    ? candidate
    : defaultLocale;

  try {
    return {
      locale: resolvedLocale,
      messages: loadedMessages[resolvedLocale],
    };
  } catch {
    notFound();
  }
});
