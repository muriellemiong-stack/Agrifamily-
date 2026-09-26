import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Smartphone, CreditCard, Loader2 } from 'lucide-react';
import { SubscriptionPlan, Language } from '../types';
import { translations } from '../data/translations';

interface PaymentModalProps {
  plan: SubscriptionPlan;
  onClose: () => void;
  onPaymentSuccess: (planId: 'free' | 'monthly' | 'annual') => void;
  language: Language;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  plan,
  onClose,
  onPaymentSuccess,
  language
}) => {
  const t = translations[language];
  const [operator, setOperator] = useState<'orange' | 'mtn' | 'nero'>('orange');
  const [phone, setPhone] = useState('+237 6 99 22 33 44');
  const [cardNumber, setCardNumber] = useState('4890 2314 9801 7732');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('812');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onPaymentSuccess(plan.id);
      }, 1600);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">
              {t.paymentModalTitle}
            </h3>
            <p className="text-xs text-neutral-500">
              {language === 'fr' ? plan.nameFr : plan.nameEn}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-neutral-900 text-lg">
              {t.paymentSuccessTitle}
            </h4>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              {t.paymentSuccessText}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* Amount Summary */}
            <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500">{language === 'fr' ? 'Montant à régler' : 'Total due'}</span>
                <div className="text-2xl font-black text-neutral-900 tabular-nums">
                  {plan.priceCFA.toLocaleString()} FCFA
                </div>
              </div>
              <div className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                {plan.priceUSD}$ USD
              </div>
            </div>

            {/* Operator Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                {t.selectOperator}
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {/* Orange Money */}
                <button
                  type="button"
                  onClick={() => setOperator('orange')}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                    operator === 'orange'
                      ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-bold ring-2 ring-orange-200'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-black mb-1">
                    OM
                  </div>
                  <span className="text-[11px] leading-tight">Orange Money</span>
                </button>

                {/* MTN MoMo */}
                <button
                  type="button"
                  onClick={() => setOperator('mtn')}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                    operator === 'mtn'
                      ? 'border-yellow-500 bg-yellow-50/80 text-yellow-950 font-bold ring-2 ring-yellow-200'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center text-neutral-900 text-[10px] font-black mb-1">
                    MoMo
                  </div>
                  <span className="text-[11px] leading-tight">MTN MoMo</span>
                </button>

                {/* Carte virtuelle Nero */}
                <button
                  type="button"
                  onClick={() => setOperator('nero')}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                    operator === 'nero'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-emerald-700 mb-1" />
                  <span className="text-[11px] leading-tight">Carte Nero</span>
                </button>
              </div>
            </div>

            {/* Input according to selected operator */}
            {operator === 'nero' ? (
              <div className="space-y-3 rounded-2xl bg-neutral-50 p-3.5 border border-neutral-200">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    {t.enterCardNumber}
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2 text-xs font-mono text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Expiration
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-xl bg-white border border-neutral-300 p-2 text-xs font-mono text-neutral-800 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      CVV Nero
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full rounded-xl bg-white border border-neutral-300 p-2 text-xs font-mono text-neutral-800 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 rounded-2xl bg-neutral-50 p-3.5 border border-neutral-200">
                <label className="block text-[11px] font-semibold text-neutral-600">
                  {t.enterPhoneNumber} ({operator === 'orange' ? 'Orange Cameroun/Afrique' : 'MTN Mobile Money'})
                </label>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-neutral-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6 99 XX XX XX"
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2 text-xs font-mono font-bold text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  {language === 'fr' 
                    ? 'Vous recevrez une notification USSD sur votre téléphone pour valider avec votre code secret.'
                    : 'A prompt will appear on your handset to authorize payment with your PIN.'}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Paiement crypté sécurisé 256-bit Agrifamily</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 px-4 text-sm font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Validation bancaire en cours...</span>
                </>
              ) : (
                <span>{t.processPaymentBtn} {plan.priceCFA.toLocaleString()} FCFA</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
