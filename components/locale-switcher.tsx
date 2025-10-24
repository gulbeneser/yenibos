'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { localeNames, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-sm text-muted',
        className,
      )}
    >
      <span className="sr-only">Dil seç</span>
      <select
        className="rounded-xl border border-brand-500/20 bg-brand-900/50 px-3 py-1.5 text-foreground shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
        value={locale}
        onChange={(event) => {
          router.replace(pathname, { locale: event.target.value as Locale });
        }}
      >
        {Object.entries(localeNames).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
