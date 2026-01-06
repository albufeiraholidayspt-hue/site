import { StateStorage } from 'zustand/middleware';
import JSONBinAPI from '../lib/jsonbinAPI';

// Storage super simples com JSONBin
export const jsonbinStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Tentar JSONBin primeiro
      const data = await JSONBinAPI.getInstance().loadData();
      if (data && data.state) {
        console.log('✅ Dados carregados do JSONBin');
        return JSON.stringify(data.state);
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
      
      // Salvar no JSONBin (async)
      const parsed = JSON.parse(value);
      await JSONBinAPI.getInstance().syncData(parsed);
      console.log('✅ Dados sincronizados com JSONBin');
    } catch (error) {
      console.error('❌ Erro ao sincronizar com JSONBin:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
