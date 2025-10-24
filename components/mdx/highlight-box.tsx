export function HighlightBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-accent-1/20 bg-brand-900/40 p-6 shadow-soft">
      <h4 className="font-display text-lg font-semibold text-brand-300">
        {title}
      </h4>
      <div className="mt-2 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}
