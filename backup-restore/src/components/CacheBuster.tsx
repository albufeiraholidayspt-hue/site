import { useEffect } from 'react';

interface CacheBusterProps {
  version: string;
}

export function CacheBuster({ version }: CacheBusterProps) {
  useEffect(() => {
    // Forçar refresh de cache em mobile quando há novas fotos
    const checkForUpdates = () => {
      const currentVersion = localStorage.getItem('app-version');
      
      if (currentVersion !== version) {
        console.log('🔄 Nova versão detectada, limpando cache...');
        
        // Limpar cache de imagens
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              if (cacheName.includes('images') || cacheName.includes('assets')) {
                caches.delete(cacheName);
              }
            });
          });
        }
        
        // Limpar localStorage antigo
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('image') || key.includes('cache'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Atualizar versão
        localStorage.setItem('app-version', version);
        
        // Forçar reload se for mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          console.log('📱 Mobile detectado, forçando reload...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    };

    checkForUpdates();
  }, [version]);

  return null;
}
