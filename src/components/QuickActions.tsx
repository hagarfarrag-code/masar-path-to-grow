import { Plus, ArrowDownLeft, TrendingUp, BarChart3, Bot } from 'lucide-react';
import AIAssistant from './AIAssistant';

interface QuickActionsProps {
  onNavigate?: (tab: string) => void;
}

const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  const actions = [
    { icon: Plus, label: 'Invest', color: 'bg-primary text-primary-foreground', action: () => onNavigate?.('products') },
    { icon: ArrowDownLeft, label: 'Add Funds', color: 'bg-accent text-accent-foreground', action: () => {} },
    { icon: TrendingUp, label: 'Insights', color: 'bg-secondary text-secondary-foreground', action: () => onNavigate?.('insights') },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.action}
          className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color} shadow-soft`}>
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-foreground">{action.label}</span>
        </button>
      ))}
      
      {/* AI Assistant */}
      <div className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200">
        <div className="relative">
          <AIAssistant onNavigate={onNavigate} />
        </div>
        <span className="text-xs font-medium text-foreground">AI Advisor</span>
      </div>
    </div>
  );
};

export default QuickActions;
