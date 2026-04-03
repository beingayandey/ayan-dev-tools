"use client";

import { History, Shield, Info, ExternalLink, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AppRail() {
  return (
    <aside className="hidden xl:flex w-80 shrink-0 flex-col border-l border-white/5 bg-zinc-950/20 backdrop-blur-sm sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      
      {/* 💰 PRIMARY REVENUE ZONE: TOP STICKY AD */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Sponsorship</span>
          <Info className="size-3 text-zinc-700 cursor-help" />
        </div>
        
        {/* Ad Placeholder with reserved height to prevent CLS */}
        <div className="w-full min-h-[250px] rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center justify-center p-6 text-center group hover:border-indigo-500/30 transition-colors">
          <div className="size-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
            <Shield className="size-5 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            Your secure browser-based tools are made possible by our supporters.
          </p>
          <button className="mt-4 text-[10px] font-bold uppercase tracking-tight text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition-all">
            Learn More
          </button>
        </div>
      </div>

      <Separator className="bg-white/5 mx-4 w-auto" />

      {/* 🧑💻 UX VALUE ZONE: TOOL CONTEXT / HISTORY */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-4">
            <History className="size-3.5 text-indigo-400" /> Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="text-[11px] text-zinc-500 italic py-4 border border-dashed border-white/5 rounded-lg text-center">
              No recent history found. <br />Your local data stays private.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-4">
            <Zap className="size-3.5 text-amber-400" /> Dev Pro
          </h3>
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[11px] text-zinc-300 leading-normal mb-3">
                Get unlimited access to advanced batch processing and cloud-sync.
              </p>
              <Badge variant="outline" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-[9px] mb-2">Coming Soon</Badge>
            </div>
            <div className="absolute top-[-20%] right-[-10%] size-24 bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
          </div>
        </div>
      </div>

      {/* 💰 SECONDARY REVENUE ZONE: BOTTOM AD */}
      <div className="mt-auto p-4 border-t border-white/5">
        <div className="w-full h-32 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Sponsored</span>
        </div>
      </div>
    </aside>
  );
}
