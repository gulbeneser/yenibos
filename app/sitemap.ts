import type { MetadataRoute } from 'next';
import site from '@/lib/site';
import { locales } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const routes = [
    '/',
    '/services',
    '/cases',
    '/pricing',
    '/blog',
    '/about',
    '/contact',
  ];
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
    })),
  );
}
