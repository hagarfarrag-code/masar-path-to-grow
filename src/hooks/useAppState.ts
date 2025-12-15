import { create } from 'zustand';
import { RiskProfile, User, Asset, InvestmentProduct, InsightCard } from '@/types';
import { mockUser, mockAssets, mockProducts, mockInsights } from '@/data/mockData';

interface AppState {
  // Onboarding
  isOnboarded: boolean;
  currentOnboardingStep: number;
  riskAnswers: string[];
  
  // User
  user: User | null;
  
  // Portfolio
  assets: Asset[];
  products: InvestmentProduct[];
  insights: InsightCard[];
  
  // Actions
  setOnboarded: (value: boolean) => void;
  setOnboardingStep: (step: number) => void;
  addRiskAnswer: (answer: string) => void;
  calculateRiskProfile: () => RiskProfile;
  initializeUser: (riskProfile: RiskProfile) => void;
  resetOnboarding: () => void;
}

export const useAppState = create<AppState>((set, get) => ({
  isOnboarded: false,
  currentOnboardingStep: 0,
  riskAnswers: [],
  user: null,
  assets: mockAssets,
  products: mockProducts,
  insights: mockInsights,
  
  setOnboarded: (value) => set({ isOnboarded: value }),
  
  setOnboardingStep: (step) => set({ currentOnboardingStep: step }),
  
  addRiskAnswer: (answer) => set((state) => ({ 
    riskAnswers: [...state.riskAnswers, answer] 
  })),
  
  calculateRiskProfile: () => {
    const answers = get().riskAnswers;
    const conservativeCount = answers.filter(a => a === 'conservative').length;
    const growthCount = answers.filter(a => a === 'growth').length;
    
    if (conservativeCount >= 2) return 'conservative';
    if (growthCount >= 2) return 'growth';
    return 'balanced';
  },
  
  initializeUser: (riskProfile) => set({
    user: { ...mockUser, riskProfile },
    isOnboarded: true,
  }),
  
  resetOnboarding: () => set({
    isOnboarded: false,
    currentOnboardingStep: 0,
    riskAnswers: [],
    user: null,
  }),
}));
