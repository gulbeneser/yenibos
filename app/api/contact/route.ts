import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  summary: z.string().min(10),
  budget: z.string().min(2),
  timeline: z.string().min(2),
});

const rateLimit = new Map<string, { count: number; timestamp: number }>();

export const runtime = 'edge';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const windowMs = 60_000;
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now - entry.timestamp < windowMs) {
    if (entry.count >= 3) {
      return NextResponse.json(
        { success: false, message: 'Rate limit exceeded' },
        { status: 429 },
      );
    }

    rateLimit.set(ip, { count: entry.count + 1, timestamp: now });
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  const data = await request.json().catch(() => null);
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true });
}
