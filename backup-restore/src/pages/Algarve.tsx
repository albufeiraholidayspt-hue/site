import { useEffect, useState } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ImageLightbox } from '../components/ImageLightbox';
import { WeatherWidget } from '../components/WeatherWidget';

const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export function Algarve() {
  const { content, updateAlgarve } = useStore();
  const algarve = content.algarve;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [beachLightboxOpen, setBeachLightboxOpen] = useState(false);
  const [beachLightboxIndex, setBeachLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO - Atualizar meta tags
    const seoTitle = algarve?.seo?.title || 'O Algarve - Praias, Clima e Atividades | Albufeira Holidays';
    const seoDescription = algarve?.seo?.description || 'Descubra o Algarve: praias premiadas com Bandeira Azul, clima mediterrânico com 300 dias de sol, campos de golfe de classe mundial e paisagens deslumbrantes.';
    const seoKeywords = algarve?.seo?.keywords || 'algarve, praias, bandeira azul, golfe, clima, albufeira, férias, portugal';
    
    document.title = seoTitle;
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoDescription);
    
    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoKeywords);
    
    // Se não existir conteúdo do Algarve, inicializar com dados padrão
    if (!algarve) {
      console.log('⚠️ Conteúdo do Algarve não encontrado, inicializando...');
      import('../data/initialContent').then(({ initialContent }) => {
        if (initialContent.algarve) {
          updateAlgarve(initialContent.algarve);
        }
      });
    }
  }, [algarve, updateAlgarve]);

  // Slideshow automático
  useEffect(() => {
    if (!algarve?.gallery?.images) return;
    
    const totalSlides = (algarve.gallery.images.length || 0) + (algarve.video ? 1 : 0);
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // Muda a cada 6 segundos

    return () => clearInterval(interval);
  }, [algarve]);

  if (!algarve) {
    const handleInitialize = () => {
      import('../data/initialContent').then(({ initialContent }) => {
        if (initialContent.algarve) {
          console.log('🚀 Inicializando conteúdo do Algarve:', initialContent.algarve);
          updateAlgarve(initialContent.algarve);
        }
      });
    };

    return (
      <div className="bg-white min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conteúdo em Preparação</h2>
          <p className="text-gray-600 mb-6">A página do Algarve está a ser configurada.</p>
          <button
            onClick={handleInitialize}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Carregar Conteúdo do Algarve
          </button>
        </div>
      </div>
    );
  }

  // Preparar slides (vídeo + imagens) - apenas os que estão habilitados para o hero
  const slides: Array<{ type: 'video' | 'image'; data: any; order: number }> = [];
  
  // Adicionar vídeo se estiver habilitado
  if (algarve.video && algarve.video.enabledInHero !== false) {
    slides.push({ 
      type: 'video', 
      data: algarve.video,
      order: algarve.video.heroOrder ?? 0
    });
  }
  
  // Adicionar imagens que estão habilitadas para o hero
  if (algarve.gallery?.images) {
    algarve.gallery.images
      .filter(img => img.enabledInHero !== false)
      .forEach(img => {
        slides.push({ 
          type: 'image', 
          data: img,
          order: img.heroOrder ?? 999
        });
      });
  }

  // Ordenar slides pela ordem definida
  slides.sort((a, b) => a.order - b.order);

  const currentSlideData = slides[currentSlide] || slides[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero com Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {currentSlideData?.type === 'video' ? (
            <div className="absolute inset-0 bg-gray-900 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentSlideData.data.youtubeUrl)}?start=22&autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(currentSlideData.data.youtubeUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                title="Algarve Video"
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ 
                  transform: 'translate(-50%, -50%)',
                  width: '177.77vh',
                  height: '56.25vw',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ) : currentSlideData?.type === 'image' ? (
            <img
              src={currentSlideData.data.imageUrl}
              alt={currentSlideData.data.title}
              className="w-full h-full object-cover animate-kenburns"
              style={{ objectPosition: currentSlideData.data.imagePosition || 'center' }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Descubra Portugal</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg">
            {algarve.hero?.title || 'O Algarve'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow">
            {algarve.hero?.subtitle || 'O extremo mais meridional de Portugal com mais dias de sol do que a Califórnia!'}
          </p>
          
          {/* Stats */}
          {algarve.gallery?.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {algarve.gallery.stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          {algarve.introduction && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {algarve.introduction.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {algarve.introduction.description}
              </p>
            </div>
          )}

          {/* Beaches Section */}
          {algarve.beaches && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {algarve.beaches.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {algarve.beaches.description}
              </p>
              
              {/* Praias Premiadas */}
              {algarve.beaches.items && algarve.beaches.items.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Praias Premiadas</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {algarve.beaches.items.map((beach, index) => (
                      <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        {beach.imageUrl && (
                          <div 
                            className="relative h-56 overflow-hidden cursor-pointer"
                            onClick={() => {
                              setBeachLightboxIndex(index);
                              setBeachLightboxOpen(true);
                            }}
                          >
                            <img 
                              src={beach.imageUrl} 
                              alt={beach.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                                Clique para ampliar
                              </span>
                            </div>
                            {beach.googleMapsUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(beach.googleMapsUrl, '_blank');
                                }}
                                className="absolute bottom-3 right-3 hover:scale-110 transition-all duration-300"
                                title="Ver no Google Maps"
                              >
                                <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                              </button>
                            )}
                          </div>
                        )}
                        <div className="p-5">
                          <h4 className="font-bold text-lg text-gray-900 mb-1">{beach.name}</h4>
                          <p className="text-gray-500 text-sm mb-3">{beach.description}</p>
                          {beach.awards && beach.awards.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {beach.awards.map((award, i) => (
                                <span key={i} className="text-xs text-primary-600 font-medium">
                                  ✓ {award}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lightbox para Praias */}
                  <ImageLightbox
                    images={algarve.beaches.items.filter(b => b.imageUrl).map(beach => ({
                      imageUrl: beach.imageUrl!,
                      title: beach.name,
                      description: beach.description,
                      googleMapsUrl: beach.googleMapsUrl,
                    }))}
                    initialIndex={beachLightboxIndex}
                    isOpen={beachLightboxOpen}
                    onClose={() => setBeachLightboxOpen(false)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Climate Section */}
          {algarve.climate && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {algarve.climate.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-2xl">
                {algarve.climate.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">Temperatura</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.temperatureRange}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">Mar</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.seaTemperature}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">Chuvas</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.rainySeason}</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Previsão Meteorológica</h3>
                <WeatherWidget />
              </div>
            </div>
          )}

          {/* Activities Section */}
          {algarve.activities && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {algarve.activities.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {algarve.activities.description}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {algarve.activities.items.map((item, index) => (
                  <div key={index} className="group relative rounded-xl overflow-hidden hover:shadow-lg transition-all h-64">
                    {item.imageUrl ? (
                      <>
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                          <p className="text-white/90 text-sm">{item.description}</p>
                        </div>
                        {item.googleMapsUrl && (
                          <button
                            onClick={() => window.open(item.googleMapsUrl, '_blank')}
                            className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300"
                            title="Ver no Google Maps"
                          >
                            <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="h-full bg-blue-50 flex flex-col justify-center p-6 text-center">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Golf Section */}
          {algarve.golf && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              {algarve.golf.imageUrl ? (
                <div className="relative h-96 md:h-[500px] overflow-hidden group">
                  <img 
                    src={algarve.golf.imageUrl} 
                    alt={algarve.golf.title}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[8000ms] ease-out animate-slow-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-emerald-600/50 flex items-center">
                    <div className="max-w-2xl mx-auto px-8 md:px-12 text-white">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {algarve.golf.title}
                      </h2>
                      <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
                        {algarve.golf.description}
                      </p>
                    </div>
                  </div>
                  {algarve.golf.googleMapsUrl && (
                    <button
                      onClick={() => window.open(algarve.golf?.googleMapsUrl, '_blank')}
                      className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300 z-10"
                      title="Ver no Google Maps"
                    >
                      <MapPin className="h-6 w-6 text-white drop-shadow-lg" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 md:p-12">
                  <div className="text-center">
                    <div className="text-5xl mb-6">⛳</div>
                    <h2 className="text-3xl font-bold mb-4">
                      {algarve.golf.title}
                    </h2>
                    <p className="text-xl text-green-100 max-w-3xl mx-auto">
                      {algarve.golf.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Travel Section */}
          {algarve.travel && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {algarve.travel.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {algarve.travel.description}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {algarve.travel.methods.map((method, index) => (
                  <div key={index} className="group relative rounded-xl overflow-hidden hover:shadow-lg transition-all h-64">
                    {method.imageUrl ? (
                      <>
                        <img 
                          src={method.imageUrl} 
                          alt={method.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                          <p className="text-white/90 text-sm">{method.description}</p>
                        </div>
                        {method.googleMapsUrl && (
                          <button
                            onClick={() => window.open(method.googleMapsUrl, '_blank')}
                            className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300"
                            title="Ver no Google Maps"
                          >
                            <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="h-full bg-blue-50 flex flex-col justify-center p-6 text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl">{method.icon}</span>
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                        <div className="mt-4 text-xs text-gray-500">
                          <p>• Upload de imagem disponível no backoffice</p>
                          <p>• Configure na secção "Algarve"</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {algarve.gallery && algarve.gallery.images.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {algarve.gallery.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {algarve.gallery.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {algarve.gallery.images.map((image, index) => (
                  <div 
                    key={image.id}
                    className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      image.featured ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <div className={image.featured ? 'aspect-w-16 aspect-h-8' : 'aspect-w-4 aspect-h-3'}>
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className={`w-full ${image.featured ? 'h-64 md:h-96' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-500`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className={`font-semibold ${image.featured ? 'text-xl' : 'text-lg'} mb-1`}>
                          {image.title}
                        </h3>
                        <p className="text-sm text-white/90">{image.description}</p>
                      </div>
                    </div>
                    {image.googleMapsUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image.googleMapsUrl, '_blank');
                        }}
                        className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300 z-10"
                        title="Ver no Google Maps"
                      >
                        <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Lightbox */}
              <ImageLightbox
                images={algarve.gallery.images.map(img => ({
                  imageUrl: img.imageUrl,
                  title: img.title,
                  description: img.description,
                  googleMapsUrl: img.googleMapsUrl,
                }))}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
