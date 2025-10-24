import { Button } from './ui/button';

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  highlighted,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col gap-4 rounded-3xl border border-brand-500/20 bg-brand-900/50 p-8 shadow-soft ${
        highlighted ? 'ring-2 ring-accent-1' : ''
      }`}
    >
      {highlighted ? (
        <span className="absolute right-6 top-6 rounded-full bg-accent-1 px-3 py-1 text-xs font-semibold text-brand-900">
          Önerilen
        </span>
      ) : null}
      <div>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {name}
        </h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <div className="text-3xl font-semibold text-brand-300">{price}</div>
      <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground/90">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span
              className="mt-1 h-2 w-2 rounded-full bg-accent-2"
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button asChild className="mt-auto">
        <a href={cta.href}>{cta.label}</a>
      </Button>
    </div>
  );
}
