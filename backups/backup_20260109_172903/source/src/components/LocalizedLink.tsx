import { Link, useLocation } from 'react-router-dom';
import { removeLanguageFromPath } from './LanguageRouter';

interface LocalizedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LocalizedLink({ to, children, className, onClick }: LocalizedLinkProps) {
  const location = useLocation();

  // Get current language from URL
  const getCurrentLanguage = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const supportedLanguages = ['pt', 'en', 'fr', 'de'];
    return supportedLanguages.includes(pathSegments[0]) ? pathSegments[0] : 'pt';
  };

  // Build localized URL
  const buildLocalizedUrl = (path: string, currentLang: string) => {
    // Remove any existing language prefix from the target path
    const cleanPath = removeLanguageFromPath(path);
    
    // Add current language prefix (except for Portuguese which is default)
    if (currentLang === 'pt') {
      return cleanPath;
    }
    return `/${currentLang}${cleanPath}`;
  };

  const currentLang = getCurrentLanguage();
  const localizedTo = buildLocalizedUrl(to, currentLang);

  return (
    <Link to={localizedTo} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
