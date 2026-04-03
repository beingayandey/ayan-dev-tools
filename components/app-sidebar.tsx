"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, Star, Command, Sparkles } from "lucide-react";
import logo from "@/public/logo.png";
import { categories, searchableTools as featuredTools } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useFavorites, FavoriteTool } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { iconMap } from "@/lib/icon-map";

export function AppSidebar() {
  const pathname = usePathname();
  const { favorites, isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent, tool: any, isFav: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In the sidebar, 'tool' might have 'href' (from data.ts) or 'route' (from hook)
    const route = tool.href || tool.route;
    
    const fav: FavoriteTool = {
      id: tool.id,
      name: tool.name,
      route: route,
      icon: tool.icon,
    };
    toggleFavorite(fav);
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-white/5 bg-zinc-950"
    >
      <SidebarHeader className="border-b border-white/5 pb-4 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-white/5 hover:bg-white/5 transition-colors"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  {/* <Command className="size-4" /> */}
                  <img src={logo.src} alt="" />
                </div>
                <div className="flex flex-col gap-1 leading-none ml-2">
                  <span className="font-bold tracking-tight text-foreground uppercase text-xs flex items-center gap-1.5">
                    Ayan Dey{" "}
                    <Badge
                      variant="outline"
                      className="text-[8px] px-1 py-0 border-indigo-500/30 text-indigo-400 bg-indigo-500/10 rounded-sm"
                    >
                      Dev
                    </Badge>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                    Personal Tools
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-2 overflow-y-auto custom-scrollbar" data-lenis-prevent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/"}
                tooltip="Workspace Hub"
                className="text-zinc-400 hover:text-white data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-400"
              >
                <Link href="/">
                  <Home className="size-4" />
                  <span className="font-medium">Hub</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Dynamic Favorites Section */}
        {isLoaded && favorites.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">
              <Star className="size-3 text-yellow-500 fill-yellow-500" />
              Pinned Favorites
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {favorites.map((tool) => {
                  const Icon = iconMap[tool.icon] || Star;
                  const isActive = pathname === tool.route;
                  const favorited = isFavorite(tool.id);

                  return (
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={tool.name}
                        className="text-zinc-400 hover:text-white data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-400 group/item"
                      >
                        <Link href={tool.route} prefetch={false} className="flex-1">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon className="size-4 shrink-0" />
                            <span className="font-medium truncate">{tool.name}</span>
                          </div>
                          
                          <button
                            onClick={(e) => handleFavoriteClick(e, tool, favorited)}
                            className={cn(
                              "size-6 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all rounded-md shrink-0",
                              favorited ? "text-yellow-500 opacity-100" : "text-zinc-600 hover:text-yellow-500 hover:bg-yellow-500/10"
                            )}
                          >
                            <Star className={cn("size-3", favorited && "fill-yellow-500")} />
                          </button>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">
            <Sparkles className="size-3 text-indigo-400" />
            Flagship Workflows
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {featuredTools.map((tool) => {
                const Icon = iconMap[tool.icon] || Star;
                const isActive = pathname === tool.href;
                const favorited = isFavorite(tool.id);

                return (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={tool.name}
                      className="text-zinc-400 hover:text-white data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-400 group/item"
                    >
                      <Link href={tool.href} prefetch={false} className="flex-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Icon className="size-4 shrink-0" />
                          <span className="font-medium truncate">{tool.name}</span>
                        </div>
                        
                        <button
                          onClick={(e) => handleFavoriteClick(e, tool, favorited)}
                          className={cn(
                            "size-6 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all rounded-md shrink-0",
                            favorited ? "text-yellow-500 opacity-100" : "text-zinc-600 hover:text-yellow-500 hover:bg-yellow-500/10"
                          )}
                        >
                          <Star className={cn("size-3", favorited && "fill-yellow-500")} />
                        </button>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {categories.map((category) => (
          <SidebarGroup key={category.id} className="mt-2 text-zinc-400">
            <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-zinc-600 group-data-[collapsible=icon]:hidden">
              {category.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.tools.map((tool) => {
                  const Icon = iconMap[tool.icon] || Star;
                  const isActive = pathname === tool.href;
                  const favorited = isFavorite(tool.id);

                  return (
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={tool.name}
                        className="text-zinc-400 hover:text-white data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-400 group/item"
                      >
                        <Link href={tool.href} prefetch={false} className="flex-1">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon className="size-4 shrink-0" />
                            <span className="font-medium truncate">{tool.name}</span>
                          </div>
                          
                          <button
                            onClick={(e) => handleFavoriteClick(e, tool, favorited)}
                            className={cn(
                              "size-6 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all rounded-md shrink-0",
                              favorited ? "text-yellow-500 opacity-100" : "text-zinc-600 hover:text-yellow-500 hover:bg-yellow-500/10"
                            )}
                          >
                            <Star className={cn("size-3", favorited && "fill-yellow-500")} />
                          </button>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 pb-2">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors group-data-[collapsible=icon]:hidden border border-transparent hover:border-white/5">
              <div className="flex items-center gap-2 mb-1 text-xs font-medium text-zinc-300">
                <Shield className="size-3 text-indigo-400" /> Engineered for
                Privacy
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-2">
                Zero Tracking. 100% Local.
              </p>
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button className="hidden group-data-[collapsible=icon]:flex w-full p-2 items-center justify-center hover:bg-white/5 rounded-md transition-colors">
              <Shield className="size-4 text-indigo-400" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-zinc-950 border border-white/10 text-zinc-300">
            <DialogHeader>
              <DialogTitle className="text-white text-xl flex items-center gap-2">
                <Shield className="size-5 text-indigo-500" /> Privacy First
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm text-zinc-400">
              <p>
                These tools are built for speed and security. No data leaves
                your machine, no accounts are required, and there is zero
                tracking.
              </p>
              <p>
                Everything happens in your browser. Fast, local, and secure.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-sm pt-6 border-t border-white/10 mt-6">
              <div className="space-y-1">
                <h3 className="font-medium text-white tracking-wide text-xs uppercase">
                  Creator
                </h3>
                <p className="text-zinc-500">
                  <a
                    href="https://ayan-dev-tools.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Ayan Dey
                  </a>
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-white tracking-wide text-xs uppercase">
                  Source
                </h3>
                <p className="text-zinc-500">
                  <a
                    href="https://github.com/beingayandey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    GitHub / tools
                  </a>
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 mt-4 space-y-3">
              <h3 className="font-medium text-white text-xs uppercase tracking-wide">
                Powered By
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Next.js", url: "https://nextjs.org" },
                  { name: "Framer Motion", url: "https://framer.com/motion" },
                  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
                  { name: "shadcn/ui", url: "https://ui.shadcn.com" },
                ].map((lib) => (
                  <a
                    key={lib.name}
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    {lib.name}
                  </a>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
