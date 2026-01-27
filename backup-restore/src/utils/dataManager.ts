import { SiteContent } from '../types';

// Exportar dados do localStorage para arquivo JSON
export const exportData = (): SiteContent | null => {
  try {
    const storedData = localStorage.getItem('albufeira-holidays-storage');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return parsed.state?.content || null;
    }
  } catch (error) {
    console.error('Erro ao exportar dados:', error);
  }
  return null;
};

// Importar dados de arquivo JSON para o localStorage
export const importData = (data: SiteContent): boolean => {
  try {
    const storedData = localStorage.getItem('albufeira-holidays-storage');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Atualiza apenas o content, preservando outros dados
      parsed.state.content = data;
      localStorage.setItem('albufeira-holidays-storage', JSON.stringify(parsed));
      return true;
    }
  } catch (error) {
    console.error('Erro ao importar dados:', error);
  }
  return false;
};

// Download dos dados como arquivo JSON
export const downloadDataAsJson = () => {
  const data = exportData();
  if (!data) {
    alert('Não há dados para exportar');
    return;
  }

  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `albufeira-holidays-backup-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Upload de dados de arquivo JSON
export const uploadDataFromJson = (file: File): Promise<SiteContent> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
