import React, { useState } from 'react';
import { Send, User as UserIcon, MessageSquare, Phone, MapPin, CheckCheck, Sparkles } from 'lucide-react';
import { ChatMessage, Language, User } from '../types';
import { translations } from '../data/translations';

interface MessagingInboxProps {
  currentUser: User | null;
  messages: ChatMessage[];
  onSendMessage: (recipientId: string, recipientName: string, text: string, productId?: string) => void;
  language: Language;
}

export const MessagingInbox: React.FC<MessagingInboxProps> = ({
  currentUser,
  messages,
  onSendMessage,
  language
}) => {
  const t = translations[language];
  const [activePartnerId, setActivePartnerId] = useState<string>('usr_buyer_1');
  const [inputText, setInputText] = useState('');

  // Extract distinct conversation partners
  const conversationPartners = [
    {
      id: 'usr_buyer_1',
      name: 'Chef David Mballa',
      role: 'buyer',
      location: 'Yaoundé Bastos (Restaurant Le Terroir)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Parfait ! Je vous règle par Orange Money à la réception.',
      time: '10:28'
    },
    {
      id: 'usr_prod_2',
      name: 'Coopérative d’Obala (M. Paul Ndongo)',
      role: 'producer',
      location: 'Obala (Région du Centre)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Les 5 régimes de plantain sont coupés et prêts pour le départ.',
      time: 'Hier'
    },
    {
      id: 'usr_prod_3',
      name: 'Vergers Royaux du Moungo',
      role: 'producer',
      location: 'Njombé-Penja',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Lot de mangues sauvages disponible à tarif anti-gaspillage.',
      time: '24 Sep'
    }
  ];

  const currentPartner = conversationPartners.find(p => p.id === activePartnerId) || conversationPartners[0];

  const activeMessages = messages.filter(
    m => (m.senderId === activePartnerId || m.recipientId === activePartnerId)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(currentPartner.id, currentPartner.name, inputText.trim());
    setInputText('');
  };

  const quickReplies = [
    language === 'fr' ? 'La marchandise est-elle toujours disponible ?' : 'Is this produce still available?',
    language === 'fr' ? 'Pouvez-vous expédier demain matin ?' : 'Can you dispatch tomorrow morning?',
    language === 'fr' ? 'Je confirme la commande au prix convenu.' : 'I confirm the order at the agreed price.',
    language === 'fr' ? 'Paiement effectué par Mobile Money.' : 'Payment completed via Mobile Money.'
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t.inboxTitle}
          </h2>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          {t.inboxSubtitle}
        </p>
      </div>

      {/* Main Inbox Container */}
      <div className="rounded-3xl border border-neutral-200 bg-white shadow-xs overflow-hidden flex flex-col md:flex-row h-[620px]">
        
        {/* Left Side: Threads List */}
        <div className="w-full md:w-80 border-r border-neutral-200 flex flex-col bg-neutral-50/50">
          <div className="p-4 border-b border-neutral-200 bg-white">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {language === 'fr' ? 'Discussions récentes' : 'Recent Discussions'}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
            {conversationPartners.map((partner) => {
              const isSelected = partner.id === activePartnerId;

              return (
                <button
                  key={partner.id}
                  onClick={() => setActivePartnerId(partner.id)}
                  className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'hover:bg-neutral-100/60'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">
                        {partner.name}
                      </h4>
                      <span className="text-[10px] text-neutral-400">
                        {partner.time}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {partner.location}
                    </p>

                    <p className="text-xs text-neutral-700 truncate mt-1">
                      {partner.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation Area */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Active Partner Bar */}
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/40">
            <div className="flex items-center gap-3">
              <img
                src={currentPartner.avatar}
                alt={currentPartner.name}
                className="h-9 w-9 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">
                  {currentPartner.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>{currentPartner.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                {currentPartner.role === 'producer' ? t.producerBadge : t.buyerBadge}
              </span>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-neutral-50/20">
            {activeMessages.length === 0 ? (
              <div className="py-16 text-center text-xs text-neutral-400">
                {language === 'fr' 
                  ? 'Démarrez votre conversation avec ce partenaire pour convenir de vos prix et commandes.'
                  : 'Start your conversation with this partner to agree on prices and shipments.'}
              </div>
            ) : (
              activeMessages.map((msg) => {
                const isMe = msg.isMine;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-neutral-400 mb-1 px-1">
                      {msg.senderName} · {msg.timestamp}
                    </div>

                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-xs'
                          : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-xs'
                      }`}
                    >
                      {msg.productName && (
                        <div className={`mb-1.5 pb-1 border-b text-[11px] font-bold ${
                          isMe ? 'border-white/20 text-emerald-100' : 'border-neutral-100 text-emerald-700'
                        }`}>
                          📦 {msg.productName}
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Replies chips */}
          <div className="p-2 border-t border-neutral-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] text-neutral-400 shrink-0 px-2 font-semibold">
              {language === 'fr' ? 'Réponses rapides :' : 'Quick replies:'}
            </span>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputText(reply)}
                className="shrink-0 rounded-full bg-neutral-100 hover:bg-neutral-200 px-3 py-1 text-[11px] text-neutral-700 font-medium transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-neutral-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeMessagePlaceholder}
              className="flex-1 rounded-xl bg-neutral-100 border border-transparent px-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">{t.sendBtn}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
