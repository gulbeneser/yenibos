export function StatBar({
  stats,
}: {
  stats: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="mt-16 grid gap-4 rounded-2xl border border-brand-500/20 bg-brand-900/40 p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-3xl font-semibold text-brand-300">
            {stat.value}
          </span>
          <span className="text-sm text-muted">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
