export function Testimonial({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="rounded-3xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft">
      <p className="text-lg font-medium text-foreground">“{quote}”</p>
      <div className="mt-4 text-sm text-muted">
        <span className="font-semibold text-brand-300">{author}</span>
        <span className="ml-2">{role}</span>
      </div>
    </div>
  );
}
