import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl font-bold text-echo-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl font-bold text-echo-text">{children}</h2>
    ),
    p: ({ children }) => <p className="mt-4 leading-7 text-echo-muted">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-echo-muted">{children}</ul>,
    code: ({ children }) => (
      <code className="rounded-[4px] border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-echo-cyan">
        {children}
      </code>
    ),
    ...components
  };
}
