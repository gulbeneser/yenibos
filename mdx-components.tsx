import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/callout';
import { ProCon } from '@/components/mdx/pro-con';
import { HighlightBox } from '@/components/mdx/highlight-box';

export const mdxComponents: MDXComponents = {
  Callout,
  ProCon,
  HighlightBox,
  h1: (props) => (
    <h1
      className="font-display text-3xl sm:text-4xl font-semibold mt-8"
      {...props}
    />
  ),
  h2: (props) => (
    <h2 className="font-display text-2xl font-semibold mt-6" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-display text-xl font-semibold mt-4" {...props} />
  ),
  p: (props) => (
    <p className="leading-relaxed text-muted-foreground/90 mt-4" {...props} />
  ),
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />,
  code: (props) => (
    <code
      className="rounded-lg bg-brand-900/60 px-2 py-1 text-sm font-mono text-brand-300"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-2xl bg-brand-900/80 p-4 text-sm shadow-soft"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-4 border-accent-1/80 bg-brand-900/40 px-6 py-3 italic"
      {...props}
    />
  ),
};
