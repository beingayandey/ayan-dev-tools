"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { RecentTool } from "./recent-tools-context";
import { FavoriteTool } from "./favorites-context";

export interface ToolAction {
  id: string;
  toolId: string;
  type: 'input' | 'output' | 'transformation' | 'analysis';
  timestamp: number;
  data: any;
  nextPossibleActions: string[];
}

export interface DeveloperOSState {
  // Current workspace state
  currentTool: string | null;
  lastAction: ToolAction | null;
  workspaceData: Record<string, any>;

  // Navigation and context
  navigationHistory: string[];
  breadcrumbs: Array<{ id: string; name: string; route: string }>;

  // Tool connections
  toolConnections: Record<string, string[]>; // toolId -> relatedToolIds
  suggestedWorkflows: Array<{ id: string; name: string; steps: string[] }>;

  // Action history
  actionHistory: ToolAction[];

  // Context awareness
  contextType: 'text' | 'image' | 'data' | 'code' | 'unknown';
  contextData: any;
}

interface DeveloperOSContextType extends DeveloperOSState {
  // Workspace management
  setCurrentTool: (toolId: string) => void;
  updateWorkspaceData: (toolId: string, data: any) => void;
  clearWorkspaceData: (toolId: string) => void;

  // Action management
  recordAction: (action: Omit<ToolAction, 'id' | 'timestamp'>) => void;
  getNextActions: (toolId: string) => string[];

  // Navigation
  addToNavigationHistory: (toolId: string) => void;
  navigateBack: () => void;
  clearNavigationHistory: () => void;

  // Context awareness
  setContext: (type: 'text' | 'image' | 'data' | 'code', data: any) => void;
  clearContext: () => void;

  // Suggestions
  getSuggestedWorkflows: (toolId: string) => string[];
  getRelatedTools: (toolId: string) => string[];

  // Utility
  resetState: () => void;
}

const DeveloperOSContext = createContext<DeveloperOSContextType | undefined>(undefined);

const DEVELOPER_OS_STATE_KEY = "developerOSState";

