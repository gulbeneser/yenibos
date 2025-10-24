import Link from 'next/link';
import { getMdxList } from '@/lib/mdx';
import { buildMetadata } from '@/lib/seo';
import { getMessages } from 'next-intl/server';
import {
  resolveLocaleParam,
  type RouteParamsPromise,
} from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  return buildMetadata({
    locale,
    path: `/${locale}/blog`,
    title: 'Blog',
  });
}

export default async function BlogPage({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  const messages = await getMessages();
  const blog = (messages as any).blog;
  const posts = await getMdxList('blog', locale);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-semibold">{blog.title}</h1>
        <p className="mt-4 max-w-2xl text-muted">{blog.intro}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft transition hover:border-brand-300/70"
          >
            <span className="text-xs uppercase tracking-widest text-brand-300">
              {post.category}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{post.description}</p>
            <span className="mt-4 inline-flex text-xs text-muted">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
