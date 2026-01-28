import { useStore } from '../store/useStore';
import { useEffect } from 'react';

// Sistema de backup automático para NUNCA MAIS perder dados
export function DataBackup() {
  const { content, loadFromServer } = useStore();

  // CARREGAR DADOS DO SERVIDOR QUANDO A APP INICIA
  useEffect(() => {
    const loadServerData = async () => {
      try {
        console.log('🌐 A carregar dados do servidor...');
        await loadFromServer();
        console.log('✅ Dados carregados do servidor com sucesso!');
      } catch (error) {
        console.error('❌ Erro ao carregar do servidor:', error);
      }
    };

    loadServerData();
  }, []); // Executar apenas uma vez quando o componente monta

  useEffect(() => {
    // Salvar automaticamente a cada 30 segundos
    const saveBackup = () => {
      try {
        const backupData = {
          timestamp: new Date().toISOString(),
          content: content,
          version: '1.0'
        };
        
        // Salvar em múltiplos locais
        localStorage.setItem('albufeira-holidays-backup-main', JSON.stringify(backupData));
        localStorage.setItem('albufeira-holidays-backup-' + Date.now(), JSON.stringify(backupData));
        
        // Manter apenas os 5 backups mais recentes
        const keys = Object.keys(localStorage).filter(k => k.startsWith('albufeira-holidays-backup-') && k !== 'albufeira-holidays-backup-main');
        keys.sort().slice(0, -5).forEach(k => localStorage.removeItem(k));
        
        console.log('💾 Backup automático salvo:', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Erro no backup:', error);
      }
    };

    // Salvar imediatamente
    saveBackup();

    // Salvar a cada 30 segundos
    const interval = setInterval(saveBackup, 30000);

    return () => clearInterval(interval);
  }, [content]);

  // Tentar recuperar backup se não houver conteúdo
  useEffect(() => {
    const hasContent = content && (
      content.hero?.title || 
      content.apartments?.length > 0 || 
      content.contact?.email
    );

    if (!hasContent) {
      console.log('🔄 Tentando recuperar backup...');
      
      // Tentar recuperar do backup principal
      const mainBackup = localStorage.getItem('albufeira-holidays-backup-main');
      if (mainBackup) {
        try {
          const backup = JSON.parse(mainBackup);
          console.log('✅ Backup encontrado de:', backup.timestamp);
          // Aqui poderíamos restaurar, mas precisamos da função do store
        } catch (error) {
          console.error('Backup corrompido:', error);
        }
      }
    }
  }, [content]);

  return null;
}

// Função para exportar dados manualmente
export const exportData = () => {
  const data = localStorage.getItem('albufeira-holidays-storage');
  if (!data) {
    console.log('❌ Nenhum dado encontrado');
    return;
  }

  try {
    const parsed = JSON.parse(data);
    const exportData = {
      timestamp: new Date().toISOString(),
      content: parsed.state?.content,
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `albufeira-holidays-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('✅ Dados exportados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao exportar:', error);
  }
};

// Disponibilizar globalmente
declare global {
  interface Window {
    exportData: typeof exportData;
  }
}

if (typeof window !== 'undefined') {
  window.exportData = exportData;
}
