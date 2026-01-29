import { useState, useEffect } from 'react';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset estado quando videoUrl ou placeholderImage mudam (nova página)
  useEffect(() => {
    setIsLoaded(false);
    setImageLoaded(false);
    
    // Timeout de segurança: se imagem não carregar em 3s, marca como carregada
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [videoUrl, placeholderImage]);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${loop ? videoId : ''}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&modestbranding=1`;

  // Só fazer fade quando AMBOS estiverem prontos: imagem carregada E vídeo carregado
  const shouldShowVideo = isLoaded && imageLoaded;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Placeholder Image - sempre visível, fade out quando vídeo carrega */}
      {placeholderImage && (
        <img
          src={placeholderImage}
          alt={title || 'Vídeo'}
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover animate-kenburns transition-opacity duration-1500 ${
            shouldShowVideo ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* YouTube iframe - fade in quando carrega */}
      <iframe
        src={embedUrl}
        title={title || 'YouTube video'}
        className={`absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-1500 ${
          shouldShowVideo ? 'opacity-100' : 'opacity-0'
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
        onLoad={() => setTimeout(() => setIsLoaded(true), 2000)}
      />
    </div>
  );
}
