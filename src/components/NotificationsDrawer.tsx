import React from 'react';
import { X, Bell, AlertTriangle, Sparkles, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { AppNotification, Language } from '../types';
import { translations } from '../data/translations';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: AppNotification) => void;
  language: Language;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
  language
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 p-5 bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">
                {t.notificationsTitle}
              </h3>
              <span className="text-[11px] text-neutral-500 font-medium">
                {notifications.filter(n => !n.read).length} non lues
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              {t.markAllRead}
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs">
              {t.noNotifications}
            </div>
          ) : (
            notifications.map((notif) => {
              const isShortage = notif.type === 'shortage';
              const isWaste = notif.type === 'waste_risk';

              return (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer ${
                    !notif.read ? 'bg-emerald-50/40 hover:bg-emerald-50/80' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      isShortage 
                        ? 'bg-red-100 text-red-600' 
                        : isWaste 
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isShortage ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : isWaste ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-neutral-900">
                          {language === 'fr' ? notif.titleFr : notif.titleEn}
                        </h4>
                        <span className="text-[10px] text-neutral-400">
                          {notif.time}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-neutral-600 leading-snug">
                        {language === 'fr' ? notif.messageFr : notif.messageEn}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <span>{language === 'fr' ? 'Consulter' : 'View'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>

                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 text-center">
          <p className="text-[11px] text-neutral-500">
            Agrifamily Alerteur Zéro-Perte · Surveillance active des récoltes
          </p>
        </div>

      </div>
    </div>
  );
};
