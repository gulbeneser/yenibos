import { notFound } from 'next/navigation';
import { isLocale } from './config';
import type { Locale } from './config';

type ParamValue = string | string[] | undefined;

function normalizeParam(value: ParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export type RouteParamsPromise = Promise<Record<string, ParamValue>>;

export async function resolveLocaleParam(
  paramsPromise: RouteParamsPromise,
): Promise<Locale> {
  const params = await paramsPromise;
  const candidate = normalizeParam(params.locale);

  if (!candidate || !isLocale(candidate)) {
    notFound();
  }

  return candidate;
}

export async function resolveRequiredParam(
  paramsPromise: RouteParamsPromise,
  key: string,
): Promise<string> {
  const params = await paramsPromise;
  const candidate = normalizeParam(params[key]);

  if (!candidate) {
    notFound();
  }

  return candidate;
}

export async function resolveSearchParams(
  searchParamsPromise: Promise<Record<string, ParamValue> | undefined>,
): Promise<Record<string, ParamValue>> {
  return (await searchParamsPromise) ?? {};
}
