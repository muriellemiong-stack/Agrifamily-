import { Product, AppNotification, ChatMessage, CommunityComment, SubscriptionPlan, User } from '../types';
import tomatoesImg from '../assets/images/agri_tomatoes_harvest_1790423474584.jpg';
import plantainsImg from '../assets/images/agri_plantains_tubers_1790423489320.jpg';
import tropicalFruitsImg from '../assets/images/agri_tropical_fruits_1790423508479.jpg';
import maizeGrainsImg from '../assets/images/agri_maize_grains_1790423518976.jpg';

export const INITIAL_USER: User = {
  id: 'usr_prod_1',
  name: 'Mama Aïssatou Fofana',
  email: 'aissatou.ferme@agrifamily.org',
  role: 'producer',
  phone: '+237 6 99 45 12 30',
  location: 'Foumbot, Région de l’Ouest, Cameroun',
  farmOrBusinessName: 'Ferme Biologique des Terres Fertiles',
  bio: 'Productrice maraîchère engagée depuis 14 ans. Spécialisée en cultures saines sans pesticides chimiques pour lutter contre les pertes de récoltes.',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  subscriptionPlan: 'monthly',
  subscriptionExpiry: '2026-10-25'
};

export const DEMO_BUYER: User = {
  id: 'usr_buyer_1',
  name: 'Chef David Mballa',
  email: 'david.leterroir@restauration.cm',
  role: 'buyer',
  phone: '+237 6 77 82 91 04',
  location: 'Bastos, Yaoundé, Cameroun',
  farmOrBusinessName: 'Hôtel-Restaurant Le Terroir & Saveurs',
  bio: 'Acheteur grossiste et chef cuisinier cherchant des produits du terroir ultra-frais en direct des producteurs pour réduire les intermédiaires.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  subscriptionPlan: 'free'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Tomates Rondes Fraîches & Piments de Plein Champ',
    nameEn: 'Fresh Vine Tomatoes & Field Hot Peppers',
    category: 'legumes',
    categoryLabelFr: 'Légumes Maraîchers',
    categoryLabelEn: 'Fresh Vegetables',
    priceCFA: 8500,
    priceUSD: 14,
    unit: 'Caisse de 25 kg',
    unitEn: 'Crate of 25 kg',
    quantityAvailable: 45,
    minShortageThreshold: 15,
    harvestDate: '2026-09-24',
    shelfLifeDays: 7,
    image: tomatoesImg,
    producerId: 'usr_prod_1',
    producerName: 'Mama Aïssatou Fofana',
    producerLocation: 'Foumbot (Vallée du Noun, Ouest)',
    producerPhone: '+237 6 99 45 12 30',
    traceability: {
      originRegion: 'Vallée Maraîchère du Noun, Ouest Cameroun',
      farmingMethod: 'Agriculture raisonnée, fertilisation organique à base de compost et fientes',
      farmingMethodEn: 'Sustainable farming, organic fertilization using local compost',
      harvestMethod: 'Cueillette manuelle à maturité commerciale optimale le matin à 6h',
      harvestMethodEn: 'Hand-picked at peak ripeness at dawn to preserve firmness',
      batchNumber: 'AF-NOUN-2026-09-T24',
      storageConditions: 'Cagettes aérées sur palettes en hangar ombragé à 18°C',
      storageConditionsEn: 'Ventilated crates on pallets in shaded 18°C storage',
      certifications: ['Origine Terroir Garanti', 'Traçabilité Zéro Perte']
    },
    descriptionFr: 'Tomates fermes à chair dense cueillies à l’aube pour éviter les chocs thermiques. Parfaites pour la restauration et les marchés urbains. Stock limité pour éviter le surstockage.',
    descriptionEn: 'Firm vine-ripened tomatoes harvested at dawn to maintain freshness and avoid thermal degradation. Ideal for restaurants and local distributors.',
    isUrgentAntiWaste: true
  },
  {
    id: 'prod_2',
    name: 'Plantains Grands Régimes & Manioc Doux Frais',
    nameEn: 'Fresh Green Plantains & Sweet Cassava Tubers',
    category: 'tubercules',
    categoryLabelFr: 'Tubercules & Féculents',
    categoryLabelEn: 'Tubers & Roots',
    priceCFA: 12000,
    priceUSD: 20,
    unit: 'Lot de 5 grands régimes (45 kg)',
    unitEn: 'Batch of 5 bunches (45 kg)',
    quantityAvailable: 65,
    minShortageThreshold: 15,
    harvestDate: '2026-09-25',
    shelfLifeDays: 14,
    image: plantainsImg,
    producerId: 'usr_prod_2',
    producerName: 'Coopérative Agro-Pastorale d’Obala',
    producerLocation: 'Obala (Région du Centre)',
    producerPhone: '+237 6 72 31 18 90',
    traceability: {
      originRegion: 'Bassin forestier d’Obala et Sa’a, Centre',
      farmingMethod: 'Agroforesterie sous couvert d’arbres d’ombrage, zéro herbicide',
      farmingMethodEn: 'Agroforestry under canopy trees, strictly zero synthetic herbicides',
      harvestMethod: 'Coupe traditionnelle au coupe-coupe désinfecté',
      harvestMethodEn: 'Traditional harvest using sanitized machetes',
      batchNumber: 'AF-OBL-2026-09-P02',
      storageConditions: 'Hangar ventilé au sec, protection contre l’humidité du sol',
      storageConditionsEn: 'Dry ventilated shed, raised pallets off ground humidity',
      certifications: ['Culture Vivrière Équitable']
    },
    descriptionFr: 'Plantains verts à maturité parfaite pour braisage, friture ou chips, accompagnés de manioc doux récolté à la commande. Excellente conservation garantie.',
    descriptionEn: 'Premium green plantains and sweet cassava tubers freshly harvested upon order confirmation. Extended shelf life guaranteed.'
  },
  {
    id: 'prod_3',
    name: 'Mangues Sauvages, Ananas Pain de Sucre & Avocats Beurre',
    nameEn: 'Sweet Sugarloaf Pineapples, Mangoes & Butter Avocados',
    category: 'fruits',
    categoryLabelFr: 'Fruits Tropicaux Frais',
    categoryLabelEn: 'Tropical Fresh Fruits',
    priceCFA: 15000,
    priceUSD: 25,
    unit: 'Carton assorti fraîcheur (30 kg)',
    unitEn: 'Fresh fruit crate (30 kg)',
    quantityAvailable: 12,
    minShortageThreshold: 15, // Shortage alert active!
    harvestDate: '2026-09-24',
    shelfLifeDays: 5,
    image: tropicalFruitsImg,
    producerId: 'usr_prod_3',
    producerName: 'Vergers Royaux du Moungo',
    producerLocation: 'Njombé-Penja (Région du Littoral)',
    producerPhone: '+237 6 94 10 55 67',
    traceability: {
      originRegion: 'Sols volcaniques du Mont Koupé, Moungo',
      farmingMethod: 'Culture fruitière écologique avec pièges à phéromones naturels',
      farmingMethodEn: 'Ecological orchards using natural pheromone bio-traps',
      harvestMethod: 'Récolte délicate au panier matelassé pour éviter les meurtrissures',
      harvestMethodEn: 'Hand-picked into cushioned crates to avoid bruising and spoilage',
      batchNumber: 'AF-MNG-2026-09-F88',
      storageConditions: 'Chambre de ressuyage ventilée naturellement à 20°C',
      storageConditionsEn: 'Naturally ventilated curing room at 20°C',
      certifications: ['Terroir Volcanique Labellisé']
    },
    descriptionFr: 'Fruits gorgés de soleil au goût sucré intense. Grâce à Agrifamily, nous vendons ce lot sous 48h pour éliminer tout risque de pourriture post-récolte.',
    descriptionEn: 'Sun-ripened tropical fruit selection. Sourced directly to urban markets within 48h to prevent any post-harvest rot.',
    isUrgentAntiWaste: true
  },
  {
    id: 'prod_4',
    name: 'Maïs Doux en Épis & Céréales Séchées au Soleil',
    nameEn: 'Sweet Corn on the Cob & Sun-Dried Harvest Grains',
    category: 'cereales',
    categoryLabelFr: 'Céréales & Grains',
    categoryLabelEn: 'Grains & Cereals',
    priceCFA: 18000,
    priceUSD: 30,
    unit: 'Sac de conservation aéré (50 kg)',
    unitEn: 'Breathable storage bag (50 kg)',
    quantityAvailable: 110,
    minShortageThreshold: 25,
    harvestDate: '2026-09-22',
    shelfLifeDays: 60,
    image: maizeGrainsImg,
    producerId: 'usr_prod_4',
    producerName: 'Union Paysanne de la Bénoué',
    producerLocation: 'Garoua (Région du Nord)',
    producerPhone: '+237 6 51 09 33 21',
    traceability: {
      originRegion: 'Plaines de la Bénoué, Nord Cameroun',
      farmingMethod: 'Semences locales certifiées, travail du sol simplifié',
      farmingMethodEn: 'Certified local non-GMO seeds, conservation tillage',
      harvestMethod: 'Égrenage et séchage sur claies solaires hermétiques',
      harvestMethodEn: 'Solar-cured on raised hygienic drying racks under 12% moisture',
      batchNumber: 'AF-BEN-2026-09-C10',
      storageConditions: 'Sacs hermétiques anti-charançons en stockage sec',
      storageConditionsEn: 'Hermetic insect-proof bags in dry ventilated storehouse',
      certifications: ['Taux d’humidité contrôlé <12%']
    },
    descriptionFr: 'Maïs à grain plein et doré, séché sur claies surélevées pour prévenir les mycotoxines et aflatoxines. Idéal pour minoteries, moulins et alimentation.',
    descriptionEn: 'Sun-dried golden maize grains tested for moisture integrity to prevent post-harvest weevils and molds. Ready for bulk processing and direct delivery.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    titleFr: 'Inventaire Récoltes Sécurisé',
    titleEn: 'Harvest Inventory Secured',
    messageFr: 'Toutes vos récoltes en hangar disposent d’un stock optimal au-dessus des seuils de sécurité.',
    messageEn: 'All crops in storage currently have healthy stock levels above safety thresholds.',
    time: 'Il y a 12 min',
    read: false,
    type: 'message',
    targetTab: 'inventory'
  },
  {
    id: 'notif_2',
    titleFr: 'Action Anti-Gaspillage Recommandée',
    titleEn: 'Anti-Waste Action Recommended',
    messageFr: 'Le lot de Mangues Sauvages a été récolté il y a 3 jours. Contactez les acheteurs de votre zone pour vente prioritaire.',
    messageEn: 'Wild Mango batch was harvested 3 days ago. Connect with buyers in your area for expedited distribution.',
    time: 'Il y a 45 min',
    read: false,
    type: 'waste_risk',
    targetTab: 'inventory'
  },
  {
    id: 'notif_3',
    titleFr: 'Nouvelle demande d’achat',
    titleEn: 'New Purchase Inquiry',
    messageFr: 'Chef David Mballa vous a envoyé une proposition pour 3 cagettes de tomates fraîches.',
    messageEn: 'Chef David Mballa sent an order inquiry for 3 crates of fresh vine tomatoes.',
    time: 'Il y a 2 h',
    read: false,
    type: 'message',
    targetTab: 'inbox'
  },
  {
    id: 'notif_4',
    titleFr: 'Abonnement Mensuel Actif',
    titleEn: 'Monthly Subscription Active',
    messageFr: 'Paiement MTN Mobile Money validé pour 6 000 FCFA (10$). Accès illimité aux alertes inventaire.',
    messageEn: 'MTN Mobile Money payment confirmed for 6,000 CFA (10 USD). Full inventory protection enabled.',
    time: 'Hier',
    read: true,
    type: 'payment',
    targetTab: 'pricing'
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg_1',
    senderId: 'usr_buyer_1',
    senderName: 'Chef David Mballa (Restaurant Le Terroir)',
    recipientId: 'usr_prod_1',
    recipientName: 'Mama Aïssatou Fofana',
    productId: 'prod_1',
    productName: 'Tomates Rondes Fraîches',
    text: 'Bonjour Mama Aïssatou ! J’ai vu votre lot de tomates récolté ce matin. Pouvez-vous me livrer 3 caisses demain à Yaoundé Bastos ?',
    timestamp: '10:14',
    isMine: false
  },
  {
    id: 'msg_2',
    senderId: 'usr_prod_1',
    senderName: 'Mama Aïssatou Fofana',
    recipientId: 'usr_buyer_1',
    recipientName: 'Chef David Mballa',
    productId: 'prod_1',
    productName: 'Tomates Rondes Fraîches',
    text: 'Bonjour Chef David ! Oui parfaitement. Les cagettes sont bien aérées et fermes. Le transporteur quitte Foumbot à 5h du matin.',
    timestamp: '10:22',
    isMine: true
  },
  {
    id: 'msg_3',
    senderId: 'usr_buyer_1',
    senderName: 'Chef David Mballa',
    recipientId: 'usr_prod_1',
    recipientName: 'Mama Aïssatou Fofana',
    productId: 'prod_1',
    productName: 'Tomates Rondes Fraîches',
    text: 'Parfait ! Je vous règle par Orange Money à la réception. Merci pour la fraîcheur garantie !',
    timestamp: '10:28',
    isMine: false
  }
];

