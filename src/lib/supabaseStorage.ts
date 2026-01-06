import { StateStorage } from 'zustand/middleware';
import SupabaseAPI from '../lib/supabaseAPI';

// Storage com Supabase + localStorage backup
export const supabaseStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Detectar se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        console.log('📱 Mobile detectado - forçando Supabase');
        
        // Forçar carregamento do Supabase no mobile
        const data = await SupabaseAPI.getInstance().loadData();
        if (data) {
          console.log('✅ Dados carregados do Supabase (mobile)');
          // Salvar no localStorage como backup
          localStorage.setItem(name, JSON.stringify(data));
          return JSON.stringify(data);
        }
        
        // Se Supabase falhar, tentar localStorage
        const item = localStorage.getItem(name);
        if (item) {
          console.log('📋 Usando localStorage fallback (mobile)');
          return item;
        }
        
        console.log('❌ Nenhum dado encontrado (mobile)');
        return null;
      }
      
      // Desktop - comportamento normal
      const data = await SupabaseAPI.getInstance().loadData();
      if (data) {
        console.log('✅ Dados carregados do Supabase (desktop)');
        return JSON.stringify(data);
      }
      
      // Fallback para localStorage
      const item = localStorage.getItem(name);
      console.log('📋 Usando localStorage fallback (desktop)');
      return item;
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      return localStorage.getItem(name);
    }
  },
  
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      // Detectar se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Salvar no localStorage (imediato)
      localStorage.setItem(name, value);
      
      if (isMobile) {
        console.log('📱 Mobile - salvando no Supabase');
      }
      
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
