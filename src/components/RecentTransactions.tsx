import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, BarChart3, Triangle, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

interface Transaction {
  id: string;
  type: 'portfolio' | 'fund_purchase' | 'equity' | 'bond';
  title: string;
  subtitle: string;
  date: string;
  amount: number;
  percentage?: number;
  status?: 'processing' | 'completed';
  isPositive: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'portfolio',
    title: 'Actively Managed Portfolio',
    subtitle: 'December 24, 10:12 AM',
    date: 'Dec 24',
    amount: 550,
    percentage: 0.22,
    status: 'completed',
    isPositive: true,
  },
  {
    id: '2',
    type: 'fund_purchase',
    title: 'MF CIB Money Market Fund',
    subtitle: 'Bought',
    date: 'Processing...',
    amount: 120,
    status: 'processing',
    isPositive: true,
  },
  {
    id: '3',
    type: 'equity',
    title: 'MF Prime Equity Fund',
    subtitle: 'December 24',
    date: 'Dec 24',
    amount: 375,
    percentage: 0.50,
    status: 'completed',
    isPositive: true,
  },
  {
    id: '4',
    type: 'bond',
    title: 'Egyptian Treasury Bond 14.93%',
    subtitle: 'December 24',
    date: 'Dec 24',
    amount: 180,
    percentage: 0.36,
    status: 'completed',
    isPositive: true,
  },
  {
    id: '5',
    type: 'bond',
    title: 'Egyptian Treasury Bond 14.93%',
    subtitle: 'December 24',
    date: 'Dec 24',
    amount: 180,
    percentage: 0.36,
    status: 'completed',
    isPositive: true,
  },
];

const RecentTransactions = () => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'portfolio':
        return TrendingUp;
      case 'fund_purchase':
        return Briefcase;
      case 'equity':
        return BarChart3;
      case 'bond':
        return Triangle;
      default:
        return TrendingUp;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'portfolio':
        return 'bg-gradient-to-r from-primary to-primary/80';
      case 'fund_purchase':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'equity':
        return 'bg-gradient-to-r from-primary to-primary/80';
      case 'bond':
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-gradient-to-r from-primary to-primary/80';
    }
  };

  return (
    <div className="luxury-card rounded-2xl p-5 shadow-luxury">
      <div className="space-y-4">
        {mockTransactions.map((transaction, index) => {
          const Icon = getTransactionIcon(transaction.type);
          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(transaction.type)}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm">{transaction.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{transaction.subtitle}</p>
                    {transaction.status === 'processing' && (
                      <span className="text-xs text-amber-500 font-medium">Processing...</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {transaction.percentage && (
                  <p className="text-xs text-success font-semibold mb-1">
                    +{transaction.percentage.toFixed(2)}%
                  </p>
                )}
                <p className="text-sm font-bold text-success">
                  + {formatCurrency(transaction.amount)}
                </p>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors inline-block mt-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* View All Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm luxury-text font-semibold hover:underline">
          View all transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;