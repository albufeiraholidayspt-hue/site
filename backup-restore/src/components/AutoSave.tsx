import { useEffect } from 'react';
import { useStore } from '../store/useStore';

interface AutoSaveProps {
  enabled?: boolean;
}

export function AutoSave({ enabled = true }: AutoSaveProps) {
  const { content } = useStore();

  useEffect(() => {
    if (!enabled) return;

    // Salvar automaticamente no localStorage a cada alteração
    const saveToLocalStorage = () => {
      try {
        // Criar backup automático
        const backupData = {
          timestamp: new Date().toISOString(),
          content: content
        };
        
        // Salvar em localStorage para recuperação
        localStorage.setItem('albufeira-holidays-auto-backup', JSON.stringify(backupData));
        
        // Também salvar como arquivo para download manual
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        // Criar link invisível para download
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `albufeira-holidays-backup-${new Date().toISOString().split('T')[0]}.json`);
        linkElement.style.display = 'none';
        document.body.appendChild(linkElement);
        
        // Remover após criar (não faz download automático, apenas prepara)
        setTimeout(() => {
          document.body.removeChild(linkElement);
        }, 100);
        
        console.log('💾 Auto-salvo:', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Erro no auto-save:', error);
      }
    };

    // Salvar quando o conteúdo mudar (com debounce)
    const timeoutId = setTimeout(saveToLocalStorage, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [content, enabled]);

  // Componente invisível
  return null;
}

// Função para recuperar dados do auto-backup
export const recoverAutoBackup = (): any => {
  try {
    const backup = localStorage.getItem('albufeira-holidays-auto-backup');
    return backup ? JSON.parse(backup) : null;
  } catch (error) {
    console.error('Erro ao recuperar backup:', error);
    return null;
  }
};

// Função para verificar se há backup mais recente que o conteúdo inicial
export const hasNewerBackup = (): boolean => {
  const backup = recoverAutoBackup();
  if (!backup) return false;
  
  const backupTime = new Date(backup.timestamp);
  const now = new Date();
  
  // Considerar backup recente se tiver menos de 24 horas
  const hoursDiff = (now.getTime() - backupTime.getTime()) / (1000 * 60 * 60);
  
  return hoursDiff < 24;
};
