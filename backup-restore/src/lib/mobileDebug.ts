// Debug completo do problema mobile
export class MobileDebug {
  private static instance: MobileDebug;

  static getInstance(): MobileDebug {
    if (!MobileDebug.instance) {
      MobileDebug.instance = new MobileDebug();
    }
    return MobileDebug.instance;
  }

  // Debug completo do sistema
  async debugFullSystem(): Promise<void> {
    console.log('🔍 INICIANDO DEBUG COMPLETO DO SISTEMA');
    
    // 1. Detectar ambiente
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('📱 Mobile:', isMobile);
    console.log('🌐 User Agent:', navigator.userAgent);
    
    // 2. Testar Supabase
    await this.testSupabase();
    
    // 3. Testar localStorage
    this.testLocalStorage();
    
    // 4. Testar Zustand
    this.testZustand();
    
    // 5. Testar rede
    await this.testNetwork();
    
    console.log('🔍 DEBUG COMPLETO FINALIZADO');
  }

  private async testSupabase(): Promise<void> {
    console.log('🔍 TESTANDO SUPABASE...');
    
    try {
      const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
      console.log('🔗 URL Supabase:', supabaseUrl);
      
      // Testar conectividade
      const response = await fetch(`${supabaseUrl}/rest/v1/site_data`, {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw'
        }
      });
      
      console.log('📡 Status Supabase:', response.status);
      console.log('📡 Headers Supabase:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Supabase OK:', data);
      } else {
        console.log('❌ Supabase ERRO:', response.statusText);
        const errorText = await response.text();
        console.log('❌ Supabase Error:', errorText);
      }
    } catch (error) {
      console.error('❌ Supabase FALHOU COMPLETAMENTE:', error);
    }
  }

  private testLocalStorage(): void {
    console.log('🔍 TESTANDO LOCALSTORAGE...');
    
    try {
      // Testar escrita
      const testData = { test: 'mobile-debug', timestamp: Date.now() };
      localStorage.setItem('mobile-debug-test', JSON.stringify(testData));
      
      // Testar leitura
      const read = localStorage.getItem('mobile-debug-test');
      console.log('📝 localStorage escrita:', testData);
      console.log('📖 localStorage leitura:', read);
      
      // Testar dados reais
      const storageData = localStorage.getItem('albufeira-holidays-storage');
      console.log('📊 Dados reais localStorage:', storageData ? 'EXISTEM' : 'NÃO EXISTEM');
      
      const backupData = localStorage.getItem('albufeira-holidays-supabase-backup');
      console.log('💾 Dados backup localStorage:', backupData ? 'EXISTEM' : 'NÃO EXISTEM');
      
      // Limpar teste
      localStorage.removeItem('mobile-debug-test');
      
    } catch (error) {
      console.error('❌ localStorage FALHOU:', error);
    }
  }

  private testZustand(): void {
    console.log('🔍 TESTANDO ZUSTAND...');
    
    try {
      // Verificar se Zustand está disponível
      if (typeof window !== 'undefined' && (window as any).__ZUSTAND__) {
        console.log('✅ Zustand disponível');
      } else {
        console.log('❌ Zustand não disponível');
      }
      
      // Verificar storage
      const zustandData = localStorage.getItem('albufeira-holidays-storage');
      if (zustandData) {
        try {
          const parsed = JSON.parse(zustandData);
          console.log('📊 Zustand data OK:', Object.keys(parsed.state || {}));
        } catch (e) {
          console.error('❌ Zustand data CORROMPIDA:', e);
        }
      } else {
        console.log('❌ Zustand data NÃO EXISTE');
      }
    } catch (error) {
      console.error('❌ Zustand FALHOU:', error);
    }
  }

  private async testNetwork(): Promise<void> {
    console.log('🔍 TESTANDO REDE...');
    
    try {
      // Testar conectividade geral
      const response = await fetch('https://httpbin.org/get');
      console.log('🌐 Rede geral OK:', response.status);
      
      // Testar se Supabase está online
      const supabaseResponse = await fetch('https://api.supabase.io/_/health');
      console.log('🏥 Supabase health:', supabaseResponse.status);
      
    } catch (error) {
      console.error('❌ REDE FALHOU:', error);
    }
  }

  // Forçar reset completo
  forceFullReset(): void {
    console.log('🔄 FORÇANDO RESET COMPLETO...');
    
    // Limpar TUDO
    Object.keys(localStorage).forEach(key => {
      if (key.includes('albufeira') || key.includes('supabase') || key.includes('zustand')) {
        console.log('🗑️ Removendo:', key);
        localStorage.removeItem(key);
      }
    });
    
    // Forçar reload
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

export default MobileDebug;
