import { useState, useRef } from 'react';
import { Upload, X, Cloud } from 'lucide-react';
import { imgbbService } from '../services/imgbb';
import './ImageUploadImgBB.css';

interface ImageUploadImgBBProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  showUrlInput?: boolean;
  maxSize?: number; // em MB
  acceptedTypes?: string[];
}

export function ImageUploadImgBB({ 
  value, 
  onChange, 
  label, 
  className = '',
  showUrlInput = true,
  maxSize = 32, // ImgBB suporta até 64MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: ImageUploadImgBBProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedToCloud, setUploadedToCloud] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to get progress class
  const getProgressClass = (progress: number) => {
    const roundedProgress = Math.round(progress / 10) * 10;
    return `progress-${roundedProgress}`;
  };

  const handleFileChange = async (file: File) => {
    setError(null);
    setUploadedToCloud(false);

    // Validar tipo de arquivo
    if (!acceptedTypes.includes(file.type)) {
      setError(`Tipo de arquivo não suportado. Aceitos: ${acceptedTypes.map(type => type.split('/')[1]).join(', ')}`);
      return;
    }

    // Validar tamanho
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`A imagem deve ter no máximo ${maxSize}MB.`);
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    
    try {
      // Verificar se a API key está configurada
      if (!import.meta.env.VITE_IMGBB_API_KEY) {
        throw new Error('API key do ImgBB não configurada. Configure VITE_IMGBB_API_KEY no arquivo .env');
      }

      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const imageUrl = await imgbbService.uploadImage(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedToCloud(true);
      
      // Pequeno delay para mostrar o sucesso
      setTimeout(() => {
        onChange(imageUrl);
        setIsLoading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error('Erro no upload:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem');
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Para imagem principal, pegamos apenas a primeira imagem
      const file = files[0];
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
    setUploadedToCloud(false);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Selecionar imagem para upload"
        title="Selecionar imagem para upload"
      />

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClick}
              className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              title="Alterar imagem"
            >
              <Upload className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
              title="Remover imagem"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {uploadedToCloud && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Cloud className="h-3 w-3" />
              ImgBB
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
            ${isLoading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <div className="w-full max-w-xs">
                <div className="text-sm text-gray-600 mb-2">
                  {uploadProgress < 100 ? 'A fazer upload...' : 'Upload concluído!'}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-primary-500 h-2 rounded-full upload-progress ${getProgressClass(uploadProgress)}`}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{uploadProgress}%</div>
              </div>
            </div>
          ) : (
            <>
              <Cloud className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Upload gratuito com ImgBB
              </p>
              <p className="text-xs text-gray-400 mb-2">
                Clique ou arraste uma ou mais imagens (será usada a primeira)
              </p>
              <p className="text-xs text-gray-400">
                {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} (máx. {maxSize}MB cada)
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {showUrlInput && !value && (
        <div className="mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Ou insira um URL:</span>
          </div>
          <input
            type="url"
            onChange={(e) => {
              const url = e.target.value.trim();
              if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                onChange(url);
                setUploadedToCloud(false);
              }
            }}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      )}

      <div className="mt-2 text-xs text-gray-400">
        <p>• Upload gratuito e ilimitado via ImgBB</p>
        <p>• As imagens ficam hospedadas na nuvem</p>
        <p>• Suporte até {maxSize}MB por imagem</p>
      </div>
    </div>
  );
}
