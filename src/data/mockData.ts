import { User, Asset, InvestmentProduct, InsightCard, OnboardingQuestion } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Ahmed',
  email: 'ahmed@example.com',
  phone: '+20 100 123 4567',
  riskProfile: 'balanced',
  portfolioValue: 125750,
  totalInvested: 115000,
  totalGain: 10750,
  todayChange: 325,
  todayChangePercent: 0.26,
};

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Money Market Fund',
    type: 'money-market',
    value: 37725,
    allocation: 30,
    returnRate: 22.5,
    color: 'hsl(160, 45%, 35%)',
  },
  {
    id: '2',
    name: 'Fixed Income Fund',
    type: 'fixed-income',
    value: 50300,
    allocation: 40,
    returnRate: 18.2,
    color: 'hsl(38, 85%, 55%)',
  },
  {
    id: '3',
    name: 'EGX Equity Fund',
    type: 'equity',
    value: 37725,
    allocation: 30,
    returnRate: 12.8,
    color: 'hsl(200, 60%, 50%)',
  },
];

export const mockProducts: InvestmentProduct[] = [
  {
    id: '1',
    name: 'Capital Shield Fund',
    type: 'money-market',
    riskLevel: 'low',
    expectedReturn: { min: 20, max: 24 },
    minimumInvestment: 500,
    description: 'A safe haven for your savings. This fund invests in short-term government securities and bank deposits, offering stable returns with minimal risk.',
    suitableFor: 'Those who want to protect their capital while earning returns above traditional savings accounts.',
    aum: 850000000,
    fee: 0.5,
  },
  {
    id: '2',
    name: 'Steady Growth Bond Fund',
    type: 'fixed-income',
    riskLevel: 'medium',
    expectedReturn: { min: 16, max: 20 },
    minimumInvestment: 1000,
    description: 'Build wealth steadily with government and corporate bonds. This fund provides regular income through interest payments while preserving your capital.',
    suitableFor: 'Investors seeking regular income with moderate risk tolerance.',
    aum: 620000000,
    fee: 0.75,
  },
  {
    id: '3',
    name: 'Egypt Growth Equity Fund',
    type: 'equity',
    riskLevel: 'high',
    expectedReturn: { min: 10, max: 25 },
    minimumInvestment: 1000,
    description: 'Participate in Egypt\'s economic growth by investing in the top companies listed on the Egyptian Exchange (EGX).',
    suitableFor: 'Long-term investors comfortable with market fluctuations seeking higher potential returns.',
    aum: 420000000,
    fee: 1.0,
  },
  {
    id: '4',
    name: 'Regional Opportunities Fund',
    type: 'equity',
    riskLevel: 'high',
    expectedReturn: { min: 8, max: 22 },
    minimumInvestment: 2500,
    description: 'Diversify across the MENA region with exposure to leading companies in UAE, Saudi Arabia, and Egypt.',
    suitableFor: 'Experienced investors seeking regional diversification and growth opportunities.',
    aum: 280000000,
    fee: 1.25,
  },
];

export const mockInsights: InsightCard[] = [
  {
    id: '1',
    title: 'Your portfolio is balanced',
    description: 'Your current allocation matches your balanced risk profile. Keep it up!',
    type: 'tip',
    icon: 'check-circle',
  },
  {
    id: '2',
    title: 'What is a Money Market Fund?',
    description: 'It\'s like a savings account, but better. Your money is invested in safe, short-term securities.',
    type: 'education',
    icon: 'lightbulb',
  },
  {
    id: '3',
    title: 'New: Higher rates available',
    description: 'Money market returns have increased. Consider adding more to capitalize on current rates.',
    type: 'alert',
    icon: 'trending-up',
  },
];

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 1,
    question: 'What is your main goal for investing?',
    options: [
      { label: 'Protect my savings', value: 'conservative', description: 'Keep my money safe from inflation' },
      { label: 'Steady growth', value: 'balanced', description: 'Grow my wealth with moderate risk' },
      { label: 'Maximize returns', value: 'growth', description: 'I\'m okay with ups and downs for higher gains' },
    ],
  },
  {
    id: 2,
    question: 'How would you react if your investment dropped 15%?',
    options: [
      { label: 'Sell immediately', value: 'conservative', description: 'I can\'t afford to lose money' },
      { label: 'Wait and see', value: 'balanced', description: 'Give it time to recover' },
      { label: 'Buy more', value: 'growth', description: 'It\'s a chance to invest at lower prices' },
    ],
  },
  {
    id: 3,
    question: 'When do you plan to use this money?',
    options: [
      { label: 'Within 1 year', value: 'conservative', description: 'I might need it soon' },
      { label: '1-5 years', value: 'balanced', description: 'Medium-term goals' },
      { label: '5+ years', value: 'growth', description: 'Long-term wealth building' },
    ],
  },
];

export const performanceData = [
  { month: 'Jul', value: 100000 },
  { month: 'Aug', value: 102500 },
  { month: 'Sep', value: 105200 },
  { month: 'Oct', value: 108900 },
  { month: 'Nov', value: 115000 },
  { month: 'Dec', value: 118200 },
  { month: 'Jan', value: 125750 },
];
