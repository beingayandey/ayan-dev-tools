"use client";

import { useState, useEffect } from "react";
import { Search, Command } from "lucide-react";
import { SearchOverlay } from "./SearchOverlay";
import { motion } from "framer-motion";

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center sm:justify-start gap-2 h-9 w-9 sm:w-72 lg:w-96 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 shadow-inner overflow-hidden active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
        aria-label="Search everything"
      >
        {/* Animated Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

        <div className="flex items-center justify-center shrink-0 w-9 h-9 sm:w-auto sm:h-auto sm:pl-3">
          <Search className="size-4 sm:size-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        </div>
        
        <span className="hidden sm:inline-block text-[13px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors flex-1 text-left">
          Search tools...
        </span>
        
        <div className="hidden sm:flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 mr-3 font-mono text-[9px] font-medium text-zinc-500 opacity-100 uppercase tracking-tighter shrink-0 select-none">
          <span className="text-[10px]">⌘</span>
          <span>K</span>
        </div>
      </button>

      <SearchOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
