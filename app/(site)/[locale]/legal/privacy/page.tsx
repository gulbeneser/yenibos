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
  return buildMetadata({
    locale,
    path: `/${locale}/legal/privacy`,
    title: 'Privacy Policy',
  });
}

export default async function PrivacyPage() {
  const messages = await getMessages();
  const privacy = (messages as any).legal.privacy;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-semibold">{privacy.title}</h1>
      <div className="space-y-4 text-sm text-muted">
        {privacy.sections.map((section: any) => (
          <section key={section.title}>
            <h2 className="font-display text-xl text-foreground">
              {section.title}
            </h2>
            <p className="mt-2">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
