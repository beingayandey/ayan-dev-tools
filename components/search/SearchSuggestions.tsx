"use client";

import { motion } from "framer-motion";
import { SearchItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { Command, LayoutGrid, Star } from "lucide-react";
import { iconMap } from "@/lib/icon-map";

interface SearchSuggestionsProps {
  items: SearchItem[];
  selectedIndex: number;
  onSelect: (item: SearchItem) => void;
  onHover: (index: number) => void;
}

export function SearchSuggestions({
  items,
  selectedIndex,
  onSelect,
  onHover,
}: SearchSuggestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter into categories
  const navigationItems = items.filter((item: SearchItem) => item.href === "/");
  const toolResults = items.filter((item: SearchItem) => item.href !== "/");

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar sm:max-h-[60vh]"
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
          <div className="size-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 border border-white/5">
            <LayoutGrid className="size-8 text-zinc-700" />
          </div>
          <p className="text-sm font-medium">No results found for your query</p>
          <p className="text-xs text-zinc-600 mt-1 uppercase tracking-widest font-semibold">
            Try searching for "color", "image", or "calculator"
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {navigationItems.length > 0 && (
            <section>
              <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <LayoutGrid className="size-3" /> Navigation
              </h3>
              <div className="grid gap-1">
                {navigationItems.map((item: SearchItem, idx: number) => (
                  <SuggestionItem
                    key={item.id}
                    item={item}
                    isActive={selectedIndex === idx}
                    onSelect={() => onSelect(item)}
                    onHover={() => onHover(idx)}
                  />
                ))}
              </div>
            </section>
          )}

          {toolResults.length > 0 && (
            <section>
              <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Command className="size-3" /> Tools & Workflows
              </h3>
              <div className="grid gap-1">
                {toolResults.map((item: SearchItem, idx: number) => {
                  const absoluteIndex = navigationItems.length + idx;
                  return (
                    <SuggestionItem
                      key={item.id}
                      item={item}
                      isActive={selectedIndex === absoluteIndex}
                      onSelect={() => onSelect(item)}
                      onHover={() => onHover(absoluteIndex)}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function SuggestionItem({
  item,
  isActive,
  onSelect,
  onHover,
}: {
  item: SearchItem;
  isActive: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const Icon = iconMap[item.icon] || Star;

  return (
    <motion.div
      onMouseMove={onHover}
      onClick={onSelect}
      className={`group flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]"
          : "bg-transparent border border-transparent hover:bg-white/5"
      }`}
      layout
    >
      <div
        className={`flex aspect-square size-9 sm:size-10 items-center justify-center rounded-lg transition-transform duration-300 ${
          isActive
            ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-110"
            : "bg-zinc-900 text-zinc-400 group-hover:text-zinc-200"
        }`}
      >
        <Icon className="size-4 sm:size-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold tracking-tight break-words text-sm sm:text-base line-clamp-1 ${
              isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
            }`}
          >
            {item.name}
          </span>
          {item.category && (
            <Badge
              variant="outline"
              className={`text-[9px] px-1.5 py-0 border-white/10 uppercase tracking-tighter ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/20"
                  : "bg-zinc-950 text-zinc-500"
              }`}
            >
              {item.category}
            </Badge>
          )}
        </div>
        <p className="text-xs text-zinc-500 break-words line-clamp-2 mt-0.5 font-medium group-hover:text-zinc-400 transition-colors">
          {item.description}
        </p>
      </div>

      <div
        className={`flex items-center gap-1.5 opacity-0 transition-opacity duration-200 ${
          isActive ? "opacity-100" : "group-hover:opacity-100"
        }`}
      >
        <kbd className="hidden sm:flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 uppercase tracking-tighter">
          Enter
        </kbd>
      </div>
    </motion.div>
  );
}
