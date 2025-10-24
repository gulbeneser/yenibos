import { buildMetadata } from '@/lib/seo';
import { getMdxContent } from '@/lib/mdx';
import { getMessages } from 'next-intl/server';
import {
  resolveLocaleParam,
  resolveRequiredParam,
  type RouteParamsPromise,
} from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  const slug = await resolveRequiredParam(params, 'slug');
  const content = await getMdxContent('blog', slug, locale);

  if (!content) {
    notFound();
  }

  return buildMetadata({
    locale,
    path: `/${locale}/blog/${slug}`,
    title: content.frontmatter.title,
    description: content.frontmatter.description,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  const slug = await resolveRequiredParam(params, 'slug');
  const content = await getMdxContent('blog', slug, locale);

  if (!content) {
    notFound();
  }

  const { frontmatter, content: body } = content;
  const messages = await getMessages();
  const blog = (messages as any).blogDetail;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-brand-300">
          {frontmatter.category}
        </span>
        <h1 className="font-display text-4xl font-semibold">
          {frontmatter.title}
        </h1>
        <p className="text-muted">{frontmatter.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>{frontmatter.date}</span>
          <span>·</span>
          <span>{frontmatter.readingTime}</span>
        </div>
      </header>

      <aside className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft">
        <h2 className="font-display text-xl">{blog.tableOfContents}</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {frontmatter.toc?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>

      <div className="prose prose-invert max-w-none">{body}</div>
    </article>
  );
}
