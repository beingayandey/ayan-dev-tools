"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import { SearchSuggestions } from "./SearchSuggestions";
import { allSearchItems, SearchItem } from "@/lib/data";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query) {
      // Suggest featured tools if query is empty
      return allSearchItems.slice(0, 8);
    }

    const searchStr = query.toLowerCase().trim();
    return allSearchItems
      .filter((item) => {
        const name = item.name.toLowerCase();
        const desc = item.description.toLowerCase();
        const keywords = item.keywords?.join(" ").toLowerCase() || "";
        const cat = item.category?.toLowerCase() || "";

        return (
          name.includes(searchStr) ||
          desc.includes(searchStr) ||
          keywords.includes(searchStr) ||
          cat.includes(searchStr)
        );
      })
      .sort((a, b) => {
        // Sort: Exact name start > Name includes > Description includes
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        if (aName.startsWith(searchStr) && !bName.startsWith(searchStr)) return -1;
        if (!aName.startsWith(searchStr) && bName.startsWith(searchStr)) return 1;
        
        return aName.localeCompare(bName);
      });
  }, [query]);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex, handleSelect]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center p-3 sm:pt-32 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}
              className="w-[calc(100vw-24px)] max-w-2xl max-h-[85vh] sm:max-h-[calc(100vh-200px)] bg-zinc-950 border border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] flex flex-col relative"
            >
              <div className="shrink-0 flex items-center">
                <div className="flex-1">
                  <SearchInput
                    value={query}
                    onChange={setQuery}
                    onClose={onClose}
                  />
                </div>
                <button 
                  onClick={onClose}
                  className="sm:hidden px-4 py-4 text-zinc-500 border-b border-white/5 bg-zinc-950/50"
                >
                  Cancel
                </button>
              </div>
              
              <div className="flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
                <SearchSuggestions
                  items={filteredItems}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelect}
                  onHover={setSelectedIndex}
                />
              </div>

              {/* Footer - Hidden on mobile for more space */}
              <div className="hidden sm:flex items-center justify-between px-4 py-3 border-t border-white/5 bg-zinc-950/80 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.15em]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="h-4 px-1 rounded border border-white/10 bg-white/5 text-[9px]">
                      ↑
                    </kbd>
                    <kbd className="h-4 px-1 rounded border border-white/10 bg-white/5 text-[9px]">
                      ↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="h-4 px-1 rounded border border-white/10 bg-white/5 text-[9px]">
                      ↵
                    </kbd>
                    Select
                  </span>
                </div>
                <div className="flex items-center gap-2 text-indigo-500/70">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-heavy">
                    Search
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
