"use client";

import { useToast } from "@/hooks/use-toast";
import { Sparkles, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import * as React from "react";

/**
 * useAppToast - A high-level centralized hook for Ayan Dey notifications.
 * Enforces top-center positioning and premium Ayan Dey aesthetics.
 */
export function useAppToast() {
  const { toast } = useToast();

  const success = (title: string, description?: string) => {
    console.log("[Ayan Dey] Success Toast:", title);
    toast({
      variant: "success",
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-3.5 text-emerald-400" />
          <span>{title}</span>
        </div>
      ) as any,
      description: description as any,
    });
  };

  const premium = (title: string, description?: string) => {
    console.log("[Ayan Dey] Premium Toast:", title);
    toast({
      title: (
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="size-3.5" />
          <span>{title}</span>
        </div>
      ) as any,
      description: (
        <span className="text-zinc-300">{description}</span>
      ) as any,
      className: "border-indigo-500/30 bg-indigo-500/10 shadow-indigo-500/10 backdrop-blur-md",
    });
  };

  const info = (title: string, description?: string) => {
    console.log("[Ayan Dey] Info Toast:", title);
    toast({
      title: (
        <div className="flex items-center gap-2 text-blue-400">
          <Info className="size-3.5" />
          <span>{title}</span>
        </div>
      ) as any,
      description: description as any,
    });
  };

  const error = (title: string, description?: string) => {
    console.log("[Ayan Dey] Error Toast:", title);
    toast({
      variant: "destructive",
      title: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-3.5" />
          <span>{title}</span>
        </div>
      ) as any,
      description: description as any,
    });
  };

  return {
    success,
    premium,
    info,
    error,
    raw: toast,
  };
}
