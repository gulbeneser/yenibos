import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig, type RequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import deMessages from '../../locales/de.json';
import enMessages from '../../locales/en.json';
import trMessages from '../../locales/tr.json';
import { defaultLocale, locales } from './config';
import type { Locale } from './config';

const loadedMessages: Record<Locale, AbstractIntlMessages> = {
  de: deMessages as unknown as AbstractIntlMessages,
  en: enMessages as unknown as AbstractIntlMessages,
  tr: trMessages as unknown as AbstractIntlMessages,
};

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale as Locale;
  const resolvedLocale: Locale = locales.includes(candidate)
    ? candidate
    : defaultLocale;

  try {
    const config: RequestConfig = {
      locale: resolvedLocale,
      messages: loadedMessages[resolvedLocale],
    };

    return config;
  } catch {
    notFound();
  }
});
