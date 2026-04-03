"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";
import { hyperspeedPresets } from "./ui/hyperspeedPresets";
import { BACKGROUND_PRESETS } from "@/config/backgroundPreset";

// Dynamic import for performance
const Hyperspeed = dynamic(() => import("./ui/hyperspeed"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-zinc-950" />,
});

export function BackgroundRenderer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Identify the enabled preset from config
  const activePresetKey = (Object.keys(BACKGROUND_PRESETS) as Array<keyof typeof BACKGROUND_PRESETS>).find(
    (key) => BACKGROUND_PRESETS[key].enabled
  ) || "hyperspeed";
  const activePreset = BACKGROUND_PRESETS[activePresetKey];

  // Sync body class for global background image suppression
  useEffect(() => {
    // Only suppress the global background image (add 'no-bg') when on the Home page
    // This allows the /banner-img_1.png background image to show on all inner pages automatically.
    if (isHome) {
      document.body.classList.add("no-bg");
    } else {
      document.body.classList.remove("no-bg");
    }
    
    return () => document.body.classList.remove("no-bg");
  }, [isHome]);

  // Map preset slug to preset options
  const hyperspeedOptions = useMemo(() => {
    if (activePreset.type !== "hyperspeed") return hyperspeedPresets.five;
    const presetName = (activePreset as any).preset || "five";
    return (hyperspeedPresets as any)[presetName] || hyperspeedPresets.five;
  }, [activePreset]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none">
      {/* 🏎️ Hyperspeed Layer (Home Only) */}
      {isHome && activePreset.type === "hyperspeed" && (
        <div className="absolute inset-0">
          <Hyperspeed effectOptions={hyperspeedOptions as any} />
          <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px]" />
        </div>
      )}

      {/* 🌈 Modern Gradient Background (If enabled in config) */}
      {isHome && activePreset.type === "gradient" && (
        <div className="absolute inset-0 bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      )}

      {/* 🖼️ Grid/Image Texture Background (If enabled in config) */}
      {isHome && activePreset.type === "image" && (
        <div className="absolute inset-0 bg-[#09090b]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#6366f115,transparent)]" />
        </div>
      )}

      {/* ⬛ Simple Solid Background (If enabled in config) */}
      {isHome && activePreset.type === "color" && (
        <div className="absolute inset-0 bg-[#000000]" />
      )}

      {/* 🔄 Fallback for Inner Pages: The Background Image is automatically applied via CSS in globals.css when .no-bg is absent */}
    </div>
  );
}
