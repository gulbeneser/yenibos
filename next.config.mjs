import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  typedRoutes: false,
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(withMDX(nextConfig));
