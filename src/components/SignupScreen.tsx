import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SignupScreenProps {
  onBack: () => void;
  onContinue: (userData: { firstName: string; email: string }) => void;
}

const SignupScreen = ({ onBack, onContinue }: SignupScreenProps) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('Ahmed');
  const [email, setEmail] = useState('Ahmedemad@gmail.com');
  const [password, setPassword] = useState('P@ssw0rd');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Number and a special character', met: /(?=.*\d)(?=.*[!@#$%^&*])/.test(password) },
    { text: 'Upper and lower case letter', met: /(?=.*[a-z])(?=.*[A-Z])/.test(password) },
  ];

  const isStep1Valid = firstName.trim() && email.trim() && email.includes('@');
  const isStep2Valid = passwordRequirements.every(req => req.met) && acceptTerms;

  const handleStep1Continue = () => {
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleStep2Continue = () => {
    if (isStep2Valid) {
      onContinue({ firstName, email });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <button onClick={step === 1 ? onBack : () => setStep(1)} className="p-2">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Sign up</h1>
        <div className="flex items-center gap-2">
          <img src="/api/placeholder/24/16" alt="Egypt Flag" className="w-6 h-4" />
          <span className="text-sm text-muted-foreground">🇪🇬</span>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 border-b border-primary/20">
        <p className="text-center text-sm font-medium text-foreground">
          We manage 2.1B EGP for over 47,000 investors
        </p>
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Sign up to MASAR</h2>
            <p className="text-muted-foreground">
              Explore our premium investment products with a commitment-free account
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-4 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Already have an account?{' '}
              <button className="luxury-text font-semibold hover:underline">
                Sign in here
              </button>
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Hello, {firstName}!</h2>
            <p className="text-muted-foreground">Please add a password</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Create a secure password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${req.met ? 'text-success' : 'text-muted-foreground'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary bg-secondary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I accept{' '}
                  <button className="luxury-text font-semibold hover:underline">terms</button>,{' '}
                  <button className="luxury-text font-semibold hover:underline">privacy policy</button>{' '}
                  and to receive marketing communications from MASAR.
                </span>
              </label>
              
              <p className="text-xs text-muted-foreground">
                Not all consents are mandatory.{' '}
                <button className="luxury-text hover:underline">
                  Manage them one by one
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <div className="p-6 border-t border-border">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold"
          onClick={step === 1 ? handleStep1Continue : handleStep2Continue}
          disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SignupScreen;