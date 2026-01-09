// Sincronização automática de conteúdo em tempo real
class LiveContentSync {
  private static readonly WATCH_KEY = 'albufeira-content-watch';
  private static isWatching = false;

  // Iniciar monitoramento automático
  static startWatching(): void {
    if (this.isWatching) return;
    
    this.isWatching = true;
    console.log('👀 Iniciando monitoramento automático de conteúdo...');
    
    // Monitorar mudanças no localStorage
    setInterval(() => {
      this.checkForChanges();
    }, 5000); // Verificar a cada 5 segundos
  }

  // Verificar mudanças no conteúdo
  private static checkForChanges(): void {
    try {
      const currentData = localStorage.getItem('albufeira-holidays-storage');
      if (!currentData) return;

      const parsed = JSON.parse(currentData);
      const content = parsed.state?.content;
      
      if (content) {
        // Salvar timestamp da última alteração
        const lastChange = {
          timestamp: new Date().toISOString(),
          hasChanges: true
        };
        
        localStorage.setItem(this.WATCH_KEY, JSON.stringify(lastChange));
        console.log('📝 Mudança detectada em:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      // Silencioso para não poluir console
    }
  }

  // Gerar arquivo de atualização automática
  static generateAutoUpdate(): void {
    try {
      const data = localStorage.getItem('albufeira-holidays-storage');
      if (!data) {
        console.log('❌ Nenhum dado encontrado para sincronizar');
        return;
      }

      const parsed = JSON.parse(data);
      const content = parsed.state?.content;
      
      if (!content) {
        console.log('❌ Conteúdo não encontrado');
        return;
      }

      // Criar blob com o conteúdo atualizado
      const contentString = `// Auto-generated content - ${new Date().toISOString()}
// Este arquivo foi gerado automaticamente com as alterações mais recentes

import { SiteContent } from '../types';

export const updatedContent: SiteContent = ${JSON.stringify(content, null, 2)};

// Para aplicar estas alterações automaticamente:
// 1. Substitua o conteúdo de src/data/initialContent.ts
// 2. Execute npm run build
// 3. Faça upload da pasta dist para Netlify

// Última atualização: ${new Date().toLocaleString()}`;

      // Criar download automático
      const blob = new Blob([contentString], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `content-update-${new Date().toISOString().split('T')[0]}.ts`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      console.log('📁 Arquivo de atualização gerado automaticamente!');
      console.log('🔄 Substitua src/data/initialContent.ts e faça build');
      
    } catch (error) {
      console.error('❌ Erro ao gerar atualização:', error);
    }
  }

  // Verificar se há alterações pendentes
  static hasPendingChanges(): boolean {
    try {
      const watchData = localStorage.getItem(this.WATCH_KEY);
      if (!watchData) return false;

      const parsed = JSON.parse(watchData);
      const lastChange = new Date(parsed.timestamp);
      const now = new Date();
      
      // Se tiver alterações nos últimos 10 minutos
      const minutesDiff = (now.getTime() - lastChange.getTime()) / (1000 * 60);
      return minutesDiff < 10 && parsed.hasChanges;
    } catch (error) {
      return false;
    }
  }

  // Limpar estado de mudanças
  static clearChanges(): void {
    localStorage.removeItem(this.WATCH_KEY);
    console.log('✅ Estado de mudanças limpo');
  }
}

// Disponibilizar globalmente
declare global {
  interface Window {
    liveSync: typeof LiveContentSync;
    generateUpdate: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.liveSync = LiveContentSync;
  window.generateUpdate = LiveContentSync.generateAutoUpdate;
  
  // Iniciar automaticamente
  LiveContentSync.startWatching();
  
  // Mostrar aviso se houver alterações pendentes
  setTimeout(() => {
    if (LiveContentSync.hasPendingChanges()) {
      console.log('⚠️ Você tem alterações não sincronizadas!');
      console.log('💡 Execute generateUpdate() no console para gerar o arquivo de atualização');
    }
  }, 3000);
}

export default LiveContentSync;
