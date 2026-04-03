import Link from "next/link";
import { ArrowRight, Star, Shield, Zap, Sparkles } from "lucide-react";
import { toolCategories, featuredTools } from "@/lib/tools";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClientHome } from "@/components/client-home";

export default function Home() {
  return (
    <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-20">
      
      {/* 🚀 LCP OPTIMIZED HERO: Static HTML for instant SSR paint */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2 animate-in fade-in duration-700">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full text-xs font-medium tracking-wide items-center gap-2">
            <Sparkles className="size-3.5" />
            <span>Built by Ayan Dey</span>
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-1000">
          Fast, privacy-first <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            developer tools.
          </span>
        </h1>
        
        <div className="mt-2 max-w-2xl space-y-4 text-muted-foreground text-lg/relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p>
            No accounts. No data harvesting. Just clean, client-side tools designed for speed and security.
          </p>
        </div>
      </section>

      {/* 🛠️ CLIENT BOUNDARY: Pass below-the-fold data to client-side for staggered entry if needed */}
      <ClientHome toolCategories={toolCategories} featuredTools={featuredTools} />

      {/* System Footer Audit: Kept static for crawlability and speed */}
      <footer className="mt-24 pt-20 border-t border-white/5 pb-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
               <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Shield className="size-4 text-white" />
               </div>
               <span className="text-lg font-bold tracking-tight text-white">Built by Ayan Dey • Privacy-first</span>
            </div>
            <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm lg:text-base">
              Everything runs locally in your browser. No logs, no keys, no private code ever touches a server. Just the way it should be.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 text-sm pt-4">
            <div className="space-y-4">
              <h3 className="font-bold text-white tracking-widest text-[10px] uppercase">Project</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-zinc-500 hover:text-indigo-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-zinc-500 hover:text-indigo-400 transition-colors">Architecture</Link></li>
                <li><Link href="#" className="text-zinc-500 hover:text-indigo-400 transition-colors">Support</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-white tracking-widest text-[10px] uppercase">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/beingayandey" className="text-zinc-500 hover:text-indigo-400 transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com/beingayandey" className="text-zinc-500 hover:text-indigo-400 transition-colors">Twitter (X)</a></li>
                <li><a href="https://beingayandey.me" className="text-zinc-500 hover:text-indigo-400 transition-colors">Portfolio</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
