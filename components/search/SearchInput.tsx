"use client";

import { Search, Command as CommandIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function SearchInput({ value, onChange, onClose }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex items-center px-4 py-4 border-b border-white/5 bg-zinc-950/50">
      <Search className="size-5 text-indigo-500 mr-3 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tools, workflows, or categories..."
        className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-zinc-500 font-medium min-w-0"
        aria-label="Search everything"
      />
      <div className="flex items-center gap-2">
        {value && (
          <button
            onClick={() => onChange("")}
            className="p-1.5 hover:bg-white/5 rounded-md text-zinc-500 hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
        <kbd className="hidden sm:flex h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-400 opacity-100 uppercase tracking-tighter">
          <span className="text-xs">ESC</span>
        </kbd>
      </div>
    </div>
  );
}
