"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function LenisWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
