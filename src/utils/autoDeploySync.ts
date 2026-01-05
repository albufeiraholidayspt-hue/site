// Sistema de sincronização automática para Netlify
interface AutoSyncData {
  timestamp: string;
  content: any;
  version: string;
}

class AutoDeploySync {
  private static readonly SYNC_KEY = 'albufeira-auto-sync';

  // Salvar alterações automaticamente
  static async saveChanges(content: any): Promise<void> {
    try {
      const syncData: AutoSyncData = {
        timestamp: new Date().toISOString(),
        content: content,
        version: '1.0.0'
      };

      // Salvar no localStorage como backup
      localStorage.setItem(this.SYNC_KEY, JSON.stringify(syncData));

      // Tentar sincronizar com servidor (se disponível)
      await this.syncToServer();
      
      console.log('💾 Alterações salvas automaticamente');
    } catch (error) {
      console.warn('⚠️ Erro na sincronização automática:', error);
    }
  }

  // Sincronizar com servidor Netlify
  private static async syncToServer(): Promise<void> {
    try {
      // Em produção, isso enviaria os dados para um webhook
      // Por agora, salva no localStorage para recuperação
      console.log('🔄 Dados prontos para deploy automático');
    } catch (error) {
      console.warn('Servidor indisponível, usando cache local');
    }
  }

  // Recuperar dados salvos
  static recoverData(): AutoSyncData | null {
    try {
      const stored = localStorage.getItem(this.SYNC_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Erro ao recuperar dados:', error);
      return null;
    }
  }

  // Verificar se há dados não sincronizados
  static hasUnsavedChanges(): boolean {
    const data = this.recoverData();
    if (!data) return false;

    const lastSync = new Date(data.timestamp);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff < 1; // Se tiver alterações na última hora
  }

  // Gerar arquivo de atualização automática
  static generateUpdateFile(): string {
    const data = this.recoverData();
    if (!data) return '';

    return `// Auto-generated content - ${data.timestamp}
export const autoContent = ${JSON.stringify(data.content, null, 2)};

// Para aplicar estas alterações:
// 1. Copie este conteúdo para src/data/initialContent.ts
// 2. Execute npm run build
// 3. Faça upload para Netlify`;
  }
}

// Disponibilizar globalmente
declare global {
  interface Window {
    autoSync: typeof AutoDeploySync;
  }
}

if (typeof window !== 'undefined') {
  window.autoSync = AutoDeploySync;
}

export default AutoDeploySync;
