import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Headphones, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioDiscoveryProps {
  onBack: () => void;
  onComplete: (profileData: any) => void;
}

interface Question {
  id: string;
  section: 'financial' | 'risk' | 'account';
  type: 'multiple-choice' | 'input' | 'likert';
  title: string;
  subtitle?: string;
  options?: string[];
  inputType?: 'text' | 'number';
  placeholder?: string;
  currency?: boolean;
}

const questions: Question[] = [
  {
    id: 'investment-reason',
    section: 'financial',
    type: 'multiple-choice',
    title: 'Why are you investing?',
    options: [
      'For a rainy day',
      'To beat inflation',
      'To increase my wealth',
      'For my retirement',
      'For a future big spend'
    ]
  },
  {
    id: 'financial-assets',
    section: 'financial',
    type: 'input',
    title: "What's the total value of your financial assets?",
    subtitle: 'Approximate values are fine; please include cash savings, financial investments and defined contribution pensions',
    inputType: 'number',
    currency: true,
    placeholder: '0'
  },
  {
    id: 'monthly-savings',
    section: 'financial',
    type: 'input',
    title: 'How much can you typically save on a monthly basis?',
    subtitle: 'Approximate values are fine; please include the amount you would usually invest in your pension or ISA',
    inputType: 'number',
    currency: true,
    placeholder: '0'
  },
  {
    id: 'annual-income',
    section: 'financial',
    type: 'input',
    title: "What's your total annual pre-tax income?",
    subtitle: 'Approximate values are fine',
    inputType: 'number',
    currency: true,
    placeholder: '0'
  },
  {
    id: 'income-source',
    section: 'financial',
    type: 'multiple-choice',
    title: 'What is your main source of income?',
    options: [
      'Retirement',
      'Employment',
      'Financial investments or property',
      'Self-employment'
    ]
  },
  {
    id: 'risk-decline',
    section: 'risk',
    type: 'likert',
    title: 'When the value of my portfolio declines, I prefer to sell immediately to limit further losses.',
    options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree']
  },
  {
    id: 'risk-safe',
    section: 'risk',
    type: 'likert',
    title: 'I prefer to make safe investments, even if this could limit my returns.',
    options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree']
  },
  {
    id: 'risk-tolerance',
    section: 'risk',
    type: 'likert',
    title: "When deciding to invest my money, risk doesn't worry me. It's the only way to increase my chance of achieving greater returns.",
    options: ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree']
  },
  {
    id: 'portfolio-name',
    section: 'account',
    type: 'input',
    title: 'How would you like to name your portfolio?',
    subtitle: 'Give a name to your portfolio. You can change your portfolio\'s name anytime.',
    inputType: 'text',
    placeholder: 'My ISA portfolio'
  }
];

const PortfolioDiscovery = ({ onBack, onComplete }: PortfolioDiscoveryProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const isLastStep = currentStep === totalSteps - 1;

  // Calculate progress based on section
  const getProgressSteps = () => {
    const financialQuestions = questions.filter(q => q.section === 'financial').length;
    const riskQuestions = questions.filter(q => q.section === 'risk').length;
    
    if (currentStep < financialQuestions) {
      return { current: currentStep + 1, total: 5, section: 'Your financial situation' };
    } else if (currentStep < financialQuestions + riskQuestions) {
      return { current: currentStep - financialQuestions + 1, total: 5, section: 'Your risk appetite' };
    } else {
      return { current: 1, total: 1, section: 'Account details' };
    }
  };

  const progress = getProgressSteps();

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Calculate profile and show result
      calculateProfile();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateProfile = () => {
    // Simple profile calculation based on risk answers
    // This is a simplified calculation - in reality would be more complex
    setShowResult(true);
  };

  const handleComplete = () => {
    onComplete(answers);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <button onClick={onBack}>
            <Home className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Discover your profile</h1>
          <button>
            <Headphones className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Result */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Profile Chart */}
          <div className="w-48 h-48 rounded-full mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-pink-400 to-gray-700"></div>
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
              <div className="w-2 h-16 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your investor profile is: <span className="luxury-text">Driven</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed max-w-sm">
              <p>Focussed, alert, level-headed, these are the values that describe your approach to wealth.</p>
              <p>You're heading in a direction and have mapped out how to get there.</p>
              <p>You'll weigh up different elements of your investment whilst ensuring your money is well protected.</p>
              <p>If your financial situation changes, you can update your profile when needed.</p>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <Button variant="outline" className="w-full">
              Review your choices
            </Button>
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-white"
              onClick={handleComplete}
            >
              Confirm profile and continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <button onClick={handleBack}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Discover your profile</h1>
        <button>
          <Headphones className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <p className="text-sm text-muted-foreground mb-2">{progress.section}</p>
        <div className="flex gap-1">
          {Array.from({ length: progress.total }).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index < progress.current ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              {currentQuestion.title}
            </h2>
            
            {currentQuestion.subtitle && (
              <p className="text-sm text-muted-foreground mb-6">
                {currentQuestion.subtitle}
              </p>
            )}

            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                      answers[currentQuestion.id] === option
                        ? 'bg-primary/10 border-primary text-foreground'
                        : 'bg-card border-border text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        answers[currentQuestion.id] === option
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`}>
                        {answers[currentQuestion.id] === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Likert Scale */}
            {currentQuestion.type === 'likert' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                      answers[currentQuestion.id] === option
                        ? 'bg-primary/10 border-primary text-foreground'
                        : 'bg-card border-border text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        answers[currentQuestion.id] === option
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`}>
                        {answers[currentQuestion.id] === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            {currentQuestion.type === 'input' && (
              <div className="space-y-4">
                <div className="relative">
                  {currentQuestion.currency && (
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      EGP
                    </span>
                  )}
                  <input
                    type={currentQuestion.inputType}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className={`w-full p-4 bg-secondary border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                      currentQuestion.currency ? 'pl-16' : ''
                    }`}
                  />
                  {currentQuestion.id === 'portfolio-name' && answers[currentQuestion.id] && (
                    <button
                      onClick={() => handleAnswer('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      {(answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '') && (
        <div className="p-6 border-t border-border">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-primary/80 text-white"
            onClick={handleNext}
          >
            {isLastStep ? 'Complete Profile' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDiscovery;