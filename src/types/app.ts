export type ProductivityFeatures = {
  offlineMode?: boolean;
  cloudSync?: boolean;
  collaboration?: boolean;
};

export type CommunicationFeatures = {
  readReceipts?: boolean;
  voiceCall?: boolean;
  videoCall?: boolean;
  e2eEncryption?: boolean;
};

export type SocialFeatures = {
  stories?: boolean;
  directMessaging?: boolean;
  liveStreaming?: boolean;
  groupChats?: boolean;
};

export type EntertainmentFeatures = {
  offlineDownload?: boolean;
  ads?: boolean;
  premiumContent?: boolean;
};

export type GameFeatures = {
  multiplayer?: boolean;
  offline?: boolean;
  controller?: boolean;
  inAppPurchases?: boolean;
};

export type CategoryFeatures =
  | { category: "Productivity"; features: ProductivityFeatures }
  | { category: "Communication"; features: CommunicationFeatures }
  | { category: "Social"; features: SocialFeatures }
  | { category: "Entertainment"; features: EntertainmentFeatures }
  | { category: "Games"; features: GameFeatures }
  | { category: string; features?: Record<string, unknown> };

export type PlayApp = {
  id: string;            // package name, e.g. "com.instagram.android"
  name: string;
  slug: string;
  icon: string;
  genres: string[];
  rating: number | null;
  reviews: number;
  installs: number;
  type: "Free" | "Paid";
  price: number;
  developer: string;
  contentRating: string;
  lastUpdated: string;
} & CategoryFeatures;
