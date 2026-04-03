"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOL_CROSS_LINKS } from "@/config/toolCrossLinks";
import { getToolById } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";
import { motion } from "framer-motion";

export function CrossLinks({ toolId }: { toolId: string }) {
  const crossLinkData = TOOL_CROSS_LINKS[toolId];
  if (!crossLinkData) return null;

  const tools = crossLinkData.links
    .map((id) => getToolById(id))
    .filter((tool) => tool !== undefined);

  if (tools.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-md border-t border-border/50 py-3.5 px-4 md:px-6 flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar shadow-inner"
    >
      <span className="text-sm font-semibold text-zinc-400 whitespace-nowrap shrink-0">
        {crossLinkData.hook}
      </span>
      
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {tools.map((tool, idx) => {
          const Icon = tool ? iconMap[tool.icon] || ArrowRight : ArrowRight;
          return (
            <div key={`crosslink-${tool!.id}`} className="flex items-center gap-2 md:gap-3">
              {idx > 0 && <ArrowRight className="size-3 text-zinc-600 shrink-0" />}
              
              <Link 
                href={tool!.href}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all active:scale-95"
              >
                <Icon className="size-3 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-medium text-zinc-300 group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                  {tool!.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
