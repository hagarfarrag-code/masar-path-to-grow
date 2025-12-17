import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Plus, ArrowUpRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/useAppState';
import { formatCurrency, formatPercent } from '@/lib/format';
import PortfolioChart from './PortfolioChart';
import InsightCards from './InsightCards';
import QuickActions from './QuickActions';
import RecentTransactions from './RecentTransactions';
import SecuredFooter from './SecuredFooter';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { user, assets, insights } = useAppState();

  if (!user) return null;

  const isPositive = user.todayChange >= 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground">Good morning,</p>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-card">
            <Wallet className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Portfolio Value Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="luxury-card rounded-2xl p-6 shadow-luxury animate-glow">
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <h2 className="text-3xl font-bold luxury-text mb-2">
            {formatCurrency(user.portfolioValue)}
          </h2>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-semibold">{formatPercent(user.todayChangePercent)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {isPositive ? '+' : ''}{formatCurrency(user.todayChange)} today
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <QuickActions onNavigate={onNavigate} />
      </motion.div>

      {/* Public Insights Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Elite Market Intelligence</h3>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => onNavigate?.('insights')}>
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/8 to-primary/12 rounded-2xl p-4 mb-4 border border-primary/20 shadow-luxury">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">47,892</p>
              <p className="text-xs text-muted-foreground">Active Investors</p>
            </div>
            <div>
              <p className="text-lg font-bold text-success">+18.4%</p>
              <p className="text-xs text-muted-foreground">Avg. Returns</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">2.1B EGP</p>
              <p className="text-xs text-muted-foreground">Assets Under Mgmt</p>
            </div>
          </div>
        </div>

        {/* Featured Insight */}
        <div className="bg-card rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-luxury">
            <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse"></div>
            PREMIUM
          </div>
          
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm leading-tight">MASAR Reaches 30,000 Investors Milestone! 📈</h4>
              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            We've officially welcomed our 30,000th investor to the MASAR community! This incredible growth shows Egyptian trust in our platform...
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>12.3K views</span>
              <span>567 likes</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('insights')}>
              Read More
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent transactions</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        <RecentTransactions />
      </motion.div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Dashboard;
