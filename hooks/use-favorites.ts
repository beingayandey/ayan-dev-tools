"use client";

import { useFavorites as useFavoritesContext } from "@/context/favorites-context";
export type { FavoriteTool } from "@/context/favorites-context";

// Simple delegate to the global context for real-time synchronization
export function useFavorites() {
  return useFavoritesContext();
}
