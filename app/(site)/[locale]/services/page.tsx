import type { Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/config';
import { ServiceCard } from '@/components/service-card';
import { buildMetadata } from '@/lib/seo';
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
    path: `/${locale}/services`,
    title: 'Services',
  });
}

export default async function ServicesPage() {
  const messages = await getMessages();
  const services = (messages as any).services;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-semibold">
          {services.title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{services.intro}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {services.sections.map((section: any) => (
          <ServiceCard
            key={section.id}
            title={section.title}
            description={section.description}
            deliverables={section.deliverables}
            kpis={section.kpis}
            faqs={section.faqs}
          />
        ))}
      </div>
    </div>
  );
}
