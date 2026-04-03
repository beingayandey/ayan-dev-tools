"use client";

import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useBackground, BackgroundPreset } from "./background-context";
import { Box, Image as ImageIcon, Layers, Sparkles } from "lucide-react";

export function BackgroundSwitcher() {
  const { preset, setPreset } = useBackground();

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={preset} 
        onValueChange={(val) => setPreset(val as BackgroundPreset)}
      >
        <SelectTrigger className="w-10 sm:w-44 h-9 bg-background/50 border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all rounded-lg focus:ring-1 focus:ring-indigo-500/50">
          <Layers className="size-4 sm:hidden text-zinc-400" />
          <div className="hidden sm:flex items-center gap-2">
            <Layers className="size-3.5 text-zinc-500" />
            <SelectValue placeholder="Theme" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-zinc-950/95 border-white/10 backdrop-blur-xl">
          <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
            Hyperspeed (Home)
          </div>
          <SelectItem value="hyperspeed-5" className="focus:bg-indigo-500/10 focus:text-indigo-400">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-indigo-400" />
              <span>Turbulent (Default)</span>
            </div>
          </SelectItem>
          <SelectItem value="hyperspeed-1" className="focus:bg-indigo-500/10 focus:text-indigo-400">
             <span>🏎️ Speed Racer</span>
          </SelectItem>
          <SelectItem value="hyperspeed-3" className="focus:bg-indigo-500/10 focus:text-indigo-400">
             <span>🌌 Deep Space</span>
          </SelectItem>
          <SelectItem value="hyperspeed-2" className="focus:bg-indigo-500/10 focus:text-indigo-400">
             <span>🏔️ Neon Mountain</span>
          </SelectItem>

          <div className="px-2 py-1.5 mt-2 text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-t border-white/5">
            Legacy Skins
          </div>
          <SelectItem value="gradient" className="focus:bg-indigo-500/10 focus:text-indigo-400">
            <div className="flex items-center gap-2">
              <Box className="size-3.5 text-zinc-400" />
              <span>Modern Gradient</span>
            </div>
          </SelectItem>
          <SelectItem value="image" className="focus:bg-indigo-500/10 focus:text-indigo-400">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-3.5 text-zinc-400" />
              <span>Grid Texture</span>
            </div>
          </SelectItem>
          <SelectItem value="solid" className="focus:bg-indigo-500/10 focus:text-indigo-400">
             <span>⬛ AMOLED Solid</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
