export type Language = 'fr' | 'en';

export type UserRole = 'producer' | 'buyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  location: string;
  farmOrBusinessName?: string;
  bio?: string;
  avatar?: string;
  subscriptionPlan: 'free' | 'monthly' | 'annual';
  subscriptionExpiry?: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: 'legumes' | 'tubercules' | 'fruits' | 'cereales' | 'epices';
  categoryLabelFr: string;
  categoryLabelEn: string;
  priceCFA: number;
  priceUSD: number;
  unit: string;
  unitEn: string;
  quantityAvailable: number;
  minShortageThreshold: number;
  harvestDate: string;
  shelfLifeDays: number;
  image: string;
  producerId: string;
  producerName: string;
  producerLocation: string;
  producerPhone: string;
  producerAvatar?: string;
  traceability: {
    originRegion: string;
    farmingMethod: string;
    farmingMethodEn: string;
    harvestMethod: string;
    harvestMethodEn: string;
    batchNumber: string;
    storageConditions: string;
    storageConditionsEn: string;
    certifications?: string[];
  };
  descriptionFr: string;
  descriptionEn: string;
  isUrgentAntiWaste?: boolean;
}

export interface AppNotification {
  id: string;
  titleFr: string;
  titleEn: string;
  messageFr: string;
  messageEn: string;
  time: string;
  read: boolean;
  type: 'shortage' | 'waste_risk' | 'order' | 'message' | 'payment';
  targetTab?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  productId?: string;
  productName?: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorLocation: string;
  contentFr: string;
  contentEn: string;
  timestamp: string;
  likes: number;
  topic: 'conservation' | 'marche' | 'recolte' | 'general';
}

export interface SubscriptionPlan {
  id: 'free' | 'monthly' | 'annual';
  nameFr: string;
  nameEn: string;
  priceUSD: number;
  priceCFA: number;
  durationFr: string;
  durationEn: string;
  featuresFr: string[];
  featuresEn: string[];
  recommended?: boolean;
}
