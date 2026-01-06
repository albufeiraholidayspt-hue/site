import { StateStorage } from 'zustand/middleware';
import SupabaseAPI from '../lib/supabaseAPI';

// Storage com Supabase + localStorage backup
export const supabaseStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Tentar Supabase primeiro
      const data = await SupabaseAPI.getInstance().loadData();
      if (data) {
        console.log('✅ Dados carregados do Supabase');
        return JSON.stringify(data);
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
      
      // Salvar no Supabase (async)
      const parsed = JSON.parse(value);
      await SupabaseAPI.getInstance().syncData(parsed);
      console.log('✅ Dados sincronizados com Supabase');
    } catch (error) {
      console.error('❌ Erro ao sincronizar com Supabase:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
