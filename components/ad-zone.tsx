"use client";

import { useState } from "react";
import { X, Info, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdZoneProps {
  variant?: "floating" | "banner" | "sidebar";
  className?: string;
  allowDismiss?: boolean;
}

/**
 * AdZone - The primary monetization component.
 * Designed for Google Ads, Carbon Ads, or Direct Sponsorships.
 */
export function AdZone({ variant = "floating", className, allowDismiss = true }: AdZoneProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return <div className={cn("min-h-[140px] w-full invisible", className)} />;

  // --- VARIANT 1: FLOATING STICKY (Bottom Right) ---
  if (variant === "floating") {
    return (
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-[60] w-72 animate-in fade-in slide-in-from-bottom-5 duration-500",
          className
        )}
      >
        <div className="relative group overflow-hidden rounded-2xl bg-zinc-950/80 border border-white/5 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 min-h-[180px]">
          {/* Header UI */}
          <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded bg-indigo-500 flex items-center justify-center">
                <Sparkles className="size-3 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sponsored</span>
            </div>
            {allowDismiss && (
              <button 
                onClick={() => setIsVisible(false)}
                className="size-5 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-all outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Ad Content Zone (Placeholder) */}
          <div className="p-4 space-y-3">
             <div className="w-full h-32 rounded-xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group/ad">
                {/* Background Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/ad:animate-[shimmer_2.5s_infinite]" />
                
                <p className="text-[11px] font-medium text-zinc-400 group-hover/ad:text-zinc-200 transition-colors relative z-10 leading-relaxed">
                   Looking for enterprise-grade analytics? <br />
                   <span className="text-indigo-400 font-bold">V1.0</span> is out now.
                </p>
                
                <button className="mt-3 relative z-10 text-[10px] items-center gap-1.5 flex font-bold uppercase py-1.5 px-3 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition-all">
                   Try Demo <ExternalLink className="size-2.5" />
                </button>
             </div>
             
             <div className="flex items-center justify-between px-1">
                <span className="text-[9px] text-zinc-600 italic">No tracking. Just tools.</span>
                <Info className="size-2.5 text-zinc-700 cursor-help" />
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VARIANT 2: IN-CONTENT BANNER (Default behavior for other slots) ---
  return (
    <div className={cn("w-full bg-zinc-950/20 border border-white/5 rounded-xl overflow-hidden p-4 sm:p-6 min-h-[140px]", className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Ecosystem Partner</span>
        <X className="size-3 text-zinc-800 cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => setIsVisible(false)} />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
        <div className="size-16 sm:size-24 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
          <Sparkles className="size-6 sm:size-8 text-indigo-500/20" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
           <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">Elevate your dev experience with Carbon.</h4>
           <p className="text-xs sm:text-sm text-zinc-500 max-w-xl line-clamp-2">The fastest way to manage your snippets and collaborate across teams.</p>
           <div className="pt-1.5 sm:pt-2 flex items-center gap-3 sm:gap-4">
              <span className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-indigo-300">Visit Carbon.io</span>
              <Separator orientation="vertical" className="h-3 bg-white/10" />
              <span className="text-zinc-600 text-[9px] sm:text-[10px]">Built by Ayan Dey</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function Separator({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical", className?: string }) {
  return (
    <div 
      className={cn(
        "bg-white/5", 
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className
      )} 
    />
  );
}