export const INITIAL_COMMENTS: CommunityComment[] = [
  {
    id: 'comm_1',
    authorName: 'Ing. Paul Nguema',
    authorRole: 'producer',
    authorLocation: 'Bafoussam',
    contentFr: 'Astuce contre les pertes post-récolte de tomates : ne jamais empiler plus de 3 couches de cagettes ajourées et stocker toujours à l’ombre d’un hangar ventilé avec un sol humidifié.',
    contentEn: 'Tip to avoid tomato post-harvest losses: never stack more than 3 ventilated crates and keep them in a naturally aerated shaded store with dampened floors.',
    timestamp: 'Il y a 3 heures',
    likes: 18,
    topic: 'conservation'
  },
  {
    id: 'comm_2',
    authorName: 'Clarisse Bekolo',
    authorRole: 'buyer',
    authorLocation: 'Douala Marché Sandaga',
    contentFr: 'Grâce à la traçabilité sur Agrifamily, nous achetons directement aux coopératives de l’Ouest. Moins de 3% de perte contre 25% autrefois chez les intermédiaires de rue.',
    contentEn: 'Thanks to traceability on Agrifamily, we buy straight from certified western cooperatives. Under 3% spoilage compared to 25% previously with street brokers.',
    timestamp: 'Il y a 6 heures',
    likes: 27,
    topic: 'marche'
  },
  {
    id: 'comm_3',
    authorName: 'Coopérative Sanaga',
    authorRole: 'producer',
    authorLocation: 'Édéa',
    contentFr: 'Pour le manioc doux, le trempage dans de la sciure propre et légèrement humide permet de conserver les tubercules fermes pendant 12 jours sans noircissement interne.',
    contentEn: 'For sweet cassava, packing in clean, slightly damp sawdust maintains crisp tubers for up to 12 days without vascular streaking deterioration.',
    timestamp: 'Hier',
    likes: 14,
    topic: 'conservation'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    nameFr: 'Accès Libre Limité',
    nameEn: 'Free Starter Access',
    priceUSD: 0,
    priceCFA: 0,
    durationFr: 'Gratuit pour toujours',
    durationEn: 'Free Forever',
    featuresFr: [
      'Consultation complète des récoltes du catalogue',
      'Contact direct avec jusqu’à 3 producteurs par mois',
      'Affichage des informations de traçabilité des produits',
      'Accès en lecture à l’espace communautaire'
    ],
    featuresEn: [
      'Full catalog harvest browsing',
      'Direct contact with up to 3 producers per month',
      'Product origin & traceability viewer',
      'Community discussion reading access'
    ]
  },
  {
    id: 'monthly',
    nameFr: 'Abonnement Mensuel Pro',
    nameEn: 'Monthly Pro Plan',
    priceUSD: 10,
    priceCFA: 6000,
    durationFr: 'Facturé 6 000 FCFA / mois',
    durationEn: 'Billed 6,000 CFA / month',
    recommended: true,
    featuresFr: [
      'Inventaire intelligent illimité pour producteurs',
      'Alertes en temps réel de pénuries & risques post-récolte',
      'Messagerie privée instantanée illimitée acheteurs/producteurs',
      'Mise en avant prioritaire de vos récoltes sur la plateforme',
      'Support téléphonique direct & assistance logistique'
    ],
    featuresEn: [
      'Unlimited smart inventory management for farmers',
      'Real-time automated shortage & spoilage warnings',
      'Unlimited private messaging between buyers & farmers',
      'Priority showcase badge on the marketplace',
      'Dedicated helpline & cold chain logistics support'
    ]
  },
  {
    id: 'annual',
    nameFr: 'Abonnement Annuel Zéro-Perte',
    nameEn: 'Annual Zero-Waste Plan',
    priceUSD: 25,
    priceCFA: 15000,
    durationFr: 'Facturé 15 000 FCFA / an (Économie de 58%)',
    durationEn: 'Billed 15,000 CFA / year (Save 58%)',
    featuresFr: [
      'Tous les avantages de l’Abonnement Mensuel Pro',
      'Badge officiel "Producteur Certifié Zéro-Perte"',
      'Génération de QR codes de traçabilité pour emballages',
      'Statistiques prédictives des cours du marché local',
      'Accès prioritaire aux groupements d’achats et exportateurs'
    ],
    featuresEn: [
      'All Monthly Pro features included',
      'Official "Zero-Waste Certified Producer" badge',
      'Batch QR code traceability generator for crates',
      'Market price trend forecasting insights',
      'Priority access to bulk institutional buyer tenders'
    ]
  }
];
