// Mobile Cache Buster - Específico para mobile
export class MobileCacheBuster {
  private static instance: MobileCacheBuster;
  private cacheVersion: string;

  constructor() {
    // Versão do cache baseada em timestamp + random
    this.cacheVersion = `v${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('📱 Mobile Cache Buster inicializado:', this.cacheVersion);
  }

  static getInstance(): MobileCacheBuster {
    if (!MobileCacheBuster.instance) {
      MobileCacheBuster.instance = new MobileCacheBuster();
    }
    return MobileCacheBuster.instance;
  }

  // Detectar se é mobile
  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Forçar refresh de imagens
  bustImageCache(imageUrl: string): string {
    if (!this.isMobile()) return imageUrl;
    
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}_cb=${this.cacheVersion}`;
  }

  // Forçar refresh de página
  forcePageRefresh(): void {
    if (!this.isMobile()) return;
    
    console.log('📱 Forçando refresh mobile...');
    
    // Limpar caches agressivos
    this.clearAllCaches();
    
    // Forçar reload com timestamp
    const timestamp = Date.now();
    window.location.href = `${window.location.pathname}?_t=${timestamp}`;
  }

  // Limpar todos os caches
  private clearAllCaches(): void {
    try {
      // Limpar localStorage
      Object.keys(localStorage).forEach(key => {
        if (!key.includes('supabase') && !key.includes('albufeira')) {
          localStorage.removeItem(key);
        }
      });

      // Limpar sessionStorage
      sessionStorage.clear();

      // Limpar caches do browser (se disponível)
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }

      console.log('📱 Caches mobile limpos');
    } catch (error) {
      console.error('❌ Erro ao limpar caches:', error);
    }
  }

  // Adicionar meta tags para mobile
  addMobileMetaTags(): void {
    if (!this.isMobile()) return;

    // Meta tags para evitar cache mobile
    const metaTags = [
      { name: 'cache-control', content: 'no-cache, no-store, must-revalidate' },
      { name: 'pragma', content: 'no-cache' },
      { name: 'expires', content: '0' }
    ];

    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      } else {
        meta.content = tag.content;
      }
    });

    console.log('📱 Meta tags mobile adicionadas');
  }

  // Forçar reload de CSS
  bustCSSCache(): void {
    if (!this.isMobile()) return;

    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = (link as HTMLLinkElement).href;
      const separator = href.includes('?') ? '&' : '?';
      (link as HTMLLinkElement).href = `${href}${separator}_cb=${this.cacheVersion}`;
    });

    console.log('📱 CSS cache busting aplicado');
  }

  // Inicializar mobile optimizations
  initMobileOptimizations(): void {
    if (!this.isMobile()) return;

    console.log('📱 Inicializando otimizações mobile...');

    // Adicionar meta tags
    this.addMobileMetaTags();

    // Forçar CSS refresh
    this.bustCSSCache();

    // Listener para detectar quando o conteúdo muda
    this.setupContentChangeDetection();
  }

  // Detectar mudanças de conteúdo
  private setupContentChangeDetection(): void {
    if (!this.isMobile()) return;

    // Observer para mudanças no DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Se mudou conteúdo, forçar refresh de imagens
          this.bustAllImagesCache();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Forçar refresh de todas as imagens
  bustAllImagesCache(): void {
    if (!this.isMobile()) return;

    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.src;
      if (src && !src.includes('data:')) {
        img.src = this.bustImageCache(src);
      }
    });

    console.log('📱 Todas as imagens atualizadas');
  }
}

export default MobileCacheBuster;
