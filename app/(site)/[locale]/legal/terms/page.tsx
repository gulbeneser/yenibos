import type { Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/config';
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
    path: `/${locale}/legal/terms`,
    title: 'Terms',
  });
}

export default async function TermsPage() {
  const messages = await getMessages();
  const terms = (messages as any).legal.terms;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-semibold">{terms.title}</h1>
      <p className="text-sm text-muted">{terms.content}</p>
    </div>
  );
}
