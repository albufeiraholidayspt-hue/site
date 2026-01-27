import { useState, useRef } from 'react';
import { X, Plus, GripVertical, Cloud } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinary';

interface GalleryUploadCloudinaryProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

export function GalleryUploadCloudinary({ images, onChange, label, maxImages = 40 }: GalleryUploadCloudinaryProps) {
  const [newUrl, setNewUrl] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadCount, setCurrentUploadCount] = useState(0);
  const [totalUploadCount, setTotalUploadCount] = useState(0);
  const dragImageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleImageDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleImageDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const newImages = [...images];
      const [movedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, movedImage);
      onChange(newImages);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleAddImage = () => {
    if (newUrl.trim() && images.length < maxImages) {
      onChange([...images, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const handleBulkAdd = () => {
    const urls = multipleUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));
    
    if (urls.length > 0) {
      const availableSlots = maxImages - images.length;
      const urlsToAdd = urls.slice(0, availableSlots);
      onChange([...images, ...urlsToAdd]);
      setMultipleUrls('');
      setShowBulkAdd(false);
    }
  };

  // Funções de upload múltiplo com Cloudinary
  const handleMultipleFileUpload = async (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`Máximo de ${maxImages} imagens permitido.`);
      return;
    }

    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        console.warn(`Tipo de arquivo inválido: ${file.name}`);
        return false;
      }
      
      if (!isValidSize) {
        console.warn(`Arquivo muito grande: ${file.name}`);
        return false;
      }
      
      return true;
    });

    const availableSlots = maxImages - images.length;
    const filesToUpload = validFiles.slice(0, availableSlots);

    if (filesToUpload.length === 0) {
      alert('Nenhum arquivo válido para upload.');
      return;
    }

    setIsUploading(true);
    setTotalUploadCount(filesToUpload.length);
    setCurrentUploadCount(0);
    setUploadProgress(0);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        setCurrentUploadCount(i + 1);
        
        try {
          const url = await cloudinaryService.uploadImage(file, 'albufeira-holidays/gallery');
          uploadedUrls.push(url);
          setUploadProgress(((i + 1) / filesToUpload.length) * 100);
        } catch (error) {
          console.error(`Erro ao fazer upload de ${file.name}:`, error);
          // Continua com os outros arquivos mesmo se um falhar
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
        alert(`${uploadedUrls.length} imagens carregadas com sucesso!`);
      } else {
        alert('Nenhuma imagem foi carregada. Verifique os arquivos e tente novamente.');
      }
    } catch (error) {
      console.error('Erro no upload múltiplo:', error);
      alert('Erro ao fazer upload das imagens.');
    } finally {
      setIsUploading(false);
      setCurrentUploadCount(0);
      setTotalUploadCount(0);
      setUploadProgress(0);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleMultipleFileUpload(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleMultipleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  
  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Upload automático com Cloudinary - Múltiplos arquivos */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">
              Upload Permanente com Cloudinary (Múltiplo)
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {images.length}/{maxImages} imagens
          </span>
        </div>
        
        {/* Input para múltiplos arquivos */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInputChange}
          className="hidden"
          aria-label="Selecionar múltiplas imagens para upload"
          title="Selecionar múltiplas imagens para upload"
        />
        
        {/* Área de drag & drop */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isUploading 
              ? 'border-primary-500 bg-primary-50 opacity-50 pointer-events-none' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-100'
            }
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm text-gray-600">
                A carregar {currentUploadCount}/{totalUploadCount} imagens...
              </div>
              <div className="w-full max-w-xs">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-primary-500 h-2 rounded-full transition-all duration-300 progress-${Math.round(uploadProgress / 10) * 10}`}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{Math.round(uploadProgress)}%</div>
              </div>
            </div>
          ) : (
            <>
              <Cloud className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                Clique ou arraste múltiplas imagens
              </p>
              <p className="text-xs text-gray-400 mb-2">
                JPEG, PNG, WEBP, GIF (máx. 10MB cada)
              </p>
              <p className="text-xs text-primary-600 font-medium">
                Upload simultâneo de até {maxImages - images.length} imagens
              </p>
            </>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          ✅ Upload permanente - Fotos NUNCA se apagam • 📦 Backup automático • 🌍 CDN global
        </p>
      </div>

      {/* Lista de imagens */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Imagens na Galeria ({images.length})
            </h4>
            <div className="text-xs text-gray-500">
              Arraste para reordenar
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                ref={dragImageRef}
                draggable
                onDragStart={(e) => handleImageDragStart(e, index)}
                onDragOver={(e) => handleImageDragOver(e, index)}
                onDragLeave={handleImageDragLeave}
                onDrop={(e) => handleImageDrop(e, index)}
                onDragEnd={handleImageDragEnd}
                className={`
                  relative group overflow-hidden rounded-lg border cursor-move
                  transition-all duration-200
                  ${dragOverIndex === index ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}
                  ${draggedIndex === index ? 'opacity-50' : ''}
                  hover:border-primary-300 hover:shadow-sm
                `}
              >
                {/* Imagem */}
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                
                {/* Botão de remover */}
                <div className="absolute top-2 right-2 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (window.confirm('Tem certeza que deseja remover esta imagem?')) {
                        const newImages = images.filter((_, i) => i !== index);
                        onChange(newImages);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                    title="Remover imagem"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Overlay com informações */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <div className="p-1 bg-white/90 rounded text-gray-600">
                      <GripVertical className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                
                {/* Informações em tooltip */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform pointer-events-none">
                  <div className="text-xs truncate">
                    Imagem {index + 1}
                  </div>
                  <div className="text-xs text-gray-300 truncate">
                    {image.substring(0, 30)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adicionar URLs manualmente (alternativa) */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">
            Adicionar URL Manualmente
          </h4>
          {!showBulkAdd && (
            <button
              type="button"
              onClick={() => setShowBulkAdd(true)}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Adição em lote
            </button>
          )}
        </div>

        {!showBulkAdd ? (
          <div className="flex gap-2">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              disabled={!newUrl.trim() || images.length >= maxImages}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={multipleUrls}
              onChange={(e) => setMultipleUrls(e.target.value)}
              placeholder="Cole múltiplas URLs, uma por linha:"
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBulkAdd}
                disabled={!multipleUrls.trim()}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Adicionar Todas
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBulkAdd(false);
                  setMultipleUrls('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
