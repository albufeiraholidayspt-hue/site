import { useTranslation } from '../i18n/simple';
import { Helmet } from 'react-helmet-async';
import { Users, Home, Heart, Star } from 'lucide-react';

export function AboutUs() {
  const { t, currentLanguage } = useTranslation();

  // SEO content based on language
  const seoContent = {
    pt: {
      title: 'Sobre Nós | Albufeira Holidays - Apartamentos de Férias',
      description: 'Conheça a Albufeira Holidays, empresa familiar dedicada a proporcionar experiências de estadia únicas em Albufeira. Atendimento personalizado e qualidade em cada detalhe.',
      keywords: 'sobre albufeira holidays, empresa familiar albufeira, apartamentos férias albufeira, alojamento local albufeira, marina prudente'
    },
    en: {
      title: 'About Us | Albufeira Holidays - Vacation Rentals',
      description: 'Meet Albufeira Holidays, a family business dedicated to providing unique stay experiences in Albufeira. Personalized service and quality in every detail.',
      keywords: 'about albufeira holidays, family business albufeira, vacation rentals albufeira, holiday apartments albufeira, marina prudente'
    },
    fr: {
      title: 'À Propos de Nous | Albufeira Holidays - Locations de Vacances',
      description: 'Découvrez Albufeira Holidays, entreprise familiale dédiée à offrir des expériences de séjour uniques à Albufeira. Service personnalisé et qualité dans chaque détail.',
      keywords: 'à propos albufeira holidays, entreprise familiale albufeira, locations vacances albufeira, appartements vacances albufeira, marina prudente'
    },
    de: {
      title: 'Über Uns | Albufeira Holidays - Ferienwohnungen',
      description: 'Lernen Sie Albufeira Holidays kennen, ein Familienunternehmen, das einzigartige Aufenthaltserlebnisse in Albufeira bietet. Persönlicher Service und Qualität in jedem Detail.',
      keywords: 'über albufeira holidays, familienunternehmen albufeira, ferienwohnungen albufeira, ferienappartements albufeira, marina prudente'
    }
  };

  const currentSeo = seoContent[currentLanguage as keyof typeof seoContent] || seoContent.pt;

  return (
    <>
      <Helmet>
        <title>{currentSeo.title}</title>
        <meta name="description" content={currentSeo.description} />
        <meta name="keywords" content={currentSeo.keywords} />
        <link rel="canonical" href="https://albufeiraholidays.pt/sobre-nos" />
        
        <meta property="og:title" content={currentSeo.title} />
        <meta property="og:description" content={currentSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://albufeiraholidays.pt/sobre-nos" />
        
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative text-white py-20 overflow-hidden">
        {/* Foto de fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/de6edaaft/image/upload/v1774623455/albufeira-holidays/footer/footer-background.jpg)'
          }}
        />
        {/* Overlay alaranjado */}
        <div className="absolute inset-0 bg-primary-600/85"></div>
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
                <p className="text-3xl md:text-4xl text-primary-600" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}>
                  {t('aboutUs.signature')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marina Prudente Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('aboutUs.signature')}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('aboutUs.closing')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('aboutUs.paragraph1')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/de6edaaft/image/upload/v1/albufeira-holidays/team/marina-prudente.jpg"
                  alt="Marina Prudente - Gerente Albufeira Holidays"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback para imagem placeholder se a foto ainda não foi carregada
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-semibold text-xl">{t('aboutUs.signature')}</p>
                  <p className="text-white/90 text-sm">Gerente | Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card1Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card1Text')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card2Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card2Text')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('aboutUs.card3Title')}</h3>
            <p className="text-gray-600 text-sm">{t('aboutUs.card3Text')}</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
