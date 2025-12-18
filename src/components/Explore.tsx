import { motion } from 'framer-motion';
import { TrendingUp, Coins, Briefcase, Target, ChevronRight, Check, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SecuredFooter from './SecuredFooter';
import wealthManagerImg from '@/assets/wealth-manager.png';

interface ExploreProps {
  onNavigate?: (tab: string) => void;
  onShowWealthTiers?: () => void;
  onShowPortfolioDiscovery?: () => void;
}

const Explore = ({ onNavigate, onShowWealthTiers, onShowPortfolioDiscovery }: ExploreProps) => {
  const investmentOptions = [
    {
      id: 'grow-savings',
      title: 'Grow your savings',
      description: 'Fixed-return and low-risk savings options',
      icon: Coins,
      color: 'bg-gradient-to-r from-primary to-primary/80',
      action: () => onNavigate?.('products'),
    },
    {
      id: 'managed-portfolio',
      title: 'Invest in a managed portfolio',
      description: 'Professionally managed portfolios aligned to your goals',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-primary to-primary/80',
      action: () => onShowPortfolioDiscovery?.(),
    },
    {
      id: 'build-portfolio',
      title: 'Build your own portfolio',
      description: 'Choose from a curated range of approved investments',
      icon: Briefcase,
      color: 'bg-gradient-to-r from-primary to-primary/80',
      action: () => onNavigate?.('products'),
    },
    {
      id: 'long-term-plan',
      title: 'Plan for the long term',
      description: 'Set financial goals and track your progress over time',
      icon: Target,
      color: 'bg-gradient-to-r from-primary to-primary/80',
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4 text-center"
      >
        <h1 className="text-lg font-semibold text-foreground mb-8">Explore</h1>
      </motion.div>

      {/* How do you want to invest Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">How do you want to invest?</h2>
        <p className="text-muted-foreground mb-6">Start with one of the following options</p>
        
        <div className="space-y-4">
          {investmentOptions.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={option.action}
              className="w-full luxury-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-luxury transition-all duration-300 active:scale-[0.99]"
            >
              <div className={`w-14 h-14 rounded-full ${option.color} flex items-center justify-center shrink-0`}>
                <option.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-foreground text-lg mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Need more information section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-8"
      >
        <h2 className="text-xl font-bold text-foreground mb-6">Need more information to build your portfolio?</h2>
        
        {/* Wealth tiers */}
        <div className="luxury-card rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center transform rotate-12">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3">Wealth tiers</h3>
          <p className="text-muted-foreground mb-6 pr-20">
            Our Wealth tiers give you access to the right guidance for you, evolving as your portfolio grows
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-foreground">Automated ongoing advice</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-foreground">Varying levels of guidance</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success" />
              <span className="text-foreground">Unlock tiers as you grow</span>
            </div>
          </div>
          
          <button 
            onClick={onShowWealthTiers}
            className="luxury-text font-semibold hover:underline"
          >
            See more
          </button>
        </div>

        {/* Elevate your investments */}
        <div className="luxury-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-full">
            <img 
              src={wealthManagerImg} 
              alt="Dedicated Wealth Manager" 
              className="w-full h-full object-cover object-top rounded-r-2xl"
            />
          </div>
          
          <h3 className="text-xl font-bold text-success mb-3">Elevate your investments</h3>
          <p className="text-muted-foreground mb-1 pr-32">
            Upgrade for <span className="text-foreground font-semibold">EGP 500/month*</span> to unlock a dedicated Wealth Manager.
          </p>
          <p className="text-xs text-muted-foreground mb-4">*Minimum 3 months</p>
          
          <div className="space-y-3 mb-6 pr-32">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span className="text-foreground text-sm">Analyse your investment portfolio</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span className="text-foreground text-sm">Discuss and refine your financial goals</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span className="text-foreground text-sm">Receive personalized investment advice</span>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-background font-bold rounded-full shadow-luxury hover:shadow-elevated transition-all duration-300">
            Learn more
          </button>
        </div>
      </motion.div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Explore;