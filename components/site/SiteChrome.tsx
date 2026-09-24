"use client";

import { usePathname } from "next/navigation";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin ? <Navbar /> : null}
      {children}
      {!isAdmin ? <Cursor /> : null}
    </>
  );
}
