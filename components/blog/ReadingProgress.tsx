"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("article-body");
      if (!article) return;
      const top = article.offsetTop;
      const height = article.offsetHeight;
      const scrolled = window.scrollY + window.innerHeight * 0.12 - top;
      const value = Math.min(100, Math.max(0, (scrolled / height) * 100));
      setProgress(value);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent" aria-hidden>
      <div className="h-px bg-foreground transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}
