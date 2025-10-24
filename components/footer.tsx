'use client';

import Link from 'next/link';
import site from '@/lib/site';
import { getLocaleHref } from '@/lib/utils';
import { useLocale } from 'next-intl';

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

type FooterProps = {
  groups: FooterLinkGroup[];
  description: string;
  newsletter?: { title: string; hint: string };
  legal: { label: string; href: string }[];
};

function resolveHref(locale: string, href: string) {
  if (href.startsWith('http')) {
    return href;
  }
  return getLocaleHref(locale, href);
}

export function Footer({
  groups,
  description,
  newsletter,
  legal,
}: FooterProps) {
  const locale = useLocale();
  return (
    <footer className="mt-24 border-t border-brand-500/10 bg-brand-900/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[2fr,3fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3 text-xl font-display">
            <span
              className="h-12 w-12 rounded-2xl bg-brand-500/20 ring-1 ring-brand-500/40"
              aria-hidden
            />
            <span>Fures Tech</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">{description}</p>
          {newsletter ? (
            <div className="mt-6 rounded-2xl border border-brand-500/20 bg-brand-900/40 p-4 text-sm text-muted">
              <p className="font-semibold text-foreground">
                {newsletter.title}
              </p>
              <p className="mt-2 text-muted">{newsletter.hint}</p>
              <Link
                href="mailto:hello@fures.at"
                className="mt-3 inline-flex rounded-2xl bg-brand-500 px-4 py-2 font-semibold text-white shadow-soft"
              >
                hello@fures.at
              </Link>
            </div>
          ) : null}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-muted">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={resolveHref(locale, link.href)}
                      className="hover:text-accent-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-500/10 bg-brand-900/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted sm:flex-row lg:px-10">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={resolveHref(locale, item.href)}
                className="hover:text-accent-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
