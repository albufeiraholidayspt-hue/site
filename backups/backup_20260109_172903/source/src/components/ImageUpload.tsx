import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas ficheiros de imagem.');
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert('Erro ao ler o ficheiro.');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Erro ao processar a imagem.');
      setIsLoading(false);
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
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    onChange('');
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
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
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
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">A carregar...</span>
            </div>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Clique ou arraste uma imagem
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG ou WEBP (máx. 5MB)
              </p>
            </>
          )}
        </div>
      )}

      {/* URL input as alternative - only show if no image uploaded */}
      {!value && (
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
              }
            }}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      )}
    </div>
  );
}
