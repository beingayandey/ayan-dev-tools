"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function LenisWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        // Disable Lenis on touch devices to use native momentum scrolling
        // which is significantly smoother on Android/iOS Chrome
        smoothWheel: true,
        syncTouch: false, 
        touchMultiplier: 2,
        duration: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
