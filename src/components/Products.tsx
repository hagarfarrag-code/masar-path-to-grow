import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/useAppState';
import { formatCurrency, formatCompactCurrency, getRiskLevelColor, getRiskLevelBg } from '@/lib/format';
import { InvestmentProduct } from '@/types';
import SecuredFooter from './SecuredFooter';

interface ProductsProps {
  onSelectProduct: (product: InvestmentProduct) => void;
}

const Products = ({ onSelectProduct }: ProductsProps) => {
  const { products } = useAppState();

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return Shield;
      case 'medium':
        return TrendingUp;
      case 'high':
        return AlertTriangle;
      default:
        return Shield;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'money-market':
        return 'Money Market';
      case 'fixed-income':
        return 'Fixed Income';
      case 'equity':
        return 'Equity';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <h1 className="text-2xl font-bold text-foreground">Investment Products</h1>
        <p className="text-muted-foreground mt-1">Choose the right fund for your goals</p>
      </motion.div>

      {/* Product Cards */}
      <div className="px-6 space-y-4">
        {products.map((product, index) => {
          const RiskIcon = getRiskIcon(product.riskLevel);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {getTypeLabel(product.type)}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{product.name}</h3>
                </div>
                <div className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${getRiskLevelBg(product.riskLevel)}`}>
                  <RiskIcon className={`w-3.5 h-3.5 ${getRiskLevelColor(product.riskLevel)}`} />
                  <span className={`text-xs font-medium capitalize ${getRiskLevelColor(product.riskLevel)}`}>
                    {product.riskLevel} risk
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Expected Return</p>
                  <p className="text-sm font-semibold text-success">
                    {product.expectedReturn.min}-{product.expectedReturn.max}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Min. Investment</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(product.minimumInvestment)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AUM</p>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCompactCurrency(product.aum)}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onSelectProduct(product)}
              >
                Learn more
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Products;
