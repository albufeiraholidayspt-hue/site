import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SiteContent, User, Apartment, Promotion, SeoSettings, PartialSeoSettings, SocialLinks, Review, AlgarveContent, AlgarveGalleryImage } from '../types';
import { initialContent } from '../data/initialContent';
import { supabaseStorage } from '../lib/supabaseStorage';
import { translationService } from '../services/translationService';
import { autoTranslateFields, fieldChanged } from '../hooks/useAutoTranslate';

interface AppState {
  content: SiteContent;
  user: User;
  updateHero: (hero: Partial<SiteContent['hero']>) => void;
  updateAbout: (about: Partial<SiteContent['about']>) => void;
  updateContact: (contact: Partial<SiteContent['contact']>) => void;
  updateBookingUrl: (url: string) => void;
  updateApartment: (id: string, data: Partial<Apartment>) => void;
  updateApartmentWithTranslation: (id: string, data: Partial<Apartment>) => Promise<void>;
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (id: string, data: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, data: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  updateSeo: (seo: PartialSeoSettings) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  updateAlgarve: (algarve: Partial<AlgarveContent>) => void;
  addAlgarveImage: (image: AlgarveGalleryImage) => void;
  updateAlgarveImage: (id: string, data: Partial<AlgarveGalleryImage>) => void;
  deleteAlgarveImage: (id: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resetContent: () => void;
  translateContent: (targetLanguage: string) => Promise<void>;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'albufeira2024',
};

export const useStore = create<AppState>()(
  persist(
    (set, _get) => ({
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
      updateApartmentWithTranslation: async (id, data) => {
        const state = _get();
        const currentApartment = state.content.apartments.find(apt => apt.id === id);
        
        if (!currentApartment) return;

        // Identificar campos de texto que foram alterados
        const fieldsToTranslate: Record<string, string> = {};
        
        if (data.name && fieldChanged(currentApartment.name, data.name)) {
          fieldsToTranslate.name = data.name;
        }
        if (data.tagline && fieldChanged(currentApartment.tagline, data.tagline)) {
          fieldsToTranslate.tagline = data.tagline;
        }
        if (data.description && fieldChanged(currentApartment.description, data.description)) {
          fieldsToTranslate.description = data.description;
        }
        if (data.additionalInfo && fieldChanged(currentApartment.additionalInfo, data.additionalInfo)) {
          fieldsToTranslate.additionalInfo = data.additionalInfo;
        }

        // Traduzir campos alterados
        let translations = {};
        if (Object.keys(fieldsToTranslate).length > 0) {
          try {
            console.log('🌐 A traduzir campos automaticamente:', Object.keys(fieldsToTranslate));
            translations = await autoTranslateFields(fieldsToTranslate);
            console.log('✅ Traduções concluídas:', translations);
          } catch (error) {
            console.error('❌ Erro na tradução automática:', error);
          }
        }

        // Atualizar apartamento com dados originais e traduções
        set((state) => ({
          content: {
            ...state.content,
            apartments: state.content.apartments.map((apt) =>
              apt.id === id ? { ...apt, ...data, ...translations } : apt
            ),
          },
        }));
      },
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
      updateSeo: (seo: PartialSeoSettings) =>
        set((state) => {
          const currentSeo = state.content.seo || initialContent.seo;
          const newSeo = { ...currentSeo, ...seo };
          return {
            content: {
              ...state.content,
              seo: newSeo as SeoSettings,
            },
          };
        }),
      updateSocialLinks: (links) =>
        set((state) => ({
          content: {
            ...state.content,
            socialLinks: { ...initialContent.socialLinks!, ...(state.content.socialLinks || {}), ...links } as typeof initialContent.socialLinks,
          },
        })),
      updateAlgarve: (algarve) =>
        set((state) => {
          const currentAlgarve = state.content.algarve || {};
          return {
            content: {
              ...state.content,
              algarve: { ...currentAlgarve, ...algarve },
            },
          };
        }),
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
      translateContent: async (targetLanguage: string) => {
        const state = _get();
        try {
          if (!translationService.isConfigured()) {
            console.warn('Google Translate API not configured');
            return;
          }

          const translatedContent = await translationService.translateObject(state.content, targetLanguage, 'pt');
          set({ content: translatedContent });
        } catch (error) {
          console.error('Failed to translate content:', error);
          throw error;
        }
      },
    }),
    {
      name: 'albufeira-holidays-storage',
      version: 21,
      storage: createJSONStorage(() => supabaseStorage),
      migrate: (persistedState: unknown, version: number) => {
        console.log('🔄 Migrando para versão:', version);
        
        const state = persistedState as AppState;
        
        // Versão 21: Forçar atualização completa (reviews, apartamentos, algarve com Google Maps)
        if (version < 21 && state?.content) {
          console.log('✨ Atualizando reviews, apartamentos e algarve com Google Maps');
          return {
            ...state,
            content: {
              ...state.content,
              reviews: initialContent.reviews,
              apartments: initialContent.apartments,
              algarve: initialContent.algarve,
            },
          };
        }
        
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
        
        // Atualizar minNights para 3 em todos os apartamentos
        if (state?.content?.apartments) {
          const updatedApartments = state.content.apartments.map(apt => ({
            ...apt,
            minNights: 3
          }));
          
          // Verificar se algum apartamento tem minNights diferente de 3
          const hasOldMinNights = state.content.apartments.some(apt => apt.minNights !== 3);
          
          if (hasOldMinNights) {
            console.log('🔄 Atualizando estadia mínima para 3 noites em todos os apartamentos');
            return {
              ...state,
              content: {
                ...state.content,
                apartments: updatedApartments,
              },
            };
          }
        }
        
        return persistedState;
      },
    }
  )
);
