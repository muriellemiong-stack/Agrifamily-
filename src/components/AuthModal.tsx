import React, { useState } from 'react';
import { X, Sprout, ShoppingBag, ShieldCheck, Mail, Lock, User as UserIcon, Phone, MapPin } from 'lucide-react';
import { User, UserRole, Language } from '../types';
import { translations } from '../data/translations';
import { INITIAL_USER, DEMO_BUYER } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  language: Language;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
  initialMode = 'register'
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('producer');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [farmOrBiz, setFarmOrBiz] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      // Simulate login
      const loggedUser: User = {
        ...INITIAL_USER,
        email: email || INITIAL_USER.email
      };
      onLoginSuccess(loggedUser);
      onClose();
    } else {
      // Simulate registration
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name || (selectedRole === 'producer' ? 'Nouveau Producteur' : 'Nouvel Acheteur'),
        email: email || 'contact@agrifamily.org',
        role: selectedRole,
        phone: phone || '+237 6 00 00 00 00',
        location: location || 'Cameroun / Afrique Centrale',
        farmOrBusinessName: farmOrBiz || (selectedRole === 'producer' ? 'Mon Exploitation Agricole' : 'Mon Entreprise d’Achat'),
        bio: selectedRole === 'producer' 
          ? 'Producteur engagé dans la réduction des pertes post-récolte.'
          : 'Acheteur responsable en direct des coopératives.',
        subscriptionPlan: 'free'
      };
      onLoginSuccess(newUser);
      onClose();
    }
  };

  const handleDemoProducer = () => {
    onLoginSuccess(INITIAL_USER);
    onClose();
  };

  const handleDemoBuyer = () => {
    onLoginSuccess(DEMO_BUYER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-emerald-600 ring-2 ring-emerald-50">
              <span className="font-extrabold text-emerald-700 text-sm font-serif">Af</span>
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">
                Agrifamily
              </h3>
              <p className="text-[11px] text-neutral-500">
                {mode === 'register' ? t.registerBtn : t.loginBtn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Demo Switchers */}
        <div className="my-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
          <div className="text-[11px] font-bold text-neutral-600 mb-2">
            {language === 'fr' ? 'Accès démo rapide (1 clic) :' : 'Quick Demo Access (1 click):'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoProducer}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-2 text-xs font-semibold text-emerald-900 transition-colors text-left"
            >
              <Sprout className="h-3.5 w-3.5 text-emerald-700" />
              <span>{language === 'fr' ? 'Compte Productrice' : 'Farmer Account'}</span>
            </button>

            <button
              type="button"
              onClick={handleDemoBuyer}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 p-2 text-xs font-semibold text-sky-900 transition-colors text-left"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-sky-700" />
              <span>{language === 'fr' ? 'Compte Acheteur' : 'Buyer Account'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switch: Login vs Register */}
        <div className="flex rounded-xl bg-neutral-100 p-1 mb-4">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              mode === 'register' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {t.registerBtn}
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {t.loginBtn}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <>
              {/* Mandatory Requirement: Two options - Producer or Buyer */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  {language === 'fr' ? 'Choisissez votre profil sur Agrifamily :' : 'Choose your role on Agrifamily:'}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option 1: Producteur */}
                  <div
                    onClick={() => setSelectedRole('producer')}
                    className={`cursor-pointer rounded-2xl p-4 border text-left transition-all ${
                      selectedRole === 'producer'
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-200'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white mb-2">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div className="font-bold text-neutral-900 text-sm">
                      {t.producerBadge}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                      {language === 'fr' 
                        ? 'Agriculteurs, maraîchers, coopératives & vergers locaux.'
                        : 'Local farmers, growers & agricultural cooperatives.'}
                    </p>
                  </div>

                  {/* Option 2: Acheteur */}
                  <div
                    onClick={() => setSelectedRole('buyer')}
                    className={`cursor-pointer rounded-2xl p-4 border text-left transition-all ${
                      selectedRole === 'buyer'
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-200'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white mb-2">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div className="font-bold text-neutral-900 text-sm">
                      {t.buyerBadge}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                      {language === 'fr' 
                        ? 'Restaurateurs, grossistes, commerçants & familles.'
                        : 'Restaurants, bulk wholesalers, retailers & households.'}
                    </p>
                  </div>

                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.fullName} *
                </label>
                <div className="flex items-center rounded-xl border border-neutral-300 px-3 py-2 bg-white">
                  <UserIcon className="h-4 w-4 text-neutral-400 mr-2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mama Aïssatou Fofana"
                    className="w-full text-xs text-neutral-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.phoneNumber} *
                  </label>
                  <div className="flex items-center rounded-xl border border-neutral-300 px-3 py-2 bg-white">
                    <Phone className="h-4 w-4 text-neutral-400 mr-2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+237 6 99 XX XX XX"
                      className="w-full text-xs text-neutral-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.locationField}
                  </label>
                  <div className="flex items-center rounded-xl border border-neutral-300 px-3 py-2 bg-white">
                    <MapPin className="h-4 w-4 text-neutral-400 mr-2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ex: Foumbot, Ouest"
                      className="w-full text-xs text-neutral-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              {t.emailAddress} *
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3 py-2 bg-white">
              <Mail className="h-4 w-4 text-neutral-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@domaine.com"
                className="w-full text-xs text-neutral-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Mot de passe *
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3 py-2 bg-white">
              <Lock className="h-4 w-4 text-neutral-400 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs text-neutral-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 px-4 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              {mode === 'register' ? t.registerBtn : t.loginBtn}
            </button>
          </div>

          <div className="text-center text-[11px] text-neutral-500">
            {mode === 'register' ? (
              <span>
                {language === 'fr' ? 'Déjà un compte ?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  {t.loginBtn}
                </button>
              </span>
            ) : (
              <span>
                {language === 'fr' ? 'Pas encore de compte ?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  {t.registerBtn}
                </button>
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
