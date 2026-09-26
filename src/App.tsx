/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  INITIAL_USER, 
  DEMO_BUYER, 
  INITIAL_PRODUCTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CHATS, 
  INITIAL_COMMENTS 
} from './data/initialData';
import { Product, AppNotification, ChatMessage, CommunityComment, Language, User } from './types';
import { translations } from './data/translations';

// Components
import { TopNavbar } from './components/TopNavbar';
import { BottomFloatingBar } from './components/BottomFloatingBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SmartInventory } from './components/SmartInventory';
import { MessagingInbox } from './components/MessagingInbox';
import { CommunityFeed } from './components/CommunityFeed';
import { PricingSection } from './components/PricingSection';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { EyeProtectionFooter } from './components/EyeProtectionFooter';

import { Search, Sparkles, AlertTriangle, Filter, ArrowRight, ShieldCheck, Sprout, ShoppingBag } from 'lucide-react';

export default function App() {
  // Global App State
  const [language, setLanguage] = useState<Language>('fr');
  const [eyeProtectionMode, setEyeProtectionMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<string>('market');

  // Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHATS);
  const [comments, setComments] = useState<CommunityComment[]>(INITIAL_COMMENTS);

  // Modals & Drawers
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterAntiWaste, setFilterAntiWaste] = useState(false);
  const [filterShortage, setFilterShortage] = useState(false);

  const t = translations[language];

  // Calculated Metrics
  const shortageCount = products.filter(p => p.quantityAvailable <= p.minShortageThreshold).length;
  const unreadMessagesCount = messages.filter(m => !m.isMine).length;

  // Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === 'producer' ? 'buyer' : 'producer';
    setCurrentUser({
      ...currentUser,
      role: newRole
    });
  };

  const handleSendMessage = (recipientId: string, recipientName: string, text: string, productId?: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser?.id || 'usr_me',
      senderName: currentUser?.name || 'Moi',
      recipientId,
      recipientName,
      productId,
      productName: productId ? products.find(p => p.id === productId)?.name : undefined,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    setMessages(prev => [...prev, newMsg]);

    // Also push a confirmation notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      titleFr: 'Message envoyé avec succès',
      titleEn: 'Message sent successfully',
      messageFr: `Votre message à destination de ${recipientName} a été transmis.`,
      messageEn: `Your message to ${recipientName} has been delivered.`,
      time: 'À l’instant',
      read: false,
      type: 'message',
      targetTab: 'inbox'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSelectNotification = (notif: AppNotification) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    setIsNotificationsDrawerOpen(false);
  };

  const handleUpdateProductQuantity = (productId: string, newQuantity: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updated = { ...p, quantityAvailable: newQuantity };
        // Check if shortage triggered
        if (newQuantity <= p.minShortageThreshold && p.quantityAvailable > p.minShortageThreshold) {
          const shortageNotif: AppNotification = {
            id: `notif_short_${Date.now()}`,
            titleFr: `Pénurie détectée sur ${p.name}`,
            titleEn: `Shortage detected on ${p.nameEn}`,
            messageFr: `Le stock restant est de ${newQuantity} ${p.unit}. Seuil d’alerte franchi.`,
            messageEn: `Remaining stock is ${newQuantity} ${p.unitEn}. Safety threshold crossed.`,
            time: 'À l’instant',
            read: false,
            type: 'shortage',
            targetTab: 'inventory'
          };
          setNotifications(n => [shortageNotif, ...n]);
        }
        return updated;
      }
      return p;
    }));
  };

  const handleUpdateProductDetails = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    // Notify
    const notif: AppNotification = {
      id: `notif_new_${Date.now()}`,
      titleFr: 'Nouvelle récolte enregistrée',
      titleEn: 'New harvest batch created',
      messageFr: `${newProduct.name} a été ajouté à votre inventaire intelligent.`,
      messageEn: `${newProduct.nameEn} added to your smart inventory.`,
      time: 'À l’instant',
      read: false,
      type: 'message',
      targetTab: 'inventory'
    };
    setNotifications(n => [notif, ...n]);
  };

  const handleAddComment = (newComment: CommunityComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleUpgradePlan = (planId: 'free' | 'monthly' | 'annual') => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        subscriptionPlan: planId,
        subscriptionExpiry: planId === 'free' ? undefined : '2027-09-26'
      });

      const notif: AppNotification = {
        id: `notif_pay_${Date.now()}`,
        titleFr: 'Abonnement Agrifamily Activé',
        titleEn: 'Agrifamily Plan Activated',
        messageFr: `Votre formule ${planId} a été activée avec succès.`,
        messageEn: `Your ${planId} subscription plan is now active.`,
        time: 'À l’instant',
        read: false,
        type: 'payment',
        targetTab: 'pricing'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Filtered Products for the Market View
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.producerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.producerLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAntiWaste = !filterAntiWaste || product.isUrgentAntiWaste || product.shelfLifeDays <= 6;
    const matchesShortage = !filterShortage || product.quantityAvailable <= product.minShortageThreshold;

    return matchesSearch && matchesCategory && matchesAntiWaste && matchesShortage;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${
      eyeProtectionMode ? 'bg-[#FAF7EE] text-[#2C271E]' : 'bg-[#F9FAF9] text-neutral-900'
    }`}>
      
      {/* Top Bar with Brand "Af", Language Switcher EN/FR, Red Numbered Notifications Bell */}
      <TopNavbar
        user={currentUser}
        language={language}
        onLanguageChange={setLanguage}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsDrawerOpen(true)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        eyeProtectionMode={eyeProtectionMode}
        onToggleEyeProtection={() => setEyeProtectionMode(!eyeProtectionMode)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-28">
        
        {/* TAB 1: MARKET CATALOG */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            
            {/* Hero / Purpose Header */}
            <div className="relative rounded-3xl overflow-hidden bg-emerald-900 text-white p-6 sm:p-10 shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/80 px-3.5 py-1 text-xs font-bold text-emerald-200 border border-emerald-700/60">
                  <Sprout className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Réseau Équitable Producteurs & Acheteurs' : 'Fair Farmers & Buyers Network'}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {t.brandTagline}
                </h1>
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                  {t.taglineSubtitle}
                </p>

                {/* Quick Impact Metrics */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span>0% intermédiaires superflus</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                    <span>-45% pertes post-récolte constatées</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-sky-400" />
                    <span>Traçabilité terroir 100% vérifiée</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="space-y-4 rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex flex-col md:flex-row items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full rounded-2xl bg-neutral-100/80 border border-transparent pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setFilterAntiWaste(!filterAntiWaste)}
                    className={`rounded-2xl px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                      filterAntiWaste
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t.filterAntiWaste}</span>
                  </button>

                  <button
                    onClick={() => setFilterShortage(!filterShortage)}
                    className={`rounded-2xl px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                      filterShortage
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>{t.filterShortage} ({shortageCount})</span>
                  </button>
                </div>
              </div>

              {/* Category Segmented Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
                {[
                  { id: 'all', labelFr: 'Toutes les récoltes', labelEn: 'All Harvests' },
                  { id: 'legumes', labelFr: 'Légumes Maraîchers', labelEn: 'Vegetables' },
                  { id: 'tubercules', labelFr: 'Tubercules & Racines', labelEn: 'Tubers & Roots' },
                  { id: 'fruits', labelFr: 'Fruits Tropicaux', labelEn: 'Fresh Fruits' },
                  { id: 'cereales', labelFr: 'Céréales & Grains', labelEn: 'Grains & Cereals' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                    }`}
                  >
                    {language === 'fr' ? cat.labelFr : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-neutral-900">
                  {language === 'fr' ? 'Récoltes Fraîches Disponibles' : 'Available Fresh Harvests'}
                </h2>
                <span className="text-xs text-neutral-500 font-semibold">
                  {filteredProducts.length} {language === 'fr' ? 'lots référencés' : 'batches listed'}
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-neutral-300 p-12 text-center space-y-3">
                  <p className="text-sm font-semibold text-neutral-600">
                    {language === 'fr' ? 'Aucune récolte ne correspond à vos filtres.' : 'No harvests matched your filter parameters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFilterAntiWaste(false);
                      setFilterShortage(false);
                    }}
                    className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800"
                  >
                    {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                      onSelectProduct={(p) => setSelectedProductForModal(p)}
                      onContactProducer={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: SMART PRODUCER INVENTORY */}
        {activeTab === 'inventory' && (
          <SmartInventory
            products={products}
            currentUser={currentUser}
            language={language}
            onUpdateProductQuantity={handleUpdateProductQuantity}
            onUpdateProductDetails={handleUpdateProductDetails}
            onAddNewProduct={handleAddNewProduct}
            onSwitchToProducer={handleSwitchRole}
          />
        )}

        {/* TAB 3: PRIVATE MESSAGING INBOX */}
        {activeTab === 'inbox' && (
          <MessagingInbox
            currentUser={currentUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            language={language}
          />
        )}

        {/* TAB 4: COMMUNITY REVIEWS & STORAGE TIPS */}
        {activeTab === 'community' && (
          <CommunityFeed
            comments={comments}
            currentUser={currentUser}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            onOpenAuth={() => handleOpenAuth('login')}
            language={language}
          />
        )}

        {/* TAB 5: PRICING & SUBSCRIPTIONS */}
        {activeTab === 'pricing' && (
          <PricingSection
            currentUser={currentUser}
            language={language}
            onUpgradePlan={handleUpgradePlan}
            onOpenAuth={() => handleOpenAuth('register')}
          />
        )}

        {/* TAB 6: USER PROFILE */}
        {activeTab === 'profile' && currentUser && (
          <UserProfile
            user={currentUser}
            onUpdateUser={setCurrentUser}
            language={language}
            onSwitchRole={handleSwitchRole}
            onNavigateToPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'profile' && !currentUser && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-bold text-neutral-900 text-lg">
              {language === 'fr' ? 'Connectez-vous pour gérer votre profil' : 'Log in to manage your profile'}
            </h3>
            <p className="text-xs text-neutral-600">
              {language === 'fr' 
                ? 'Accédez à vos informations de producteur ou d’acheteur en créant votre compte.'
                : 'Access your farmer or buyer credentials by creating your account.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleOpenAuth('login')}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50"
              >
                {t.loginBtn}
              </button>
              <button
                onClick={() => handleOpenAuth('register')}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
              >
                {t.registerBtn}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer Blanc "Eye Protection" Mode as requested */}
      <EyeProtectionFooter
        language={language}
        onLanguageChange={setLanguage}
        eyeProtectionMode={eyeProtectionMode}
        onToggleEyeProtection={() => setEyeProtectionMode(!eyeProtectionMode)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Fluid Floating Bottom Island Header/Dock with Bubbles as requested */}
      <BottomFloatingBar
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        language={language}
        unreadMessagesCount={unreadMessagesCount}
        shortageCount={shortageCount}
      />

      {/* Product Detail & Traceability Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          language={language}
          currentUser={currentUser}
          onClose={() => setSelectedProductForModal(null)}
          onSendMessageToProducer={(producerId, producerName, product, msg) => {
            handleSendMessage(producerId, producerName, msg, product.id);
          }}
        />
      )}

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
        language={language}
      />

      {/* Auth Modal (Login / Register with Producer or Buyer selection) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        language={language}
        initialMode={authModalMode}
      />

    </div>
  );
}
