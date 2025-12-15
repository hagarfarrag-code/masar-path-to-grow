import { Asset } from '@/types';
import { formatCurrency } from '@/lib/format';

interface PortfolioChartProps {
  assets: Asset[];
}

const PortfolioChart = ({ assets }: PortfolioChartProps) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Calculate cumulative percentages for positioning
  let cumulativePercent = 0;
  const segments = assets.map((asset) => {
    const startPercent = cumulativePercent;
    cumulativePercent += asset.allocation;
    return {
      ...asset,
      startPercent,
      endPercent: cumulativePercent,
    };
  });

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      {/* Simple bar chart */}
      <div className="h-4 rounded-full overflow-hidden flex mb-6">
        {segments.map((segment, index) => (
          <div
            key={segment.id}
            className="h-full transition-all duration-500"
            style={{
              width: `${segment.allocation}%`,
              backgroundColor: segment.color,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: asset.color }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">{asset.name}</p>
                <p className="text-xs text-muted-foreground">{asset.allocation}% allocation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{formatCurrency(asset.value)}</p>
              <p className="text-xs text-success">+{asset.returnRate}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioChart;
