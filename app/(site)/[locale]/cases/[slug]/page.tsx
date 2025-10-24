import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getMdxBySlug } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { caseStudyJsonLd } from '@/lib/schema';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  if (!slug) {
    notFound();
  }
  const result = await getMdxBySlug('cases', slug, locale);
  if (!result)
    return buildMetadata({
      locale,
      path: `/${locale}/cases/${slug}`,
    });
  return buildMetadata({
    locale,
    path: `/${locale}/cases/${slug}`,
    title: result.frontMatter.title,
    description: result.frontMatter.description,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  if (!slug) {
    notFound();
  }
  const result = await getMdxBySlug('cases', slug, locale);

  if (!result) {
    notFound();
  }

  const { frontMatter, content } = result;
  const messages = await getMessages();
  const labels = (messages as any).cases.detail;

  return (
    <article className="prose prose-invert prose-lg max-w-3xl">
      <h1 className="font-display text-4xl font-semibold">
        {frontMatter.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {frontMatter.industry} • {frontMatter.description}
      </p>
      <div className="mt-8 grid gap-6 rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm uppercase tracking-wide text-muted">
            {labels.goal}
          </h2>
          <p className="mt-2 text-sm text-foreground/80">
            {frontMatter.summary ?? frontMatter.description}
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-wide text-muted">
            {labels.results}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-foreground/80">
            {(frontMatter.metrics ?? []).map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-wide text-muted">
            {labels.tech}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-foreground/80">
            {(frontMatter.tags ?? []).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl">
        <Image
          src={frontMatter.hero ?? '/placeholders/case-placeholder.svg'}
          alt={frontMatter.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        {content}
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudyJsonLd({
              locale,
              title: frontMatter.title,
              slug: frontMatter.slug,
              industry: frontMatter.industry ?? '',
              summary: frontMatter.description,
            }),
          ),
        }}
      />
    </article>
  );
}
