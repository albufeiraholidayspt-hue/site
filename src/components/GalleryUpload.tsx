import { useState, useRef } from 'react';
import { X, Plus, GripVertical, Link } from 'lucide-react';

interface GalleryUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

export function GalleryUpload({ images, onChange, label, maxImages = 40 }: GalleryUploadProps) {
  const [newUrl, setNewUrl] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragImageRef = useRef<HTMLDivElement>(null);

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

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleAddUrl = () => {
    if (!newUrl.trim()) return;
    if (images.length >= maxImages) {
      alert('Máximo de ' + maxImages + ' imagens atingido.');
      return;
    }
    onChange([...images, newUrl.trim()]);
    setNewUrl('');
  };

  const handleAddMultipleUrls = () => {
    if (!multipleUrls.trim()) return;
    const urls = multipleUrls.split('\n').map(url => url.trim()).filter(url => url.length > 0);
    const remainingSlots = maxImages - images.length;
    const urlsToAdd = urls.slice(0, remainingSlots);
    if (urlsToAdd.length > 0) {
      onChange([...images, ...urlsToAdd]);
      setMultipleUrls('');
      setShowBulkAdd(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

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
              className={'relative group aspect-square rounded-xl overflow-hidden border-2 bg-gray-100 cursor-grab active:cursor-grabbing transition-all ' + (
                draggedIndex === index
                  ? 'opacity-50 border-primary-500 scale-95'
                  : dragOverIndex === index
                  ? 'border-primary-500 border-dashed scale-105'
                  : 'border-gray-200'
              )}
            >
              <img
                src={image}
                alt={'Imagem ' + (index + 1)}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-2 right-2 p-1 bg-black/60 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4" />
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(index); }}
                className="absolute top-2 left-2 p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {images.length > 1 && (
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <GripVertical className="h-3 w-3" />
          Arraste as imagens para reordenar
        </p>
      )}

      {images.length < maxImages && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <Link className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Adicione URLs de imagens</p>
          <p className="text-xs text-gray-400 mb-4">{images.length}/{maxImages} imagens</p>
          
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Cole o URL da imagem aqui..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
            />
            <button
              type="button"
              onClick={handleAddUrl}
              disabled={!newUrl.trim()}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowBulkAdd(!showBulkAdd)}
            className="mt-3 text-xs text-primary-600 hover:text-primary-700 underline"
          >
            {showBulkAdd ? 'Esconder' : 'Adicionar múltiplos URLs'}
          </button>

          {showBulkAdd && (
            <div className="mt-3 max-w-md mx-auto">
              <textarea
                value={multipleUrls}
                onChange={(e) => setMultipleUrls(e.target.value)}
                placeholder="Cole múltiplos URLs (um por linha)..."
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddMultipleUrls}
                disabled={!multipleUrls.trim()}
                className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm font-medium"
              >
                Adicionar Todos
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Dica:</strong> Faça upload em imgur.com ou postimages.org e cole o link aqui.
        </p>
      </div>
    </div>
  );
}
