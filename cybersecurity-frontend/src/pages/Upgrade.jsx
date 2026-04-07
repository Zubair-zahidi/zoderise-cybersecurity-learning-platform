import { useState } from 'react';
import { Zap, Star, CheckCircle, CreditCard, Clock, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCreditStore } from '../store/creditStore';

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuthStore();
  const { fetchCredits } = useCreditStore();

  const plans = [
    {
      id: 'trial',
      name: 'Thunder Trial',
      price: 0,
      duration: '7 days',
      credits: 100,
      features: [
        'Access to premium quizzes',
        'Advanced study materials',
        'Priority support',
        '100 bonus credits',
        'Full platform access'
      ],
      popular: false,
      icon: Clock
    },
    {
      id: 'monthly',
      name: 'Thunder Monthly',
      price: 9.99,
      duration: 'per month',
      credits: 500,
      features: [
        'Everything in Trial',
        '500 monthly credits',
        'Advanced analytics',
        'Custom study plans',
        'Certificate downloads',
        'API access'
      ],
      popular: true,
      icon: Zap
    },
    {
      id: 'yearly',
      name: 'Thunder Yearly',
      price: 99,
      duration: 'per year',
      credits: 6000,
      features: [
        'Everything in Monthly',
        '6000 yearly credits',
        '2 months free',
        'Priority feature requests',
        'Team collaboration tools',
        'Advanced reporting'
      ],
      popular: false,
      icon: Star
    }
  ];

  const creditPackages = [
    { amount: 100, price: 1.99, bonus: 0 },
    { amount: 500, price: 7.99, bonus: 50 },
    { amount: 1000, price: 14.99, bonus: 150 },
    { amount: 2500, price: 29.99, bonus: 500 }
  ];

  const handleUpgrade = async (planId) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Upgrade to ${plans.find(p => p.id === planId).name} initiated! (Demo - no actual payment)`);
      setIsProcessing(false);
      setSelectedPlan(null);
      fetchCredits(); // Refresh credits
    }, 2000);
  };

  const handleCreditPurchase = async (creditPackage) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Purchased ${creditPackage.amount + creditPackage.bonus} credits! (Demo - no actual payment)`);
      setIsProcessing(false);
      fetchCredits(); // Refresh credits
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Upgrade to Thunder</h1>
          </div>
          <p className="text-slate-400 text-lg">Unlock premium features and accelerate your cybersecurity learning</p>
        </div>

        {/* Current Plan Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Current Plan</h2>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.plan === 'thunder' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {user?.plan === 'thunder' ? 'Thunder Plan' : 'Free Plan'}
                </span>
                <span className="text-slate-400">Credits: {user?.credits || 0}</span>
              </div>
            </div>
            {user?.plan !== 'thunder' && (
              <div className="text-right">
                <p className="text-slate-400 text-sm">Ready to upgrade?</p>
                <p className="text-cyan-400 font-medium">Get started below</p>
              </div>
            )}
          </div>
        </div>

        {/* Thunder Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Thunder Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-slate-900 border rounded-lg p-6 transition ${
                    plan.popular
                      ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${plan.popular ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-slate-400 text-sm">/{plan.duration}</span>
                    </div>
                    <p className="text-cyan-400 text-sm mt-1">+{plan.credits} credits</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isProcessing}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                      plan.popular
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? 'Processing...' : plan.price === 0 ? 'Start Free Trial' : 'Upgrade Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credit Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Buy Credits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPackages.map((pkg, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-white">{pkg.amount + pkg.bonus}</div>
                  <div className="text-cyan-400 text-sm">credits</div>
                  {pkg.bonus > 0 && (
                    <div className="text-green-400 text-xs">+{pkg.bonus} bonus</div>
                  )}
                </div>
                <div className="text-center mb-4">
                  <span className="text-xl font-semibold text-white">${pkg.price}</span>
                </div>
                <button
                  onClick={() => handleCreditPurchase(pkg)}
                  disabled={isProcessing}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Upgrade to Thunder?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Premium Features
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Access to 300+ advanced quizzes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  In-depth study materials and guides
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Interactive labs and challenges
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Progress tracking and analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Certificate downloads
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-cyan-400" />
                Exclusive Benefits
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Priority customer support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Early access to new features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Custom learning paths
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Team collaboration tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  API access for integrations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold">Can I cancel my Thunder subscription anytime?</h3>
              <p className="text-slate-400 text-sm mt-1">Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">What happens to my credits when I upgrade?</h3>
              <p className="text-slate-400 text-sm mt-1">Your existing credits are preserved, and you receive additional credits based on your plan.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Is the free trial really free?</h3>
              <p className="text-slate-400 text-sm mt-1">Yes! The 7-day Thunder trial gives you full access to premium features at no cost.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;