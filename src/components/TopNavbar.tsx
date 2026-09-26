import React, { useState } from 'react';
import { Bell, Globe, Sun, Shield, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { User, AppNotification, Language } from '../types';
import { translations } from '../data/translations';

interface TopNavbarProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenAuth: (initialMode?: 'login' | 'register') => void;
  onLogout: () => void;
  onSwitchRole: () => void;
  eyeProtectionMode: boolean;
  onToggleEyeProtection: () => void;
  onNavigateTab: (tab: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  user,
  language,
  onLanguageChange,
  notifications,
  onOpenNotifications,
  onOpenAuth,
  onLogout,
  onSwitchRole,
  eyeProtectionMode,
  onToggleEyeProtection,
  onNavigateTab
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const t = translations[language];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('market')}
            className="group flex items-center gap-3 text-left focus-visible:outline-none"
          >
            {/* Logo: "Af" written in green on a beautifully designed white background */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white border-2 border-emerald-600 shadow-sm ring-4 ring-emerald-50 transition-all group-hover:scale-105 group-hover:shadow-md">
              <span className="font-extrabold tracking-tighter text-emerald-700 text-xl font-serif">
                Af
              </span>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-neutral-900">
                  Agrifamily
                </span>
                <span className="hidden sm:inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                  Zéro-Perte
                </span>
              </div>
              <p className="hidden md:block text-xs text-neutral-500 font-medium">
                {language === 'fr' ? 'Producteurs & Acheteurs' : 'Farmers & Buyers Network'}
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Central Actions & Eye-Protection indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onToggleEyeProtection}
            title={t.toggleEyeProtection}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              eyeProtectionMode 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-transparent'
            }`}
          >
            <Sun className={`h-3.5 w-3.5 ${eyeProtectionMode ? 'text-amber-600' : 'text-neutral-500'}`} />
            <span>{eyeProtectionMode ? 'Mode Confort Visuel' : 'Confort Visuel'}</span>
          </button>

          <div className="h-4 w-px bg-neutral-200" />

          {/* Quick link to anti-waste purpose */}
          <span className="text-xs text-neutral-500 flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>{language === 'fr' ? 'Lutte contre les pertes post-récolte' : 'Post-harvest waste reduction'}</span>
          </span>
        </div>

        {/* Zone 3: Controls (Language Toggle, Red Notification Bell, Auth/Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher EN / FR */}
          <div className="flex items-center rounded-lg bg-neutral-100 p-0.5 border border-neutral-200/80">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                language === 'fr'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Passer en Français"
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Notification Bell with RED numbered counter as requested */}
          <div className="relative">
            <button
              onClick={onOpenNotifications}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User Account / Auth Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pl-2 pr-3 text-xs font-medium text-neutral-800 shadow-xs hover:border-neutral-300 focus-visible:outline-none"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-neutral-900 truncate max-w-[110px]">{user.name}</div>
                  <div className="text-[10px] text-emerald-600 font-medium capitalize">
                    {user.role === 'producer' ? t.producerBadge : t.buyerBadge}
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {userDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setUserDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 z-50 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-neutral-100 p-2">
                      <p className="font-semibold text-neutral-900 text-sm">{user.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">{t.userRoleLabel}:</span>
                        <span className="font-semibold text-emerald-700">
                          {user.role === 'producer' ? t.producerBadge : t.buyerBadge}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigateTab('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        {t.profileTab} ({language === 'fr' ? 'Gérer mes infos' : 'Manage account'})
                      </button>

                      <button
                        onClick={() => {
                          onSwitchRole();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        {user.role === 'producer' ? t.switchRoleToBuyer : t.switchRoleToProducer}
                      </button>

                      <button
                        onClick={() => {
                          onNavigateTab('pricing');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        {t.pricingTab} ({user.subscriptionPlan === 'free' ? '0$ / 0 CFA' : user.subscriptionPlan})
                      </button>
                    </div>

                    <div className="border-t border-neutral-100 pt-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>{t.logoutBtn}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {t.loginBtn}
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
              >
                {t.registerBtn}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
