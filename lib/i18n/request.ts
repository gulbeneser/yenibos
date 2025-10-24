import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { defaultLocale, locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as (typeof locales)[number])
    ? locale
    : defaultLocale;

  try {
    return {
      locale: resolvedLocale,
      messages: (await import(`@/locales/${resolvedLocale}.json`)).default,
    };
  } catch {
    notFound();
  }
});
