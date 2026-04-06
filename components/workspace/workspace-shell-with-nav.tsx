'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, RotateCcw, Settings, History, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDeveloperOS } from '@/context/developer-os-context';
import { useRecentToolsContext } from '@/context/recent-tools-context';
import { useFavorites } from '@/context/favorites-context';
import { getToolById } from '@/lib/tools';

interface WorkspaceShellWithNavProps {
  children: React.ReactNode;
  currentToolId: string;
}

export const WorkspaceShellWithNav: React.FC<WorkspaceShellWithNavProps> = ({ children, currentToolId }) => {
  const {
    breadcrumbs,
    navigationHistory,
    navigateBack,
    addToNavigationHistory,
    resetState,
    setCurrentTool
  } = useDeveloperOS();

  const { recentTools } = useRecentToolsContext();
  const { favorites } = useFavorites();

  // Check hydration state to prevent hydration mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      addToNavigationHistory(currentToolId);
      setCurrentTool(currentToolId);
    }
  }, [currentToolId, addToNavigationHistory, setCurrentTool, isHydrated]);

  const [showQuickAccess, setShowQuickAccess] = useState(false);

  return (
    <div className="flex flex-col h-full min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={navigateBack}
                disabled={isHydrated ? navigationHistory.length <= 1 : true}
                className="size-8"
                aria-label="Go back"
              >
                <ChevronLeft className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={resetState}
                className="size-8"
                aria-label="Reset workspace"
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isHydrated ? (
                breadcrumbs.slice(-3).map((crumb, index) => {
                  const tool = getToolById(crumb.id);
                  const displayName = tool?.name || crumb.name;

                  return (
                    <React.Fragment key={crumb.id}>
                      {index > 0 && <span>/</span>}
                      <Link
                        href={`/tools/${crumb.id}`}
                        className={`hover:text-foreground ${currentToolId === crumb.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                        prefetch={false}
                      >
                        {displayName}
                      </Link>
                    </React.Fragment>
                  );
                })
              ) : (
                // Render a static version during hydration
                <span className="text-muted-foreground">Loading...</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQuickAccess(!showQuickAccess)}
              className="size-8"
              aria-label="Quick access"
            >
              <Zap className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access Panel */}
      {showQuickAccess && (
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Quick Access</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQuickAccess(false)}
                className="size-6"
              >
                <X className="size-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Favorites:</span>
              {isHydrated ? (
                favorites.slice(0, 3).map(fav => {
                  const tool = getToolById(fav.id);
                  return (
                    <Button
                      key={fav.id}
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs"
                    >
                      <Link href={`/tools/${fav.id}`} prefetch={false}>
                        {tool?.name || fav.name}
                      </Link>
                    </Button>
                  );
                })
              ) : (
                <span className="text-xs text-muted-foreground">...</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          {/* Context Banner - Shows current context if available */}
          <div className="bg-primary/5 border-b border-primary/10 p-3 text-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-medium">Developer OS Active</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {isHydrated ? (
                    recentTools.length > 0
                      ? `Last used: ${recentTools[0]?.name}`
                      : 'Ready to work'
                  ) : '...'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {isHydrated ? `${navigationHistory.length} tools used` : '...'} • {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Tool Content */}
          <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};