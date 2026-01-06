interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    size: number;
    time: string;
    expiration: string | null;
    thumb: {
      filename: string;
      delete: string;
    };
    medium: {
      filename: string;
      delete: string;
    };
  };
  success: boolean;
  status: number;
}

interface ImgBBError {
  status: number;
  error: {
    message: string;
    code: number;
    context?: string;
  };
}

export class ImgBBService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async uploadImage(file: File, expiration?: number): Promise<string> {
    console.log('ImgBB: Iniciando upload', { fileName: file.name, fileSize: file.size });
    
    if (!this.apiKey) {
      console.error('ImgBB: API key não configurada');
      throw new Error('API key do ImgBB não configurada');
    }

    console.log('ImgBB: API key configurada', this.apiKey.substring(0, 10) + '...');

    const formData = new FormData();
    
    // Converter arquivo para base64
    const base64 = await this.fileToBase64(file);
    formData.append('image', base64);
    
    if (expiration) {
      formData.append('expiration', expiration.toString());
    }

    const params = new URLSearchParams({
      key: this.apiKey
    });

    try {
      console.log('ImgBB: Enviando requisição...');
      const response = await fetch(`https://api.imgbb.com/1/upload?${params}`, {
        method: 'POST',
        body: formData
      });

      console.log('ImgBB: Resposta recebida', { status: response.status, statusText: response.statusText });

      const result: ImgBBResponse | ImgBBError = await response.json();
      console.log('ImgBB: Resultado parseado', result);

      if (!response.ok || 'error' in result) {
        const error = result as ImgBBError;
        console.error('ImgBB: Erro na API', error);
        throw new Error(error.error.message || 'Erro ao fazer upload da imagem');
      }

      const success = result as ImgBBResponse;
      console.log('ImgBB: Upload sucesso', success.data.url);
      return success.data.url;
    } catch (error) {
      console.error('ImgBB: Erro no upload', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro de conexão com o ImgBB');
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remover o prefixo data:image/...;base64,
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Método para obter informações da imagem (opcional)
  async getImageInfo(_imageId: string): Promise<any> {
    // ImgBB não tem endpoint público para obter informações da imagem
    // Esta função pode ser implementada se necessário no futuro
    throw new Error('Funcionalidade não disponível na API do ImgBB');
  }
}

// Instância singleton com chave de API forçada para funcionar no Vercel
export const imgbbService = new ImgBBService('dbd2aebb695d29ee20f3fc151c316242');

// Hook personalizado para facilitar o uso
export function useImgBBUpload() {
  const upload = async (file: File, expiration?: number) => {
    return await imgbbService.uploadImage(file, expiration);
  };

  return { upload };
}
