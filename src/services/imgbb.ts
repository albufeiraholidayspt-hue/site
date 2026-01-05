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
    if (!this.apiKey) {
      throw new Error('API key do ImgBB não configurada');
    }

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
      const response = await fetch(`https://api.imgbb.com/1/upload?${params}`, {
        method: 'POST',
        body: formData
      });

      const result: ImgBBResponse | ImgBBError = await response.json();

      if (!response.ok || 'error' in result) {
        const error = result as ImgBBError;
        throw new Error(error.error.message || 'Erro ao fazer upload da imagem');
      }

      const success = result as ImgBBResponse;
      return success.data.url;
    } catch (error) {
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

// Instância singleton com chave de API do ambiente
export const imgbbService = new ImgBBService(
  import.meta.env.VITE_IMGBB_API_KEY || ''
);

// Hook personalizado para facilitar o uso
export function useImgBBUpload() {
  const upload = async (file: File, expiration?: number) => {
    return await imgbbService.uploadImage(file, expiration);
  };

  return { upload };
}
