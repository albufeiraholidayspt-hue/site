export interface Apartment {
  id: string;
  name: string;
  name_en?: string;
  name_fr?: string;
  name_de?: string;
  slug: string;
  tagline: string;
  tagline_en?: string;
  tagline_fr?: string;
  tagline_de?: string;
  description: string;
  description_en?: string;
  description_fr?: string;
  description_de?: string;
  additionalInfo?: string;
  additionalInfo_en?: string;
  additionalInfo_fr?: string;
  additionalInfo_de?: string;
  capacity: number;
  minNights: number;
  minNightsByMonth?: {
    january?: number;
    february?: number;
    march?: number;
    april?: number;
    may?: number;
    june?: number;
    july?: number;
    august?: number;
    september?: number;
    october?: number;
    november?: number;
    december?: number;
  };
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
  ogImage?: string;
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
  text_en?: string;
  text_fr?: string;
  text_de?: string;
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

export interface PartialSeoSettings extends Partial<SeoSettings> {}

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

export interface AlgarveGalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'beach' | 'city' | 'landscape';
  featured?: boolean;
  imagePosition?: string; // object-position CSS value
  enabledInHero?: boolean; // Se deve aparecer no slideshow do hero
  heroOrder?: number; // Ordem no slideshow
  googleMapsUrl?: string; // Link direto do Google Maps
}

export interface AlgarveContent {
  hero?: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  video?: {
    title: string;
    description: string;
    youtubeUrl: string;
    thumbnail?: string;
    enabledInHero?: boolean; // Se o vídeo deve aparecer no slideshow do hero
    heroOrder?: number; // Ordem no slideshow
  };
  introduction?: {
    title: string;
    description: string;
    statsImage?: string;
  };
  beaches?: {
    title: string;
    description: string;
    blueFlagCount: number;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    items?: Array<{
      name: string;
      description: string;
      imageUrl?: string;
      googleMapsUrl?: string;
      awards?: string[];
    }>;
  };
  climate?: {
    title: string;
    description: string;
    temperatureRange: string;
    seaTemperature: string;
    rainySeason: string;
    chartImage?: string;
  };
  activities?: {
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
      imageUrl?: string;
      googleMapsUrl?: string;
    }>;
  };
  golf?: {
    title: string;
    description: string;
    backgroundImage?: string;
    imageUrl?: string; // Imagem ao lado do texto
    imagePosition?: string; // Posição da imagem (left ou right)
    googleMapsUrl?: string; // Link do Google Maps
  };
  travel?: {
    title: string;
    description: string;
    methods: Array<{
      icon: string;
      title: string;
      description: string;
      imageUrl?: string;
      googleMapsUrl?: string;
    }>;
  };
  gallery?: {
    title: string;
    description: string;
    images: AlgarveGalleryImage[];
    stats: Array<{
      value: string;
      label: string;
      color: string;
    }>;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
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
  algarve?: AlgarveContent;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
