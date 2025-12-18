import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ranaImage from '@/assets/rana.png';
import mohamedImage from '@/assets/mohamed.png';
import ingyImage from '@/assets/ingy.png';

interface AskUsProps {
  onBack?: () => void;
}

const AskUs = ({ onBack }: AskUsProps) => {
  const advisors = [
    {
      id: 'rana',
      name: 'Rana',
      title: 'Senior Investment Advisor',
      image: ranaImage,
      experience: '10+ years of banking experience delivering tailored wealth management and investment solutions to individual and high net-worth clients'
    },
    {
      id: 'mohamed',
      name: 'Mohamed',
      title: 'Wealth Management Advisor',
      image: mohamedImage,
      experience: '15+ years at experience serving VIP clients, specializing in portfolio construction, long-term wealth growth and personalized investment strategies'
    },
    {
      id: 'ingy',
      name: 'Ingy',
      title: 'Principal Wealth Advisor',
      image: ingyImage,
      experience: '20+ years of leadership experience, including serving as Deputy General Manager for International Banking & Wealth Management at Banque Misr'
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email us',
      subtitle: 'hello@masar.com',
      action: () => window.open('mailto:hello@masar.com')
    },
    {
      icon: Phone,
      title: 'Call us',
      subtitle: 'Available from Monday to Friday (9:00 - 18:00)',
      action: () => {}
    },
    {
      icon: MessageCircle,
      title: 'Chat with us',
      subtitle: '',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-6 pb-4"
      >
        {onBack && (
          <button onClick={onBack} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Ask us</h1>
      </motion.div>

      {/* Advisors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 mb-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-muted">
                <img 
                  src={advisor.image} 
                  alt={advisor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{advisor.name}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{advisor.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Experience - Simplified */}
        <div className="space-y-4">
          {advisors.map((advisor, index) => (
            <motion.div
              key={`detail-${advisor.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="luxury-card rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0">
                  <img 
                    src={advisor.image} 
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{advisor.name}</h4>
                  <p className="text-sm text-primary mb-2">{advisor.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {advisor.experience}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 mb-8"
      >
        <div className="space-y-4">
          {contactOptions.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={option.action}
              className="w-full luxury-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-luxury transition-all duration-300 active:scale-[0.99]"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                {option.subtitle && (
                  <p className="text-sm text-muted-foreground">{option.subtitle}</p>
                )}
              </div>
              <div className="w-6 h-6 text-muted-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* FAQs Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-6"
      >
        <button className="w-full flex items-center justify-between p-4 text-left">
          <span className="text-muted-foreground">Questions? Read all our FAQs</span>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.div>
    </div>
  );
};

export default AskUs;