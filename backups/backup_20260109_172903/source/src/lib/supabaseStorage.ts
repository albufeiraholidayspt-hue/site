import { StateStorage } from 'zustand/middleware';
import SupabaseAPI from '../lib/supabaseAPI';
import AggressiveMobileSolution from '../lib/aggressiveMobileSolution';

// Storage com Supabase + solução agressiva mobile
export const supabaseStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      // Detectar se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        console.log('📱 Mobile detectado - usando solução agressiva');
        
        // SOLUÇÃO AGRESSIVA: Carregar DIRETAMENTE do Supabase
        const aggressive = AggressiveMobileSolution.getInstance();
        const data = await aggressive.loadDirectFromSupabase();
        
        if (data) {
          console.log('✅ Dados carregados do Supabase (mobile agressivo)');
          // Salvar no localStorage como backup
          localStorage.setItem(name, JSON.stringify(data));
          localStorage.setItem('albufeira-holidays-supabase-backup', JSON.stringify(data));
          return JSON.stringify(data);
        }
        
        // Se falhar, tentar localStorage
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
        console.log('📱 Mobile - salvando com solução agressiva');
        
        // SOLUÇÃO AGRESSIVA: Salvar DIRETAMENTE no Supabase
        const aggressive = AggressiveMobileSolution.getInstance();
        const parsed = JSON.parse(value);
        const success = await aggressive.saveDirectToSupabase(parsed);
        
        if (success) {
          console.log('✅ Dados salvos no Supabase (mobile agressivo)');
        } else {
          console.log('❌ Falha ao salvar no Supabase (mobile)');
        }
      } else {
        // Desktop - comportamento normal
        const parsed = JSON.parse(value);
        await SupabaseAPI.getInstance().syncData(parsed);
        console.log('✅ Dados sincronizados com Supabase (desktop)');
      }
    } catch (error) {
      console.error('❌ Erro ao sincronizar com Supabase:', error);
      // Pelo menos salvou no localStorage
    }
  },
  
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  }
};
