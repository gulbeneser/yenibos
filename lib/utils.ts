import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocaleHref(locale: string, path: string) {
  const sanitized = path.startsWith('/') ? path : `/${path}`;
  if (sanitized === '/') {
    return `/${locale}`;
  }
  return `/${locale}${sanitized}`;
}
