"use client";

/* Page transition — every route change fades/slides in. */
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);
  return <div className="page-enter">{children}</div>;
}
