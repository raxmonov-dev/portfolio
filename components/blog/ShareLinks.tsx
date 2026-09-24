"use client";

import { useState } from "react";

export function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
      <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        Share
      </span>
      <button type="button" onClick={copy} className="link-underline">
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={`https://t.me/share/url?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline"
      >
        Telegram
      </a>
      <a
        href={`https://x.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline"
      >
        LinkedIn
      </a>
    </div>
  );
}
