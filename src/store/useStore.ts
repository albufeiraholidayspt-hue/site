import { create } from 'zustand';
// @ts-ignore - SeoSettings usado em outros ficheiros
import { SiteContent, User, Apartment, Promotion, SeoSettings, PartialSeoSettings, SocialLinks, Review, AlgarveContent, AlgarveGalleryImage } from '../types';
import { initialContent } from '../data/initialContent';
import { translationService } from '../services/translationService';
import { autoTranslateFields } from '../hooks/useAutoTranslate';
import { contentPersistenceService } from '../services/contentPersistence';

interface AppState {
  content: SiteContent;
  user: User;
  isLoaded: boolean;
  saveToServer: () => Promise<void>;
  loadFromServer: () => Promise<void>;
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

// Carregar estado de autenticação do sessionStorage
const loadAuthState = () => {
  try {
    const authData = sessionStorage.getItem('auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      // Verificar se ainda é válido (menos de 24 horas)
      if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return {
          username: parsed.username,
          isAuthenticated: true,
        };
      }
    }
  } catch (error) {
    console.error('Erro ao carregar autenticação:', error);
  }
  return {
    username: '',
    isAuthenticated: false,
  };
};

export const useStore = create<AppState>()((set, _get) => ({
  content: initialContent,
  user: loadAuthState(),
  isLoaded: false,
  saveToServer: async () => {
    const state = _get();
    await contentPersistenceService.saveContent(state.content);
  },
  loadFromServer: async () => {
    const content = await contentPersistenceService.loadContent();
    if (content) {
      set({ content, isLoaded: true });
    } else {
      set({ isLoaded: true });
    }
  },
      updateHero: (hero) => {
        set((state) => ({
          content: {
            ...state.content,
            hero: { ...state.content.hero, ...hero },
          },
        }));
        _get().saveToServer();
      },
      updateAbout: (about) => {
        set((state) => ({
          content: {
            ...state.content,
            about: { ...state.content.about, ...about },
          },
        }));
        _get().saveToServer();
      },
      updateContact: (contact) => {
        set((state) => ({
          content: {
            ...state.content,
            contact: { ...state.content.contact, ...contact },
          },
        }));
        _get().saveToServer();
      },
      updateBookingUrl: (url) => {
        set((state) => ({
          content: {
            ...state.content,
            bookingUrl: url,
          },
        }));
        _get().saveToServer();
      },
      updateApartment: (id, data) => {
        set((state) => ({
          content: {
            ...state.content,
            apartments: state.content.apartments.map((apt) =>
              apt.id === id ? { ...apt, ...data } : apt
            ),
          },
        }));
        _get().saveToServer();
      },
      updateApartmentWithTranslation: async (id, data) => {
        const state = _get();
        const currentApartment = state.content.apartments.find(apt => apt.id === id);
        
        if (!currentApartment) return;

        // Identificar campos de texto para traduzir (sempre traduz se tiver conteúdo)
        const fieldsToTranslate: Record<string, string> = {};
        
        if (data.name && data.name.trim()) {
          fieldsToTranslate.name = data.name;
        }
        if (data.tagline && data.tagline.trim()) {
          fieldsToTranslate.tagline = data.tagline;
        }
        if (data.description && data.description.trim()) {
          fieldsToTranslate.description = data.description;
        }
        if (data.additionalInfo && data.additionalInfo.trim()) {
          fieldsToTranslate.additionalInfo = data.additionalInfo;
        }

        // Traduzir campos
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
        _get().saveToServer();
      },
      addPromotion: (promotion) => {
        set((state) => ({
          content: {
            ...state.content,
            promotions: [...(state.content.promotions || []), promotion],
          },
        }));
        _get().saveToServer();
      },
      updatePromotion: (id, data) => {
        set((state) => ({
          content: {
            ...state.content,
            promotions: (state.content.promotions || []).map((promo) =>
              promo.id === id ? { ...promo, ...data } : promo
            ),
          },
        }));
        _get().saveToServer();
      },
      deletePromotion: (id) => {
        set((state) => ({
          content: {
            ...state.content,
            promotions: (state.content.promotions || []).filter((promo) => promo.id !== id),
          },
        }));
        _get().saveToServer();
      },
      addReview: (review) => {
        set((state) => ({
          content: {
            ...state.content,
            reviews: [...(state.content.reviews || []), review],
          },
        }));
        _get().saveToServer();
      },
      updateReview: (id, data) => {
        set((state) => ({
          content: {
            ...state.content,
            reviews: (state.content.reviews || []).map((review) =>
              review.id === id ? { ...review, ...data } : review
            ),
          },
        }));
        _get().saveToServer();
      },
      deleteReview: (id) => {
        set((state) => ({
          content: {
            ...state.content,
            reviews: (state.content.reviews || []).filter((review) => review.id !== id),
          },
        }));
        _get().saveToServer();
      },
      updateSeo: (seo) => {
        set((state) => ({
          content: {
            ...state.content,
            seo: { ...state.content.seo, ...seo },
          },
        }) as any);
        _get().saveToServer();
      },
      updateSocialLinks: (links) => {
        set((state) => ({
          content: {
            ...state.content,
            socialLinks: { ...state.content.socialLinks, ...links },
          },
        }));
        _get().saveToServer();
      },
      updateAlgarve: (algarve) => {
        set((state) => {
          const currentAlgarve = state.content.algarve || {};
          return {
            content: {
              ...state.content,
              algarve: { ...currentAlgarve, ...algarve },
            },
          };
        });
        _get().saveToServer();
      },
      addAlgarveImage: (image) => {
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...(state.content.algarve || {}),
              gallery: {
                ...(state.content.algarve?.gallery || {}),
                images: [
                  ...(state.content.algarve?.gallery?.images || []),
                  image,
                ],
              },
            },
          },
        }) as any);
        _get().saveToServer();
      },
      updateAlgarveImage: (id, data) => {
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...(state.content.algarve || {}),
              gallery: {
                ...(state.content.algarve?.gallery || {}),
                images: (state.content.algarve?.gallery?.images || []).map((img) =>
                  img.id === id ? { ...img, ...data } : img
                ),
              },
            },
          },
        }) as any);
        _get().saveToServer();
      },
      deleteAlgarveImage: (id) => {
        set((state) => ({
          content: {
            ...state.content,
            algarve: {
              ...(state.content.algarve || {}),
              gallery: {
                ...(state.content.algarve?.gallery || {}),
                images: (state.content.algarve?.gallery?.images || []).filter((img) => img.id !== id),
              },
            },
          },
        }) as any);
        _get().saveToServer();
      },
      login: (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          // Guardar no sessionStorage
          sessionStorage.setItem('auth', JSON.stringify({
            username,
            timestamp: Date.now()
          }));
          set({ user: { username, isAuthenticated: true } });
          return true;
        }
        return false;
      },
      logout: () => {
        sessionStorage.removeItem('auth');
        set({ user: { username: '', isAuthenticated: false } });
      },
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
}));
