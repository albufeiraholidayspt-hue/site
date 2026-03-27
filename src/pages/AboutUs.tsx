import { useTranslation } from '../i18n/simple';
import { Users } from 'lucide-react';

export function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-primary-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('aboutUs.title')}
          </h1>
          <p className="text-xl text-primary-100">
            {t('aboutUs.subtitle')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-xl font-medium text-gray-900 mb-8">
                {t('aboutUs.welcome')}
              </p>

              <p>
                {t('aboutUs.paragraph1')}
              </p>

              <p>
                {t('aboutUs.paragraph2')}
              </p>

              <p>
                {t('aboutUs.paragraph3')}
              </p>

              <p className="italic text-gray-600">
                {t('aboutUs.paragraph4')}
              </p>

              <p className="font-semibold text-gray-900">
                {t('aboutUs.paragraph5')}
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2">
                  {t('aboutUs.closing')}
                </p>
                <p className="text-2xl font-semibold text-primary-600">
                  {t('aboutUs.signature')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card1Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card1Text')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card2Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card2Text')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card3Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card3Text')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
