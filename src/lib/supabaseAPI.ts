// Cliente Supabase para persistência REAL
import { createClient } from '@supabase/supabase-js';

class SupabaseAPI {
  private static instance: SupabaseAPI;
  private supabase: any;
  private isReady: boolean = false;

  constructor() {
    // Configuração será adicionada quando você fornecer as credenciais
    this.initializeClient();
  }

  static getInstance(): SupabaseAPI {
    if (!SupabaseAPI.instance) {
      SupabaseAPI.instance = new SupabaseAPI();
    }
    return SupabaseAPI.instance;
  }

  private initializeClient() {
    try {
      // Configuração REAL do Supabase com URL correta
      const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';
      
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.isReady = true;
      console.log('✅ Supabase client inicializado com sucesso - URL CORRIGIDA');
    } catch (error) {
      console.error('❌ Erro ao inicializar Supabase:', error);
      this.isReady = false;
    }
  }

  // Método para configurar as credenciais
  configureCredentials(url: string, key: string) {
    try {
      this.supabase = createClient(url, key);
      this.isReady = true;
      console.log('✅ Supabase configurado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao configurar Supabase:', error);
      this.isReady = false;
    }
  }

  async loadData(): Promise<any> {
    if (!this.isReady) {
      console.log('🔄 Supabase não está pronto, usando localStorage fallback');
      return this.loadFromLocalStorage();
    }

    try {
      const { data, error } = await this.supabase
        .from('site_data')
        .select('data')
        .eq('id', 'main')
        .single();

      if (error) {
        console.log('🔄 Supabase não encontrou dados, usando localStorage');
        return this.loadFromLocalStorage();
      }

      if (data) {
        console.log('✅ Dados carregados do Supabase');
        // Salvar no localStorage como backup
        localStorage.setItem('albufeira-holidays-supabase-backup', JSON.stringify(data.data));
        return data.data;
      }
    } catch (error) {
      console.error('❌ Erro ao carregar do Supabase:', error);
    }

    return this.loadFromLocalStorage();
  }

  async saveData(data: any): Promise<void> {
    // Sempre salvar no localStorage primeiro (backup)
    localStorage.setItem('albufeira-holidays-supabase-backup', JSON.stringify(data));

    if (!this.isReady) {
      console.log('📝 Supabase não está pronto, dados salvos apenas no localStorage');
      return;
    }

    try {
      const { error } = await this.supabase
        .from('site_data')
        .upsert({
          id: 'main',
          data: data,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Erro ao salvar no Supabase:', error);
        console.log('📝 Dados salvos apenas no localStorage');
      } else {
        console.log('✅ Dados salvos no Supabase + localStorage backup');
      }
    } catch (error) {
      console.error('❌ Erro ao salvar no Supabase:', error);
      console.log('📝 Dados salvos apenas no localStorage');
    }
  }

  private loadFromLocalStorage(): any {
    try {
      const backup = localStorage.getItem('albufeira-holidays-supabase-backup');
      if (backup) {
        console.log('🔄 Usando localStorage backup');
        return JSON.parse(backup);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar do localStorage:', error);
    }
    return null;
  }

  async syncData(data: any): Promise<void> {
    await this.saveData(data);
  }

  // Verificar se está pronto
  isConfigured(): boolean {
    return this.isReady;
  }
}

export default SupabaseAPI;
