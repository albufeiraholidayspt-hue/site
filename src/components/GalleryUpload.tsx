import { useState, useRef } from 'react';
import { X, Plus, GripVertical } from 'lucide-react';

interface GalleryUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

export function GalleryUpload({ images, onChange, label, maxImages = 40 }: GalleryUploadProps) {
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragImageRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      alert('Por favor, selecione ficheiros de imagem válidos (máx. 5MB cada).');
      return;
    }

    const remainingSlots = maxImages - images.length;
    const filesToProcess = validFiles.slice(0, remainingSlots);

    if (filesToProcess.length < validFiles.length) {
      alert(`Apenas ${remainingSlots} imagens podem ser adicionadas. Máximo de ${maxImages} imagens.`);
    }

    setIsLoading(true);

    const newImages: string[] = [];
    let errorCount = 0;
    
    for (const file of filesToProcess) {
      try {
        // Compress image before storing
        const compressedImage = await compressImage(file);
        newImages.push(compressedImage);
      } catch (error) {
        console.error('Erro ao processar imagem:', file.name, error);
        errorCount++;
      }
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages];
      onChange(updatedImages);
    }
    
    if (errorCount > 0) {
      alert(`${errorCount} imagem(ns) não puderam ser processadas. As restantes foram adicionadas.`);
    }
    
    setIsLoading(false);
  };

  // Compress image to reduce size
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // If file is small enough, use directly
        if (file.size < 100 * 1024) { // Less than 100KB
          resolve(result);
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxWidth = 800;
            const maxHeight = 600;
            
            let width = img.width;
            let height = img.height;
            
            // Scale down if needed
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(result); // Fallback to original
              return;
            }
            
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.7);
            resolve(compressed);
          } catch (err) {
            resolve(result); // Fallback to original on error
          }
        };
        
        img.onerror = () => resolve(result); // Fallback to original
        img.src = result;
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler ficheiro'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleFileDragLeave = () => {
    setIsDraggingFile(false);
  };

  // Drag & Drop for reordering images
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files);
    }
    // Reset input
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleAddUrl = () => {
    if (!newUrl.trim()) return;
    
    if (images.length >= maxImages) {
      alert(`Máximo de ${maxImages} imagens atingido.`);
      return;
    }

    onChange([...images, newUrl.trim()]);
    setNewUrl('');
  };


  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Image Grid with Drag & Drop */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              ref={draggedIndex === index ? dragImageRef : null}
              draggable
              onDragStart={(e) => handleImageDragStart(e, index)}
              onDragOver={(e) => handleImageDragOver(e, index)}
              onDragLeave={handleImageDragLeave}
              onDrop={(e) => handleImageDrop(e, index)}
              onDragEnd={handleImageDragEnd}
              className={`relative group aspect-square rounded-xl overflow-hidden border-2 bg-gray-100 cursor-grab active:cursor-grabbing transition-all ${
                draggedIndex === index
                  ? 'opacity-50 border-primary-500 scale-95'
                  : dragOverIndex === index
                  ? 'border-primary-500 border-dashed scale-105'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={image}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              {/* Drag handle indicator */}
              <div className="absolute top-2 right-2 p-1 bg-black/60 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4" />
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-2 left-2 p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                title="Remover"
              >
                <X className="h-4 w-4" />
              </button>
              {/* Position number */}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Drag instruction */}
      {images.length > 1 && (
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <GripVertical className="h-3 w-3" />
          Arraste as imagens para reordenar
        </p>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onClick={handleClick}
          onDrop={handleFileDrop}
          onDragOver={handleFileDragOver}
          onDragLeave={handleFileDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
            ${isDraggingFile 
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
              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Clique ou arraste imagens
              </p>
              <p className="text-xs text-gray-400">
                {images.length}/{maxImages} imagens • PNG, JPG ou WEBP (máx. 5MB cada)
              </p>
            </>
          )}
        </div>
      )}

      {/* URL input */}
      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Ou adicione URL da imagem..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
        />
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={!newUrl.trim() || images.length >= maxImages}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
