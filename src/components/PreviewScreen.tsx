import { motion } from 'framer-motion';
import { Shield, BarChart3, Coins } from 'lucide-react';
import SecuredFooter from './SecuredFooter';
import { Button } from '@/components/ui/button';
import masarLogo from '@/assets/masar-logo.png';

interface PreviewScreenProps {
  onStart: () => void;
}

const PreviewScreen = ({ onStart }: PreviewScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 bg-background rounded-2xl p-4"
        >
          <img 
            src={masarLogo} 
            alt="MASAR - Your path to financial growth" 
            className="w-48 h-auto"
          />
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-muted-foreground text-center mb-12"
        >
          Your path to financial growth
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 max-w-sm"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Start with 500 EGP</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Secure & Regulated</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card">
            <BarChart3 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Track Performance</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="px-6 pb-12"
      >
        {/* CTA Button */}
        <Button size="lg" className="w-full mb-4" onClick={onStart}>
          Get started
        </Button>

        {/* Sign in link */}
        <p className="text-center text-sm mb-4">
          <span className="text-muted-foreground">Already have an account? </span>
          <button onClick={onStart} className="text-primary hover:underline font-medium">
            Sign in
          </button>
        </p>
        <SecuredFooter />
      </motion.div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default PreviewScreen;
