export interface Apartment {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  additionalInfo?: string;
  capacity: number;
  minNights: number;
  features: string[];
  images: string[];
  heroImage: string;
  heroImagePosition?: string;
  icalUrl?: string;
  bookingUrl?: string;
  reviewsUrl?: string;
  videoUrl?: string;
  videoStartTime?: number;
  enableAnimation?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code?: string;
  discount?: string;
  validUntil?: string;
  active: boolean;
}

export interface Review {
  id: string;
  name: string;
  country?: string;
  rating: number;
  text: string;
  apartment?: string;
  date?: string;
  active: boolean;
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
  favicon: string;
  googleAnalyticsId: string;
  googleAdsId: string;
  googleAdsConversionId: string;
  facebookPixelId: string;
  googleTagManagerId: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  robotsTxt: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  tripadvisor?: string;
  airbnb?: string;
  booking?: string;
  googleReviews?: string;
  livroReclamacoes?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundImages?: string[];
    videoUrl?: string;
    videoStartTime?: number;
    enableAnimation?: boolean;
  };
  about: {
    title: string;
    description: string;
    image: string;
    videoUrl?: string;
    videoStartTime?: number;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    nif: string;
    companyName: string;
  };
  promotions?: Promotion[];
  reviews?: Review[];
  seo?: SeoSettings;
  socialLinks?: SocialLinks;
  bookingUrl: string;
  apartments: Apartment[];
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
