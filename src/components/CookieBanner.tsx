import { X, Settings, Check } from 'lucide-react';
import { useState } from 'react';
import { useCookieConsent } from '../hooks/useCookieConsent';

export function CookieBanner() {
  const { showBanner, acceptAllCookies, rejectAllCookies, saveCustomSettings } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    analytics: false,
    marketing: false,
    functional: true,
  });

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    saveCustomSettings(settings);
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Configurações de Cookies</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies Essenciais</h3>
                <p className="text-sm text-gray-600">Necessários para o funcionamento do site</p>
              </div>
              <input
                type="checkbox"
                checked={settings.functional}
                disabled
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies de Análise</h3>
                <p className="text-sm text-gray-600">Ajudam-nos a melhorar o site</p>
              </div>
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies de Marketing</h3>
                <p className="text-sm text-gray-600">Para anúncios personalizados</p>
              </div>
              <input
                type="checkbox"
                checked={settings.marketing}
                onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveSettings}
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Guardar
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Usamos cookies</span> para melhorar sua experiência e analisar o tráfego do site. 
              Ao continuar, você concorda com o uso de cookies de acordo com nossa{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 underline">
                Política de Privacidade
              </a>.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <Settings className="h-4 w-4" />
              Configurar
            </button>
            <button
              onClick={rejectAllCookies}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Recusar
            </button>
            <button
              onClick={acceptAllCookies}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
