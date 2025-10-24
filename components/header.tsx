'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LocaleSwitcher } from './locale-switcher';
import { cn, getLocaleHref } from '@/lib/utils';
import { useLocale } from 'next-intl';

export type NavLink = {
  href: string;
  label: string;
};

export function Header({
  navLinks,
  cta,
}: {
  navLinks: NavLink[];
  cta: { label: string; href: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 24);
    listener();
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'backdrop-blur bg-brand-900/80 shadow-lg' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href={getLocaleHref(locale, '/')}
          className="flex items-center gap-2 text-lg font-display"
        >
          <span
            className="h-10 w-10 rounded-2xl bg-brand-500/20 ring-1 ring-brand-500/40"
            aria-hidden
          />
          <span>Fures Tech</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={getLocaleHref(locale, item.href)}
              className="hover:text-accent-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href={getLocaleHref(locale, cta.href)}
            className="hidden rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-300 md:inline-flex"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
