"use client"

import React, { useState } from 'react';
import PricingCard from './PricingCard';

type Plan = 'Free' | 'Basic Plan' | 'Premium Plan';

const PricingSection: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<Plan>('Premium Plan');

  const plans = [
    {
      title: 'Free',
      price: '$19/month',
      features: ['Multi-step Zaps', '3 Premium Apps', '2 Users team'],
      description: 'Get started for free',
    },
    {
      title: 'Basic Plan',
      price: '$54/month',
      features: ['Multi-step Zaps', 'Unlimited Premium', '50 Users team', 'Shared Workspace'],
      description: 'Optimal for small teams',
    },
    {
      title: 'Premium Plan',
      price: '$89/month',
      features: ['Multi-step Zap', 'Unlimited Premium', 'Unlimited Users Team', 'Advanced Admin', 'Custom Data Retention'],
      description: 'Optimal for large teams',
    },
  ];

  const handleSelectPlan = (plan: Plan) => {
    setCurrentPlan(plan);
  };

  return (
    <div className="flex  space-x-3 bg-[#FFFFFF80] p-4 rounded-2xl">
      {plans.map((plan) => (
        <PricingCard
          key={plan.title}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          description={plan.description}
          isCurrent={currentPlan === plan.title}
          onSelect={() => handleSelectPlan(plan.title as Plan)}
        />
      ))}
    </div>
  );
};

export default PricingSection;

