import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Eye, ThumbsUp, MessageCircle, Share, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatCompactCurrency } from '@/lib/format';
import { useState } from 'react';
import SecuredFooter from './SecuredFooter';

interface InsightPost {
  id: string;
  type: 'market_update' | 'fund_performance' | 'investor_milestone' | 'economic_news';
  title: string;
  content: string;
  fundName?: string;
  performance?: number;
  timeframe: string;
  investorCount: {
    week: number;
    month: number;
    year: number;
  };
  engagement: {
    views: number;
    likes: number;
    comments: number;
  };
  timestamp: string;
  isHot?: boolean;
}

const mockInsightPosts: InsightPost[] = [
  {
    id: '1',
    type: 'fund_performance',
    title: 'Capital Shield Fund Reaches New Heights! 🚀',
    content: 'Our Money Market Fund has delivered exceptional returns of 22.8% this quarter, beating inflation by 12.3%. With the CBE\'s recent policy, Egyptian savers are moving from traditional deposits to smart investing.',
    fundName: 'Capital Shield Fund',
    performance: 22.8,
    timeframe: '2 hours ago',
    investorCount: { week: 1247, month: 4832, year: 18650 },
    engagement: { views: 15420, likes: 892, comments: 156 },
    timestamp: '2 hours ago',
    isHot: true,
  },
  {
    id: '2',
    type: 'investor_milestone',
    title: '10,000+ Egyptians Joined This Month! 🎉',
    content: 'We\'ve reached an incredible milestone with over 10,000 new Egyptian investors joining MASAR this month. The future of investing in Egypt is bright!',
    timeframe: '5 hours ago',
    investorCount: { week: 2156, month: 10247, year: 45890 },
    engagement: { views: 28750, likes: 1456, comments: 289 },
    timestamp: '5 hours ago',
    isHot: true,
  },
  {
    id: '3',
    type: 'market_update',
    title: 'MASAR Reaches 30,000 Investors Milestone! 📈',
    content: 'We\'ve officially welcomed our 30,000th investor to the MASAR community! This incredible growth shows Egyptian trust in our platform. CIB, Vodafone Egypt, and EGAS continue to drive strong returns in our Egypt Growth Fund.',
    fundName: 'Egypt Growth Equity Fund',
    performance: 4.2,
    timeframe: '1 day ago',
    investorCount: { week: 856, month: 3421, year: 12890 },
    engagement: { views: 12340, likes: 567, comments: 89 },
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'economic_news',
    title: 'CBE Holds Rates at 19.25% - Stability Wins 🏛️',
    content: 'The Central Bank of Egypt maintained the overnight deposit rate at 19.25% and lending rate at 20.25%. This signals confidence in Egypt\'s economic trajectory and provides stability for our Fixed Income strategies.',
    fundName: 'Steady Growth Bond Fund',
    timeframe: '1 day ago',
    investorCount: { week: 634, month: 2890, year: 9876 },
    engagement: { views: 9876, likes: 423, comments: 67 },
    timestamp: '1 day ago',
  },
  {
    id: '5',
    type: 'fund_performance',
    title: 'Regional Fund Expands to Saudi Market',
    content: 'Our Regional Opportunities Fund now includes top Saudi Arabian companies, offering Egyptian investors exposure to the Kingdom\'s Vision 2030 growth story.',
    fundName: 'Regional Opportunities Fund',
    performance: 15.6,
    timeframe: '2 days ago',
    investorCount: { week: 423, month: 1567, year: 5432 },
    engagement: { views: 7654, likes: 334, comments: 45 },
    timestamp: '2 days ago',
  },
  {
    id: '6',
    type: 'investor_milestone',
    title: 'Young Egyptians Leading Investment Revolution 🇪🇬',
    content: '68% of our new investors this month are under 35 years old. From Cairo to Alexandria, Egyptian millennials and Gen Z are choosing MASAR over traditional savings accounts.',
    timeframe: '3 days ago',
    investorCount: { week: 1890, month: 6754, year: 23456 },
    engagement: { views: 18900, likes: 1123, comments: 234 },
    timestamp: '3 days ago',
  },
  {
    id: '7',
    type: 'market_update',
    title: 'New Administrative Capital Boosts Real Estate Funds',
    content: 'The ongoing development of Egypt\'s New Administrative Capital has created opportunities in our Regional Fund\'s real estate exposure. Construction and materials sectors show strong momentum.',
    timeframe: '4 days ago',
    investorCount: { week: 567, month: 2134, year: 8901 },
    engagement: { views: 11200, likes: 445, comments: 78 },
    timestamp: '4 days ago',
  },
  {
    id: '8',
    type: 'fund_performance',
    title: 'Suez Canal Revenue Impact on Egyptian Funds 🚢',
    content: 'Record Suez Canal revenues of $7.2B this year are boosting Egyptian economic confidence. Our Egypt Growth Fund benefits from increased logistics and shipping sector performance.',
    fundName: 'Egypt Growth Equity Fund',
    performance: 8.7,
    timeframe: '5 days ago',
    investorCount: { week: 723, month: 2987, year: 11456 },
    engagement: { views: 13450, likes: 678, comments: 123 },
    timestamp: '5 days ago',
  },
];

