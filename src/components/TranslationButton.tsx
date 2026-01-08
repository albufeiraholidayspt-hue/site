import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Languages, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { translationService } from '../services/translationService';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export function TranslationButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStatus, setTranslationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const translateContent = useStore((state) => state.translateContent);

  const handleTranslate = async () => {
    if (!translationService.isConfigured()) {
      setTranslationStatus('error');
      setTimeout(() => setTranslationStatus('idle'), 3000);
      return;
    }

    setIsTranslating(true);
    setTranslationStatus('idle');

    try {
      await translateContent(selectedLanguage);
      setTranslationStatus('success');
      setTimeout(() => setTranslationStatus('idle'), 3000);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslationStatus('error');
      setTimeout(() => setTranslationStatus('idle'), 3000);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Languages className="h-5 w-5 text-primary-600" />
        <h3 className="font-semibold text-gray-900">Tradução Automática</h3>
      </div>

      {!translationService.isConfigured() && (
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              Google Translate API não configurada. Adicione VITE_GOOGLE_TRANSLATE_API_KEY ao .env
            </span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idioma de Destino
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            disabled={isTranslating}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={isTranslating || !translationService.isConfigured()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isTranslating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>A traduzir...</span>
            </>
          ) : (
            <>
              <Languages className="h-4 w-4" />
              <span>Traduzir Conteúdo</span>
            </>
          )}
        </button>

        {translationStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              Conteúdo traduzido com sucesso!
            </span>
          </div>
        )}

        {translationStatus === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-800">
              Erro ao traduzir conteúdo. Verifique a API key.
            </span>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          <p>• A tradução afeta todo o conteúdo do site</p>
          <p>• O conteúdo original em português será substituído</p>
          <p>• Recomendado fazer backup antes de traduzir</p>
        </div>
      </div>
    </div>
  );
}
