import Link from 'next/link';
import { getMdxList } from '@/lib/mdx';
import type { Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  return buildMetadata({
    locale: params.locale,
    path: `/${params.locale}/blog`,
    title: 'Blog',
  });
}

export default async function BlogPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await getMessages();
  const blog = (messages as any).blog;
  const posts = await getMdxList('blog', params.locale);

  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">{blog.title}</h1>
        <p className="mt-4 text-muted">{blog.intro}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={`${post.slug}-${post.locale}`}
            className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft"
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              {post.category}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{post.description}</p>
            <p className="mt-3 text-xs text-muted">{post.date}</p>
            <Link
              href={`/${params.locale}/blog/${post.slug}`}
              className="mt-4 inline-flex text-sm text-brand-300"
            >
              {blog.readMore}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
