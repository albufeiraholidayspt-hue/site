// Utilitários para YouTube

/**
 * Extrai o ID do vídeo de uma URL do YouTube
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // ID direto
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Gera URL da thumbnail de um vídeo do YouTube
 * @param url - URL do vídeo ou ID do vídeo
 * @param quality - Qualidade da thumbnail (default, mqdefault, hqdefault, sddefault, maxresdefault)
 */
export function getYouTubeThumbnail(url: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string | null {
  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Verifica se uma URL é do YouTube
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/.test(url);
}
