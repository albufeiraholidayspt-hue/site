// Solução AGRESSIVA para mobile cache
export class AggressiveMobileSolution {
  private static instance: AggressiveMobileSolution;

  static getInstance(): AggressiveMobileSolution {
    if (!AggressiveMobileSolution.instance) {
      AggressiveMobileSolution.instance = new AggressiveMobileSolution();
    }
    return AggressiveMobileSolution.instance;
  }

  // Detectar mobile com mais precisão
  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  // Forçar refresh COMPLETO
  forceCompleteRefresh(): void {
    console.log('🔄 FORÇANDO REFRESH COMPLETO MOBILE');
    
    // 1. Limpar TODOS os caches
    this.clearAllCaches();
    
    // 2. Limpar localStorage (exceto dados importantes)
    this.clearLocalStorage();
    
    // 3. Forçar reload com timestamp
    this.forceReload();
  }

  private clearAllCaches(): void {
    try {
      // Limpar caches do browser
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }

      // Limpar service workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
          });
        });
      }

      console.log('🧹 Todos os caches limpos');
    } catch (error) {
      console.error('❌ Erro ao limpar caches:', error);
    }
  }

  private clearLocalStorage(): void {
    try {
      // Limpar apenas caches, preservar dados
      const keysToPreserve = [
        'albufeira-holidays-supabase-backup',
        'albufeira-holidays-storage'
      ];

      Object.keys(localStorage).forEach(key => {
        if (!keysToPreserve.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      console.log('📝 LocalStorage limpo (dados preservados)');
    } catch (error) {
      console.error('❌ Erro ao limpar localStorage:', error);
    }
  }

  private forceReload(): void {
    // Forçar reload com múltiplas técnicas
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    
    // Técnica 1: location.href
    window.location.href = `${window.location.pathname}?_t=${timestamp}&_r=${random}`;
    
    // Técnica 2: location.reload (backup)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  // Carregar dados diretamente do Supabase
  async loadDirectFromSupabase(): Promise<any> {
    console.log('📱 Carregando DIRETAMENTE do Supabase');
    
    try {
      const response = await fetch('https://lposelwkdhpfgyqpxeyw.supabase.co/rest/v1/site_data?id=eq.main', {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          console.log('✅ Dados carregados do Supabase:', data[0].data);
          return data[0].data;
        }
      }
      
      console.log('❌ Supabase não retornou dados');
      return null;
    } catch (error) {
      console.error('❌ Erro ao carregar do Supabase:', error);
      return null;
    }
  }

  // Salvar dados diretamente no Supabase
  async saveDirectToSupabase(data: any): Promise<boolean> {
    console.log('📱 Salvando DIRETAMENTE no Supabase');
    
    try {
      const response = await fetch('https://lposelwkdhpfgyqpxeyw.supabase.co/rest/v1/site_data', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          id: 'main',
          data: data,
          updated_at: new Date().toISOString()
        }),
        cache: 'no-store'
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Dados salvos no Supabase:', result);
        return true;
      } else {
        console.error('❌ Erro ao salvar no Supabase:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao salvar no Supabase:', error);
      return false;
    }
  }

  // Inicializar solução agressiva
  init(): void {
    if (this.isMobile()) {
      console.log('📱 Mobile detectado - solução agressiva ativada');
      
      // Adicionar ao window global para acesso manual
      (window as any).aggressiveMobile = this;
      
      // NÃO forçar refresh automático (causava problemas)
      console.log('📱 Solução agressiva pronta, sem refresh automático');
    }
  }
}

export default AggressiveMobileSolution;
