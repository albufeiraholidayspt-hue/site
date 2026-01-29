import { useState } from 'react';

interface YouTubePlayerProps {
  videoUrl: string;
  placeholderImage: string;
  title?: string;
  className?: string;
}

export function YouTubePlayer({ videoUrl, placeholderImage, title, className = '' }: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : '';
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Placeholder Image - fade out quando vídeo carrega */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img
          src={placeholderImage}
          alt={title || 'Vídeo'}
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Loading indicator subtil */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>

      {/* YouTube iframe - fade in quando carrega */}
      <iframe
        src={embedUrl}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full rounded-lg transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
