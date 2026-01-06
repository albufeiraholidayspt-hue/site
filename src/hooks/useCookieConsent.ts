import { useState, useEffect } from 'react';

interface CookieSettings {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsent {
  accepted: boolean;
  settings: CookieSettings;
  timestamp: number;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar se já existe consentimento
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        setConsent(JSON.parse(storedConsent));
      } catch (error) {
        console.error('Erro ao ler consentimento de cookies:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAllCookies = () => {
    const newConsent: CookieConsent = {
      accepted: true,
      settings: {
        analytics: true,
        marketing: true,
        functional: true,
      },
      timestamp: Date.now(),
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    
    // Aqui você pode inicializar Google Analytics, etc.
    initializeCookies(newConsent.settings);
  };

  const rejectAllCookies = () => {
    const newConsent: CookieConsent = {
      accepted: false,
      settings: {
        analytics: false,
        marketing: false,
        functional: true, // Cookies funcionais geralmente são essenciais
      },
      timestamp: Date.now(),
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    
    // Remover cookies não essenciais
    removeNonEssentialCookies();
  };

  const saveCustomSettings = (settings: CookieSettings) => {
    const newConsent: CookieConsent = {
      accepted: true,
      settings,
      timestamp: Date.now(),
    };
    
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    
    initializeCookies(settings);
  };

  const initializeCookies = (settings: CookieSettings) => {
    // Inicializar Google Analytics se permitido
    if (settings.analytics) {
      // Aqui você pode inicializar o Google Analytics
      console.log('Google Analytics inicializado');
    }
    
    // Inicializar cookies de marketing se permitido
    if (settings.marketing) {
      // Aqui você pode inicializar pixels de marketing
      console.log('Cookies de marketing inicializados');
    }
    
    // Cookies funcionais geralmente são sempre permitidos
    if (settings.functional) {
      console.log('Cookies funcionais ativos');
    }
  };

  const removeNonEssentialCookies = () => {
    // Remover cookies de analytics
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name.includes('_ga') || name.includes('_gid') || name.includes('_fbp')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  };

  return {
    consent,
    showBanner,
    acceptAllCookies,
    rejectAllCookies,
    saveCustomSettings,
  };
}