const PublicInsights = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'fund_performance':
        return TrendingUp;
      case 'investor_milestone':
        return Users;
      case 'market_update':
        return ArrowUpRight;
      case 'economic_news':
        return Calendar;
      default:
        return TrendingUp;
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'fund_performance':
        return 'bg-success/10 text-success';
      case 'investor_milestone':
        return 'bg-primary/10 text-primary';
      case 'market_update':
        return 'bg-accent/10 text-accent';
      case 'economic_news':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4 bg-card border-b border-border"
      >
        <h1 className="text-2xl font-bold text-foreground">Public Insights</h1>
        <p className="text-muted-foreground mt-1">Investment trends and community updates</p>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2 mt-4">
          {(['week', 'month', 'year'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                selectedTimeframe === timeframe
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="px-6 pb-4"
      >
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">47,892</p>
              <p className="text-xs text-muted-foreground">Active Investors</p>
            </div>
            <div>
              <p className="text-lg font-bold text-success">+18.4%</p>
              <p className="text-xs text-muted-foreground">Avg. Returns</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">2.1B EGP</p>
              <p className="text-xs text-muted-foreground">Assets Under Mgmt</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 py-4"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">🔥 Trending in Egypt</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['#EGX30Rally', '#CBEPolicy', '#YoungInvestors', '#SuezCanal', '#NewCapital', '#InflationHedge'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium whitespace-nowrap hover:bg-primary/20 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Insights Feed */}
      <div className="px-6 space-y-4">
        {mockInsightPosts.map((post, index) => {
          const PostIcon = getPostIcon(post.type);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 shadow-card relative overflow-hidden"
            >
              {/* Hot Badge */}
              {post.isHot && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  🔥
                </div>
              )}

              {/* Post Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPostColor(post.type)}`}>
                  <PostIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.content}</p>

              {/* Performance Badge */}
              {post.performance && (
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-success/10 text-success rounded-lg mb-4">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+{post.performance}%</span>
                </div>
              )}

              {/* Investor Stats */}
              <div className="bg-secondary/30 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">New Investors</span>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{post.investorCount.week.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{post.investorCount.month.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-accent">{post.investorCount.year.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">This Year</p>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-muted-foreground text-sm mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.engagement.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.engagement.comments}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </Button>
                {post.fundName && (
                  <Button size="sm" className="flex-1">
                    <TrendingUp className="w-4 h-4" />
                    Invest Now
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="px-6 pb-4">
        <Button variant="outline" className="w-full">
          Load More Insights
        </Button>
      </div>

      <div className="px-6 pb-4">
        <SecuredFooter />
      </div>
    </div>
  );
};

export default PublicInsights;