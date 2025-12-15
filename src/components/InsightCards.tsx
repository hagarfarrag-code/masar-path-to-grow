import { CheckCircle, Lightbulb, TrendingUp, ChevronRight } from 'lucide-react';
import { InsightCard } from '@/types';

interface InsightCardsProps {
  insights: InsightCard[];
}

const InsightCards = ({ insights }: InsightCardsProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'check-circle':
        return CheckCircle;
      case 'lightbulb':
        return Lightbulb;
      case 'trending-up':
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-success/10 text-success';
      case 'education':
        return 'bg-primary/10 text-primary';
      case 'alert':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      {insights.map((insight) => {
        const Icon = getIcon(insight.icon);
        return (
          <button
            key={insight.id}
            className="w-full bg-card rounded-xl p-4 shadow-card flex items-start gap-3 text-left transition-all duration-200 hover:shadow-soft active:scale-[0.99]"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getTypeStyles(insight.type)}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm">{insight.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{insight.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        );
      })}
    </div>
  );
};

export default InsightCards;
