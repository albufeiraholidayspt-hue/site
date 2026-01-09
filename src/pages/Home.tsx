import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Users, Moon, ArrowRight, Sparkles, Calendar, Tag, Star, Quote } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FeatureIcon } from '../utils/featureIcons';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { useTranslation } from '../i18n/simple';
import { optimizeCardImage, optimizeHeroImage } from '../utils/imageOptimizer';

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export function Home() {
  const { content } = useStore();
  const { t, currentLanguage } = useTranslation();
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [apartmentsSelection, setApartmentsSelection] = useState<Record<string, { dates: { start: string; end: string } | null; isValid: boolean }>>({});

  // Copy promo code to clipboard
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Hero slideshow effect
  useEffect(() => {
    const images = content.hero.backgroundImages || [content.hero.backgroundImage];
    const validImages = images.filter(img => img && img.trim() !== '');
    
    if (validImages.length <= 1) return;

    // Reset current image if images change
    setCurrentHeroImage(0);

    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % validImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [content.hero.backgroundImages, content.hero.backgroundImage]);

  // Detect when video section is approaching view (preload earlier)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
          }
        });
      },
      { threshold: 0.01, rootMargin: '200px' } // Start loading 200px before visible
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {content.hero.videoUrl ? (
            <div className="absolute inset-0 bg-gray-900 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.hero.videoUrl)}?start=${content.hero.videoStartTime || 0}&autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(content.hero.videoUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                title="Hero Video"
                className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                style={{ 
                  transform: 'translate(-50%, -50%) scale(2)',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ) : (
            <div className="absolute inset-0">
              {(() => {
                const images = content.hero.backgroundImages || [content.hero.backgroundImage];
                const validImages = images.filter(img => img && img.trim() !== '');
                return validImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {image ? (
                      <img
                        src={optimizeHeroImage(image)}
                        alt="Albufeira Holidays"
                        className={`absolute inset-0 w-full h-full object-cover ${
                          index === currentHeroImage ? 'animate-kenburns' : ''
                        }`}
                        fetchPriority={index === 0 ? 'high' : 'low'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding={index === 0 ? 'sync' : 'async'}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-800" />
                    )}
                  </div>
                ));
              })()}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white" />
        </div>

        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {content.promotions && content.promotions.filter(p => p.active).length > 0 && content.promotions.filter(p => p.active)[0].code ? (
            <button
              onClick={() => copyPromoCode(content.promotions!.filter(p => p.active)[0].code!)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-primary-600 text-sm mb-8 shadow-lg hover:bg-white transition-colors cursor-pointer"
            >
              <Tag className="h-4 w-4" />
              <span className="font-medium">
                {t('promo.discount')} • {t('promo.code')}: {copiedCode === content.promotions.filter(p => p.active)[0].code ? t('promo.copied') : content.promotions.filter(p => p.active)[0].code}
              </span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-primary-600 text-sm mb-8 shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Alojamento Premium no Algarve</span>
            </div>
          )}
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={content.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg inline-flex items-center justify-center gap-2"
            >
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link to="/contacto" className="btn-secondary bg-white text-lg inline-flex items-center justify-center gap-2">
              {t('nav.contact')}
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">4</div>
              <div className="text-gray-600 text-sm mt-1">{t('stats.apartments')}</div>
            </div>
            <div className="text-center bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">5★</div>
              <div className="text-gray-600 text-sm mt-1">{t('stats.rating')}</div>
            </div>
            <div className="text-center bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">24h</div>
              <div className="text-gray-600 text-sm mt-1">{t('stats.support')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments with Availability */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('apartments.title')}
            </h2>
            <div className="accent-line mx-auto my-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('apartments.choosePerfect')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content.apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="card-modern group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={optimizeCardImage(apartment.heroImage)}
                    alt={apartment.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      parseInt(apartment.id) % 2 === 0 ? 'animate-kenburns-alt' : 'animate-kenburns'
                    }`}
                    style={{ objectPosition: apartment.heroImagePosition || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary-500 text-white text-sm font-medium shadow-lg">
                    {apartment.capacity} PAX
                  </div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {apartment.name}
                    </h3>
                    <p className="text-white/80 text-sm">{t(`taglines.${apartment.tagline.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '')}`) || apartment.tagline}</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="flex items-center gap-4 text-gray-600 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary-500" />
                      <span>{apartment.capacity} {t('apartments.capacity')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-primary-500" />
                      <span>{t('apartments.minNights', { count: apartment.minNights })}</span>
                    </div>
                  </div>
                  
                  {/* Features with icons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {apartment.features.slice(0, 4).map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-xs rounded-lg border border-gray-100"
                      >
                        <FeatureIcon feature={feature} className="h-3.5 w-3.5 text-primary-500" />
                        <span>{(() => {
                          const featureKey = feature.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '');
                          const translation = t(`features.${featureKey}`);
                          
                          // Auto-tradução para features se não existir tradução
                          if (translation === `features.${featureKey}`) {
                            const currentLang = currentLanguage || 'pt';
                            
                            if (currentLang === 'en') {
                              // Traduções para inglês
                              const translations: Record<string, string> = {
                                '2quartos': '2 Bedrooms',
                                'camadecasal': 'Double Bed',
                                'suite': 'Suite',
                                'varanda': 'Balcony',
                                'wifi': 'WiFi',
                                'ac': 'Air Conditioning',
                                'kitchen': 'Kitchen',
                                'parking': 'Parking',
                                'piscina': 'Pool',
                                'mar': 'Sea View',
                                'tv': 'TV',
                                'maquinadelavar': 'Washing Machine'
                              };
                              return translations[featureKey] || feature;
                            } else if (currentLang === 'fr') {
                              // Traduções para francês
                              const translations: Record<string, string> = {
                                '2quartos': '2 Chambres',
                                'camadecasal': 'Lit Double',
                                'suite': 'Suite',
                                'varanda': 'Balcon',
                                'wifi': 'WiFi',
                                'ac': 'Climatisation',
                                'kitchen': 'Cuisine',
                                'parking': 'Parking',
                                'piscina': 'Piscine',
                                'mar': 'Vue Mer',
                                'tv': 'TV',
                                'maquinadelavar': 'Machine à laver'
                              };
                              return translations[featureKey] || feature;
                            } else if (currentLang === 'de') {
                              // Traduções para alemão
                              const translations: Record<string, string> = {
                                '2quartos': '2 Schlafzimmer',
                                'camadecasal': 'Doppelbett',
                                'suite': 'Suite',
                                'varanda': 'Balkon',
                                'wifi': 'WiFi',
                                'ac': 'Klimaanlage',
                                'kitchen': 'Küche',
                                'parking': 'Parkplatz',
                                'piscina': 'Pool',
                                'mar': 'Meerblick',
                                'tv': 'TV',
                                'maquinadelavar': 'Waschmaschine'
                              };
                              return translations[featureKey] || feature;
                            }
                          }
                          
                          return translation || feature;
                        })()}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Availability Calendar */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 text-primary-500" />
                      <span>{t('calendar.availability')}</span>
                    </div>
                    <AvailabilityCalendar 
                      icalUrl={apartment.icalUrl} 
                      minNights={apartment.minNights}
                      onDateSelection={(startDate, endDate, isValid) => {
                        setApartmentsSelection(prev => ({
                          ...prev,
                          [apartment.id]: { dates: { start: startDate, end: endDate }, isValid }
                        }));
                      }}
                    />
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/apartamento/${apartment.slug}`}
                      className="flex-1 btn-outline text-center text-sm py-2"
                    >
                      {t('apartments.viewDetails')}
                    </Link>
                    {apartmentsSelection[apartment.id]?.dates && apartmentsSelection[apartment.id]?.isValid ? (
                      <a
                        href={`${apartment.bookingUrl || content.bookingUrl}&f_ini=${apartmentsSelection[apartment.id]?.dates?.start || ''}&f_fin=${apartmentsSelection[apartment.id]?.dates?.end || ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary text-center text-sm py-2"
                      >
                        {t('common.book')}
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 btn-primary text-center text-sm py-2 opacity-50 cursor-not-allowed"
                      >
                        {t('common.book')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative" ref={videoContainerRef}>
              <div className="rounded-2xl w-full h-[500px] overflow-hidden shadow-2xl relative bg-gray-900">
                {isVideoVisible && content.about.videoUrl ? (
                  <iframe
                    ref={videoRef}
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.about.videoUrl)}?start=${content.about.videoStartTime || 0}&autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(content.about.videoUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                    title="Algarve Video"
                    className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                    style={{ 
                      transform: 'translate(-50%, -50%) scale(1.8)',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />
                ) : (
                  <img
                    src={content.about.image}
                    alt="Albufeira"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('about.title')}
              </h2>
              <div className="accent-line my-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">86</div>
                  <div className="text-gray-600 text-sm">{t('about.blueFlagBeaches')}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">300+</div>
                  <div className="text-gray-600 text-sm">{t('about.sunnyDays')}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">200km</div>
                  <div className="text-gray-600 text-sm">{t('about.coastline')}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">7M</div>
                  <div className="text-gray-600 text-sm">{t('about.annualVisitors')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {content.reviews && content.reviews.filter(r => r.active).length > 0 && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white text-sm mb-6">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">{t('reviews.title')}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('reviews.subtitle')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('reviews.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.reviews.filter(r => r.active).slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="relative mb-4">
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary-200" />
                    <p className="text-gray-700 text-sm leading-relaxed pl-5">
                      {(() => {
                        // Usar tradução baseada no idioma atual
                        const currentLang = currentLanguage || 'pt';
                        
                        // Usar campos de tradução se disponíveis
                        if (currentLang === 'en' && review.text_en) {
                          return review.text_en;
                        }
                        if (currentLang === 'fr' && review.text_fr) {
                          return review.text_fr;
                        }
                        if (currentLang === 'de' && review.text_de) {
                          return review.text_de;
                        }
                        
                        // Fallback para português (texto original)
                        return review.text;
                      })()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-gray-500 text-xs">{review.country}</p>
                    </div>
                    {review.apartment && (
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                        {review.apartment}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-8">
            <Sparkles className="h-4 w-4" />
            <span>{(() => {
              const currentLang = currentLanguage || 'pt';
              if (currentLang === 'en') return 'Book your holidays now';
              if (currentLang === 'fr') return 'Réservez déjà vos vacances';
              if (currentLang === 'de') return 'Buchen Sie jetzt Ihren Urlaub';
              return 'Reserve já as suas férias';
            })()}</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {(() => {
              const currentLang = currentLanguage || 'pt';
              if (currentLang === 'en') return 'Ready for your dream holidays?';
              if (currentLang === 'fr') return 'Prêt pour vos vacances de rêve?';
              if (currentLang === 'de') return 'Bereit für Ihren Traumurlaub?';
              return 'Pronto para as suas férias de sonho?';
            })()}
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            {(() => {
              const currentLang = currentLanguage || 'pt';
              if (currentLang === 'en') return 'Book your apartment in Albufeira now and enjoy the best of the Algarve.';
              if (currentLang === 'fr') return 'Réservez votre appartement à Albufeira dès maintenant et profitez du meilleur de l\'Algarve.';
              if (currentLang === 'de') return 'Buchen Sie jetzt Ihre Wohnung in Albufeira und genießen Sie das Beste der Algarve.';
              return 'Reserve já o seu apartamento em Albufeira e desfrute do melhor do Algarve.';
            })()}
          </p>
          <a
            href={content.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg inline-flex items-center gap-2"
          >
            {t('apartments.viewAvailability')}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
