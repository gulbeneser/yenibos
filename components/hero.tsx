import Link from 'next/link';
import { Button } from './ui/button';

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}) {
  return (
    <section className="relative mt-32 overflow-hidden rounded-[32px] border border-brand-500/20 bg-brand-900/40 p-10 shadow-soft">
      <div
        className="absolute inset-0 -z-10 gradient-bg opacity-60"
        aria-hidden
      />
      <div className="flex flex-col gap-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-900/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-accent-1">
          AI-native studio
        </span>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild>
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
