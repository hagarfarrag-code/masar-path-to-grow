export type RiskProfile = 'conservative' | 'balanced' | 'growth';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskProfile: RiskProfile;
  portfolioValue: number;
  totalInvested: number;
  totalGain: number;
  todayChange: number;
  todayChangePercent: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'equity' | 'fixed-income' | 'money-market';
  value: number;
  allocation: number;
  returnRate: number;
  color: string;
}

export interface InvestmentProduct {
  id: string;
  name: string;
  type: 'money-market' | 'fixed-income' | 'equity';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: { min: number; max: number };
  minimumInvestment: number;
  description: string;
  suitableFor: string;
  aum: number;
  fee: number;
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'education' | 'alert';
  icon: string;
}

export interface OnboardingQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    description?: string;
  }[];
}
