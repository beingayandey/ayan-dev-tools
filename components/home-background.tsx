"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";
import { hyperspeedPresets } from "./ui/hyperspeedPresets";

// Define the partial type to match the component's internal interface
type HyperspeedOptions = any;

// Dynamic import for performance - only load Three.js on homepage
const Hyperspeed = dynamic(() => import("./ui/hyperspeed"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-zinc-950" />,
});

export function HomeBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Toggle body class to hide default background on home
  useEffect(() => {
    if (isHome) {
      document.body.classList.add("no-bg");
    } else {
      document.body.classList.remove("no-bg");
    }
    return () => document.body.classList.remove("no-bg");
  }, [isHome]);

  // Memoize options to prevent unnecessary WebGL re-renders
  const options = hyperspeedPresets.five as any;

  if (!isHome) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <Hyperspeed effectOptions={options} />
      {/* Heavy overlay to ensure content readability */}
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px]" />
    </div>
  );
}
