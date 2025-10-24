import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './config';

export const {
  Link: LocaleLink,
  usePathname,
  useRouter,
  redirect,
  permanentRedirect,
} = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
