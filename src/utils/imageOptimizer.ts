/**
 * Image Optimizer using Cloudinary as a proxy
 * 
 * This utility transforms ImgBB URLs to use Cloudinary's fetch feature
 * for automatic image optimization (WebP, compression, resizing).
 * 
 * The original images remain stored on ImgBB, but are served through
 * Cloudinary for better performance.
 * 
 * Cloudinary Free Tier: 25GB bandwidth/month, 25K transformations
 */

// Cloudinary cloud name - your account
const CLOUDINARY_CLOUD = 'de6edaaft';

// Enable/disable Cloudinary optimization
const ENABLE_OPTIMIZATION = true; // ATIVADO - otimiza imagens do Cloudinary direto

/**
 * Optimizes an image URL using Cloudinary's fetch feature
 * 
 * @param url - Original image URL (ImgBB or any external URL)
 * @param options - Optimization options
 * @returns Optimized image URL via Cloudinary
 */
export function optimizeImage(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string {
  // Skip if optimization is disabled or URL is empty
  if (!ENABLE_OPTIMIZATION || !url) {
    return url;
  }

  // Skip local URLs
  if (url.startsWith('/') || url.startsWith('./')) {
    return url;
  }

  // Build transformation string
  const transforms: string[] = [];

  // Auto format (WebP/AVIF based on browser support)
  transforms.push(`f_${options.format || 'auto'}`);

  // Quality (default 80 for good balance)
  transforms.push(`q_${options.quality || 80}`);

  // Width (if specified)
  if (options.width) {
    transforms.push(`w_${options.width}`);
  }

  // Height (if specified)
  if (options.height) {
    transforms.push(`h_${options.height}`);
  }

  // Auto crop to fit dimensions
  if (options.width || options.height) {
    transforms.push('c_fill');
  }

  const transformString = transforms.join(',');

  // Se já é URL do Cloudinary, inserir transformações
  if (url.includes('res.cloudinary.com')) {
    // URL formato: https://res.cloudinary.com/CLOUD/image/upload/v123/path/image.jpg
    // Inserir transformações após /upload/
    return url.replace(/\/upload\//, `/upload/${transformString}/`);
  }

  // Se não é Cloudinary, usar fetch mode (para URLs externas)
  const encodedUrl = encodeURIComponent(url);
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/${transformString}/${encodedUrl}`;
}

/**
 * Optimizes an image for hero/banner use (large, high quality)
 * Uses smaller size for mobile to reduce LCP
 */
export function optimizeHeroImage(url: string): string {
  // Detect mobile viewport for smaller images
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return optimizeImage(url, {
    width: isMobile ? 800 : 1400,
    quality: isMobile ? 60 : 75,
    format: 'auto'
  });
}

/**
 * Optimizes hero image specifically for mobile (smaller, faster)
 */
export function optimizeHeroImageMobile(url: string): string {
  return optimizeImage(url, {
    width: 800,
    quality: 70,
    format: 'auto'
  });
}

/**
 * Optimizes an image for card/thumbnail use (medium size)
 * Uses smaller size for mobile
 */
export function optimizeCardImage(url: string): string {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return optimizeImage(url, {
    width: isMobile ? 400 : 800,
    quality: isMobile ? 60 : 70,
    format: 'auto'
  });
}

/**
 * Optimizes an image for gallery thumbnail (small size)
 */
export function optimizeThumbnail(url: string): string {
  return optimizeImage(url, {
    width: 400,
    quality: 65,
    format: 'auto'
  });
}

/**
 * Optimizes an image for lightbox/full view (mobile-friendly)
 */
export function optimizeLightboxImage(url: string): string {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return optimizeImage(url, {
    width: isMobile ? 1200 : 1920,
    quality: isMobile ? 70 : 80,
    format: 'auto'
  });
}

/**
 * Optimizes an image for Open Graph sharing
 */
export function optimizeOgImage(url: string): string {
  return optimizeImage(url, {
    width: 1200,
    height: 630,
    quality: 85,
    format: 'auto'
  });
}
