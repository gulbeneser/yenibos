import Image from 'next/image';
import { getMdxContent } from '@/lib/mdx';
import { buildMetadata } from '@/lib/seo';
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
  const content = await getMdxContent('cases', slug, locale);

  if (!content) {
    notFound();
  }

  return buildMetadata({
    locale,
    path: `/${locale}/cases/${slug}`,
    title: content.frontmatter.title,
    description: content.frontmatter.description,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  const slug = await resolveRequiredParam(params, 'slug');
  const content = await getMdxContent('cases', slug, locale);

  if (!content) {
    notFound();
  }

  const { frontmatter, content: body } = content;
  const messages = await getMessages();
  const casesMessages = (messages as any).caseDetail;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <span className="text-sm uppercase tracking-wide text-brand-300">
          {frontmatter.industry}
        </span>
        <h1 className="font-display text-4xl font-semibold">
          {frontmatter.title}
        </h1>
        <p className="text-muted">{frontmatter.description}</p>
      </header>

      <section className="grid gap-8 rounded-3xl border border-brand-500/20 bg-brand-900/40 p-8 shadow-soft lg:grid-cols-3">
        <div>
          <h2 className="font-display text-xl">{casesMessages.problem}</h2>
          <p className="mt-2 text-sm text-muted">{frontmatter.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-xl">{casesMessages.solution}</h2>
          <p className="mt-2 text-sm text-muted">{frontmatter.solution}</p>
        </div>
        <div>
          <h2 className="font-display text-xl">{casesMessages.results}</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted">
            {frontmatter.metrics?.map((metric: string) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl">{casesMessages.techStack}</h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          {frontmatter.tools?.map((tool: string) => (
            <li
              key={tool}
              className="rounded-full border border-brand-500/20 px-4 py-2"
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {frontmatter.images?.map((image: any) => (
          <div
            key={image.alt}
            className="overflow-hidden rounded-3xl border border-brand-500/20"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </section>

      <section className="prose prose-invert max-w-none">{body}</section>
    </article>
  );
}
