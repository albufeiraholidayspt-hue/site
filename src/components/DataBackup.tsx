import { useStore } from '../store/useStore';
import { useEffect } from 'react';

// Sistema de carregamento de dados do servidor
export function DataBackup() {
  const { loadFromServer, isLoaded } = useStore();

  // CARREGAR DADOS DO SERVIDOR QUANDO A APP INICIA
  useEffect(() => {
    const loadServerData = async () => {
      try {
        console.log('🌐 A carregar dados do servidor PostgreSQL (Railway)...');
        await loadFromServer();
        console.log('✅ Dados carregados do servidor com sucesso!');
      } catch (error) {
        console.error('❌ Erro ao carregar do servidor:', error);
      }
    };

    if (!isLoaded) {
      loadServerData();
    }
  }, [loadFromServer, isLoaded]);

  return null;
}
