import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SiteContent, User, Apartment, Promotion, SeoSettings, SocialLinks, Review, AlgarveContent, AlgarveGalleryImage } from '../types';
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
  updateAlgarve: (algarve: Partial<AlgarveContent>) => void;
  addAlgarveImage: (image: AlgarveGalleryImage) => void;
  updateAlgarveImage: (id: string, data: Partial<AlgarveGalleryImage>) => void;
  deleteAlgarveImage: (id: string) => void;
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
    (set, get) => ({
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
      updateAlgarve: (algarve) =>
        set((state) => ({
          content: {
            ...state.content,
            algarve: { ...(state.content.algarve || {}), ...algarve },
          },
        })),
      addAlgarveImage: (image) =>
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...state.content.algarve,
              gallery: {
                title: state.content.algarve?.gallery?.title || 'Galeria do Algarve',
                description: state.content.algarve?.gallery?.description || 'Imagens capturadas nos locais mais bonitos da região',
                stats: state.content.algarve?.gallery?.stats || [],
                images: [...(state.content.algarve?.gallery?.images || []), image],
              },
            },
          },
        })),
      updateAlgarveImage: (id, data) =>
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...state.content.algarve,
              gallery: {
                title: state.content.algarve?.gallery?.title || 'Galeria do Algarve',
                description: state.content.algarve?.gallery?.description || 'Imagens capturadas nos locais mais bonitos da região',
                stats: state.content.algarve?.gallery?.stats || [],
                images: (state.content.algarve?.gallery?.images || []).map((img) =>
                  img.id === id ? { ...img, ...data } : img
                ),
              },
            },
          },
        })),
      deleteAlgarveImage: (id) =>
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...state.content.algarve,
              gallery: {
                title: state.content.algarve?.gallery?.title || 'Galeria do Algarve',
                description: state.content.algarve?.gallery?.description || 'Imagens capturadas nos locais mais bonitos da região',
                stats: state.content.algarve?.gallery?.stats || [],
                images: (state.content.algarve?.gallery?.images || []).filter((img) => img.id !== id),
              },
            },
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
      version: 16,
      storage: createJSONStorage(() => supabaseStorage),
      migrate: (persistedState: unknown, version: number) => {
        console.log('🔄 Migrando para versão:', version);
        
        const state = persistedState as AppState;
        
        // Se não existir conteúdo do Algarve, adicionar
        if (state?.content && !state.content.algarve) {
          console.log('✨ Adicionando conteúdo do Algarve');
          return {
            ...state,
            content: {
              ...state.content,
              algarve: initialContent.algarve,
            },
          };
        }
        
        return persistedState;
      },
    }
  )
);
