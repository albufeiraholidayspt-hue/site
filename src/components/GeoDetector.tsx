import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

interface GeoLocationData {
  country: string;
  countryCode: string;
  language: string;
}

const countryLanguageMap: Record<string, string> = {
  'GB': 'en', // United Kingdom
  'US': 'en', // United States
  'CA': 'en', // Canada
  'AU': 'en', // Australia
  'IE': 'en', // Ireland
  'NZ': 'en', // New Zealand
  'FR': 'fr', // France
  'BE': 'fr', // Belgium (French-speaking)
  'CH': 'fr', // Switzerland (French-speaking)
  'LU': 'fr', // Luxembourg
  'MC': 'fr', // Monaco
  'DE': 'de', // Germany
  'AT': 'de', // Austria
  'LI': 'de', // Liechtenstein
  'PT': 'pt', // Portugal
  'BR': 'pt', // Brazil
  'AO': 'pt', // Angola
  'MZ': 'pt', // Mozambique
  'CV': 'pt', // Cape Verde
  'GW': 'pt', // Guinea-Bissau
  'ST': 'pt', // São Tomé and Príncipe
  'TL': 'pt', // Timor-Leste
};

export function GeoDetector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run geo-detection if no language is set in URL
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const supportedLanguages = ['pt', 'en', 'fr', 'de'];
    
    if (supportedLanguages.includes(pathSegments[0])) {
      return; // Language already set in URL
    }

    // Check if user already has a preferred language
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && supportedLanguages.includes(storedLang)) {
      return; // User already chose a language
    }

    // Perform geo-detection
    detectUserLocation();
  }, [location.pathname, navigate, i18n]);

  const detectUserLocation = async () => {
    try {
      // Try IP-based geolocation first
      const geoData = await getGeoLocationByIP();
      
      if (geoData && geoData.language) {
        // Redirect to language-specific URL
        const newPath = `/${geoData.language}${location.pathname}`;
        navigate(newPath, { replace: true });
        i18n.changeLanguage(geoData.language);
        console.log(`🌍 Geo-detected: ${geoData.country} → ${geoData.language}`);
      }
    } catch (error) {
      console.log('🌍 Geo-detection failed, using browser language');
      // Fallback to browser language detection
      fallbackToBrowserLanguage();
    }
  };

  const getGeoLocationByIP = async (): Promise<GeoLocationData | null> => {
    try {
      // Use a free IP geolocation service
      const response = await fetch('https://ipapi.co/json');
      const data = await response.json();
      
      const countryCode = data.country_code;
      const country = data.country_name;
      
      // Map country to language
      const language = countryLanguageMap[countryCode] || 'pt';
      
      return {
        country,
        countryCode,
        language
      };
    } catch (error) {
      console.error('IP geolocation failed:', error);
      return null;
    }
  };

  const fallbackToBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['pt', 'en', 'fr', 'de'];
    
    if (supportedLanguages.includes(browserLang)) {
      const newPath = `/${browserLang}${location.pathname}`;
      navigate(newPath, { replace: true });
      i18n.changeLanguage(browserLang);
      console.log(`🌍 Browser language detected: ${browserLang}`);
    } else {
      // Default to Portuguese
      const newPath = `/pt${location.pathname}`;
      navigate(newPath, { replace: true });
      i18n.changeLanguage('pt');
      console.log('🌍 Defaulting to Portuguese');
    }
  };

  return null; // This component doesn't render anything
}

export function getCountryFromIP(): Promise<string | null> {
  return fetch('https://ipapi.co/json')
    .then(response => response.json())
    .then(data => data.country_code || null)
    .catch(() => null);
}

export function getLanguageFromCountry(countryCode: string): string {
  return countryLanguageMap[countryCode] || 'pt';
}
