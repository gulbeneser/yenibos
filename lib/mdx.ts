import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Locale } from './i18n/config';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const CASE_DIR = path.join(process.cwd(), 'content', 'cases');

type MDXResult = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  summary?: string;
  category?: string;
  date?: string;
  industry?: string;
  metrics?: string[];
  tags?: string[];
  hero?: string;
  readingTime?: string;
  toc?: string[];
  problem?: string;
  solution?: string;
  tools?: string[];
  images?: Array<{ src: string; alt: string }>;
};

export async function getMdxList(type: 'blog' | 'cases', locale: Locale) {
  const dir = type === 'blog' ? BLOG_DIR : CASE_DIR;
  const files = await fs.readdir(dir);
  const list: MDXResult[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(raw);
    if (data.locale !== locale) continue;
    list.push({
      slug: data.slug,
      locale: data.locale,
      title: data.title,
      description: data.description,
      summary: data.summary,
      category: data.category,
      date: data.date,
      industry: data.industry,
      metrics: data.metrics,
      tags: data.tags,
      hero: data.hero,
    });
  }

  return list.sort((a, b) =>
    a.date && b.date ? (a.date < b.date ? 1 : -1) : 0,
  );
}

export async function getMdxContent(
  type: 'blog' | 'cases',
  slug: string,
  locale: Locale,
) {
  const dir = type === 'blog' ? BLOG_DIR : CASE_DIR;
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    if (data.slug === slug && data.locale === locale) {
      const components = (await import('@/mdx-components')).mdxComponents;

      const { content: compiled } = await compileMDX<{ title: string }>({
        source: content,
        options: {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        },
        components,
      });

      return {
        frontmatter: data as MDXResult,
        content: compiled,
      };
    }
  }

  return null;
}
