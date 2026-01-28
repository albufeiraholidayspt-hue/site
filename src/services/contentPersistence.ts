// Serviço de Persistência de Conteúdo
// Guarda dados do backoffice no servidor via API

import { SiteContent } from '../types';

class ContentPersistenceService {
  private saveApiUrl = '/api/save-content';
  private loadApiUrl = '/api/get-content';
  private isSaving = false;

  /**
   * Guardar conteúdo no servidor
   */
  async saveContent(content: SiteContent): Promise<void> {
    if (this.isSaving) {
      console.log('⏳ Já existe um save em progresso, a aguardar...');
      return;
    }

    this.isSaving = true;

    try {
      console.log('💾 A guardar conteúdo no servidor...');

      const response = await fetch(this.saveApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao guardar: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Conteúdo guardado com sucesso:', result);

    } catch (error) {
      console.error('❌ Erro ao guardar conteúdo:', error);
      // Fallback: guardar no localStorage
      console.log('📦 A guardar no localStorage como fallback...');
      localStorage.setItem('albufeira-holidays-backup', JSON.stringify({
        content,
        timestamp: new Date().toISOString(),
      }));
    } finally {
      this.isSaving = false;
    }
  }

  /**
   * Carregar conteúdo do servidor
   */
  async loadContent(): Promise<SiteContent | null> {
    try {
      console.log('📥 A carregar conteúdo do servidor...');

      const response = await fetch(this.loadApiUrl);

      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Conteúdo carregado do servidor');
      return data.content;

    } catch (error) {
      console.error('❌ Erro ao carregar conteúdo:', error);
      
      // Fallback: tentar carregar do localStorage
      const backup = localStorage.getItem('albufeira-holidays-backup');
      if (backup) {
        console.log('📦 A carregar do localStorage (fallback)');
        const data = JSON.parse(backup);
        return data.content;
      }

      return null;
    }
  }
}

export const contentPersistenceService = new ContentPersistenceService();
