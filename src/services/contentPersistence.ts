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

      console.log('📡 Response status:', response.status, response.statusText);
      console.log('📡 Response headers:', response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Resposta de erro:', errorText);
        throw new Error(`Erro ao guardar: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Resposta não é JSON:', text);
        throw new Error('Resposta do servidor não é JSON');
      }

      const result = await response.json();
      console.log('✅ Conteúdo guardado com sucesso:', result);

    } catch (error) {
      console.error('❌ Erro ao guardar conteúdo no servidor:', error);
      throw error; // Propagar erro para o utilizador saber que falhou
    } finally {
      this.isSaving = false;
    }
  }

  /**
   * Carregar conteúdo do servidor com cache
   */
  async loadContent(): Promise<SiteContent | null> {
    try {
      // Verificar cache primeiro (válido por 30 minutos)
      const cached = localStorage.getItem('site_content_cache');
      const cacheTime = localStorage.getItem('site_content_cache_time');
      
      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age < 30 * 60 * 1000) { // 30 minutos
          console.log('✅ Conteúdo carregado do cache (', Math.round(age / 1000), 's)');
          return JSON.parse(cached);
        }
      }

      console.log('📥 A carregar conteúdo do servidor...');
      const response = await fetch(this.loadApiUrl);

      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Guardar no cache
      localStorage.setItem('site_content_cache', JSON.stringify(data.content));
      localStorage.setItem('site_content_cache_time', Date.now().toString());
      
      console.log('✅ Conteúdo carregado do servidor e guardado em cache');
      return data.content;

    } catch (error) {
      console.error('❌ Erro ao carregar conteúdo do servidor:', error);
      
      // Tentar usar cache antigo em caso de erro
      const cached = localStorage.getItem('site_content_cache');
      if (cached) {
        console.log('⚠️ Usando cache antigo devido a erro');
        return JSON.parse(cached);
      }
      
      return null;
    }
  }
}

export const contentPersistenceService = new ContentPersistenceService();
