'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ShareContextType = {
  currentPlan: {
    name: string;
    description: string;
    image: string;
    url: string;
  } | null;
  setCurrentPlan: (plan: {
    name: string;
    description: string;
    image: string;
    url: string;
  } | null) => void;
};

const ShareContext = createContext<ShareContextType | undefined>(undefined);

export function ShareProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<{
    name: string;
    description: string;
    image: string;
    url: string;
  } | null>(null);

  return (
    <ShareContext.Provider value={{ currentPlan, setCurrentPlan }}>
      {children}
    </ShareContext.Provider>
  );
}

export function useShare() {
  const context = useContext(ShareContext);
  if (context === undefined) {
    throw new Error('useShare must be used within a ShareProvider');
  }
  return context;
}