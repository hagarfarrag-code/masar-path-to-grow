import { motion } from 'framer-motion';
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, Users, Percent, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvestmentProduct } from '@/types';
import { formatCurrency, formatCompactCurrency, getRiskLevelColor, getRiskLevelBg } from '@/lib/format';
import SecuredFooter from './SecuredFooter';

interface ProductDetailProps {
  product: InvestmentProduct;
  onBack: () => void;
  onInvest: () => void;
}

const ProductDetail = ({ product, onBack, onInvest }: ProductDetailProps) => {
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

  const RiskIcon = getRiskIcon(product.riskLevel);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to products</span>
        </button>
      </motion.div>

      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6"
      >
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-3 ${getRiskLevelBg(product.riskLevel)}`}>
          <RiskIcon className={`w-4 h-4 ${getRiskLevelColor(product.riskLevel)}`} />
          <span className={`text-sm font-medium capitalize ${getRiskLevelColor(product.riskLevel)}`}>
            {product.riskLevel} risk
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
        <p className="text-muted-foreground">{product.description}</p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-6"
      >
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expected Return</p>
                <p className="text-lg font-bold text-success">
                  {product.expectedReturn.min}-{product.expectedReturn.max}%
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Min. Investment</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(product.minimumInvestment)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Percent className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Management Fee</p>
                <p className="text-lg font-bold text-foreground">{product.fee}% p.a.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assets Under Mgmt</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCompactCurrency(product.aum)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suitable For */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mt-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-3">Who is this for?</h3>
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <p className="text-muted-foreground">{product.suitableFor}</p>
        </div>
      </motion.div>

      {/* Fee Disclosure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mt-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-3">Fee Transparency</h3>
        <div className="bg-secondary/50 rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">
            We charge a simple {product.fee}% annual management fee, calculated daily on your investment value. 
            No hidden charges, no entry or exit fees. Your returns are shown after fees are deducted.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-6 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <Button size="lg" className="w-full" onClick={onInvest}>
          Invest Now
          <ArrowRight className="w-5 h-5" />
        </Button>
        <SecuredFooter />
      </div>
    </div>
  );
};

export default ProductDetail;
