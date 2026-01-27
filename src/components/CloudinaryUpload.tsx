import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinary';

interface CloudinaryUploadProps {
  folder?: string;
  onUploadComplete: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export default function CloudinaryUpload({
  folder = 'albufeira-holidays',
  onUploadComplete,
  multiple = false,
  maxFiles = 10,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;
    
    if (files.length > maxFiles) {
      setError(`Máximo de ${maxFiles} ficheiros permitidos`);
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const urls = await cloudinaryService.uploadMultiple(
        files,
        folder,
        (current, total) => {
          setProgress(Math.round((current / total) * 100));
        }
      );

      setUploadedUrls(urls);
      onUploadComplete(urls);
      setUploading(false);
      
      // Reset após 2 segundos
      setTimeout(() => {
        setUploadedUrls([]);
        setProgress(0);
      }, 2000);
      
    } catch (err) {
      setError('Erro ao fazer upload. Tenta novamente.');
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="cloudinary-upload"
        />
        
        <label
          htmlFor="cloudinary-upload"
          className={`
            flex items-center justify-center gap-2 px-6 py-3 
            border-2 border-dashed rounded-lg cursor-pointer
            transition-colors
            ${uploading 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
            }
          `}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium text-gray-700">
                A carregar... {progress}%
              </span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {multiple ? 'Selecionar Imagens' : 'Selecionar Imagem'}
              </span>
            </>
          )}
        </label>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Success Message */}
      {uploadedUrls.length > 0 && !uploading && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">
            {uploadedUrls.length} {uploadedUrls.length === 1 ? 'imagem carregada' : 'imagens carregadas'} com sucesso!
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-500">
        ✅ Upload permanente - As fotos nunca serão apagadas<br />
        📦 Backup automático incluído no Cloudinary<br />
        🌍 CDN global para carregamento rápido
      </div>
    </div>
  );
}
