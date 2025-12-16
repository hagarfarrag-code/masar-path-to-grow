# MASAR - Investment App Documentation

## Project Overview

**MASAR** is a modern, mobile-first investment application designed specifically for Egyptian investors. The name "MASAR" means "path" in Arabic, representing the user's journey to financial growth. This is a React-based web application built as a clickable prototype that demonstrates a comprehensive investment platform.

### Key Features
- **Onboarding & Risk Assessment**: Personalized investment recommendations based on user risk profile
- **Portfolio Management**: Real-time portfolio tracking with performance analytics
- **Investment Products**: Browse and invest in various Egyptian investment funds
- **User Dashboard**: Comprehensive overview of investments and insights
- **Mobile-First Design**: Optimized for mobile devices with responsive design

## Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI
- **Framer Motion 12.23.26** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### State Management & Data
- **Zustand 5.0.9** - Lightweight state management
- **React Query (TanStack) 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling with validation
- **Zod 3.25.76** - Schema validation

### Charts & Visualization
- **Recharts 2.15.4** - Chart library for portfolio visualization

### Routing & Navigation
- **React Router DOM 6.30.1** - Client-side routing

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (40+ components)
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── Onboarding.tsx   # User onboarding flow
│   ├── Portfolio.tsx    # Portfolio management
│   ├── Products.tsx     # Investment products listing
│   ├── ProductDetail.tsx # Individual product details
│   ├── InvestFlow.tsx   # Investment process flow
│   ├── Profile.tsx      # User profile management
│   ├── BottomNav.tsx    # Mobile navigation
│   └── ...             # Other components
├── data/
│   └── mockData.ts      # Mock data for demonstration
├── hooks/
│   ├── useAppState.ts   # Global state management
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notifications
├── lib/
│   ├── format.ts        # Formatting utilities
│   └── utils.ts         # General utilities
├── pages/
│   ├── Index.tsx        # Main page component
│   └── NotFound.tsx     # 404 error page
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Core Components

### 1. PreviewScreen
- **Purpose**: Landing screen introducing the MASAR app
- **Features**: 
  - Animated logo with glow effects
  - Feature highlights (minimum investment, security, tracking)
  - Call-to-action to start demo

### 2. Onboarding
- **Purpose**: User risk assessment and profile creation
- **Features**:
  - Multi-step questionnaire (3 questions)
  - Risk profile calculation (Conservative, Balanced, Growth)
  - Progress tracking with animated transitions
  - Personalized investment recommendations

### 3. Dashboard
- **Purpose**: Main user interface showing portfolio overview
- **Features**:
  - Portfolio value display with daily changes
  - Quick action buttons (Invest, Add Funds, Portfolio, Products)
  - Portfolio allocation chart
  - Personalized insights and tips
  - Performance indicators with color-coded gains/losses

### 4. Portfolio
- **Purpose**: Detailed portfolio analysis and performance tracking
- **Features**:
  - Total portfolio value and gains/losses
  - Time-based performance charts (1M, 3M, 1Y)
  - Asset breakdown with individual performance
  - Interactive area charts using Recharts

### 5. Products
- **Purpose**: Investment product catalog
- **Features**:
  - Product cards with risk indicators
  - Expected returns and minimum investment amounts
  - Asset Under Management (AUM) display
  - Risk level categorization (Low, Medium, High)

### 6. ProductDetail
- **Purpose**: Detailed view of individual investment products
- **Features**:
  - Comprehensive product information
  - Key statistics (returns, fees, AUM)
  - Suitability descriptions
  - Fee transparency section

### 7. InvestFlow
- **Purpose**: Investment process workflow
- **Features**:
  - 3-step investment process
  - Amount selection with presets
  - Investment review and confirmation
  - Success confirmation with animation

### 8. Profile
- **Purpose**: User account management
- **Features**:
  - User information display
  - Risk profile summary
  - Settings menu (Personal Details, Security, Help)
  - Logout functionality

