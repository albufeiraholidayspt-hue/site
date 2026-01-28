import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// @ts-ignore - SeoSettings usado em outros ficheiros
import { SiteContent, User, Apartment, Promotion, SeoSettings, PartialSeoSettings, SocialLinks, Review, AlgarveContent, AlgarveGalleryImage } from '../types';
import { initialContent } from '../data/initialContent';
import { translationService } from '../services/translationService';
import { autoTranslateFields, fieldChanged } from '../hooks/useAutoTranslate';
import { contentPersistenceService } from '../services/contentPersistence';

interface AppState {
  content: SiteContent;
  user: User;
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

export const useStore = create<AppState>()(
  persist(
    (set, _get) => ({
      content: initialContent,
      user: {
        username: '',
        isAuthenticated: false,
      },
      saveToServer: async () => {
        const state = _get();
        await contentPersistenceService.saveContent(state.content);
      },
      loadFromServer: async () => {
        const content = await contentPersistenceService.loadContent();
        if (content) {
          set({ content });
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
      version: 24,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        console.log('🔄 Migrando para versão:', version);
        
        const state = persistedState as AppState;
        
        // Versão 24: Adicionar locais em falta (Lagos, Sagres) e Google Maps URLs à galeria existente
        if (version < 24 && state?.content?.algarve?.gallery?.images) {
          console.log('✨ Adicionando locais em falta e Google Maps URLs à galeria');
          
          // Mapa de Google Maps URLs por título
          const googleMapsUrls: Record<string, string> = {
            'Praia da Marinha': 'https://maps.google.com/?q=Praia+da+Marinha,+Lagoa,+Portugal',
            'Gruta de Benagil': 'https://maps.google.com/?q=Benagil+Cave,+Lagoa,+Portugal',
            'Praia da Falésia': 'https://maps.google.com/?q=Praia+da+Falésia,+Albufeira,+Portugal',
            'Faro': 'https://maps.google.com/?q=Faro,+Algarve,+Portugal',
            'Albufeira': 'https://maps.google.com/?q=Albufeira,+Algarve,+Portugal',
            'Ponta da Piedade': 'https://maps.google.com/?q=Ponta+da+Piedade,+Lagos,+Portugal',
            'Lagos': 'https://maps.google.com/?q=Lagos,+Algarve,+Portugal',
            'Sagres': 'https://maps.google.com/?q=Sagres,+Algarve,+Portugal',
          };
          
          // Adicionar Google Maps URLs às imagens existentes
          const updatedImages = state.content.algarve.gallery.images.map(img => ({
            ...img,
            googleMapsUrl: img.googleMapsUrl || googleMapsUrls[img.title] || '',
          }));
          
          // Verificar quais locais estão em falta
          const existingTitles = updatedImages.map(img => img.title);
          const defaultGalleryImages = initialContent.algarve?.gallery?.images || [];
          const missingLocations = defaultGalleryImages.filter(
            img => !existingTitles.includes(img.title)
          );
          
          // Separar Ponta da Piedade para colocar no final
          const pontaDaPiedade = updatedImages.find(img => img.title === 'Ponta da Piedade');
          const imagesWithoutPonta = updatedImages.filter(img => img.title !== 'Ponta da Piedade');
          
          // Adicionar Lagos e Sagres dos locais em falta (exceto Ponta da Piedade)
          const lagosAndSagres = missingLocations.filter(img => 
            img.title === 'Lagos' || img.title === 'Sagres'
          );
          const otherMissing = missingLocations.filter(img => 
            img.title !== 'Lagos' && img.title !== 'Sagres' && img.title !== 'Ponta da Piedade'
          );
          
          // Ordem final: imagens existentes (sem Ponta), Lagos, Sagres, outros em falta, Ponta da Piedade no final
          const finalImages = [
            ...imagesWithoutPonta,
            ...lagosAndSagres,
            ...otherMissing,
            ...(pontaDaPiedade ? [pontaDaPiedade] : missingLocations.filter(img => img.title === 'Ponta da Piedade')),
          ];
          
          console.log('📍 Locais em falta adicionados:', missingLocations.map(l => l.title));
          console.log('📍 Ordem final:', finalImages.map(l => l.title));
          
          const defaultBeachItems = initialContent.algarve?.beaches?.items || [];
          
          return {
            ...state,
            content: {
              ...state.content,
              algarve: {
                ...state.content.algarve,
                gallery: {
                  ...state.content.algarve.gallery,
                  images: finalImages,
                },
                // Adicionar praias premiadas se não existirem
                beaches: {
                  ...state.content.algarve.beaches,
                  items: state.content.algarve.beaches?.items || defaultBeachItems,
                },
              },
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
