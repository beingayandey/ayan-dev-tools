"use client";

import Link from "next/link";
import { ArrowRight, Star, Sparkles, History, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAppToast } from "@/hooks/use-app-toast";
import { Tool, ToolCategory } from "@/lib/tools";
import { iconMap } from "@/lib/icon-map";
import { useFavorites, FavoriteTool } from "@/hooks/use-favorites";
import { useRecentTools } from "@/hooks/use-recent-tools";
import { cn } from "@/lib/utils";

interface ClientHomeProps {
  toolCategories: ToolCategory[];
  featuredTools: Tool[];
}

export function ClientHome({ toolCategories, featuredTools }: ClientHomeProps) {
  const { premium } = useAppToast();
  const { favorites, isLoaded: isFavoritesLoaded } = useFavorites();
  const { recentTools, clearRecentTools, isLoaded: isRecentLoaded } = useRecentTools();

  const showFavorites = isFavoritesLoaded && favorites.length > 0;
  const showRecent = isRecentLoaded && recentTools.length > 0;
  
  // If user has favorites, show favorites. Otherwise show featured.
  const displayTools = showFavorites ? favorites : featuredTools;

  return (
    <div className="space-y-20 pt-4">
      
      {/* 🕒 Recently Used Tools (NEW RETENTION ENGINE) */}
      {showRecent && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg flex items-center justify-center border transition-colors bg-emerald-500/10 border-emerald-500/20">
                <History className="size-4 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Recently Used
              </h2>
            </div>
            <button 
              onClick={clearRecentTools}
              className="group flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors bg-zinc-900/50 hover:bg-red-500/10 px-2.5 py-1.5 rounded-md border border-white/5 hover:border-red-500/20"
            >
              <Trash2 className="size-3" />
              <span>Clear</span>
            </button>
          </div>
          
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {recentTools.map((tool, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.3 }}
                key={`recent-${tool.id}-${tool.lastUsed}`}
              >
                <Link href={tool.route} className="block h-full group">
                  <Card className="h-full transition-all duration-300 overflow-hidden relative bg-zinc-900/30 border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/60">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-emerald-500/5" />
                    <CardHeader className="relative z-10 p-4 flex flex-row items-center gap-3 space-y-0">
                      <div className="size-8 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/30 transition-colors">
                        {(() => {
                          const Icon = iconMap[tool.icon] || History;
                          return <Icon className="size-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />;
                        })()}
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="truncate transition-colors text-sm font-medium text-zinc-300 group-hover:text-emerald-400">
                          {tool.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 🌟 Dynamic Hero Section: Favorites (Pinned) or Featured */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "size-8 rounded-lg flex items-center justify-center border transition-colors",
              showFavorites ? "bg-yellow-500/10 border-yellow-500/20" : "bg-indigo-500/10 border-indigo-500/20"
            )}>
              <Star className={cn("size-4", showFavorites ? "text-yellow-500 fill-yellow-500" : "text-indigo-400")} />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {showFavorites ? "Your Favorite Tools" : "Featured Tools"}
            </h2>
          </div>
          {showFavorites && (
            <Badge variant="outline" className="bg-yellow-500/5 border-yellow-500/20 text-yellow-500/80 text-[10px] uppercase tracking-widest px-2.5">
              Pinned
            </Badge>
          )}
        </div>
        
        <div className={cn(
          "grid gap-4",
          showFavorites 
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
            : "sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {displayTools.map((tool, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 50 }}
              key={tool.id}
            >
              <Link href={showFavorites ? (tool as any).route : (tool as Tool).href} className="block h-full group">
                <Card className={cn(
                  "h-full transition-all duration-300 overflow-hidden relative",
                  showFavorites 
                    ? "bg-zinc-900/30 border-white/5 hover:border-yellow-500/30 hover:bg-zinc-900/60"
                    : "border-indigo-500/10 bg-gradient-to-br from-zinc-900/50 to-zinc-900 hover:border-indigo-500/30"
                )}>
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    showFavorites ? "bg-yellow-500/5" : "bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
                  )} />
                  
                  <CardHeader className={cn(
                    "relative z-10",
                    showFavorites ? "p-4 flex flex-row items-center gap-3 space-y-0" : "p-6"
                  )}>
                    {!showFavorites && (
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800 group-hover:bg-indigo-500/20 transition-colors border border-white/5">
                          {(() => {
                            const Icon = iconMap[tool.icon] || Star;
                            return <Icon className="size-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />;
                          })()}
                        </div>
                        <ArrowRight className="size-4 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                      </div>
                    )}
                    
                    {showFavorites && (
                      <div className="size-8 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                        {(() => {
                          const Icon = iconMap[tool.icon] || Star;
                          return <Icon className="size-4 text-zinc-400 group-hover:text-yellow-500 transition-colors" />;
                        })()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <CardTitle className={cn(
                        "truncate transition-colors",
                        showFavorites ? "text-sm font-medium group-hover:text-yellow-500" : "text-lg mb-2"
                      )}>
                        {tool.name}
                      </CardTitle>
                      {!showFavorites && (
                        <CardDescription className="text-base text-zinc-400 line-clamp-2">
                          {(tool as Tool).description}
                        </CardDescription>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tool Categories */}
      <div className="space-y-16">
        {toolCategories.map((category, idx) => (
          <div key={category.id} className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400/80">{category.name}</h2>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.tools.map((tool, i) => (
                <motion.div
                   key={tool.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: i * 0.04, type: "spring", stiffness: 60, damping: 15 }}
                >
                  <Link href={tool.href} className="group h-full block">
                    <Card className="h-full bg-zinc-900/40 border-white/5 hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300 backdrop-blur-sm overflow-hidden relative">
                      <CardHeader className="p-5">
                        <div className="size-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                          {(() => {
                            const Icon = iconMap[tool.icon] || Star;
                            return <Icon className="size-5 text-indigo-400" />;
                          })()}
                        </div>
                        <CardTitle className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{tool.name}</CardTitle>
                        <CardDescription className="text-xs text-zinc-500 line-clamp-2 mt-1">{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* AD SLOT: GitHub CTA */}
            {idx === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 40, delay: 0.2 }}
                className="py-2"
              >
                <div className="w-full bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-3 text-center md:text-left">
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase text-[10px] tracking-widest px-3">Local First</Badge>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Need something custom?</h3>
                    <p className="text-sm text-zinc-400 max-w-lg">All tools are open source. If you need a specific utility, you can build it or request it on GitHub.</p>
                  </div>
                  <a
                    href="https://github.com/beingayandey/ayan-dev-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-black font-bold text-sm rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95 flex items-center justify-center"
                  >
                    View on GitHub
                  </a>
                  <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                     <Sparkles className="size-12 text-indigo-500/20 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
