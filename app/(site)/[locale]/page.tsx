import Link from 'next/link';
import { Hero } from '@/components/hero';
import { StatBar } from '@/components/stat-bar';
import { CaseCard } from '@/components/case-card';
import { Testimonial } from '@/components/testimonial';
import { Marquee } from '@/components/marquee';
import { Button } from '@/components/ui/button';
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
  return buildMetadata({ locale, path: `/${locale}` });
}

export default async function HomePage({
  params,
}: {
  params: RouteParamsPromise;
}) {
  const locale: Locale = await resolveLocaleParam(params);
  const messages = await getMessages();
  const home = (messages as any).home;
  const hero = home.hero;
  const stats = home.stats as Array<{ label: string; value: string }>;
  const services = home.whatWeDo.items as Array<{
    title: string;
    description: string;
  }>;
  const testimonials = home.testimonials as Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  const clients = home.clients as string[];
  const cases = await getMdxList('cases', locale);

  return (
    <div className="space-y-20">
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        primaryCta={{
          ...hero.primaryCta,
          href: `/${locale}${hero.primaryCta.href}`,
        }}
        secondaryCta={{
          ...hero.secondaryCta,
          href: `/${locale}${hero.secondaryCta.href}`,
        }}
      />

      <section>
        <h2 className="font-display text-3xl font-semibold">
          {home.whatWeDo.title}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft"
            >
              <h3 className="font-display text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <StatBar stats={stats} />

      <section>
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              {home.selectedCases.title}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {home.selectedCases.description}
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href={`/${locale}/cases`}>{home.selectedCases.cta}</Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cases.slice(0, 3).map((item) => (
            <CaseCard
              key={item.slug}
              title={item.title}
              summary={item.description}
              industry={item.industry ?? ''}
              metrics={item.metrics ?? []}
              slug={item.slug}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-10 shadow-soft">
          <h2 className="font-display text-3xl font-semibold">
            {home.process.title}
          </h2>
          <ol className="mt-6 space-y-6">
            {home.process.steps.map(
              (step: { title: string; description: string }, index: number) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 font-display text-lg text-brand-300">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </section>

      <Marquee items={clients} />

      <section className="rounded-3xl border border-brand-500/20 bg-brand-900/50 p-10 text-center shadow-soft">
        <h2 className="font-display text-3xl font-semibold">
          {home.cta.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{home.cta.subtitle}</p>
        <Button asChild className="mt-6">
          <Link href={`/${locale}/contact`}>{home.cta.button}</Link>
        </Button>
      </section>
    </div>
  );
}
