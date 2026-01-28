// Serviço Cloudinary - Upload PERMANENTE de imagens
// Nunca apaga fotos, 25GB gratuitos, CDN global

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

class CloudinaryService {
  private cloudName: string;
  private uploadPreset: string;

  constructor() {
    this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'de6edaaft';
    this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'albufeira_holidays';
  }

  /**
   * Upload de imagem para Cloudinary (unsigned - sem preset)
   * @param file - Ficheiro de imagem
   * @param folder - Pasta no Cloudinary (opcional)
   * @returns URL permanente da imagem
   */
  async uploadImage(file: File, folder: string = 'albufeira-holidays'): Promise<string> {
    try {
      // Obter assinatura do servidor
      const signatureResponse = await fetch('/api/upload-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folder }),
      });

      if (!signatureResponse.ok) {
        throw new Error('Erro ao obter assinatura do servidor');
      }

      const { signature, timestamp, cloudName, apiKey } = await signatureResponse.json();

      // Upload com assinatura (sem upload_preset)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro Cloudinary:', errorData);
        throw new Error('Erro ao fazer upload para Cloudinary');
      }

      const data: CloudinaryUploadResponse = await response.json();
      console.log('✅ Imagem carregada para Cloudinary:', data.secure_url);
      
      return data.secure_url;
    } catch (error) {
      console.error('❌ Erro no upload Cloudinary:', error);
      throw error;
    }
  }

  /**
   * Upload múltiplo de imagens
   * @param files - Array de ficheiros
   * @param folder - Pasta no Cloudinary
   * @param onProgress - Callback de progresso
   * @returns Array de URLs permanentes
   */
  async uploadMultiple(
    files: File[],
    folder: string = 'albufeira-holidays',
    onProgress?: (current: number, total: number) => void
  ): Promise<string[]> {
    const urls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await this.uploadImage(files[i], folder);
        urls.push(url);
        
        if (onProgress) {
          onProgress(i + 1, files.length);
        }
      } catch (error) {
        console.error(`Erro ao carregar imagem ${i + 1}:`, error);
        // Continua com as outras imagens mesmo se uma falhar
      }
    }
    
    return urls;
  }

  /**
   * Backup de dados em JSON para Cloudinary
   * @param data - Dados para backup
   * @param filename - Nome do ficheiro
   * @returns URL do backup
   */
  async backupData(data: any, filename: string = 'backup'): Promise<string> {
    try {
      // Converter dados para JSON
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const file = new File([blob], `${filename}.json`, { type: 'application/json' });

      // Upload como raw file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      formData.append('folder', 'backups');
      formData.append('resource_type', 'raw');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao fazer backup no Cloudinary');
      }

      const result = await response.json();
      console.log('✅ Backup guardado no Cloudinary:', result.secure_url);
      
      return result.secure_url;
    } catch (error) {
      console.error('❌ Erro no backup Cloudinary:', error);
      throw error;
    }
  }

  /**
   * Restaurar dados de backup do Cloudinary
   * @param url - URL do backup
   * @returns Dados restaurados
   */
  async restoreData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao restaurar backup do Cloudinary');
      }

      const data = await response.json();
      console.log('✅ Backup restaurado do Cloudinary');
      
      return data;
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      throw error;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
