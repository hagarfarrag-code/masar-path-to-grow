import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, TrendingUp, Shield, AlertTriangle, Lightbulb, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/useAppState';
import { formatCurrency } from '@/lib/format';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionType?: 'invest' | 'rebalance' | 'learn' | 'none';
}

interface AIAssistantProps {
  onNavigate?: (tab: string) => void;
  onSelectProduct?: (productId: string) => void;
}

const AIAssistant = ({ onNavigate, onSelectProduct }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, products } = useAppState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: `Hello ${user?.name || 'there'}! 👋 I'm your AI investment advisor. I can help you make smarter investment decisions based on your risk profile and market conditions. What would you like to know?`,
        timestamp: new Date(),
        suggestions: [
          'Should I invest more now?',
          'What\'s the best fund for me?',
          'How to diversify my portfolio?',
          'Market outlook for Egypt'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, user?.name]);

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Investment recommendations based on user input
    if (lowerMessage.includes('invest') || lowerMessage.includes('should i')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Based on your ${user?.riskProfile || 'balanced'} risk profile and current market conditions, I recommend considering the Capital Shield Fund. With the EGX30 reaching new highs and CBE maintaining stable rates, it's a good time for Egyptian investors. Your current portfolio value of ${formatCurrency(user?.portfolioValue || 0)} shows you're on the right track! 📈`,
        timestamp: new Date(),
        suggestions: ['Tell me more about Capital Shield', 'Show me all funds', 'What about timing?'],
        actionType: 'invest'
      };
    }
    
    if (lowerMessage.includes('best fund') || lowerMessage.includes('recommend')) {
      const riskProfile = user?.riskProfile || 'balanced';
      let recommendation = '';
      
      if (riskProfile === 'conservative') {
        recommendation = 'For your conservative profile, I recommend the **Capital Shield Fund** (22.8% returns, low risk). It\'s perfect for capital preservation while beating inflation.';
      } else if (riskProfile === 'growth') {
        recommendation = 'Given your growth appetite, consider the **Egypt Growth Equity Fund** (10-25% potential returns). With MASAR reaching 30,000 investors, Egyptian equities look promising!';
      } else {
        recommendation = 'For balanced investors like you, the **Steady Growth Bond Fund** (16-20% returns) offers great stability with decent growth potential.';
      }
      
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: recommendation,
        timestamp: new Date(),
        suggestions: ['Compare all funds', 'Start investing', 'Risk assessment'],
        actionType: 'invest'
      };
    }
    
    if (lowerMessage.includes('diversify') || lowerMessage.includes('portfolio')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Great question! For optimal diversification in Egypt, I suggest: 30% Money Market (stability), 40% Fixed Income (steady returns), 30% Equity (growth). Your current allocation looks good, but consider rebalancing if any asset exceeds 50% of your portfolio. 🎯`,
        timestamp: new Date(),
        suggestions: ['View my portfolio', 'Rebalancing tips', 'Risk management'],
        actionType: 'rebalance'
      };
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('egypt') || lowerMessage.includes('outlook')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Egyptian markets are showing strong momentum! 🇪🇬 Key highlights: MASAR now has 30,000+ investors, Suez Canal revenues at $7.2B, and CBE maintaining stable policy. The New Administrative Capital development is boosting construction sectors. Perfect time for long-term Egyptian investors! 🚀`,
        timestamp: new Date(),
        suggestions: ['Investment opportunities', 'Sector analysis', 'Timing strategy'],
        actionType: 'learn'
      };
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Risk management is crucial! 🛡️ Based on your profile, never invest more than you can afford to lose. For Egyptian investors, I recommend: 1) Start with Money Market funds, 2) Gradually add Fixed Income, 3) Consider Equity for long-term goals. Always maintain 3-6 months emergency fund separately!`,
        timestamp: new Date(),
        suggestions: ['Emergency fund tips', 'Risk assessment', 'Safe investments'],
        actionType: 'learn'
      };
    }
    
    if (lowerMessage.includes('timing') || lowerMessage.includes('when')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Timing the market is tricky, but current conditions favor Egyptian investors! 📅 With stable CBE policy and EGX momentum, consider dollar-cost averaging: invest fixed amounts monthly rather than lump sums. This reduces timing risk and builds discipline. Start with 500 EGP monthly!`,
        timestamp: new Date(),
        suggestions: ['Set up monthly investing', 'Market timing tips', 'Investment schedule'],
        actionType: 'invest'
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `I understand you're asking about "${userMessage}". As your AI advisor, I'm here to help with investment decisions, fund recommendations, portfolio analysis, and Egyptian market insights. Could you be more specific about what you'd like to know? 🤔`,
      timestamp: new Date(),
      suggestions: [
        'Investment recommendations',
        'Portfolio review',
        'Market analysis',
        'Risk management'
      ],
      actionType: 'none'
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case 'invest':
        onNavigate?.('products');
        setIsOpen(false);
        break;
      case 'rebalance':
        onNavigate?.('portfolio');
        setIsOpen(false);
        break;
      case 'learn':
        onNavigate?.('insights');
        setIsOpen(false);
        break;
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white w-12 h-12 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-200 active:scale-95 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="w-5 h-5" />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="bg-card rounded-t-3xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Investment Advisor</h3>
                    <p className="text-xs text-muted-foreground">
                      {isTyping ? 'Thinking...' : 'Online'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Action button for AI messages */}
                      {message.type === 'ai' && message.actionType && message.actionType !== 'none' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 w-full"
                          onClick={() => handleActionClick(message.actionType!)}
                        >
                          {message.actionType === 'invest' && <TrendingUp className="w-4 h-4 mr-1" />}
                          {message.actionType === 'rebalance' && <Shield className="w-4 h-4 mr-1" />}
                          {message.actionType === 'learn' && <Lightbulb className="w-4 h-4 mr-1" />}
                          {message.actionType === 'invest' && 'Start Investing'}
                          {message.actionType === 'rebalance' && 'View Portfolio'}
                          {message.actionType === 'learn' && 'Learn More'}
                        </Button>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left text-xs p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about investments, funds, or market insights..."
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Quick suggestions */}
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {['Best fund for me?', 'Market outlook', 'Risk tips', 'When to invest?'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs whitespace-nowrap hover:bg-secondary/80 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;