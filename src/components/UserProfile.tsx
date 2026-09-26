import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, User as UserIcon, Phone, MapPin, Mail, Building2, FileText, Shield, Sprout, ShoppingBag } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  language: Language;
  onSwitchRole: () => void;
  onNavigateToPricing: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdateUser,
  language,
  onSwitchRole,
  onNavigateToPricing
}) => {
  const t = translations[language];

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [farmOrBiz, setFarmOrBiz] = useState(user.farmOrBusinessName || '');
  const [bio, setBio] = useState(user.bio || '');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      location,
      farmOrBusinessName: farmOrBiz,
      bio
    });
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t.profileTitle}
          </h2>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          {t.profileSubtitle}
        </p>
      </div>

      {showSavedToast && (
        <div className="rounded-2xl bg-emerald-600 text-white p-4 flex items-center gap-3 shadow-md animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span className="text-xs font-bold">{t.profileUpdatedSuccess}</span>
        </div>
      )}

      {/* Role & Subscription Status Banner */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-2xl shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-neutral-900 text-lg">{user.name}</h3>
              <span className="rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {user.role === 'producer' ? t.producerBadge : t.buyerBadge}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {user.farmOrBusinessName || (user.role === 'producer' ? 'Exploitation locale' : 'Acheteur')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
          <div className="text-xs text-neutral-500">
            {language === 'fr' ? 'Formule active :' : 'Active Plan :'} <strong className="text-emerald-700 capitalize font-bold">{user.subscriptionPlan}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSwitchRole}
              className="rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors"
            >
              {user.role === 'producer' ? t.switchRoleToBuyer : t.switchRoleToProducer}
            </button>
            <button
              type="button"
              onClick={onNavigateToPricing}
              className="rounded-xl bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
            >
              {language === 'fr' ? 'Gérer abonnement' : 'Manage Plan'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              {t.fullName}
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3.5 py-2.5 bg-neutral-50/50">
              <UserIcon className="h-4 w-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs text-neutral-900 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              {t.emailAddress}
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3.5 py-2.5 bg-neutral-50/50">
              <Mail className="h-4 w-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs text-neutral-900 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              {t.phoneNumber}
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3.5 py-2.5 bg-neutral-50/50">
              <Phone className="h-4 w-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-mono font-bold text-neutral-900 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              {t.locationField}
            </label>
            <div className="flex items-center rounded-xl border border-neutral-300 px-3.5 py-2.5 bg-neutral-50/50">
              <MapPin className="h-4 w-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs text-neutral-900 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            {t.farmOrBusiness}
          </label>
          <div className="flex items-center rounded-xl border border-neutral-300 px-3.5 py-2.5 bg-neutral-50/50">
            <Building2 className="h-4 w-4 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              value={farmOrBiz}
              onChange={(e) => setFarmOrBiz(e.target.value)}
              placeholder="Ex: Ferme Maraîchère Bio du Noun"
              className="w-full text-xs text-neutral-900 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            {t.bioField}
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 p-3 text-xs text-neutral-900 bg-neutral-50/50 focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            {t.saveProfileBtn}
          </button>
        </div>

      </form>

    </div>
  );
};
