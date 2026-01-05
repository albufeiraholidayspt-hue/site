import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { SiteContent, User, Apartment, Promotion, SeoSettings, SocialLinks, Review } from '../types';
import { initialContent } from '../data/initialContent';

// Custom storage with error handling
const customStorage: StateStorage = {
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      // Try to clear old data and retry
      try {
        localStorage.removeItem(name);
        localStorage.setItem(name, value);
      } catch (retryError) {
        console.error('localStorage is full. Data may not persist.');
        alert('Aviso: O armazenamento local está cheio. Algumas alterações podem não ser guardadas. Considere usar URLs de imagens externas.');
      }
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

interface AppState {
  content: SiteContent;
  user: User;
  updateHero: (hero: Partial<SiteContent['hero']>) => void;
  updateAbout: (about: Partial<SiteContent['about']>) => void;
  updateContact: (contact: Partial<SiteContent['contact']>) => void;
  updateBookingUrl: (url: string) => void;
  updateApartment: (id: string, data: Partial<Apartment>) => void;
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (id: string, data: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, data: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  updateSeo: (seo: Partial<SeoSettings>) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resetContent: () => void;
}

// Função para fazer merge de apartamentos preservando dados existentes
const mergeApartments = (stored: Apartment[], initial: Apartment[]): Apartment[] => {
  return initial.map(initialApt => {
    const storedApt = stored.find(s => s.id === initialApt.id);
    if (storedApt) {
      // Preserva os dados do stored, mas adiciona novos campos do initial se não existirem
      return {
        ...initialApt,
        ...storedApt,
        // Garante que novos campos opcionais existem
        icalUrl: storedApt.icalUrl ?? initialApt.icalUrl ?? '',
        bookingUrl: storedApt.bookingUrl ?? initialApt.bookingUrl ?? '',
      };
    }
    return initialApt;
  });
};

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'albufeira2024',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      content: initialContent,
      user: {
        username: '',
        isAuthenticated: false,
      },
      updateHero: (hero) =>
        set((state) => ({
          content: {
            ...state.content,
            hero: { ...state.content.hero, ...hero },
          },
        })),
      updateAbout: (about) =>
        set((state) => ({
          content: {
            ...state.content,
            about: { ...state.content.about, ...about },
          },
        })),
      updateContact: (contact) =>
        set((state) => ({
          content: {
            ...state.content,
            contact: { ...state.content.contact, ...contact },
          },
        })),
      updateBookingUrl: (url) =>
        set((state) => ({
          content: {
            ...state.content,
            bookingUrl: url,
          },
        })),
      updateApartment: (id, data) =>
        set((state) => ({
          content: {
            ...state.content,
            apartments: state.content.apartments.map((apt) =>
              apt.id === id ? { ...apt, ...data } : apt
            ),
          },
        })),
      addPromotion: (promotion) =>
        set((state) => ({
          content: {
            ...state.content,
            promotions: [...(state.content.promotions || []), promotion],
          },
        })),
      updatePromotion: (id, data) =>
        set((state) => ({
          content: {
            ...state.content,
            promotions: (state.content.promotions || []).map((promo) =>
              promo.id === id ? { ...promo, ...data } : promo
            ),
          },
        })),
      deletePromotion: (id) =>
        set((state) => ({
          content: {
            ...state.content,
            promotions: (state.content.promotions || []).filter((promo) => promo.id !== id),
          },
        })),
      addReview: (review) =>
        set((state) => ({
          content: {
            ...state.content,
            reviews: [...(state.content.reviews || []), review],
          },
        })),
      updateReview: (id, data) =>
        set((state) => ({
          content: {
            ...state.content,
            reviews: (state.content.reviews || []).map((review) =>
              review.id === id ? { ...review, ...data } : review
            ),
          },
        })),
      deleteReview: (id) =>
        set((state) => ({
          content: {
            ...state.content,
            reviews: (state.content.reviews || []).filter((review) => review.id !== id),
          },
        })),
      updateSeo: (seo) =>
        set((state) => ({
          content: {
            ...state.content,
            seo: { ...initialContent.seo!, ...(state.content.seo || {}), ...seo } as typeof initialContent.seo,
          },
        })),
      updateSocialLinks: (links) =>
        set((state) => ({
          content: {
            ...state.content,
            socialLinks: { ...initialContent.socialLinks!, ...(state.content.socialLinks || {}), ...links } as typeof initialContent.socialLinks,
          },
        })),
      login: (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          set({ user: { username, isAuthenticated: true } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: { username: '', isAuthenticated: false } }),
      resetContent: () => set({ content: initialContent }),
    }),
    {
      name: 'albufeira-holidays-storage',
      version: 14,
      storage: createJSONStorage(() => customStorage),
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as AppState;
        
        if (version < 14 && state?.content) {
          // Migrar dados preservando alterações do utilizador
          return {
            ...state,
            content: {
              ...initialContent,
              ...state.content,
              hero: { 
                ...initialContent.hero, 
                ...state.content.hero,
                videoUrl: state.content.hero?.videoUrl ?? initialContent.hero.videoUrl ?? '',
                videoStartTime: state.content.hero?.videoStartTime ?? initialContent.hero.videoStartTime ?? 0,
                backgroundImages: state.content.hero?.backgroundImages ?? initialContent.hero.backgroundImages ?? [],
                enableAnimation: state.content.hero?.enableAnimation ?? initialContent.hero.enableAnimation ?? true,
              },
              about: { 
                ...initialContent.about, 
                ...state.content.about,
                videoUrl: state.content.about?.videoUrl ?? initialContent.about.videoUrl,
                videoStartTime: state.content.about?.videoStartTime ?? initialContent.about.videoStartTime,
              },
              contact: { ...initialContent.contact, ...state.content.contact },
              apartments: mergeApartments(state.content.apartments || [], initialContent.apartments),
              reviews: state.content.reviews ?? initialContent.reviews,
              socialLinks: { ...initialContent.socialLinks, ...(state.content.socialLinks || {}) },
              seo: { ...initialContent.seo, ...(state.content.seo || {}) },
            },
          };
        }
        
        return state;
      },
    }
  )
);
