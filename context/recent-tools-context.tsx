"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface RecentTool {
  id: string;
  name: string;
  route: string;
  icon: string;
  lastUsed: number;
}

interface RecentToolsContextType {
  recentTools: RecentTool[];
  addRecentTool: (tool: Omit<RecentTool, "lastUsed">) => void;
  clearRecentTools: () => void;
  isLoaded: boolean;
}

const RecentToolsContext = createContext<RecentToolsContextType | undefined>(undefined);

const RECENT_TOOLS_KEY = "recentTools";
const MAX_RECENT_TOOLS = 10;

export function RecentToolsProvider({ children }: { children: React.ReactNode }) {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_TOOLS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Sort by lastUsed descending just in case it got corrupted
          setRecentTools(parsed.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, MAX_RECENT_TOOLS));
        }
      } catch (e) {
        console.error("Failed to parse recent tools", e);
        localStorage.removeItem(RECENT_TOOLS_KEY); // Reset corrupted storage
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(recentTools));
    }
  }, [recentTools, isLoaded]);

  // Handle cross-tab updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === RECENT_TOOLS_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setRecentTools(parsed.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, MAX_RECENT_TOOLS));
          }
        } catch (err) {
          console.error("Failed to sync storage change for recent tools", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addRecentTool = useCallback((tool: Omit<RecentTool, "lastUsed">) => {
    setRecentTools((prev) => {
      const now = Date.now();
      const existingFilter = prev.filter((t) => t.id !== tool.id);
      
      const newTool: RecentTool = {
        ...tool,
        lastUsed: now,
      };

      const updated = [newTool, ...existingFilter].slice(0, MAX_RECENT_TOOLS);
      return updated;
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
    localStorage.removeItem(RECENT_TOOLS_KEY);
  }, []);

  return (
    <RecentToolsContext.Provider
      value={{ recentTools, addRecentTool, clearRecentTools, isLoaded }}
    >
      {children}
    </RecentToolsContext.Provider>
  );
}

export function useRecentToolsContext() {
  const context = useContext(RecentToolsContext);
  if (context === undefined) {
    throw new Error("useRecentToolsContext must be used within a RecentToolsProvider");
  }
  return context;
}
