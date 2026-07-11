export type PlayApp = {
  id: string;            // package name, e.g. "com.instagram.android"
  name: string;
  slug: string;
  icon: string;
  category: string;
  genres: string[];
  rating: number | null;
  reviews: number;
  installs: number;      // parsed min install count
  installsText: string;  // e.g. "1,000,000,000+"
  type: "Free" | "Paid";
  price: number;
  developer: string;
  contentRating: string;
  lastUpdated: string;
};
