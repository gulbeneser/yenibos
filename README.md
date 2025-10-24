# Fures Tech — Kurumsal Web Sitesi

Bu proje, Fures Tech için Next.js 15 App Router, TypeScript, Tailwind CSS ve next-intl üzerine kurulu çok dilli (TR/EN/DE) kurumsal web sitesidir. Tasarım sistemi, içerik mimarisi, otomasyonlu iletişim formu ve MDX tabanlı blog/vaka altyapısı tek repoda sunulur.

## Özellikler

- 🎨 Tema jetonlarıyla yönetilen koyu mod, cam efekti ve yumuşak gradientler
- 🌍 next-intl ile TR/EN/DE dil desteği, middleware tabanlı locale yönlendirme
- 🧭 Shadcn/ui + Tailwind ile bileşen kütüphanesi (Hero, StatBar, PricingCard, FAQ vb.)
- 📝 MDX içerik sistemi: 18 çok dilli blog yazısı ve 9 vaka çalışması
- 🚀 Lighthouse skoru için optimizasyonlar (preload fontlar, lazy Image, schema.org JSON-LD)
- 📈 Vaka ve blog sayfalarında dinamik metadata ve OG image üretimi
- 📨 Rate-limitli server action + `/api/contact` endpoint'i
- 🛡️ `/api/health` edge route'u, `/app/api/og` sosyal görseli
- 🔍 Başlık/özet bazlı site içi arama sayfası
- 🧪 Husky pre-commit ile lint & format kontrolü

## Kurulum

```bash
pnpm install
pnpm dev
```

Varsayılan olarak proje `http://localhost:3000` üzerinde çalışır. İsteğe bağlı olarak `.env.local` dosyası ile `NEXT_PUBLIC_SITE_URL` değişkenini güncelleyebilirsiniz.

## Komutlar

| Komut            | Açıklama                        |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Geliştirme sunucusunu başlatır  |
| `pnpm build`     | Prodüksiyon yapısını derler     |
| `pnpm start`     | Derlenmiş projeyi çalıştırır    |
| `pnpm lint`      | ESLint denetimlerini çalıştırır |
| `pnpm format`    | Prettier ile kodu biçimlendirir |
| `pnpm typecheck` | TypeScript denetimi             |

## İçerik ve i18n

- Yerelleştirme metinleri `locales/` klasöründeki `tr.json`, `en.json`, `de.json` dosyalarında tutulur.
- Sayfa bazlı içerik `app/(site)/[locale]/` altında organize edilir.
- Blog ve vaka içerikleri `content/blog` ve `content/cases` altında MDX formatında yer alır. Frontmatter alanları: `title`, `slug`, `locale`, `description`, `date`, `category` (blog), `industry`, `summary`, `metrics`, `tags` (case).
- Yeni bir içerik eklemek için ilgili klasöre MDX dosyası ekleyip `slug` değerini tüm dillerde eşleştirin.

## Tasarım sistemi

Renk ve tipografi token'ları `styles/globals.css` içerisinde CSS değişkenleriyle yönetilir. `Hero`, `Marquee`, `PricingCard` gibi bileşenler `components/` dizininde modüler şekilde bulunur. Bileşenler shadcn/ui prensibine göre tree-shake edilebilir şekilde yazıldı.

## Dağıtım

1. `pnpm build` ile prodüksiyon çıktısını alın.
2. Vercel üzerinde yeni proje oluşturup repoyu bağlayın. `NEXT_PUBLIC_SITE_URL` ve gerekiyorsa analiz/script anahtarlarını environment olarak ekleyin.
3. Alternatif olarak Netlify ya da başka bir Node destekli platformda `pnpm install && pnpm build` komutlarıyla dağıtabilirsiniz.
   - Netlify için repoda yer alan `netlify.toml` dosyası otomatik olarak `@netlify/plugin-nextjs` eklentisini yükleyip App Router yönlendirmelerini aktif eder.
   - Ortam değişkenleri bölümünden `GEMINI_API_KEY` ve `NEXT_PUBLIC_SITE_URL` değerlerini tanımlamayı unutmayın.

## Gemini 2.5 Pro entegrasyonu

- Projedeki tüm yapay zeka destekli akışlar Gemini 2.5 Pro üzerine standartlaştırılmıştır.
- Lokal geliştirme ve prodüksiyon için `.env.local` veya platform ortam ayarlarına `GEMINI_API_KEY` anahtarını eklemeniz yeterlidir.

## İletişim formu

- Server action `app/(site)/[locale]/contact/actions.ts` içinde bulunur.
- Her POST isteğinde `/api/contact` üzerinden rate-limit kontrolü yapılır, ardından Formsubmit servisine fallback olarak istek gönderilir.
- Form çalışmazsa footer ve iletişim sayfasında mailto (`hello@fures.at`) bilgisi yer alır.

## Ek notlar

- `app/api/health` JSON döner ve edge-runtime üzerinde çalışır.
- `app/api/og` rotası Open Graph görseli üretir.
- `app/humans.txt`, `app/robots.ts`, `app/sitemap.ts` ile SEO dosyaları sağlanır.
- Husky hook'larının aktif olması için `pnpm install` sonrasında `pnpm prepare` çalıştırmanız yeterlidir.
