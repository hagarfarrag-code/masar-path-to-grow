import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/useAppState';
import { formatCurrency, formatPercent } from '@/lib/format';
import { useState } from 'react';
import { performanceData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import SecuredFooter from './SecuredFooter';

const Portfolio = () => {
  const { user, assets } = useAppState();
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '1Y'>('1Y');

  if (!user) return null;

  const isPositive = user.totalGain >= 0;
  const gainPercent = ((user.totalGain / user.totalInvested) * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Elite Portfolio</h1>
        <p className="text-muted-foreground mt-1">Track your investment performance</p>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="bg-card rounded-2xl p-6 shadow-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <h2 className="text-3xl font-bold text-foreground">
                {formatCurrency(user.portfolioValue)}
              </h2>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
              isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-semibold">{formatPercent(gainPercent)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Invested</p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(user.totalInvested)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Gain</p>
              <p className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{formatCurrency(user.totalGain)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-6 mb-4"
      >
        <div className="flex gap-2">
          {(['1M', '3M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <div className="bg-card rounded-2xl p-4 shadow-card h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 45%, 35%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(160, 45%, 35%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Value']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(160, 45%, 35%)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Asset Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Asset Breakdown</h3>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${asset.color}20` }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.allocation}% of portfolio</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-foreground">{formatCurrency(asset.value)}</p>
                <p className="text-sm font-semibold text-success">+{asset.returnRate}%</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Portfolio;
