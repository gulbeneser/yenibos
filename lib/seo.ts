import type { Metadata } from 'next';
import type { Locale } from './i18n/config';
import site from './site';

export function buildMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const metaTitle = title ? `${title} | ${site.name}` : site.tagline[locale];
  const metaDescription = description ?? site.description[locale];
  const url = new URL(path ?? '/', site.url);

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url.pathname,
      languages: site.locales.reduce<Record<string, string>>((acc, current) => {
        acc[current] = `/${current}${path ?? ''}`;
        return acc;
      }, {}),
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: url.toString(),
      siteName: site.name,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}
