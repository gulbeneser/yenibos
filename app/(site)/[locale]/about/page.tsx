import type { Locale } from '@/lib/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: `/${locale}/about`,
    title: 'About',
  });
}

export default async function AboutPage() {
  const messages = await getMessages();
  const about = (messages as any).about;

  return (
    <div className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div>
          <h1 className="font-display text-4xl font-semibold">{about.title}</h1>
          <p className="mt-4 text-muted">{about.intro}</p>
          <p className="mt-6 text-sm text-foreground/90">{about.story}</p>
        </div>
        <div className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft">
          <h2 className="font-display text-xl">{about.valuesTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {about.values.map((value: string) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
      <section>
        <h2 className="font-display text-2xl font-semibold">
          {about.competencyTitle}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {about.competencies.map((item: string) => (
            <li
              key={item}
              className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-4 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl font-semibold">
          {about.timelineTitle}
        </h2>
        <div className="mt-4 space-y-4 border-l border-brand-500/20 pl-6">
          {about.timeline.map((entry: any) => (
            <div key={entry.year}>
              <p className="text-sm font-semibold text-brand-300">
                {entry.year}
              </p>
              <p className="text-sm text-muted">{entry.event}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
