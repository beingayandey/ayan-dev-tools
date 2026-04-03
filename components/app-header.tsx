"use client";

import { usePathname } from "next/navigation";
import { Home, Command, Star } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getToolById, getCategoryByToolId } from "@/lib/tools";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { iconMap } from "@/lib/icon-map";

export function AppHeader() {
  const pathname = usePathname();

  // Extract tool ID from pathname
  const toolId = pathname.startsWith("/tools/")
    ? pathname.replace("/tools/", "")
    : null;

  const tool = toolId ? getToolById(toolId) : null;
  const category = toolId ? getCategoryByToolId(toolId) : null;

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-1 sm:gap-2 border-b border-foreground/5 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 px-2 sm:px-4">
      <SidebarTrigger className="-ml-1 opacity-70 hover:opacity-100 transition-opacity shrink-0" />
      <Separator orientation="vertical" className="mr-1 sm:mr-2 h-4 opacity-50 shrink-0" />

      <div className="flex-1 sm:flex-initial min-w-0">
        {tool ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              {(() => {
                const Icon = iconMap[tool.icon] || Star;
                return <Icon className="size-4 sm:size-4.5 text-indigo-500 shrink-0" />;
              })()}
              <h1 className="text-xs sm:text-sm font-semibold tracking-wide text-foreground truncate">{tool.name}</h1>
            </div>
            {category && (
              <Badge variant="outline" className="hidden md:inline-flex bg-white/5 border-white/10 text-xs font-medium tracking-wide whitespace-nowrap">
                {category.name}
              </Badge>
            )}
          </div>
        ) : pathname === "/" ? (
          <div className="flex items-center gap-2 bg-indigo-500/10 px-2 sm:px-3 py-1 rounded-full border border-indigo-500/20 shrink-0">
            <Home className="size-3.5 text-indigo-500" />
            <h1 className="text-[10px] sm:text-xs font-bold tracking-wide uppercase text-indigo-500 whitespace-nowrap">Hub</h1>
          </div>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex aspect-square size-6 items-center justify-center rounded bg-indigo-500 text-white shadow-sm">
              <Command className="size-3" />
            </div>
            <h1 className="hidden sm:block text-sm font-bold tracking-wide text-foreground">Ayan Dey</h1>
          </div>
        )}
      </div>

      {/* Center Search - Push to center on desktop, fill space on mobile if needed */}
      <div className="flex justify-center flex-1 px-1 sm:px-4">
        <GlobalSearch />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
