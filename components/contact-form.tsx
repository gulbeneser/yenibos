'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from '@/app/(site)/[locale]/contact/actions';
import { Button } from './ui/button';

const initialState = { success: false, message: '' };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Gönderiliyor…' : label}
    </Button>
  );
}

export function ContactForm({ labels }: { labels: Record<string, string> }) {
  const [state, formAction] = useFormState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span>{labels.name}</span>
          <input
            required
            name="name"
            placeholder="Jane Doe"
            className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{labels.email}</span>
          <input
            required
            type="email"
            name="email"
            placeholder="hello@company.com"
            className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span>{labels.country}</span>
          <input
            required
            name="country"
            placeholder="Türkiye"
            className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{labels.budget}</span>
          <input
            required
            name="budget"
            placeholder="€15K - €30K"
            className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span>{labels.timeline}</span>
        <input
          required
          name="timeline"
          placeholder="6 hafta"
          className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span>{labels.summary}</span>
        <textarea
          required
          name="summary"
          rows={5}
          placeholder="Proje hedeflerini ve mevcut yığınınızı paylaşın."
          className="rounded-2xl border border-brand-500/20 bg-brand-900/40 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
        />
      </label>
      <SubmitButton label={labels.submit} />
      {state.message ? (
        <p
          className={`text-sm ${state.success ? 'text-accent-1' : 'text-red-300'}`}
        >
          {state.message}
        </p>
      ) : null}
      <p className="text-xs text-muted">
        {labels.fallback}{' '}
        <a href="mailto:hello@fures.at" className="text-brand-300">
          hello@fures.at
        </a>
      </p>
    </form>
  );
}
