import React, { useState } from 'react';
import { Check, Shield, Zap, Sparkles, CreditCard, Smartphone } from 'lucide-react';
import { SubscriptionPlan, Language, User } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/initialData';
import { translations } from '../data/translations';
import { PaymentModal } from './PaymentModal';

interface PricingSectionProps {
  currentUser: User | null;
  language: Language;
  onUpgradePlan: (planId: 'free' | 'monthly' | 'annual') => void;
  onOpenAuth: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentUser,
  language,
  onUpgradePlan,
  onOpenAuth
}) => {
  const t = translations[language];
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<SubscriptionPlan | null>(null);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (plan.id === 'free') {
      onUpgradePlan('free');
      return;
    }
    setSelectedPlanForPayment(plan);
  };

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{language === 'fr' ? 'Tarification Transparente & Solidaire' : 'Fair Transparent Subscriptions'}</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {t.pricingHeroTitle}
        </h2>
        <p className="text-sm sm:text-base text-neutral-600">
          {t.pricingHeroSubtitle}
        </p>
        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl py-2 px-4 inline-block border border-emerald-200/80">
          {t.convertRateNote}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentUser?.subscriptionPlan === plan.id;
          const isRecommended = plan.recommended;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all ${
                isRecommended
                  ? 'bg-neutral-900 text-white shadow-2xl ring-2 ring-emerald-500 scale-102'
                  : 'bg-white text-neutral-900 border border-neutral-200 shadow-sm hover:shadow-md'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-md">
                  {language === 'fr' ? 'Le plus populaire' : 'Most Popular'}
                </div>
              )}

              <div>
                {/* Plan Title */}
                <h3 className={`text-xl font-bold ${isRecommended ? 'text-white' : 'text-neutral-900'}`}>
                  {language === 'fr' ? plan.nameFr : plan.nameEn}
                </h3>
                <p className={`mt-1 text-xs ${isRecommended ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {language === 'fr' ? plan.durationFr : plan.durationEn}
                </p>

                {/* Price block with dual currency conversion */}
                <div className="mt-6 pb-6 border-b border-neutral-200/40">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black tabular-nums">
                      {plan.priceCFA.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className={`text-xs mt-1 font-semibold ${isRecommended ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Équivalent direct : {plan.priceUSD}$ USD
                  </div>
                </div>

                {/* Features list */}
                <ul className="mt-6 space-y-3.5 text-xs sm:text-sm">
                  {(language === 'fr' ? plan.featuresFr : plan.featuresEn).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        isRecommended ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className={isRecommended ? 'text-neutral-300' : 'text-neutral-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrent}
                  className={`w-full rounded-2xl py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    isCurrent
                      ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                      : isRecommended
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/25'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {isCurrent ? t.activePlan : t.subscribeBtn}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Payment methods trust bar as requested: Orange Money, MTN MoMo, Carte virtuelle Nero */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-neutral-900 text-base">
              {t.paymentMethodsAvailable}
            </h4>
            <p className="text-xs text-neutral-500">
              {language === 'fr' 
                ? 'Règlement instantané sécurisé par mobile money ou carte virtuelle sans frais cachés.'
                : 'Instant secure checkout with mobile money or virtual card with zero hidden fees.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Orange Money */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-orange-50 border border-orange-200 px-4 py-2.5 text-xs font-bold text-orange-950 shadow-2xs">
              <div className="h-6 w-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black">
                OM
              </div>
              <span>{t.orangeMoney}</span>
            </div>

            {/* MTN Mobile Money */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-yellow-50 border border-yellow-200 px-4 py-2.5 text-xs font-bold text-yellow-950 shadow-2xs">
              <div className="h-6 w-6 rounded-full bg-yellow-400 text-neutral-900 flex items-center justify-center text-[10px] font-black">
                MoMo
              </div>
              <span>{t.mtnMoney}</span>
            </div>

            {/* Carte virtuelle Nero */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-950 shadow-2xs">
              <CreditCard className="h-5 w-5 text-emerald-700" />
              <span>{t.neroCard}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      {selectedPlanForPayment && (
        <PaymentModal
          plan={selectedPlanForPayment}
          language={language}
          onClose={() => setSelectedPlanForPayment(null)}
          onPaymentSuccess={(planId) => {
            onUpgradePlan(planId);
            setSelectedPlanForPayment(null);
          }}
        />
      )}

    </div>
  );
};
