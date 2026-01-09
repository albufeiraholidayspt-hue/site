import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Languages, Loader2, CheckCircle, AlertCircle, Info } from 'lucide-react';
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

  const providerInfo = translationService.getProviderInfo();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Languages className="h-5 w-5 text-primary-600" />
        <h3 className="font-semibold text-gray-900">Tradução Automática</h3>
      </div>

      {/* Provider Info */}
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 text-blue-800">
          <Info className="h-4 w-4" />
          <div className="flex-1">
            <span className="text-sm font-medium">{providerInfo.name}</span>
            <p className="text-xs text-blue-600 mt-1">{providerInfo.description}</p>
            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
              providerInfo.isFree ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {providerInfo.isFree ? 'GRÁTIS' : 'PAGO'}
            </span>
          </div>
        </div>
      </div>

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
          disabled={isTranslating}
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
              Erro ao traduzir conteúdo. Tente novamente.
            </span>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          <p>• A tradução afeta todo o conteúdo do site</p>
          <p>• O conteúdo original em português será substituído</p>
          <p>• Recomendado fazer backup antes de traduzir</p>
          <p>• MyMemory: limite de 10.000 palavras/dia</p>
        </div>
      </div>
    </div>
  );
}
