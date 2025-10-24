import type { Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/config';
import { PricingCard } from '@/components/pricing-card';
import { FAQ } from '@/components/faq';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;
  return buildMetadata({
    locale,
    path: `/${locale}/pricing`,
    title: 'Pricing',
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const pricing = (messages as any).pricing;
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">{pricing.title}</h1>
        <p className="mt-4 text-muted">{pricing.subtitle}</p>
        <p className="mt-2 text-sm text-brand-300">{pricing.note}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricing.plans.map((plan: any) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
            cta={{
              label: pricing.custom.cta,
              href: `/${locale}/contact`,
            }}
          />
        ))}
      </div>
      <div className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-8 text-center shadow-soft">
        <h2 className="font-display text-2xl font-semibold">
          {pricing.custom.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{pricing.custom.description}</p>
        <Button asChild className="mt-4">
          <a href={`/${locale}/contact`}>{pricing.custom.cta}</a>
        </Button>
      </div>
      <section>
        <h2 className="font-display text-2xl font-semibold">FAQ</h2>
        <FAQ items={pricing.faq} />
      </section>
    </div>
  );
}
