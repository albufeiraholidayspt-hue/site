import { useState } from 'react';

interface YouTubePlayerProps {
  videoUrl: string;
  placeholderImage: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  startTime?: number;
}

export function YouTubePlayer({ 
  videoUrl, 
  placeholderImage, 
  title, 
  className = '',
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  startTime = 0
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${loop ? videoId : ''}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&modestbranding=1`;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Placeholder Image - fade out quando vídeo carrega */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img
          src={placeholderImage}
          alt={title || 'Vídeo'}
          className="w-full h-full object-cover"
        />
        {/* Loading indicator subtil */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>

      {/* YouTube iframe - fade in quando carrega */}
      <iframe
        src={embedUrl}
        title={title || 'YouTube video'}
        className={`absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '56.25vw',
          minWidth: '177.77vh',
          minHeight: '100vh'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        onLoad={() => setTimeout(() => setIsLoaded(true), 500)}
      />
    </div>
  );
}
