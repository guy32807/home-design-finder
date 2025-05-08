'use client'

import React, { createContext, useContext } from 'react';
import { PlanUseCases } from '../../core/usecases/PlanUseCases';
import { AffiliateService } from '../api/AffiliateService';
import { PlanRepository } from '../api/PlanRepository';

// Create the services with proper configuration
const affiliateService = new AffiliateService(
  '101433563-14548500', // Your actual CJ affiliate ID
  'https://www.jdoqocy.com/click'
);

const planRepository = new PlanRepository();
const planUseCases = new PlanUseCases(planRepository, affiliateService);

// Create contexts
const PlanUseCasesContext = createContext<PlanUseCases | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <PlanUseCasesContext.Provider value={planUseCases}>
      {children}
    </PlanUseCasesContext.Provider>
  );
}

export function usePlanUseCases() {
  const context = useContext(PlanUseCasesContext);
  if (context === undefined) {
    throw new Error('usePlanUseCases must be used within an AppProvider');
  }
  return context;
}