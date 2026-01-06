import { StateStorage } from 'zustand/middleware';
import MongoDBAPI from '../lib/mongodbAPI';

// Storage customizado com MongoDB API
export const mongodbAPIStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Primeiro tentar MongoDB API
      const mongoData = await MongoDBAPI.getInstance().loadData();
      if (mongoData && mongoData.state) {
        console.log('✅ Dados carregados do MongoDB API');
        return JSON.stringify(mongoData.state);
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
      
      // Salvar no MongoDB via API (async)
      const parsed = JSON.parse(value);
      await MongoDBAPI.getInstance().syncData(parsed);
      console.log('✅ Dados sincronizados com MongoDB API');
    } catch (error) {
      console.error('❌ Erro ao sincronizar com MongoDB:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
