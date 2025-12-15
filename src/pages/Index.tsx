import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '@/hooks/useAppState';
import PreviewScreen from '@/components/PreviewScreen';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import Portfolio from '@/components/Portfolio';
import Products from '@/components/Products';
import ProductDetail from '@/components/ProductDetail';
import Profile from '@/components/Profile';
import InvestFlow from '@/components/InvestFlow';
import PublicInsights from '@/components/PublicInsights';
import BottomNav from '@/components/BottomNav';
import { InvestmentProduct } from '@/types';

const Index = () => {
  const { isOnboarded, resetOnboarding } = useAppState();
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<InvestmentProduct | null>(null);
  const [isInvesting, setIsInvesting] = useState(false);

  const handleStartDemo = () => {
    setHasStarted(true);
  };

  const handleOnboardingComplete = () => {
    // Onboarding is now complete, state is handled in useAppState
  };

  const handleLogout = () => {
    resetOnboarding();
    setHasStarted(false);
    setActiveTab('home');
  };

  const handleSelectProduct = (product: InvestmentProduct) => {
    setSelectedProduct(product);
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  const handleStartInvest = () => {
    setIsInvesting(true);
  };

  const handleInvestComplete = () => {
    setIsInvesting(false);
    setSelectedProduct(null);
    setActiveTab('home');
  };

  const handleBackFromInvest = () => {
    setIsInvesting(false);
  };

  // Show Preview Screen first
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto relative">
        <PreviewScreen onStart={handleStartDemo} />
      </div>
    );
  }

  // Show Onboarding if not completed
  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto relative">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  const renderContent = () => {
    // If investing flow is active
    if (isInvesting && selectedProduct) {
      return (
        <InvestFlow
          product={selectedProduct}
          onBack={handleBackFromInvest}
          onComplete={handleInvestComplete}
        />
      );
    }

    // If a product is selected, show product detail
    if (selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onBack={handleBackFromProduct}
          onInvest={handleStartInvest}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'portfolio':
        return <Portfolio />;
      case 'insights':
        return <PublicInsights />;
      case 'products':
        return <Products onSelectProduct={handleSelectProduct} />;
      case 'profile':
        return <Profile onLogout={handleLogout} />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  const showBottomNav = !selectedProduct && !isInvesting;

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={isInvesting ? 'investing' : selectedProduct ? `product-${selectedProduct.id}` : activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

export default Index;
