import { useEffect } from 'react';
import { useStore } from '../store/useStore';

interface AutoExportProps {
  enabled?: boolean;
}

export function AutoExport({ enabled = false }: AutoExportProps) {
  const { content } = useStore();

  useEffect(() => {
    if (!enabled) return;

    // Exportar dados automaticamente para arquivo local
    const exportData = () => {
      try {
        const exportData = {
          timestamp: new Date().toISOString(),
          content: content,
          version: '1.0.0'
        };

        // Criar blob e download automático
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'localStorage-data.json';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        console.log('📁 Dados exportados automaticamente para localStorage-data.json');
        console.log('🔄 Coloque este arquivo na raiz do projeto antes de build');
        
      } catch (error) {
        console.error('Erro ao exportar dados:', error);
      }
    };

    // Exportar quando o conteúdo mudar (com debounce)
    const timeoutId = setTimeout(exportData, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [content, enabled]);

  // Componente invisível
  return null;
}

// Função para exportar manualmente
export const exportCurrentData = () => {
  const data = localStorage.getItem('albufeira-holidays-storage');
  if (!data) {
    console.log('❌ Nenhum dado encontrado no localStorage');
    return;
  }

  try {
    const parsed = JSON.parse(data);
    const exportData = {
      timestamp: new Date().toISOString(),
      content: parsed.state?.content,
      version: '1.0.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'localStorage-data.json';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('✅ Dados exportados com sucesso!');
    console.log('📂 Coloque o arquivo localStorage-data.json na raiz do projeto');
    console.log('🔄 Execute "npm run build" para sincronizar automaticamente');
    
  } catch (error) {
    console.error('❌ Erro ao exportar:', error);
  }
};

// Disponibilizar globalmente
declare global {
  interface Window {
    exportData: typeof exportCurrentData;
  }
}

if (typeof window !== 'undefined') {
  window.exportData = exportCurrentData;
}
