import React, { useState } from 'react';
import { Boxes, AlertTriangle, Sparkles, Plus, Edit2, Check, X, ShieldAlert, ArrowUpRight, TrendingDown } from 'lucide-react';
import { Product, Language, User } from '../types';
import { translations } from '../data/translations';
import defaultHarvestImg from '../assets/images/agri_tomatoes_harvest_1790423474584.jpg';

interface SmartInventoryProps {
  products: Product[];
  currentUser: User | null;
  language: Language;
  onUpdateProductQuantity: (productId: string, newQuantity: number) => void;
  onUpdateProductDetails: (updatedProduct: Product) => void;
  onAddNewProduct: (newProduct: Product) => void;
  onSwitchToProducer: () => void;
}

export const SmartInventory: React.FC<SmartInventoryProps> = ({
  products,
  currentUser,
  language,
  onUpdateProductQuantity,
  onUpdateProductDetails,
  onAddNewProduct,
  onSwitchToProducer
}) => {
  const t = translations[language];

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editQuantityVal, setEditQuantityVal] = useState<number>(0);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newTitleFr, setNewTitleFr] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<'legumes' | 'tubercules' | 'fruits' | 'cereales' | 'epices'>('legumes');
  const [newPriceCFA, setNewPriceCFA] = useState<number>(6500);
  const [newUnitFr, setNewUnitFr] = useState('Sac de 25 kg');
  const [newQuantity, setNewQuantity] = useState<number>(30);
  const [newThreshold, setNewThreshold] = useState<number>(10);
  const [newShelfLife, setNewShelfLife] = useState<number>(10);
  const [newHarvestDate, setNewHarvestDate] = useState('2026-09-26');
  const [newOrigin, setNewOrigin] = useState('Foumbot, Région de l’Ouest');

  // Filter products for the current producer or show all demo producer inventory
  const producerProducts = currentUser?.role === 'producer'
    ? products
    : products; // In demo view, display all to allow immediate testing

  const shortageItems = producerProducts.filter(p => p.quantityAvailable <= p.minShortageThreshold);
  const urgentItems = producerProducts.filter(p => p.isUrgentAntiWaste || p.shelfLifeDays <= 6);

  const startEdit = (product: Product) => {
    setEditingProductId(product.id);
    setEditQuantityVal(product.quantityAvailable);
    setEditPriceVal(product.priceCFA);
  };

  const saveEdit = (product: Product) => {
    onUpdateProductDetails({
      ...product,
      quantityAvailable: editQuantityVal,
      priceCFA: editPriceVal,
      priceUSD: Math.round(editPriceVal / 600)
    });
    setEditingProductId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleFr) return;

    const newProd: Product = {
      id: `prod_${Date.now()}`,
      name: newTitleFr,
      nameEn: newTitleEn || newTitleFr,
      category: newCategory,
      categoryLabelFr: newCategory.charAt(0).toUpperCase() + newCategory.slice(1),
      categoryLabelEn: newCategory.charAt(0).toUpperCase() + newCategory.slice(1),
      priceCFA: newPriceCFA,
      priceUSD: Math.round(newPriceCFA / 600),
      unit: newUnitFr,
      unitEn: newUnitFr,
      quantityAvailable: newQuantity,
      minShortageThreshold: newThreshold,
      harvestDate: newHarvestDate,
      shelfLifeDays: newShelfLife,
      image: defaultHarvestImg,
      producerId: currentUser?.id || 'usr_prod_1',
      producerName: currentUser?.name || 'Mama Aïssatou Fofana',
      producerLocation: currentUser?.location || newOrigin,
      producerPhone: currentUser?.phone || '+237 6 99 45 12 30',
      traceability: {
        originRegion: newOrigin,
        farmingMethod: 'Agriculture biologique locale respectueuse des sols',
        farmingMethodEn: 'Sustainable organic local agriculture',
        harvestMethod: 'Cueillette manuelle de fraîcheur',
        harvestMethodEn: 'Fresh hand-picked harvest',
        batchNumber: `AF-LOT-${Date.now().toString().slice(-4)}`,
        storageConditions: 'Stockage à température tempérée, cagettes aérées',
        storageConditionsEn: 'Temperature-controlled, ventilated crates'
      },
      descriptionFr: 'Récolte fraîche locale directement issue de nos parcelles.',
      descriptionEn: 'Fresh local harvest harvested straight from our fields.'
    };

    onAddNewProduct(newProd);
    setIsAddModalOpen(false);
    setNewTitleFr('');
    setNewTitleEn('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Role Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              {t.smartInventoryTitle}
            </h2>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {t.smartInventorySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser?.role !== 'producer' && (
            <button
              onClick={onSwitchToProducer}
              className="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              {t.switchRoleToProducer}
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t.addNewProduce}</span>
          </button>
        </div>
      </div>

      {/* Smart Alert Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Shortage Alarm Box */}
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-red-950 text-sm">
                {language === 'fr' ? 'Surveillance Automatique des Pénuries' : 'Automated Shortage Monitoring'}
              </h3>
              <p className="mt-1 text-xs text-red-800">
                {shortageItems.length > 0 ? (
                  <>
                    <strong className="font-bold">{shortageItems.length} {language === 'fr' ? 'produit(s) en rupture imminente :' : 'product(s) in shortage :'}</strong>{' '}
                    {shortageItems.map(p => language === 'fr' ? p.name : p.nameEn).join(', ')}.
                  </>
                ) : (
                  language === 'fr' ? 'Aucune pénurie détectée. Tous vos stocks dépassent le seuil de sécurité.' : 'No shortages detected. All inventory exceeds safety levels.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Post-harvest Waste Prevention Box */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-950 text-sm">
                {language === 'fr' ? 'Garde-Manger Zéro Perte Post-Récolte' : 'Zero Post-Harvest Loss Guard'}
              </h3>
              <p className="mt-1 text-xs text-amber-800">
                {urgentItems.length > 0 ? (
                  <>
                    <strong className="font-bold">{urgentItems.length} {language === 'fr' ? 'lot(s) à commercialiser sous 5 jours :' : 'batch(es) to distribute within 5 days :'}</strong>{' '}
                    {urgentItems.map(p => language === 'fr' ? p.name : p.nameEn).join(', ')}.
                  </>
                ) : (
                  language === 'fr' ? 'Fraîcheur optimale sur l’ensemble de vos récoltes stockées.' : 'Optimal freshness across all registered harvest stock.'
                )}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Producer's Inventory Table / Cards */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-3.5 flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <span>{language === 'fr' ? 'Récolte & Spécifications' : 'Crop & Details'}</span>
          <span>{t.actions}</span>
        </div>

        <div className="divide-y divide-neutral-100">
          {producerProducts.map((prod) => {
            const isShort = prod.quantityAvailable <= prod.minShortageThreshold;
            const isEditing = editingProductId === prod.id;

            return (
              <div key={prod.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/60 transition-colors">
                
                {/* Product thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isShort && (
                      <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-[9px] font-bold">
                        !
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-neutral-900 text-base">
                        {language === 'fr' ? prod.name : prod.nameEn}
                      </h4>
                      {isShort ? (
                        <span className="rounded-md bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5">
                          {t.statusShortage}
                        </span>
                      ) : (
                        <span className="rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          {t.statusOptimal}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span>{language === 'fr' ? prod.categoryLabelFr : prod.categoryLabelEn}</span>
                      <span>·</span>
                      <span>{t.harvestedOn} {prod.harvestDate}</span>
                      <span>·</span>
                      <span className="text-amber-700 font-medium">{prod.shelfLifeDays} {t.days} {t.shelfLifeRemaining}</span>
                      <span>·</span>
                      <span className="font-mono text-neutral-400">{prod.traceability.batchNumber}</span>
                    </div>

                    <div className="mt-1 text-xs text-neutral-600">
                      {language === 'fr' ? 'Conditionnement :' : 'Packaging :'} <strong className="text-neutral-800">{language === 'fr' ? prod.unit : prod.unitEn}</strong>
                    </div>
                  </div>
                </div>

                {/* Stock values & Inline Editor */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-end md:self-center">
                  
                  {isEditing ? (
                    <div className="flex items-center gap-3 bg-neutral-100 p-2 rounded-xl border border-neutral-300">
                      <div>
                        <label className="block text-[10px] font-semibold text-neutral-500">
                          {t.stockLevel}
                        </label>
                        <input
                          type="number"
                          value={editQuantityVal}
                          onChange={(e) => setEditQuantityVal(parseInt(e.target.value) || 0)}
                          className="h-8 w-20 rounded-lg bg-white border border-neutral-300 px-2 text-center font-bold text-neutral-900 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-neutral-500">
                          Prix (CFA)
                        </label>
                        <input
                          type="number"
                          value={editPriceVal}
                          onChange={(e) => setEditPriceVal(parseInt(e.target.value) || 0)}
                          className="h-8 w-24 rounded-lg bg-white border border-neutral-300 px-2 text-center font-bold text-neutral-900 text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-1 mt-3">
                        <button
                          onClick={() => saveEdit(prod)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                          title={t.saveChanges}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-300 text-neutral-700 hover:bg-neutral-400"
                          title={t.cancel}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Price display */}
                      <div className="text-right">
                        <div className="text-base font-extrabold text-neutral-900 tabular-nums">
                          {prod.priceCFA.toLocaleString()} FCFA
                        </div>
                        <div className="text-xs text-neutral-400">
                          ~{prod.priceUSD}$ USD
                        </div>
                      </div>

                      {/* Stock Level with Quick +/- */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateProductQuantity(prod.id, Math.max(0, prod.quantityAvailable - 5))}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200"
                          title="-5"
                        >
                          -5
                        </button>

                        <div className="text-center min-w-16">
                          <div className={`text-base font-bold tabular-nums ${isShort ? 'text-red-600' : 'text-emerald-700'}`}>
                            {prod.quantityAvailable}
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            (Seuil: {prod.minShortageThreshold})
                          </div>
                        </div>

                        <button
                          onClick={() => onUpdateProductQuantity(prod.id, prod.quantityAvailable + 5)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200"
                          title="+5"
                        >
                          +5
                        </button>
                      </div>

                      {/* Edit Button */}
                      <button
                        onClick={() => startEdit(prod)}
                        className="flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-neutral-500" />
                        <span>{t.editQuantity}</span>
                      </button>
                    </>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add Produce Batch Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-lg">
                {t.addNewProduce}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {language === 'fr' ? 'Nom du produit (Français)' : 'Product Name (French)'} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitleFr}
                  onChange={(e) => setNewTitleFr(e.target.value)}
                  placeholder="Ex: Poivrons Rouges Doux & Légumes verts"
                  className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {language === 'fr' ? 'Nom du produit (Anglais optionnel)' : 'Product Name (English)'}
                </label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="Ex: Sweet Bell Peppers & Fresh Greens"
                  className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'fr' ? 'Catégorie' : 'Category'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="legumes">{language === 'fr' ? 'Légumes maraîchers' : 'Vegetables'}</option>
                    <option value="tubercules">{language === 'fr' ? 'Tubercules & Féculents' : 'Tubers & Roots'}</option>
                    <option value="fruits">{language === 'fr' ? 'Fruits frais' : 'Fruits'}</option>
                    <option value="cereales">{language === 'fr' ? 'Céréales & Grains' : 'Grains'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'fr' ? 'Conditionnement / Unité' : 'Packaging / Unit'}
                  </label>
                  <input
                    type="text"
                    value={newUnitFr}
                    onChange={(e) => setNewUnitFr(e.target.value)}
                    placeholder="Ex: Caisse de 20 kg"
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    value={newPriceCFA}
                    onChange={(e) => setNewPriceCFA(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'fr' ? 'Quantité' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'fr' ? 'Seuil Pénurie' : 'Min Alert'}
                  </label>
                  <input
                    type="number"
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none text-red-600 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.harvestedOn}
                  </label>
                  <input
                    type="date"
                    value={newHarvestDate}
                    onChange={(e) => setNewHarvestDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 p-2 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.shelfLifeRemaining} ({t.days})
                  </label>
                  <input
                    type="number"
                    value={newShelfLife}
                    onChange={(e) => setNewShelfLife(parseInt(e.target.value) || 7)}
                    className="w-full rounded-xl border border-neutral-300 p-2 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.originRegion}
                </label>
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                >
                  {language === 'fr' ? 'Enregistrer dans mon inventaire' : 'Add to my inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
