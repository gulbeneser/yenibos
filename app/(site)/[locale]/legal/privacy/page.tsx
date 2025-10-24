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
    path: `/${params.locale}/legal/privacy`,
    title: 'Privacy',
  });
}

export default async function PrivacyPage() {
  const messages = await getMessages();
  const privacy = (messages as any).legal.privacy;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-semibold">{privacy.title}</h1>
      <p className="text-sm text-muted">{privacy.content}</p>
    </div>
  );
}
