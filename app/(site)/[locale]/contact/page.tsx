import type { Locale } from '@/lib/i18n/config';
import { ContactForm } from '@/components/contact-form';
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
    path: `/${locale}/contact`,
    title: 'Contact',
  });
}

export default async function ContactPage() {
  const messages = await getMessages();
  const contact = (messages as any).contact;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl font-semibold">{contact.title}</h1>
        <p className="mt-4 text-muted">{contact.subtitle}</p>
        <div className="mt-8 space-y-4 text-sm text-muted">
          <p>hello@fures.at</p>
          <p>+43 660 000 0000</p>
          <p>1070 Wien, Austria</p>
        </div>
      </div>
      <div className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-8 shadow-soft">
        <ContactForm labels={contact.labels} />
      </div>
    </div>
  );
}
