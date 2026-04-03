"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type BackgroundPreset = 
  | "hyperspeed-1" 
  | "hyperspeed-2" 
  | "hyperspeed-3" 
  | "hyperspeed-4" 
  | "hyperspeed-5" 
  | "hyperspeed-6" 
  | "gradient" 
  | "image" 
  | "solid";

interface BackgroundContextType {
  preset: BackgroundPreset;
  setPreset: (preset: BackgroundPreset) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<BackgroundPreset>("hyperspeed-5");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("app-background-preset") as BackgroundPreset;
    if (saved) {
      setPresetState(saved);
    }
  }, []);

  const setPreset = (newPreset: BackgroundPreset) => {
    setPresetState(newPreset);
    localStorage.setItem("app-background-preset", newPreset);
  };

  return (
    <BackgroundContext.Provider value={{ preset, setPreset }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}
