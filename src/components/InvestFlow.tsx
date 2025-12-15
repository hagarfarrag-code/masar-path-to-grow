import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Minus, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvestmentProduct } from '@/types';
import { formatCurrency } from '@/lib/format';
import { useAppState } from '@/hooks/useAppState';
import SecuredFooter from './SecuredFooter';

interface InvestFlowProps {
  product: InvestmentProduct;
  onBack: () => void;
  onComplete: () => void;
}

const InvestFlow = ({ product, onBack, onComplete }: InvestFlowProps) => {
  const { user } = useAppState();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(product.minimumInvestment);

  const totalSteps = 3;

  const incrementAmount = () => {
    setAmount((prev) => prev + 500);
  };

  const decrementAmount = () => {
    if (amount > product.minimumInvestment) {
      setAmount((prev) => prev - 500);
    }
  };

  const presetAmounts = [1000, 2500, 5000, 10000];

  const handleConfirm = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <button
          onClick={step === 1 ? onBack : () => setStep(step - 1)}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Progress */}
        <div className="flex gap-1.5 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">How much would you like to invest?</h1>
          <p className="text-muted-foreground mb-8">
            Minimum investment: {formatCurrency(product.minimumInvestment)}
          </p>

          {/* Amount Selector */}
          <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={decrementAmount}
                disabled={amount <= product.minimumInvestment}
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center disabled:opacity-50 transition-all hover:bg-secondary/80 active:scale-95"
              >
                <Minus className="w-5 h-5 text-secondary-foreground" />
              </button>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{formatCurrency(amount)}</p>
              </div>
              <button
                onClick={incrementAmount}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all hover:bg-primary/90 active:scale-95"
              >
                <Plus className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Preset amounts */}
            <div className="flex flex-wrap gap-2 justify-center">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    amount === preset
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Investing in</p>
            <p className="font-semibold text-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Expected return: {product.expectedReturn.min}-{product.expectedReturn.max}% p.a.
            </p>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Review your investment</h1>
          <p className="text-muted-foreground mb-8">Please confirm the details below</p>

          <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Investment Amount</span>
              <span className="font-bold text-foreground">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium text-foreground text-right max-w-[60%]">{product.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="font-medium text-foreground capitalize">{product.riskLevel}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Management Fee</span>
              <span className="font-medium text-foreground">{product.fee}% p.a.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Expected Return</span>
              <span className="font-medium text-success">{product.expectedReturn.min}-{product.expectedReturn.max}%</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 mt-6 p-4 bg-accent/10 rounded-xl">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Past performance does not guarantee future results. All investments involve risk, 
              including the possible loss of principal. Please invest wisely.
            </p>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 flex flex-col items-center justify-center min-h-[60vh]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-6"
          >
            <Check className="w-12 h-12 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">Investment Successful!</h1>
          <p className="text-muted-foreground text-center mb-4">
            You have invested {formatCurrency(amount)} in {product.name}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Your investment will be reflected in your portfolio shortly.
          </p>
        </motion.div>
      )}

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button size="lg" className="w-full" onClick={handleConfirm}>
          {step === 1 && 'Continue'}
          {step === 2 && 'Confirm Investment'}
          {step === 3 && 'Back to Home'}
          <ArrowRight className="w-5 h-5" />
        </Button>
        <SecuredFooter />
      </div>
    </div>
  );
};

export default InvestFlow;
