import React from 'react';
import { Store, Boxes, MessageSquare, Users, CreditCard, User, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface BottomFloatingBarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  language: Language;
  unreadMessagesCount: number;
  shortageCount: number;
}

export const BottomFloatingBar: React.FC<BottomFloatingBarProps> = ({
  activeTab,
  onSelectTab,
  language,
  unreadMessagesCount,
  shortageCount
}) => {
  const t = translations[language];

  const navItems = [
    {
      id: 'market',
      label: t.marketTab,
      comment: t.marketTooltip,
      icon: Store,
      badge: null,
      color: 'emerald'
    },
    {
      id: 'inventory',
      label: t.inventoryTab,
      comment: t.inventoryTooltip,
      icon: Boxes,
      badge: shortageCount > 0 ? (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white px-1">
          {shortageCount}
        </span>
      ) : null,
      color: 'amber'
    },
    {
      id: 'inbox',
      label: t.inboxTab,
      comment: t.inboxTooltip,
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white px-1">
          {unreadMessagesCount}
        </span>
      ) : null,
      color: 'emerald'
    },
    {
      id: 'community',
      label: t.communityTab,
      comment: t.communityTooltip,
      icon: Users,
      badge: null,
      color: 'sky'
    },
    {
      id: 'pricing',
      label: t.pricingTab,
      comment: t.pricingTooltip,
      icon: CreditCard,
      badge: null,
      color: 'emerald'
    },
    {
      id: 'profile',
      label: t.profileTab,
      comment: t.profileTooltip,
      icon: User,
      badge: null,
      color: 'slate'
    }
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none">
      <nav 
        aria-label="Navigation Principale Agrifamily"
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 rounded-2xl sm:rounded-full bg-neutral-900/90 p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl border border-white/10 ring-1 ring-black/20 max-w-full overflow-x-auto scrollbar-none"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`group relative flex items-center gap-2 rounded-xl sm:rounded-full px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-200 select-none ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-102 font-bold'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/15 hover:text-white'
              }`}
              title={`${item.label} · ${item.comment}`}
            >
              {/* Icon Container with optional alert badge */}
              <div className="relative flex items-center justify-center">
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title label */}
              <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                {item.label}
              </span>

              {/* Little Tooltip / Comment bubble on hover */}
              <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 hidden sm:block whitespace-nowrap">
                <div className="rounded-lg bg-neutral-950 px-3 py-1.5 text-xs text-neutral-200 shadow-xl border border-neutral-800">
                  <div className="font-semibold text-emerald-400">{item.label}</div>
                  <div className="text-[11px] text-neutral-400">{item.comment}</div>
                  {/* Tooltip caret */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-950" />
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
