import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const supportedLanguages = ['pt', 'en', 'fr', 'de'];
const defaultLanguage = 'pt';

export function LanguageRouter() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLang = pathSegments[0];

    // Check if current path has a language prefix
    if (supportedLanguages.includes(currentLang)) {
      // Set language if it's different from current
      if (currentLang !== i18n.language) {
        i18n.changeLanguage(currentLang);
      }
    } else {
      // No language prefix, detect and redirect
      const detectedLang = detectLanguage();
      const newPath = `/${detectedLang}${location.pathname}`;
      
      // Replace current URL with language-prefixed version
      navigate(newPath, { replace: true });
      i18n.changeLanguage(detectedLang);
    }
  }, [location.pathname, i18n, navigate]);

  return null; // This component doesn't render anything
}

function detectLanguage(): string {
  // 1. Check localStorage first
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && supportedLanguages.includes(storedLang)) {
    return storedLang;
  }

  // 2. Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }

  // 3. Check browser languages
  for (const lang of navigator.languages) {
    const langCode = lang.split('-')[0];
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
  }

  // 4. Default to Portuguese
  return defaultLanguage;
}

export function getLanguageFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return supportedLanguages.includes(segments[0]) ? segments[0] : defaultLanguage;
}

export function removeLanguageFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (supportedLanguages.includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}
