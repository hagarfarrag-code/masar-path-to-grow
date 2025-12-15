import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { onboardingQuestions } from '@/data/mockData';
import { useAppState } from '@/hooks/useAppState';
import SecuredFooter from './SecuredFooter';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const { addRiskAnswer, calculateRiskProfile, initializeUser } = useAppState();

  const totalSteps = onboardingQuestions.length + 1; // +1 for welcome screen

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else if (step <= onboardingQuestions.length) {
      const currentQuestion = onboardingQuestions[step - 1];
      const answer = selectedAnswers[step - 1];
      if (answer) {
        addRiskAnswer(answer);
        if (step === onboardingQuestions.length) {
          // Calculate risk profile and complete onboarding
          const profile = calculateRiskProfile();
          initializeUser(profile);
          onComplete();
        } else {
          setStep(step + 1);
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[step - 1] = answer;
    setSelectedAnswers(newAnswers);
  };

  const currentQuestion = step > 0 ? onboardingQuestions[step - 1] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col justify-center px-6 py-12"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-3xl font-bold text-center text-foreground">
                  Welcome to MASAR
                </h1>
                <p className="text-lg text-muted-foreground text-center">
                  Your path to financial growth
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Start small, grow big</h3>
                    <p className="text-sm text-muted-foreground">Begin investing with as little as 500 EGP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Understand your investments</h3>
                    <p className="text-sm text-muted-foreground">Clear explanations, no confusing jargon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-6 py-8"
          >
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">Question {step} of {onboardingQuestions.length}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {currentQuestion?.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion?.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectAnswer(option.value)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    selectedAnswers[step - 1] === option.value
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card shadow-card hover:shadow-soft'
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  {option.description && (
                    <div className={`text-sm mt-1 ${
                      selectedAnswers[step - 1] === option.value
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    }`}>
                      {option.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="px-6 pb-8 pt-4">
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" size="lg" onClick={handleBack} className="flex-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleNext}
            disabled={step > 0 && !selectedAnswers[step - 1]}
            className="flex-1"
          >
            {step === 0 ? "Let's get started" : step === onboardingQuestions.length ? 'Complete' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <SecuredFooter />
      </div>
    </div>
  );
};

export default Onboarding;
