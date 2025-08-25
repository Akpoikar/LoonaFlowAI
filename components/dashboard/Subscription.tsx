"use client";

import { useState, useEffect } from 'react';
import { apiClient, SubscriptionPlans, UserSubscription } from '@/lib/api';

export default function Subscription() {
  const [plans, setPlans] = useState<SubscriptionPlans | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Load both plans and current subscription
      const [plansResult, subscriptionResult] : any = await Promise.all([
        apiClient.getSubscriptionPlans(),
        apiClient.getCurrentSubscription()
      ]);

      if (plansResult.error) {
        setError(plansResult.error);
      } else if (plansResult.data) {
        setPlans(plansResult.data.data);
      }

      if (subscriptionResult.error) {
        // Don't set error for subscription, just log it
        console.warn('Failed to load subscription:', subscriptionResult.error);
      } else if (subscriptionResult.data) {
        setCurrentSubscription(subscriptionResult.data.data);
      }
    } catch (error) {
      setError('Failed to load subscription data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatLimit = (limit: number) => {
    if (limit === -1) return 'Unlimited';
    return limit.toLocaleString();
  };

  const getPlanColor = (planKey: string) => {
    switch (planKey) {
      case 'FREE': return 'bg-slate-100 text-slate-700';
      case 'STARTER': return 'bg-blue-100 text-blue-700';
      case 'GROWTH': return 'bg-violet-100 text-violet-700';
      case 'SCALE': return 'bg-purple-100 text-purple-700';
      case 'ENTERPRISE': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPlanBorder = (planKey: string) => {
    switch (planKey) {
      case 'FREE': return 'border-slate-200';
      case 'STARTER': return 'border-blue-200';
      case 'GROWTH': return 'border-violet-200';
      case 'SCALE': return 'border-purple-200';
      case 'ENTERPRISE': return 'border-slate-200';
      default: return 'border-slate-200';
    }
  };

  const isCurrentPlan = (planKey: string) => {
    return currentSubscription?.currentPlan?.plan === planKey;
  };

  const handleUpgrade = async (planKey: string) => {
    try {
      setUpgradingPlan(planKey);
      setError('');

      // Handle Enterprise tier - redirect to contact page
      if (planKey === 'ENTERPRISE') {
        window.location.href = '/contact';
        return;
      }

      // Get the plan details
      const plan = plans?.[planKey as keyof SubscriptionPlans];
      if (!plan) {
        setError('Plan not found');
        setUpgradingPlan(null);
        return;
      }

      if (plan.price === 0) {
        // Handle downgrade to free plan
        if (confirm(`Are you sure you want to downgrade to the ${planKey} plan? This will cancel your current subscription.`)) {
          setUpgradingPlan(null);
          return;
        }

        // Use the existing updateSubscription method for free plan
        const result = await apiClient.updateSubscription(planKey);
        if (result.error) {
          setError(result.error);
        } else {
          await loadSubscriptionData();
        }
      } else {
        // Handle upgrade to paid plan
        if (!confirm(`Are you sure you want to upgrade to the ${planKey} plan?`)) {
          setUpgradingPlan(null);
          return;
        }

        // Create Stripe checkout session
        const result = await apiClient.createCheckoutSession(planKey);
        if (result.error) {
          setError(result.error);
        } else if (result.data && typeof result.data === 'object' && 'success' in result.data && result.data.success && 'data' in result.data && result.data.data && typeof result.data.data === 'object' && 'url' in result.data.data) {
          // Redirect to Stripe checkout
          window.location.href = result.data.data.url as string;
        } else {
          setError('Failed to create checkout session');
        }
      }
    } catch (error) {
      setError('Failed to process subscription change');
    } finally {
      setUpgradingPlan(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadSubscriptionData}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Current Subscription Management */}
      {currentSubscription && currentSubscription.status !== 'inactive' && (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Check Subscription Status Button */}
            <button
              onClick={async () => {
                try {
                  setError('');
                  const result = await apiClient.syncSubscription();
                  if (result.error) {
                    setError(result.error);
                  } else {
                    // Reload subscription data to show updated status
                    await loadSubscriptionData();
                  }
                } catch (error) {
                  setError('Failed to sync subscription status');
                }
              }}
              className="flex-shrink-0 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Check Subscription Status
            </button>

            {/* Upgrade Note */}
            <div className="flex-grow p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="text-orange-500 text-lg">💡</div>
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">After upgrading to a new plan:</p>
                  <p className="text-sm text-blue-700">
                    Click the "Check Subscription Status" button above to update your account with the new plan features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Plans */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Available Plans</h3>
        

        
                 {plans && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(plans).map(([planKey, plan]) => (
                             <div 
                 key={planKey}
                 className={`relative p-6 rounded-2xl border-2 ${getPlanBorder(planKey)} ${
                   isCurrentPlan(planKey) 
                     ? 'ring-2 ring-violet-500 bg-white/80' 
                     : planKey === 'GROWTH'
                     ? 'ring-2 ring-violet-500 bg-white/80 shadow-lg shadow-violet-200/50'
                     : 'bg-white/60 hover:bg-white/80'
                 } transition-all duration-200`}
               >
                 {isCurrentPlan(planKey) && (
                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                     <span className="px-4 py-1 bg-violet-600 text-white text-sm font-medium rounded-full">
                       Current Plan
                     </span>
                   </div>
                 )}
                 {planKey === 'GROWTH' && !isCurrentPlan(planKey) && (
                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                     <span className="px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg">
                       Recommended
                     </span>
                   </div>
                 )}
                
                                 <div className="text-center mb-6">
                   <h4 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                   <p className="text-sm text-slate-600 mb-2">{plan.tagline}</p>
                   <p className="text-xs text-slate-500 mb-3">{plan.description}</p>
                   <div className="text-3xl font-bold text-slate-900 mb-1">
                     {planKey === 'ENTERPRISE' ? 'Custom' : `$${plan.price}`}
                     {planKey !== 'ENTERPRISE' && (
                       <span className="text-lg font-normal text-slate-600">/month</span>
                     )}
                   </div>
                   {planKey === 'ENTERPRISE' ? (
                     <p className="text-sm text-slate-600">contact us</p>
                   ) : plan.price === 0 && (
                     <p className="text-sm text-slate-600">Forever free</p>
                   )}
                 </div>

                 <div className="space-y-3 mb-6">
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Leads per month</span>
                     <span className="font-semibold text-slate-900">{formatLimit(plan.features.leadsPerMonth)}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Email accounts</span>
                     <span className="font-semibold text-slate-900">{formatLimit(plan.features.emailAccountsLimit)}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Emails/day per inbox</span>
                     <span className="font-semibold text-slate-900">{plan.features.emailsPerDayPerInbox}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Campaigns</span>
                     <span className="font-semibold text-slate-900">{formatLimit(plan.features.campaignsLimit)}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Email templates</span>
                     <span className="font-semibold text-slate-900">{formatLimit(plan.features.templatesLimit)}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Analytics</span>
                     <span className="font-semibold text-slate-900 capitalize">{plan.features.analytics}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">AI email generation</span>
                     <span className="font-semibold text-slate-900 capitalize">
                       {typeof plan.features.aiEmailGeneration === 'boolean' 
                         ? (plan.features.aiEmailGeneration ? 'Yes' : 'No')
                         : plan.features.aiEmailGeneration}
                     </span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-slate-700 text-sm">Email warmup</span>
                     <span className="font-semibold text-slate-900">{plan.features.emailWarmup ? 'Yes' : 'No'}</span>
                   </div>
                   {plan.features.teamAccounts > 0 && (
                     <div className="flex items-center justify-between">
                       <span className="text-slate-700 text-sm">Team accounts</span>
                       <span className="font-semibold text-slate-900">{plan.features.teamAccounts}</span>
                     </div>
                   )}
                   {plan.features.prioritySupport && (
                     <div className="flex items-center justify-between">
                       <span className="text-slate-700 text-sm">Priority support</span>
                       <span className="font-semibold text-slate-900">✓</span>
                     </div>
                   )}
                   {plan.features.agencyDashboard && (
                     <div className="flex items-center justify-between">
                       <span className="text-slate-700 text-sm">Agency dashboard</span>
                       <span className="font-semibold text-slate-900">✓</span>
                     </div>
                   )}
                 </div>

                                 {planKey === 'ENTERPRISE' ? (
                   <a 
                     href="/contact"
                     className="block w-full py-3 rounded-xl font-semibold transition-all duration-200 bg-slate-100 text-slate-700 hover:bg-slate-200 text-center"
                   >
                     Contact Sales
                   </a>
                 ) : (
                   <button 
                     onClick={() => !isCurrentPlan(planKey) && handleUpgrade(planKey)}
                     className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                       isCurrentPlan(planKey)
                         ? 'bg-slate-100 text-slate-600 cursor-not-allowed'
                         : planKey === 'GROWTH' && !isCurrentPlan(planKey)
                         ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-xl hover:shadow-violet-600/30 transform hover:scale-105'
                         : plan.price === 0
                         ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                         : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-600/25'
                     }`}
                     disabled={isCurrentPlan(planKey) || upgradingPlan === planKey}
                   >
                     {upgradingPlan === planKey 
                       ? 'Processing...' 
                       : isCurrentPlan(planKey) 
                       ? 'Current Plan' 
                       : plan.price === 0 
                       ? 'Downgrade to Free' 
                       : 'Upgrade Now'
                     }
                   </button>
                 )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
