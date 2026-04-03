"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getToolById } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";
import { TOOL_SUGGESTIONS } from "@/config/toolSuggestions";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface SmartSuggestionsProps {
  toolId: string;
}

export function SmartSuggestions({ toolId }: SmartSuggestionsProps) {
  const suggestedIds = TOOL_SUGGESTIONS[toolId];

  if (!suggestedIds || suggestedIds.length === 0) {
    return null;
  }

  const suggestedTools = suggestedIds
    .map(getToolById)
    .filter((tool) => tool !== undefined);

  if (suggestedTools.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-8 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10">
          <Sparkles className="size-4 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          People also use
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {suggestedTools.map((tool, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            key={`suggested-${tool!.id}`}
          >
            <Link href={tool!.href} className="block h-full group">
              <Card className="h-full transition-all duration-300 overflow-hidden relative bg-zinc-900/40 border-white/5 hover:border-indigo-500/40 hover:bg-zinc-900/60 shadow-none hover:shadow-lg hover:shadow-indigo-500/5">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-indigo-500/5 pointer-events-none" />
                <CardHeader className="relative z-10 p-4 flex flex-row items-center gap-3 space-y-0">
                  <div className="size-8 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-colors">
                    {(() => {
                      const Icon = iconMap[tool!.icon] || Sparkles;
                      return <Icon className="size-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="truncate transition-colors text-sm font-medium text-zinc-300 group-hover:text-indigo-400">
                      {tool!.name}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
