import React, { useState } from 'react';
import { X, Phone, MessageSquare, MapPin, Calendar, ShieldCheck, CheckCircle2, Package, Sparkles, Send } from 'lucide-react';
import { Product, Language, User } from '../types';
import { translations } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  language: Language;
  currentUser: User | null;
  onSendMessageToProducer: (producerId: string, producerName: string, product: Product, messageText: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  language,
  currentUser,
  onSendMessageToProducer
}) => {
  if (!product) return null;
  const t = translations[language];

  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customNote, setCustomNote] = useState('');

  const totalPriceCFA = product.priceCFA * orderQuantity;
  const totalPriceUSD = product.priceUSD * orderQuantity;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `[COMMANDE AGRIMARKET] Bonjour ${product.producerName}, je souhaite commander ${orderQuantity} x ${language === 'fr' ? product.unit : product.unitEn} de ${language === 'fr' ? product.name : product.nameEn} (Total: ${totalPriceCFA.toLocaleString()} FCFA). ${customNote}`;
    onSendMessageToProducer(product.producerId, product.producerName, product, message);
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
    }, 4000);
  };

  const cleanPhone = product.producerPhone.replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Bonjour ${product.producerName}, je vous contacte via Agrifamily pour votre offre de ${product.name}.`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-neutral-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 uppercase">
              {language === 'fr' ? product.categoryLabelFr : product.categoryLabelEn}
            </span>
            <span className="text-xs text-neutral-500">
              {t.batchNum} : <strong className="font-mono text-neutral-800">{product.traceability.batchNumber}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Main Showcase Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Product Image */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100 aspect-4/3 border border-neutral-200 shadow-inner">
              <img
                src={product.image}
                alt={language === 'fr' ? product.name : product.nameEn}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/75 backdrop-blur-md p-2.5 text-white flex items-center justify-between text-xs">
                <div>
                  <span className="text-emerald-400 font-bold">{product.quantityAvailable}</span> {t.remaining}
                </div>
                <div>
                  {t.shelfLifeRemaining} : <span className="font-bold text-amber-300">{product.shelfLifeDays} {t.days}</span>
                </div>
              </div>
            </div>

            {/* Product Title & Producer Quick Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 leading-tight">
                  {language === 'fr' ? product.name : product.nameEn}
                </h2>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {language === 'fr' ? product.descriptionFr : product.descriptionEn}
                </p>
              </div>

              {/* Price card */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200/80 p-4">
                <div className="text-xs text-emerald-800 font-medium">{t.totalPrice} :</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-emerald-950 tabular-nums">
                    {product.priceCFA.toLocaleString()} FCFA
                  </span>
                  <span className="text-sm font-semibold text-emerald-700">
                    (~{product.priceUSD} USD)
                  </span>
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  {language === 'fr' ? product.unit : product.unitEn}
                </div>
              </div>

              {/* Producer Details Box (Mandatory Requirement) */}
              <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {language === 'fr' ? 'Fiche Producteur Local' : 'Local Farmer Profile'}
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-lg">
                    {product.producerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">
                      {product.producerName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{product.producerLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Producer Phone Number & Instant Contact */}
                <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">{t.phoneNumber} :</span>
                    <strong className="text-neutral-900 font-mono text-sm tracking-wide">
                      {product.producerPhone}
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900 py-2.5 px-3 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-xs"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{t.callNow}</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 px-3 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{t.whatsappMessage}</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Traceability & Origin Section (Mandatory Requirement) */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-neutral-900 text-base">
                {t.originAndTraceability}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-500 font-medium">{t.originRegion} :</span>
                <p className="font-semibold text-neutral-800 bg-white p-2.5 rounded-xl border border-neutral-200">
                  {product.traceability.originRegion}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-500 font-medium">{t.harvestedOn} :</span>
                <p className="font-semibold text-neutral-800 bg-white p-2.5 rounded-xl border border-neutral-200">
                  {product.harvestDate} ({product.shelfLifeDays} {t.days} {t.shelfLifeRemaining})
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-500 font-medium">{t.farmingMethod} :</span>
                <p className="font-semibold text-neutral-800 bg-white p-2.5 rounded-xl border border-neutral-200">
                  {language === 'fr' ? product.traceability.farmingMethod : product.traceability.farmingMethodEn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-500 font-medium">{t.harvestTechnique} :</span>
                <p className="font-semibold text-neutral-800 bg-white p-2.5 rounded-xl border border-neutral-200">
                  {language === 'fr' ? product.traceability.harvestMethod : product.traceability.harvestMethodEn}
                </p>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-neutral-500 font-medium">{t.storageWay} :</span>
                <p className="font-semibold text-neutral-800 bg-white p-2.5 rounded-xl border border-neutral-200">
                  {language === 'fr' ? product.traceability.storageConditions : product.traceability.storageConditionsEn}
                </p>
              </div>
            </div>

            {product.traceability.certifications && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
                <span className="text-xs text-neutral-500 font-medium">Garanties :</span>
                {product.traceability.certifications.map((cert, idx) => (
                  <span key={idx} className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Direct Order Form */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
            <h3 className="font-bold text-neutral-900 text-base mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-600" />
              <span>{t.orderThisHarvest}</span>
            </h3>

            {orderSuccess ? (
              <div className="rounded-xl bg-emerald-600 text-white p-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div className="text-sm font-semibold">
                  {t.orderSuccessMessage}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.orderQuantity} ({language === 'fr' ? product.unit : product.unitEn})
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.quantityAvailable}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.min(product.quantityAvailable, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="h-10 w-20 rounded-xl bg-white border border-neutral-300 text-center font-bold tabular-nums text-neutral-900"
                      />
                      <button
                        type="button"
                        onClick={() => setOrderQuantity(Math.min(product.quantityAvailable, orderQuantity + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.totalPrice} :
                    </label>
                    <div className="h-10 flex items-center">
                      <span className="text-2xl font-black text-emerald-800 tabular-nums">
                        {totalPriceCFA.toLocaleString()} FCFA
                      </span>
                      <span className="text-xs text-neutral-500 ml-2">
                        (~{totalPriceUSD} USD)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'fr' ? 'Précisions pour la livraison ou le point de retrait' : 'Delivery details or pickup notes'}
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder={language === 'fr' ? 'Ex: Livraison souhaitée demain 8h à notre dépôt...' : 'E.g., Pickup tomorrow at 8 AM at central depot...'}
                    className="w-full rounded-xl bg-white border border-neutral-300 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 px-4 text-sm font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.confirmOrderRequest} ({totalPriceCFA.toLocaleString()} FCFA)</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
