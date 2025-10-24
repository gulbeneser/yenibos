type ProConProps = {
  pros: string[];
  cons: string[];
};

export function ProCon({ pros, cons }: ProConProps) {
  return (
    <div className="mt-6 grid gap-4 rounded-2xl border border-brand-500/20 bg-brand-900/30 p-6 shadow-soft md:grid-cols-2">
      <div>
        <h4 className="font-display text-lg font-semibold text-accent-1">
          Avantajlar
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          {pros.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-1"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold text-accent-2">
          Dikkat Edilecekler
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          {cons.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-2"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
