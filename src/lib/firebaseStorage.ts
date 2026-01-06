import { StateStorage } from 'zustand/middleware';
import FirebasePersistence from '../lib/firebase';

// Storage customizado com Firebase sync
export const firebaseStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Primeiro tentar Firebase
      const firebaseData = await FirebasePersistence.getInstance().loadData();
      if (firebaseData && firebaseData.state) {
        console.log('✅ Dados carregados do Firebase');
        return JSON.stringify(firebaseData.state);
      }
      
      // Fallback para localStorage
      const item = localStorage.getItem(name);
      console.log('📋 Usando localStorage fallback');
      return item;
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      return localStorage.getItem(name);
    }
  },
  
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      // Salvar no localStorage (imediato)
      localStorage.setItem(name, value);
      
      // Salvar no Firebase (async)
      const parsed = JSON.parse(value);
      await FirebasePersistence.getInstance().syncData(parsed);
      console.log('✅ Dados sincronizados com Firebase');
    } catch (error) {
      console.error('❌ Erro ao sincronizar com Firebase:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
