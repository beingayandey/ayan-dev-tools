"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNextSteps, NextStep } from "@/config/toolNextSteps";
import { getToolById } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";

interface NextStepsProps {
  toolId: string;
  hasOutput: boolean;
}

export function NextSteps({ toolId, hasOutput }: NextStepsProps) {
  const nextSteps = getNextSteps(toolId);

  if (!hasOutput || nextSteps.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="border-t border-border/50 bg-gradient-to-b from-transparent to-muted/20"
      >
        <div className="p-6 md:p-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Zap className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Next steps
              </h3>
              <p className="text-xs text-muted-foreground">
                Continue your workflow with these related tools
              </p>
            </div>
          </div>

          {/* Next Step Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nextSteps.map((step, index) => {
              const tool = getToolById(step.toolId);
              if (!tool) return null;

              const Icon = iconMap[tool.icon] || ArrowRight;
              const isRecommended = step.recommended;

              return (
                <motion.div
                  key={step.toolId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={tool.href}
                    className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                      isRecommended
                        ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                        : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    {/* Recommended Badge */}
                    {isRecommended && (
                      <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        <Sparkles className="size-3" />
                        Recommended
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isRecommended
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                          : "border-border/50 bg-muted/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/30"
                      }`}
                    >
                      <Icon className="size-5 transition-transform group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold transition-colors ${
                          isRecommended
                            ? "text-emerald-400"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {tool.name}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className={`size-4 shrink-0 transition-all group-hover:translate-x-1 ${
                        isRecommended ? "text-emerald-400" : "text-muted-foreground"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
