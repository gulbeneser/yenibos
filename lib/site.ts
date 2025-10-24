import { locales, type Locale } from './i18n/config';

const site = {
  name: 'Fures Tech',
  url: 'https://fures.at',
  locales,
  tagline: {
    tr: 'AI-destekli web tasarım ve otomasyon stüdyosu — Fures Tech',
    en: 'AI-native web design and automation studio — Fures Tech',
    de: 'AI-native Webdesign- und Automationsstudio — Fures Tech',
  } satisfies Record<Locale, string>,
  description: {
    tr: 'Çok dilli, ultra hızlı ve dönüşüm odaklı web deneyimleri tasarlayan AI-native ekip.',
    en: 'AI-native team crafting multilingual, ultra-fast and conversion-focused web experiences.',
    de: 'Ein AI-natives Team, das mehrsprachige, ultraschnelle und conversion-orientierte Web-Erlebnisse gestaltet.',
  } satisfies Record<Locale, string>,
  contactEmail: 'hello@fures.at',
  socials: {
    linkedin: 'https://www.linkedin.com/company/fures-tech',
    instagram: 'https://www.instagram.com/furestech',
  },
};

export default site;
