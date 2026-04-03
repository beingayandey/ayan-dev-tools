"use client";

import { useRecentToolsContext } from "@/context/recent-tools-context";
export type { RecentTool } from "@/context/recent-tools-context";

// Simple delegate to the global context for real-time synchronization
export function useRecentTools() {
  return useRecentToolsContext();
}
