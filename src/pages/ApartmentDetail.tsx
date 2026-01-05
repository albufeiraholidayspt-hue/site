import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Users, Moon, ArrowRight, ArrowLeft, Calendar, Facebook, Instagram, Star, ImageIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FeatureIcon } from '../utils/featureIcons';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { ImageLightbox } from '../components/ImageLightbox';

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export function ApartmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useStore();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<{ start: string; end: string } | null>(null);
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  const apartment = content.apartments.find((apt) => apt.slug === slug);

  if (!apartment) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {apartment.videoUrl ? (
            <div className="absolute inset-0 bg-gray-900 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(apartment.videoUrl)}?start=${apartment.videoStartTime || 0}&autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(apartment.videoUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                title={`${apartment.name} Video`}
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
            <img
              src={apartment.heroImage}
              alt={apartment.name}
              className={`w-full h-full object-cover ${apartment.enableAnimation !== false ? 'animate-kenburns' : ''}`}
              style={{ objectPosition: apartment.heroImagePosition || 'center' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        
        {/* Back button */}
        <Link
          to="/"
          className="absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </Link>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500 text-white text-sm mb-4 shadow-lg">
            <Users className="h-4 w-4" />
            <span>{apartment.capacity} pessoas</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {apartment.name}
          </h1>
          <p className="text-xl text-white/90 drop-shadow">{apartment.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Sobre o Apartamento
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-gray-600 text-lg leading-relaxed">
                  {apartment.description}
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                  Comodidades
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {apartment.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <FeatureIcon feature={feature} className="h-4 w-4 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700 text-xs truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    Galeria {(apartment.images?.length || 0) > 0 ? `(${apartment.images.length} fotos)` : ''}
                  </h3>
                  {(apartment.images?.length || 0) > 6 && (
                    <button
                      onClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Ver todas
                    </button>
                  )}
                </div>
                {(apartment.images?.length || 0) > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apartment.images.slice(0, 6).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`${apartment.name} - Imagem ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        {index === 5 && apartment.images.length > 6 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{apartment.images.length - 6}</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Nenhuma imagem na galeria. Adicione imagens no backoffice.</p>
                )}
              </div>

              {/* Additional Info */}
              {apartment.additionalInfo && (
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                    Informações Adicionais
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {apartment.additionalInfo}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-modern p-6 sticky top-24">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                  Informações
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Users className="h-5 w-5 text-primary-500" />
                      <span>Capacidade</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {apartment.capacity} PAX
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Moon className="h-5 w-5 text-primary-500" />
                      <span>Estadia mínima</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {apartment.minNights} noites
                    </span>
                  </div>
                </div>

                {/* Availability Calendar */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    <span>Disponibilidade</span>
                  </div>
                  {apartment.icalUrl ? (
                    <AvailabilityCalendar 
                      icalUrl={apartment.icalUrl} 
                      minNights={apartment.minNights}
                      onDateSelection={(startDate, endDate, isValid) => {
                        setSelectedDates({ start: startDate, end: endDate });
                        setIsSelectionValid(isValid);
                      }}
                    />
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center text-gray-500 text-sm">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Consulte a disponibilidade ao reservar</p>
                    </div>
                  )}
                </div>

                {selectedDates && isSelectionValid ? (
                  <a
                    href={`${apartment.bookingUrl || content.bookingUrl}&f_ini=${selectedDates.start}&f_fin=${selectedDates.end}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2"
                  >
                    Reservar Agora
                    <ArrowRight className="h-5 w-5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                  >
                    Reservar Agora
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}

                {/* Reviews Button */}
                {apartment.reviewsUrl && (
                  <a
                    href={apartment.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full text-center inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                  >
                    <Star className="h-5 w-5" />
                    Ver Avaliações
                  </a>
                )}

                {/* Social Links & Reviews */}
                {(content.socialLinks?.tripadvisor || content.socialLinks?.airbnb || content.socialLinks?.booking || content.socialLinks?.googleReviews || content.socialLinks?.facebook || content.socialLinks?.instagram) && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-500 mb-3">Siga-nos e veja avaliações</p>
                    <div className="flex flex-wrap gap-3">
                      {content.socialLinks?.facebook && (
                        <a href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Facebook">
                          <Facebook className="h-5 w-5 text-gray-600" />
                        </a>
                      )}
                      {content.socialLinks?.instagram && (
                        <a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Instagram">
                          <Instagram className="h-5 w-5 text-gray-600" />
                        </a>
                      )}
                      {content.socialLinks?.tripadvisor && (
                        <a href={content.socialLinks.tripadvisor} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="TripAdvisor">
                          <Star className="h-5 w-5 text-gray-600" />
                        </a>
                      )}
                      {content.socialLinks?.googleReviews && (
                        <a href={content.socialLinks.googleReviews} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Google Reviews">
                          <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                          </svg>
                        </a>
                      )}
                      {content.socialLinks?.airbnb && (
                        <a href={content.socialLinks.airbnb} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Airbnb">
                          <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.001 18.275c-.942-1.299-1.538-2.49-1.845-3.467-.307-.977-.307-1.776 0-2.396.307-.62.835-1.024 1.538-1.214.703-.19 1.538-.19 2.241 0 .703.19 1.231.594 1.538 1.214.307.62.307 1.419 0 2.396-.307.977-.903 2.168-1.845 3.467-.471.649-.942 1.299-1.313 1.776-.371-.477-.842-1.127-1.314-1.776zm9.428-3.467c-.307 2.168-1.538 4.065-3.383 5.364-1.845 1.299-4.086 1.776-6.327 1.299-2.241-.477-4.086-1.776-5.327-3.645-1.241-1.869-1.538-4.243-.835-6.411.703-2.168 2.241-3.944 4.383-4.898 2.142-.954 4.584-.954 6.726 0 2.142.954 3.68 2.73 4.383 4.898.371 1.127.471 2.254.38 3.393z"/>
                          </svg>
                        </a>
                      )}
                      {content.socialLinks?.booking && (
                        <a href={content.socialLinks.booking} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Booking.com">
                          <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.273 0v24h6.545v-9.6h4.364c4.364 0 7.909-3.36 7.909-7.2S17.545 0 13.182 0H2.273zm6.545 4.8h4.364c1.636 0 2.909 1.2 2.909 2.4s-1.273 2.4-2.909 2.4H8.818V4.8z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={apartment.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
