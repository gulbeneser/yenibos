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
    path: `/${params.locale}/search`,
    title: 'Search',
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { q?: string };
}) {
  const messages = await getMessages();
  const query = (searchParams.q ?? '').toLowerCase();
  const blog = await getMdxList('blog', params.locale);
  const cases = await getMdxList('cases', params.locale);
  const results = [...blog, ...cases].filter((item) =>
    query
      ? `${item.title} ${item.description}`.toLowerCase().includes(query)
      : true,
  );
  const search = (messages as any).search;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-semibold">{search.title}</h1>
        <form className="mt-4">
          <input
            name="q"
            defaultValue={searchParams.q ?? ''}
            placeholder={search.placeholder}
            className="w-full rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          />
        </form>
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold">
          {search.results}
        </h2>
        <div className="mt-4 space-y-4">
          {results.length === 0 ? (
            <p className="text-sm text-muted">{search.noResults}</p>
          ) : (
            results.map((item) => (
              <a
                key={`${item.slug}-${item.locale}`}
                href={`/${params.locale}/${item.category ? 'blog' : 'cases'}/${item.slug}`}
                className="block rounded-3xl border border-brand-500/20 bg-brand-900/40 p-4 text-sm text-muted hover:border-brand-300 hover:text-brand-300"
              >
                <span className="text-xs uppercase tracking-wide text-brand-300">
                  {item.category ?? item.industry}
                </span>
                <p className="mt-1 text-base text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.description}</p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
