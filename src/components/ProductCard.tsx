import React from 'react';
import { MapPin, Phone, ShieldCheck, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onSelectProduct: (product: Product) => void;
  onContactProducer: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onSelectProduct,
  onContactProducer
}) => {
  const t = translations[language];
  const isShortage = product.quantityAvailable <= product.minShortageThreshold;
  const isUrgent = product.isUrgentAntiWaste || product.shelfLifeDays <= 6;

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => onSelectProduct(product)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={language === 'fr' ? product.name : product.nameEn}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Anti-waste / Shortage flags overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isUrgent && (
            <div className="flex items-center gap-1 rounded-md bg-amber-500/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
              <Sparkles className="h-3 w-3" />
              <span>{t.antiWasteLabel}</span>
            </div>
          )}
          {isShortage && (
            <div className="flex items-center gap-1 rounded-md bg-rose-600/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
              <AlertTriangle className="h-3 w-3" />
              <span>{t.shortageWarning}</span>
            </div>
          )}
        </div>

        {/* Shelf-life indicator */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/65 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-white">
          <Clock className="h-3 w-3 text-emerald-400" />
          <span>{product.shelfLifeDays} {t.days} {t.shelfLifeRemaining}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        
        {/* Category & Region */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
          <span className="font-semibold text-emerald-700 tracking-wide uppercase text-[10px]">
            {language === 'fr' ? product.categoryLabelFr : product.categoryLabelEn}
          </span>
          <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
            <MapPin className="h-3 w-3 text-neutral-400" />
            <span className="truncate max-w-[140px]">{product.producerLocation}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-neutral-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {language === 'fr' ? product.name : product.nameEn}
        </h3>

        {/* Producer identification */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            {product.producerName.charAt(0)}
          </div>
          <div className="text-xs text-neutral-700 font-medium truncate">
            {product.producerName}
          </div>
        </div>

        {/* Price & Unit */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-neutral-900 tabular-nums">
                {product.priceCFA.toLocaleString()} FCFA
              </span>
              <span className="text-xs text-neutral-500 font-normal">
                (~{product.priceUSD}$)
              </span>
            </div>
            <div className="text-xs text-neutral-500">
              {language === 'fr' ? product.unit : product.unitEn}
            </div>
          </div>

          <div className="text-right">
            <span className={`text-xs font-semibold tabular-nums ${isShortage ? 'text-rose-600' : 'text-emerald-700'}`}>
              {product.quantityAvailable} {t.remaining}
            </span>
            <div className="text-[10px] text-neutral-400">
              {t.harvestedOn} {product.harvestDate}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-2 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 rounded-xl bg-neutral-100 py-2 px-3 text-xs font-semibold text-neutral-800 hover:bg-neutral-200 transition-colors text-center"
          >
            {t.viewDetails}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onContactProducer(product);
            }}
            className="rounded-xl bg-emerald-600 p-2 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            title={`${t.callNow} ${product.producerPhone}`}
          >
            <Phone className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
