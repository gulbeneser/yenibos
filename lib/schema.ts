import site from './site';
import type { Locale } from './i18n/config';

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/api/og`,
    sameAs: Object.values(site.socials),
    areaServed: locale,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: site.url,
    name: site.tagline[locale],
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingJsonLd({
  locale,
  title,
  description,
  slug,
  date,
}: {
  locale: Locale;
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    inLanguage: locale,
    datePublished: date,
    author: {
      '@type': 'Organization',
      name: site.name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/api/og`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/${locale}/blog/${slug}`,
    },
  };
}

export function caseStudyJsonLd({
  locale,
  title,
  slug,
  industry,
  summary,
}: {
  locale: Locale;
  title: string;
  slug: string;
  industry: string;
  summary: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: title,
    genre: industry,
    inLanguage: locale,
    description: summary,
    url: `${site.url}/${locale}/cases/${slug}`,
  };
}
