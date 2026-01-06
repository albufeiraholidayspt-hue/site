import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SiteContent, User, Apartment, Promotion, SeoSettings, SocialLinks, Review } from '../types';
import { initialContent } from '../data/initialContent';
import { mongodbStorage } from '../lib/mongodbStorage';

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
      version: 15,
      storage: createJSONStorage(() => mongodbStorage),
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as AppState;
        
        if (version < 15 && state?.content) {
          // Migrar dados PRESERVANDO completamente as alterações do utilizador
          console.log('🔄 Migrando dados da versão', version, 'para 15');
          
          return {
            ...state,
            content: {
              // Preservar TODAS as alterações do utilizador
              hero: { 
                ...initialContent.hero, 
                ...state.content.hero,
                // Garantir campos novos mas NÃO sobrepôr campos existentes
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
              // PRESERVAR completamente os apartamentos do utilizador
              apartments: state.content.apartments && state.content.apartments.length > 0 
                ? state.content.apartments 
                : initialContent.apartments,
              reviews: state.content.reviews ?? initialContent.reviews,
              socialLinks: { ...initialContent.socialLinks, ...(state.content.socialLinks || {}) },
              seo: { ...initialContent.seo, ...(state.content.seo || {}) },
              promotions: state.content.promotions ?? initialContent.promotions,
              bookingUrl: state.content.bookingUrl ?? initialContent.bookingUrl,
            },
          };
        } else if (!state?.content) {
          // Se não há conteúdo, usar initialContent
          console.log('📋 Usando conteúdo inicial (sem dados anteriores)');
          return { state: { content: initialContent, user: { username: '', isAuthenticated: false } } };
        }
        
        console.log('✅ Conteúdo migrado/preservado com sucesso');
        return state;
      },
    }
  )
);
