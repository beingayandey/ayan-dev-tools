"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WorkflowContextType {
  isActionCompleted: boolean;
  completeAction: () => void;
  resetAction: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [isActionCompleted, setIsActionCompleted] = useState(false);

  const completeAction = useCallback(() => {
    setIsActionCompleted(true);
  }, []);

  const resetAction = useCallback(() => {
    setIsActionCompleted(false);
  }, []);

  return (
    <WorkflowContext.Provider value={{ isActionCompleted, completeAction, resetAction }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  // Optional chaining so tools can gracefully degrade if used outside provider
  return context || { isActionCompleted: false, completeAction: () => {}, resetAction: () => {} };
}
