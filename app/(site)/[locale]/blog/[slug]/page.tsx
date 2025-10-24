import { notFound } from 'next/navigation';
import { getMdxBySlug } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { blogPostingJsonLd } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const result = await getMdxBySlug('blog', slug, locale);
  if (!result)
    return buildMetadata({
      locale,
      path: `/${locale}/blog/${slug}`,
    });
  return buildMetadata({
    locale,
    path: `/${locale}/blog/${slug}`,
    title: result.frontMatter.title,
    description: result.frontMatter.description,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const result = await getMdxBySlug('blog', slug, locale);

  if (!result) {
    notFound();
  }

  const { frontMatter, content } = result;

  return (
    <article className="prose prose-invert prose-lg max-w-3xl">
      <p className="text-xs uppercase tracking-wide text-muted">
        {frontMatter.category} • {frontMatter.date}
      </p>
      <h1 className="font-display text-4xl font-semibold">
        {frontMatter.title}
      </h1>
      <p className="mt-4 text-base text-muted">{frontMatter.description}</p>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/90">
        {content}
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingJsonLd({
              locale,
              title: frontMatter.title,
              description: frontMatter.description,
              slug: frontMatter.slug,
              date: frontMatter.date ?? new Date().toISOString(),
            }),
          ),
        }}
      />
    </article>
  );
}
