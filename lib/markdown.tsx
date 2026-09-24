import type { ReactNode } from "react";
import { isValidElement } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { headingSlug } from "@/lib/slug";

const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "input"],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
    pre: [...(defaultSchema.attributes?.pre ?? []), ["className"]],
    span: [...(defaultSchema.attributes?.span ?? []), ["className"]],
    h1: [...(defaultSchema.attributes?.h1 ?? []), ["id"]],
    h2: [...(defaultSchema.attributes?.h2 ?? []), ["id"]],
    h3: [...(defaultSchema.attributes?.h3 ?? []), ["id"]],
    h4: [...(defaultSchema.attributes?.h4 ?? []), ["id"]],
    h5: [...(defaultSchema.attributes?.h5 ?? []), ["id"]],
    h6: [...(defaultSchema.attributes?.h6 ?? []), ["id"]],
    li: [...(defaultSchema.attributes?.li ?? []), ["className"]],
    input: [["type"], ["checked"], ["disabled"]],
    a: [...(defaultSchema.attributes?.a ?? []), ["href"], ["title"], ["target"], ["rel"]],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      ["src"],
      ["alt"],
      ["title"],
      ["width"],
      ["height"],
    ],
  },
};

const components: Components = {
  pre({ children }) {
    return <CodeBlock>{children}</CodeBlock>;
  },
  a({ href, children }) {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    if (!src) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} className="h-auto w-full" />
    );
  },
  h2({ children }) {
    return <h2 id={headingSlug(plainText(children))}>{children}</h2>;
  },
  h3({ children }) {
    return <h3 id={headingSlug(plainText(children))}>{children}</h3>;
  },
};

function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children);
  return "";
}

export function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeSanitize, schema],
        rehypeHighlight,
      ]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
