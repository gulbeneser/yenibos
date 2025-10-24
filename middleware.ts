import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from '@/lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|humans.txt|manifest.webmanifest|assets|.*\\..*).*)',
  ],
};
