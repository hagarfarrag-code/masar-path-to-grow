import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Lock, Headphones } from 'lucide-react';
import SecuredFooter from './SecuredFooter';

interface WealthTiersProps {
  onBack: () => void;
}

const WealthTiers = ({ onBack }: WealthTiersProps) => {
  const [currentTier, setCurrentTier] = useState(0);

  const wealthTiers = [
    {
      id: 'asas',
      nameEn: 'Asas Plan',
      nameAr: 'أساس',
      level: 'Foundation',
      range: 'Up to 250,000 EGP invested',
      icon: '⭕',
      benefits: [
        {
          title: 'Guided investment advice',
          description: 'Aligned to your financial goals & risk level',
          available: true,
        },
        {
          title: 'Local client support',
          description: 'Responsive, in-country account assistance',
          available: true,
        },
        {
          title: 'Digital portfolio monitoring',
          description: 'Track your investments & performance via the app',
          available: true,
        },
        {
          title: 'Access to dedicated wealth advisor',
          description: 'Available in higher tiers',
          available: false,
        },
      ],
    },
    {
      id: 'tamayoz',
      nameEn: 'Tamayoz',
      nameAr: 'مميز',
      level: 'Premium',
      range: 'From 250,000 to 2,000,000 EGP invested',
      icon: '💎',
      benefits: [
        {
          title: 'Guided investment advice',
          description: 'Portfolios aligned to your goals, risk profile, and investment horizon',
          available: true,
        },
        {
          title: 'Local client support',
          description: 'Priority access to in-country support for your account needs',
          available: true,
        },
        {
          title: 'Access to investment specialists',
          description: 'Expert guidance to support key investment decisions',
          available: true,
        },
        {
          title: 'Quarterly portfolio review',
          description: 'A structured review of your portfolio performance and positioning',
          available: true,
          isNew: true,
        },
        {
          title: 'Dedicated Wealth Manager',
          description: 'Available in the Private tier',
          available: false,
        },
      ],
    },
    {
      id: 'nokhba',
      nameEn: 'Nokhba',
      nameAr: 'نخبة',
      level: 'Private',
      range: 'Above 2,000,000 EGP invested',
      icon: '✨',
      benefits: [
        {
          title: 'Personalized investment advice',
          description: 'Tailored portfolio strategy aligned to your long-term objectives and preferences',
          available: true,
        },
        {
          title: 'Dedicated Wealth Manager',
          description: 'A single point of contact providing ongoing, tailored guidance',
          available: true,
        },
        {
          title: 'Priority client support',
          description: 'Fast-track support for all account and service needs',
          available: true,
        },
        {
          title: 'Quarterly portfolio review & strategy check-in',
          description: 'In-depth reviews to assess performance, risk, and positioning',
          available: true,
        },
        {
          title: 'One complimentary advisory session per year',
          description: 'A dedicated session to support complex financial or investment decisions',
          available: true,
        },
      ],
    },
  ];

  const currentTierData = wealthTiers[currentTier];

  const nextTier = () => {
    setCurrentTier((prev) => (prev + 1) % wealthTiers.length);
  };

  const prevTier = () => {
    setCurrentTier((prev) => (prev - 1 + wealthTiers.length) % wealthTiers.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Wealth tiers</h1>
        <button className="p-2">
          <Headphones className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Tier Cards Carousel */}
      <div className="px-6 py-6">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTier}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="luxury-card rounded-2xl p-6 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{currentTierData.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold luxury-text">
                        {currentTierData.nameEn} {currentTierData.nameAr}
                      </h2>
                      <p className="text-lg font-semibold text-foreground">{currentTierData.level}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{currentTierData.range}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {wealthTiers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTier(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTier ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-6 pb-6">
        <h3 className="text-xl font-bold text-foreground mb-6">
          Benefits included in {currentTierData.nameEn}
        </h3>

        <div className="space-y-4">
          {currentTierData.benefits.map((benefit, index) => (
            <motion.div
              key={`${currentTier}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`luxury-card rounded-xl p-4 flex items-start gap-4 ${
                !benefit.available ? 'opacity-60' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                benefit.available 
                  ? 'bg-gradient-to-r from-primary to-primary/80' 
                  : 'bg-muted-foreground/20'
              }`}>
                {benefit.available ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                  {benefit.isNew && (
                    <span className="bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {wealthTiers.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentTier ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Swipe Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevTier}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            disabled={currentTier === 0}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextTier}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            disabled={currentTier === wealthTiers.length - 1}
          >
            <ArrowLeft className="w-5 h-5 text-foreground rotate-180" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default WealthTiers;