export function DeveloperOSProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeveloperOSState>(() => {
    // Server-side initialization - always return the same default state for SSR
    if (typeof window === 'undefined') {
      return {
        currentTool: null,
        lastAction: null,
        workspaceData: {},
        navigationHistory: [],
        breadcrumbs: [],
        toolConnections: {},
        suggestedWorkflows: [],
        actionHistory: [],
        contextType: 'unknown',
        contextData: null,
      };
    }

    // Client-side initialization - use localStorage if available
    const saved = localStorage.getItem(DEVELOPER_OS_STATE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse developer OS state", e);
        localStorage.removeItem(DEVELOPER_OS_STATE_KEY);
      }
    }

    // Default state
    return {
      currentTool: null,
      lastAction: null,
      workspaceData: {},
      navigationHistory: [],
      breadcrumbs: [],
      toolConnections: {},
      suggestedWorkflows: [],
      actionHistory: [],
      contextType: 'unknown',
      contextData: null,
    };
  });

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEVELOPER_OS_STATE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Handle cross-tab updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === DEVELOPER_OS_STATE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setState(parsed);
        } catch (err) {
          console.error("Failed to sync storage change for developer OS state", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setCurrentTool = useCallback((toolId: string) => {
    setState(prev => {
      // Find the existing breadcrumb index
      const existingIndex = prev.breadcrumbs.findIndex(b => b.id === toolId);

      // If the tool is already in breadcrumbs, move it to the end
      // Otherwise, add it to the end
      let newBreadcrumbs = [...prev.breadcrumbs];
      if (existingIndex !== -1) {
        // Remove from current position and add to end
        const [existingBreadcrumb] = newBreadcrumbs.splice(existingIndex, 1);
        newBreadcrumbs.push(existingBreadcrumb);
      } else {
        // Add new breadcrumb
        newBreadcrumbs.push({
          id: toolId,
          name: toolId,
          route: `/tools/${toolId}`
        });
      }

      // Keep only last 5 breadcrumbs
      newBreadcrumbs = newBreadcrumbs.slice(-5);

      return {
        ...prev,
        currentTool: toolId,
        breadcrumbs: newBreadcrumbs
      };
    });
  }, []);

  const updateWorkspaceData = useCallback((toolId: string, data: any) => {
    setState(prev => ({
      ...prev,
      workspaceData: {
        ...prev.workspaceData,
        [toolId]: data
      }
    }));
  }, []);

  const clearWorkspaceData = useCallback((toolId: string) => {
    setState(prev => ({
      ...prev,
      workspaceData: {
        ...prev.workspaceData,
        [toolId]: undefined
      }
    }));
  }, []);

  const recordAction = useCallback((action: Omit<ToolAction, 'id' | 'timestamp'>) => {
    const newAction: ToolAction = {
      ...action,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    setState(prev => ({
      ...prev,
      lastAction: newAction,
      actionHistory: [newAction, ...prev.actionHistory].slice(0, 50), // Keep last 50 actions
    }));
  }, []);

  const addToNavigationHistory = useCallback((toolId: string) => {
    setState(prev => {
      // Add the tool to the front of navigation history, removing duplicates
      let newNavHistory = [toolId, ...prev.navigationHistory.filter(id => id !== toolId)];
      newNavHistory = newNavHistory.slice(0, 20); // Keep last 20 items

      return {
        ...prev,
        navigationHistory: newNavHistory
      };
    });
  }, []);

  const navigateBack = useCallback(() => {
    setState(prev => {
      if (prev.navigationHistory.length > 1) {
        // Remove the current tool from navigation history and get the previous one
        const [, ...rest] = prev.navigationHistory; // Remove current tool
        const previousTool = rest[0]; // Get the previous tool

        // Update breadcrumbs to reflect the navigation
        let newBreadcrumbs = [...prev.breadcrumbs];
        if (previousTool) {
          // Move the previous tool to the end of breadcrumbs if it exists
          const prevIndex = newBreadcrumbs.findIndex(b => b.id === previousTool);
          if (prevIndex !== -1) {
            const [prevBreadcrumb] = newBreadcrumbs.splice(prevIndex, 1);
            newBreadcrumbs.push(prevBreadcrumb);
            newBreadcrumbs = newBreadcrumbs.slice(-5); // Keep only last 5
          }
        }

        const newState = {
          ...prev,
          navigationHistory: rest,
          currentTool: previousTool || null,
          breadcrumbs: newBreadcrumbs
        };

        // Navigate to the previous tool (only on client side)
        if (previousTool && typeof window !== 'undefined') {
          window.location.href = `/tools/${previousTool}`;
        }

        return newState;
      }
      return prev;
    });
  }, []);

  const clearNavigationHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      navigationHistory: []
    }));
  }, []);

  const setContext = useCallback((type: 'text' | 'image' | 'data' | 'code', data: any) => {
    setState(prev => ({
      ...prev,
      contextType: type,
      contextData: data
    }));
  }, []);

  const clearContext = useCallback(() => {
    setState(prev => ({
      ...prev,
      contextType: 'unknown',
      contextData: null
    }));
  }, []);

  const getNextActions = useCallback((toolId: string): string[] => {
    // Default next actions based on tool type
    const toolTypeMap: Record<string, string[]> = {
      'word-counter': ['text-analyzer', 'seo-checker', 'content-optimizer'],
      'image-converter': ['image-optimizer', 'watermarker', 'background-remover'],
      'qr-generator': ['qr-scanner', 'barcode-generator'],
      'regex-tester': ['text-analyzer', 'validator'],
      'color-converter': ['palette-generator', 'contrast-checker'],
      'code-generator': ['formatter', 'beautifier', 'validator']
    };

    return toolTypeMap[toolId] || [];
  }, []);

  const getSuggestedWorkflows = useCallback((toolId: string): string[] => {
    // Define common workflows
    const workflows: Record<string, string[]> = {
      'word-counter': ['reading-time-calculator', 'seo-content-length-checker', 'text-analyzer'],
      'image-converter': ['image-optimizer', 'watermarker', 'social-cropper'],
      'color-converter': ['palette-generator', 'contrast-checker', 'colorblind-sim'],
      'qr-generator': ['qr-scanner', 'url-shortener'],
      'regex-tester': ['validator', 'text-analyzer', 'parser']
    };

    return workflows[toolId] || [];
  }, []);

  const getRelatedTools = useCallback((toolId: string): string[] => {
    // Define tool relationships
    const relationships: Record<string, string[]> = {
      'word-counter': ['reading-time-calculator', 'text-analyzer', 'seo-checker'],
      'image-converter': ['image-optimizer', 'watermarker', 'background-remover', 'social-cropper'],
      'color-converter': ['palette-generator', 'contrast-checker', 'colorblind-sim'],
      'qr-generator': ['qr-scanner', 'url-shortener'],
      'regex-tester': ['validator', 'text-analyzer', 'parser'],
      'code-generator': ['formatter', 'beautifier', 'validator']
    };

    return relationships[toolId] || [];
  }, []);

  const resetState = useCallback(() => {
    setState({
      currentTool: null,
      lastAction: null,
      workspaceData: {},
      navigationHistory: [],
      breadcrumbs: [],
      toolConnections: {},
      suggestedWorkflows: [],
      actionHistory: [],
      contextType: 'unknown',
      contextData: null,
    });
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    setCurrentTool,
    updateWorkspaceData,
    clearWorkspaceData,
    recordAction,
    addToNavigationHistory,
    navigateBack,
    clearNavigationHistory,
    setContext,
    clearContext,
    getNextActions,
    getSuggestedWorkflows,
    getRelatedTools,
    resetState
  }), [
    state,
    setCurrentTool,
    updateWorkspaceData,
    clearWorkspaceData,
    recordAction,
    addToNavigationHistory,
    navigateBack,
    clearNavigationHistory,
    setContext,
    clearContext,
    getNextActions,
    getSuggestedWorkflows,
    getRelatedTools,
    resetState
  ]);

  return (
    <DeveloperOSContext.Provider value={contextValue}>
      {children}
    </DeveloperOSContext.Provider>
  );
}

export function useDeveloperOS() {
  const context = useContext(DeveloperOSContext);
  if (context === undefined) {
    throw new Error("useDeveloperOS must be used within a DeveloperOSProvider");
  }
  return context;
}