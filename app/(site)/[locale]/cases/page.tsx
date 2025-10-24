import Link from 'next/link';
import { CaseCard } from '@/components/case-card';
import { getMdxList } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  return buildMetadata({
    locale,
    path: `/${locale}/cases`,
    title: 'Case Studies',
  });
}

export default async function CasesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const messages = await getMessages();
  const casesMessages = (messages as any).cases;
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const resolvedSearchParams = (await searchParams) ?? {};
  const filterParam = resolvedSearchParams.filter;
  const filterValue = Array.isArray(filterParam) ? filterParam[0] : filterParam;
  const filter = filterValue ?? 'all';
  const data = await getMdxList('cases', locale);
  const filtered =
    filter === 'all'
      ? data
      : data.filter((item) => item.tags?.includes(filter));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-semibold">
          {casesMessages.title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{casesMessages.intro}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {casesMessages.filters.map((item: any) => (
          <Link
            key={item.id}
            href={`/${locale}/cases?filter=${item.id}`}
            className={`rounded-full border px-4 py-2 text-sm ${
              filter === item.id
                ? 'border-brand-300 text-brand-300'
                : 'border-brand-500/20 text-muted'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((item) => (
          <CaseCard
            key={`${item.slug}-${item.locale}`}
            title={item.title}
            summary={item.description}
            industry={item.industry ?? ''}
            metrics={item.metrics ?? []}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
}
