"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Route } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getToolById } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";
import { TOOL_WORKFLOWS } from "@/config/toolWorkflows";
import { useWorkflow } from "@/context/workflow-context";
import { cn } from "@/lib/utils";

interface WorkflowModeProps {
  toolId: string;
}

export function WorkflowMode({ toolId }: WorkflowModeProps) {
  const { isActionCompleted } = useWorkflow();
  const workflowIds = TOOL_WORKFLOWS[toolId];

  // Only render if a workflow is mapped for this tool
  if (!workflowIds || workflowIds.length === 0) {
    return null;
  }

  // Map to actual tools
  const workflowTools = workflowIds
    .map(getToolById)
    .filter((tool) => tool !== undefined);

  if (workflowTools.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isActionCompleted && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="mt-4"
        >
          <div className="relative p-5 md:p-6 px-4 md:px-8 bg-zinc-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Route className="size-48" />
            </div>
            <div className="absolute -left-12 -top-12 size-32 bg-emerald-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      Task Completed!
                    </h3>
                    <p className="text-sm font-medium text-emerald-400/80 uppercase tracking-widest">
                      Workflow Actions Available
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pipeline Active</span>
                </div>
              </div>

              {/* Pipeline UI */}
              <div className="relative flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-6 items-stretch md:items-center">
                {workflowTools.map((tool, index) => {
                  const isPrimary = index === 0;
                  const Icon = tool ? iconMap[tool.icon] || Play : Play;
                  
                  return (
                    <div key={`workflow-${tool!.id}`} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 lg:gap-6 flex-1">
                      <Link 
                        href={tool!.href} 
                        className={cn(
                          "w-full group relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform md:hover:-translate-y-1",
                          isPrimary 
                            ? "bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10" 
                            : "bg-zinc-800/40 border border-white/5 hover:bg-zinc-800/80 hover:border-white/10"
                        )}
                      >
                        {isPrimary && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:-top-3 md:left-4 md:translate-x-0 bg-emerald-500 text-black text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full shadow-lg">
                            Recommended Next
                          </div>
                        )}
                        
                        <div className={cn(
                          "flex items-center justify-center size-12 shrink-0 rounded-xl transition-colors",
                          isPrimary ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black" : "bg-black/50 text-zinc-400 group-hover:text-white"
                        )}>
                          <Icon className="size-6" />
                        </div>
                        
                        <div className="text-center md:text-left">
                          <h4 className={cn(
                            "font-bold mb-1 transition-colors",
                            isPrimary ? "text-emerald-400 group-hover:text-emerald-300" : "text-zinc-300 group-hover:text-white"
                          )}>
                            {tool!.name}
                          </h4>
                          <p className="text-xs font-medium text-zinc-500 line-clamp-2 md:line-clamp-1">
                            {tool!.description}
                          </p>
                        </div>
                        
                        {isPrimary && (
                           <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                              <ArrowRight className="size-5 text-emerald-400" />
                           </div>
                        )}
                      </Link>

                      {/* Visual Flow Connector */}
                      {index < workflowTools.length - 1 && (
                        <div className="hidden md:flex shrink-0 px-2 justify-center text-zinc-600">
                          <ArrowRight className="size-5" />
                        </div>
                      )}
                      
                      {/* Mobile Flow Connector */}
                      {index < workflowTools.length - 1 && (
                        <div className="md:hidden flex justify-center py-2 text-zinc-600">
                           <ArrowRight className="size-5 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
