import React from 'react';
import { Sun, Shield, Phone, Mail, Heart, Sparkles, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EyeProtectionFooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  eyeProtectionMode: boolean;
  onToggleEyeProtection: () => void;
  onNavigateTab: (tab: string) => void;
}

export const EyeProtectionFooter: React.FC<EyeProtectionFooterProps> = ({
  language,
  onLanguageChange,
  eyeProtectionMode,
  onToggleEyeProtection,
  onNavigateTab
}) => {
  const t = translations[language];

  return (
    <footer className="w-full bg-white border-t border-neutral-200/90 text-neutral-700 transition-colors pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Eye Protection Banner inside Footer */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50/70 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
              eyeProtectionMode ? 'bg-amber-100 text-amber-800' : 'bg-neutral-200 text-neutral-700'
            }`}>
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">
                {t.eyeProtectionTitle}
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t.eyeProtectionDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleEyeProtection}
            className={`self-start sm:self-center rounded-full px-4 py-2 text-xs font-bold transition-all ${
              eyeProtectionMode
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {eyeProtectionMode ? (language === 'fr' ? 'Désactiver Confort' : 'Disable Eye Comfort') : t.toggleEyeProtection}
          </button>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border-2 border-emerald-600 shadow-xs">
                <span className="font-extrabold text-emerald-700 text-base font-serif">Af</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                Agrifamily
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {t.brandTagline}. {t.taglineSubtitle}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>{language === 'fr' ? 'Sécurité alimentaire & commerce équitable' : 'Food security & fair trade'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              {language === 'fr' ? 'Plateforme' : 'Platform'}
            </h5>
            <ul className="space-y-1.5 text-xs text-neutral-600">
              <li>
                <button onClick={() => onNavigateTab('market')} className="hover:text-emerald-700 hover:underline">
                  {t.marketTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('inventory')} className="hover:text-emerald-700 hover:underline">
                  {t.inventoryTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('inbox')} className="hover:text-emerald-700 hover:underline">
                  {t.inboxTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('community')} className="hover:text-emerald-700 hover:underline">
                  {t.communityTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('pricing')} className="hover:text-emerald-700 hover:underline">
                  {t.pricingTab} (Orange / MTN / Nero)
                </button>
              </li>
            </ul>
          </div>

          {/* Post-harvest Waste Prevention Guarantee */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              {language === 'fr' ? 'Impact Zéro-Perte' : 'Zero-Waste Impact'}
            </h5>
            <ul className="space-y-1.5 text-xs text-neutral-600">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{language === 'fr' ? 'Traçabilité des lots de récolte' : 'Harvest batch traceability'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{language === 'fr' ? 'Alertes précoces de surstock' : 'Early surplus stock alerts'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{language === 'fr' ? 'Ventes directes sans pertes' : 'Direct marketing without waste'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{language === 'fr' ? 'Conversion CFA garantie' : 'Guaranteed CFA conversion'}</span>
              </li>
            </ul>
          </div>

          {/* Hotline Assistance Phone as requested */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              {language === 'fr' ? 'Urgence & Assistance' : 'Helpline & Support'}
            </h5>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>Hotline Récolte 24/7</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-mono font-bold">
                (+237) 6 99 00 24 24
              </p>
              <p className="text-[10px] text-neutral-500">
                {language === 'fr' ? 'Assistance pour écoulement rapide de produits périssables.' : 'Emergency routing for perishable harvests.'}
              </p>
            </div>

            {/* Language Switch Quick shortcut */}
            <div className="flex items-center gap-2 pt-1">
              <Globe className="h-3.5 w-3.5 text-neutral-400" />
              <button
                onClick={() => onLanguageChange(language === 'fr' ? 'en' : 'fr')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                {language === 'fr' ? 'Switch to English 🇬🇧' : 'Passer en Français 🇫🇷'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 Agrifamily. {t.allRightsReserved}</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Orange Money</span>
            <span>·</span>
            <span>MTN MoMo</span>
            <span>·</span>
            <span>Nero Card</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
