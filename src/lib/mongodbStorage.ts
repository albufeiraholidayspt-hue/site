import { StateStorage } from 'zustand/middleware';
import MongoDBPersistence from '../lib/mongodb';

// Storage customizado com MongoDB sync
export const mongodbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Primeiro tentar MongoDB
      const mongoData = await MongoDBPersistence.getInstance().loadData();
      if (mongoData && mongoData.state) {
        console.log('✅ Dados carregados do MongoDB Atlas');
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
      
      // Salvar no MongoDB (async)
      const parsed = JSON.parse(value);
      await MongoDBPersistence.getInstance().syncData(parsed);
      console.log('✅ Dados sincronizados com MongoDB Atlas');
    } catch (error) {
      console.error('❌ Erro ao sincronizar com MongoDB:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
