import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n/simple';

export function SimpleLanguageSelector() {
  const { currentLanguage, setLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const changeLanguage = useCallback((langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  }, [setLanguage]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 text-2xl hover:bg-gray-100 rounded-full transition-colors"
        title="Mudar idioma"
        aria-label="Selecionar idioma"
      >
        {currentLang.flag}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  currentLanguage === language.code ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
