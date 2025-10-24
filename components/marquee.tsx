export function Marquee({ items }: { items: string[] }) {
  const content = [...items, ...items];
  return (
    <div className="relative mt-16 overflow-hidden rounded-3xl border border-brand-500/10 bg-brand-900/30 py-6">
      <div className="animate-marquee flex min-w-full items-center gap-12 whitespace-nowrap px-6">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-sm uppercase tracking-[0.4em] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
