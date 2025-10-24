import { cn } from '@/lib/utils';

type CalloutProps = {
  type?: 'info' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
};

const colorMap: Record<NonNullable<CalloutProps['type']>, string> = {
  info: 'border-accent-1/60 bg-brand-900/50 text-accent-1',
  warning: 'border-amber-400/60 bg-amber-900/30 text-amber-200',
  success: 'border-emerald-400/60 bg-emerald-900/30 text-emerald-200',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        'mt-6 rounded-2xl border px-6 py-4 shadow-soft',
        colorMap[type],
      )}
    >
      {title ? (
        <p className="font-display text-lg font-semibold">{title}</p>
      ) : null}
      <div className="mt-2 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}
