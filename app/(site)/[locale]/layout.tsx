import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { organizationJsonLd, websiteJsonLd } from '@/lib/schema';
import type { Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();

  if (!messages) {
    notFound();
  }

  const locale = params.locale;
  const layout = (messages as any).layout;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-12 pt-24 lg:px-10">
        <Header
          navLinks={layout.navigation.links}
          cta={layout.navigation.cta}
        />
        <div className="flex-1">{children}</div>
        <Footer
          groups={layout.footer.groups}
          description={layout.footer.description}
          newsletter={layout.footer.newsletter}
          legal={layout.footer.legal}
        />
      </main>
      <Analytics />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationJsonLd(locale), websiteJsonLd(locale)],
          }),
        }}
      />
    </NextIntlClientProvider>
  );
}
