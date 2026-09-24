"use client";

import { isValidElement, useMemo, useState, type ReactNode } from "react";

function extract(children: ReactNode) {
  let language = "text";
  let text = "";

  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const className = children.props.className ?? "";
    const match = /language-([a-z0-9+#-]+)/i.exec(className);
    if (match) language = match[1];
    const inner = children.props.children;
    text = typeof inner === "string" ? inner : String(inner ?? "");
  } else if (typeof children === "string") {
    text = children;
  }

  return { language, text: text.replace(/\n$/, "") };
}

export function CodeBlock({ children }: { children?: ReactNode }) {
  const { language, text } = useMemo(() => extract(children), [children]);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group my-6 overflow-hidden border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-[13px] leading-6">
        {children}
      </pre>
    </div>
  );
}
