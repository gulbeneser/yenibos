'use server';

import { z } from 'zod';
import { headers } from 'next/headers';

const submissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  summary: z.string().min(10),
  budget: z.string().min(2),
  timeline: z.string().min(2),
});

type FormState = {
  success: boolean;
  message: string;
};

const rateLimit = new Map<string, { count: number; timestamp: number }>();

export async function submitContact(
  _prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const values = submissionSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    country: formData.get('country'),
    summary: formData.get('summary'),
    budget: formData.get('budget'),
    timeline: formData.get('timeline'),
  });

  if (!values.success) {
    return { success: false, message: 'Lütfen tüm alanları doğrulayın.' };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for') ?? 'unknown';
  const windowMs = 60_000;
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now - entry.timestamp < windowMs) {
    if (entry.count >= 3) {
      return {
        success: false,
        message: 'Çok fazla deneme. Lütfen bir dakika sonra tekrar deneyin.',
      };
    }

    rateLimit.set(ip, { count: entry.count + 1, timestamp: now });
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  const apiUrl = new URL(
    '/api/contact',
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  );
  await fetch(apiUrl.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values.data),
  }).catch(() => null);

  await fetch('https://formsubmit.co/ajax/hello@fures.at', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values.data),
  }).catch(() => null);

  return {
    success: true,
    message: 'Gönderiminiz alındı. 24 saat içinde dönüş yapacağız.',
  };
}