## Data Models

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskProfile: 'conservative' | 'balanced' | 'growth';
  portfolioValue: number;
  totalInvested: number;
  totalGain: number;
  todayChange: number;
  todayChangePercent: number;
}
```

### Investment Product Interface
```typescript
interface InvestmentProduct {
  id: string;
  name: string;
  type: 'money-market' | 'fixed-income' | 'equity';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: { min: number; max: number };
  minimumInvestment: number;
  description: string;
  suitableFor: string;
  aum: number;
  fee: number;
}
```

### Asset Interface
```typescript
interface Asset {
  id: string;
  name: string;
  type: 'equity' | 'fixed-income' | 'money-market';
  value: number;
  allocation: number;
  returnRate: number;
  color: string;
}
```

## Investment Products

The app features four main investment products:

### 1. Capital Shield Fund (Money Market)
- **Risk Level**: Low
- **Expected Return**: 20-24% p.a.
- **Minimum Investment**: 500 EGP
- **Target Audience**: Capital preservation focused investors

### 2. Steady Growth Bond Fund (Fixed Income)
- **Risk Level**: Medium  
- **Expected Return**: 16-20% p.a.
- **Minimum Investment**: 1,000 EGP
- **Target Audience**: Income-seeking investors

### 3. Egypt Growth Equity Fund (Equity)
- **Risk Level**: High
- **Expected Return**: 10-25% p.a.
- **Minimum Investment**: 1,000 EGP
- **Target Audience**: Long-term growth investors

### 4. Regional Opportunities Fund (Equity)
- **Risk Level**: High
- **Expected Return**: 8-22% p.a.
- **Minimum Investment**: 2,500 EGP
- **Target Audience**: Regional diversification seekers

## State Management

The application uses Zustand for state management with the following key states:

- **Onboarding State**: Progress tracking and risk assessment
- **User State**: User profile and portfolio information
- **Investment Data**: Products, assets, and insights
- **UI State**: Navigation and modal management

## Design System

### Color Scheme
- **Primary**: Green-based theme representing growth and prosperity
- **Success**: Green for positive returns and gains
- **Warning**: Amber for medium risk indicators
- **Destructive**: Red for losses and high risk
- **Muted**: Gray tones for secondary information

### Typography
- **Font Family**: DM Sans - Modern, readable font
- **Hierarchy**: Clear heading and body text distinction
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Charts**: Clean, minimal design with branded colors
- **Navigation**: Bottom navigation optimized for mobile

## Animations & Interactions

### Framer Motion Integration
- **Page Transitions**: Smooth fade and slide animations
- **Component Animations**: Staggered animations for lists
- **Micro-interactions**: Button presses, hover effects
- **Loading States**: Skeleton screens and progress indicators

### Key Animation Features
- **Onboarding Progress**: Animated progress bars
- **Chart Animations**: Smooth data transitions
- **Success States**: Celebration animations for completed actions
- **Navigation**: Smooth tab switching with layout animations

## Mobile Optimization

### Responsive Design
- **Mobile-First**: Designed primarily for mobile devices
- **Max Width**: 430px container for optimal mobile experience
- **Touch Targets**: Appropriately sized buttons and interactive elements
- **Gestures**: Swipe-friendly navigation

### Performance
- **Lazy Loading**: Components loaded as needed
- **Optimized Images**: Proper image sizing and formats
- **Minimal Bundle**: Tree-shaking and code splitting

## Development Features

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking and IntelliSense
- **Vite HMR**: Hot module replacement for fast development
- **React DevTools**: Component debugging

### Build Configuration
- **Production Build**: Optimized for deployment
- **Development Mode**: Enhanced debugging capabilities
- **Environment Variables**: Configuration management

## Security & Compliance

### Security Features
- **Secured Footer**: "Secured by Banque Misr Banking" branding
- **Input Validation**: Form validation using Zod schemas
- **Type Safety**: TypeScript for runtime error prevention

### Egyptian Market Focus
- **Currency**: Egyptian Pound (EGP) formatting
- **Local Products**: Egyptian Exchange (EGX) focused funds
- **Regional Expansion**: MENA region investment options
- **Regulatory Compliance**: Designed for Egyptian financial regulations

## Future Enhancements

### Potential Features
- **Real-time Data**: Live market data integration
- **Push Notifications**: Investment alerts and updates
- **Document Management**: KYC and investment documents
- **Social Features**: Investment community and discussions
- **Advanced Analytics**: Detailed performance metrics
- **Multi-language**: Arabic language support

### Technical Improvements
- **PWA**: Progressive Web App capabilities
- **Offline Support**: Cached data for offline viewing
- **Performance**: Further optimization for slower networks
- **Accessibility**: Enhanced screen reader support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd masar-investment-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Conclusion

MASAR represents a modern approach to investment applications in the Egyptian market, combining intuitive design with comprehensive functionality. The application demonstrates best practices in React development, TypeScript usage, and mobile-first design principles. It serves as both a functional prototype and a foundation for a full-scale investment platform.

The project showcases advanced frontend development techniques including state management, animation, responsive design, and component architecture, making it an excellent example of modern web application development.

---
**Lovable Sync Trigger**: Updated December 2024 with AI Assistant and Public Insights features