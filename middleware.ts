import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from '@/lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/', '/(tr|en|de)/:path*'],
};
