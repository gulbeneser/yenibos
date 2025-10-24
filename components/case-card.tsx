'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getLocaleHref } from '@/lib/utils';
import { useLocale } from 'next-intl';

export function CaseCard({
  title,
  summary,
  industry,
  metrics,
  slug,
}: {
  title: string;
  summary: string;
  industry: string;
  metrics: string[];
  slug: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={getLocaleHref(locale, `/cases/${slug}`)}
      className="group flex flex-col gap-4 rounded-3xl border border-brand-500/10 bg-brand-900/40 p-6 transition hover:-translate-y-1 hover:border-brand-300/60 hover:shadow-soft"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-brand-900/60">
        <Image
          src="/placeholders/case-placeholder.svg"
          alt={title}
          fill
          className="object-cover opacity-90"
        />
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted">
        <span>{industry}</span>
        <span className="text-accent-1">Case</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted">{summary}</p>
      <ul className="mt-2 flex flex-wrap gap-2 text-xs text-brand-300">
        {metrics.map((metric) => (
          <li
            key={metric}
            className="rounded-full border border-brand-500/40 px-3 py-1"
          >
            {metric}
          </li>
        ))}
      </ul>
    </Link>
  );
}
