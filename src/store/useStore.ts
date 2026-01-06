import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SiteContent, User, Apartment, Promotion, SeoSettings, SocialLinks, Review } from '../types';
import { initialContent } from '../data/initialContent';
import { supabaseStorage } from '../lib/supabaseStorage';

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
      storage: createJSONStorage(() => supabaseStorage),
      migrate: (persistedState: unknown, version: number) => {
        // PROTEÇÃO TOTAL: Nunca sobrepôr dados do usuário
        console.log(' PROTEGENDO dados do usuário - versão:', version);
        
        // Se já existir conteúdo, PRESERVAR 100%
        const state = persistedState as AppState;
        if (state?.content?.apartments && state.content.apartments.length > 0) {
          console.log(' Dados do usuário encontrados, PRESERVANDO tudo!');
          return persistedState; // NÃO MUDAR NADA
        }
        
        console.log(' Sem dados de usuário, mantendo estado atual');
        return persistedState;
      },
    }
  )
);
