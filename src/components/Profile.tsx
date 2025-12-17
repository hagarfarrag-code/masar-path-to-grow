import { motion } from 'framer-motion';
import { User, Shield, FileText, HelpCircle, ChevronRight, LogOut, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/useAppState';
import SecuredFooter from './SecuredFooter';

interface ProfileProps {
  onLogout: () => void;
}

const Profile = ({ onLogout }: ProfileProps) => {
  const { user } = useAppState();

  if (!user) return null;

  const getRiskProfileLabel = (profile: string) => {
    switch (profile) {
      case 'conservative':
        return 'Conservative';
      case 'balanced':
        return 'Balanced';
      case 'growth':
        return 'Growth';
      default:
        return profile;
    }
  };

  const getRiskProfileDescription = (profile: string) => {
    switch (profile) {
      case 'conservative':
        return 'You prefer capital preservation with stable returns';
      case 'balanced':
        return 'You seek moderate growth with manageable risk';
      case 'growth':
        return 'You aim for higher returns and accept market volatility';
      default:
        return '';
    }
  };

  const menuItems = [
    { icon: User, label: 'Personal Details', description: 'Update your information' },
    { icon: Shield, label: 'Risk Profile', description: getRiskProfileLabel(user.riskProfile) },
    { icon: FileText, label: 'Documents & Statements', description: 'View your reports' },
    { icon: Bell, label: 'Notifications', description: 'Manage your alerts' },
    { icon: Lock, label: 'Security', description: 'Password & authentication' },
    { icon: HelpCircle, label: 'Help & Support', description: 'FAQs and contact us' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/15 border-2 border-primary/30 flex items-center justify-center shadow-luxury">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Risk Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Risk Profile</p>
              <p className="font-semibold text-foreground">{getRiskProfileLabel(user.riskProfile)}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{getRiskProfileDescription(user.riskProfile)}</p>
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6"
      >
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-secondary/50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mt-6"
      >
        <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/5" onClick={onLogout}>
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </motion.div>

      {/* App Version */}
      <div className="px-6 mt-8 text-center">
        <p className="text-xs text-muted-foreground">MASAR v1.0.0</p>
        <p className="text-xs text-muted-foreground mt-1">Your path to financial growth</p>
      </div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Profile;
