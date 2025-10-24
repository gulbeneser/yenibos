export function ServiceCard({
  title,
  description,
  deliverables,
  kpis,
  faqs,
}: {
  title: string;
  description: string;
  deliverables: string[];
  kpis: string[];
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="glass-panel flex flex-col gap-6 rounded-3xl p-8">
      <div>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Teslimatlar
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1 h-2 w-2 rounded-full bg-accent-1"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Örnek KPI'lar
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          {kpis.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1 h-2 w-2 rounded-full bg-accent-2"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Mini SSS
        </h4>
        <ul className="mt-3 space-y-3 text-sm text-foreground/90">
          {faqs.map((item) => (
            <li key={item.question}>
              <p className="font-semibold text-brand-300">{item.question}</p>
              <p className="mt-1 text-muted">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
