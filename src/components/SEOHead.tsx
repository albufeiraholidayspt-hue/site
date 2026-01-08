import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEOHead({ 
  title = 'Albufeira Holidays - Apartamentos de Férias no Algarve',
  description = 'Apartamentos de férias de luxo no coração de Albufeira com vista mar. Desfrute das suas férias em paz e conforto.',
  keywords = 'Albufeira, apartamentos, férias, Algarve, Portugal, turismo, alojamento',
  ogImage = '/og-image.jpg',
  ogType = 'website'
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    // Get current language from URL
    const getCurrentLanguage = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const supportedLanguages = ['pt', 'en', 'fr', 'de'];
      return supportedLanguages.includes(pathSegments[0]) ? pathSegments[0] : 'pt';
    };

    const currentLang = getCurrentLanguage();
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update hreflang tags
    updateHreflangTags(currentLang, location.pathname);
  }, [location.pathname]);

  const updateHreflangTags = (_currentLang: string, currentPath: string) => {
    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingTags.forEach(tag => tag.remove());

    // Remove language prefix from path for clean URLs
    const cleanPath = removeLanguageFromPath(currentPath);
    
    // Supported languages
    const languages = ['pt', 'en', 'fr', 'de'];
    
    // Add hreflang tags for all languages
    languages.forEach(lang => {
      const href = lang === 'pt' ? cleanPath : `/${lang}${cleanPath}`;
      
      // Create hreflang tag
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${window.location.origin}${href}`;
      
      document.head.appendChild(link);
    });

    // Add x-default for international users
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${window.location.origin}${cleanPath}`;
    
    document.head.appendChild(defaultLink);
  };

  const removeLanguageFromPath = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    const supportedLanguages = ['pt', 'en', 'fr', 'de'];
    
    if (supportedLanguages.includes(segments[0])) {
      return '/' + segments.slice(1).join('/');
    }
    
    return path;
  };

  const getCurrentLanguage = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const supportedLanguages = ['pt', 'en', 'fr', 'de'];
    return supportedLanguages.includes(pathSegments[0]) ? pathSegments[0] : 'pt';
  };

  const currentLang = getCurrentLanguage();
  const cleanPath = removeLanguageFromPath(location.pathname);
  const canonicalUrl = currentLang === 'pt' 
    ? `${window.location.origin}${cleanPath}`
    : `${window.location.origin}/${currentLang}${cleanPath}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={getOpenGraphLocale(currentLang)} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Language and region */}
      <html lang={currentLang} />
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content="PT-08" />
      <meta name="geo.placename" content="Albufeira, Portugal" />
      <meta name="geo.position" content="37.0881;-8.2684" />
      <meta name="ICBM" content="37.0881,-8.2684" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Albufeira Holidays" />
      <meta name="theme-color" content="#0ea5e9" />
    </Helmet>
  );
}

function getOpenGraphLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    'pt': 'pt_PT',
    'en': 'en_GB',
    'fr': 'fr_FR',
    'de': 'de_DE'
  };
  
  return localeMap[lang] || 'pt_PT';
}

export function generateStructuredData(type: string, data: any) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
}
