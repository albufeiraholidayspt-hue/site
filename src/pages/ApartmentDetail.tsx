import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Users, Moon, ArrowRight, ArrowLeft, Calendar, Facebook, Instagram, Star, ImageIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FeatureIcon } from '../utils/featureIcons';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { ImageLightbox } from '../components/ImageLightbox';
import { useTranslation } from '../i18n/simple';

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
  const { t, currentLanguage } = useTranslation();
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
          <span>{(() => {
            const currentLang = currentLanguage || 'pt';
            if (currentLang === 'en') return 'Back';
            if (currentLang === 'fr') return 'Retour';
            if (currentLang === 'de') return 'Zurück';
            return 'Voltar';
          })()}</span>
        </Link>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500 text-white text-sm mb-4 shadow-lg">
            <Users className="h-4 w-4" />
            <span>{apartment.capacity} {(() => {
              const currentLang = currentLanguage || 'pt';
              if (currentLang === 'en') return 'people';
              if (currentLang === 'fr') return 'personnes';
              if (currentLang === 'de') return 'Personen';
              return 'pessoas';
            })()}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {apartment.name}
          </h1>
          <p className="text-xl text-white/90 drop-shadow">{(() => {
                      const currentLang = currentLanguage || 'pt';
                      const taglineKey = apartment.tagline.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '').replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u').replace(/[ýÿ]/g, 'y').replace(/[ñ]/g, 'n').replace(/[ç]/g, 'c');
                      
                      // Tradução automática para taglines
                      if (currentLang === 'en') {
                        const translations: Record<string, string> = {
                          'vistapanorâmicasobreomar': 'Panoramic Sea View',
                          'vistapanoramicasobreomar': 'Panoramic Sea View',
                          'vistapanormicasobreomar': 'Panoramic Sea View',
                          'elegânciaeconfortopremium': 'Elegance and Premium Comfort',
                          'confortomodernoefuncional': 'Modern and Functional Comfort'
                        };
                        return translations[taglineKey] || translations['vistapanorâmicasobreomar'] || apartment.tagline;
                      } else if (currentLang === 'fr') {
                        const translations: Record<string, string> = {
                          'vistapanorâmicasobreomar': 'Vue Panoramique sur la Mer',
                          'vistapanoramicasobreomar': 'Vue Panoramique sur la Mer',
                          'vistapanormicasobreomar': 'Vue Panoramique sur la Mer',
                          'elegânciaeconfortopremium': 'Élégance et Confort Premium',
                          'confortomodernoefuncional': 'Confort Moderne et Fonctionnel'
                        };
                        return translations[taglineKey] || translations['vistapanorâmicasobreomar'] || apartment.tagline;
                      } else if (currentLang === 'de') {
                        const translations: Record<string, string> = {
                          'vistapanorâmicasobreomar': 'Panoramische Meeresansicht',
                          'vistapanoramicasobreomar': 'Panoramische Meeresansicht',
                          'vistapanormicasobreomar': 'Panoramische Meeresansicht',
                          'elegânciaeconfortopremium': 'Eleganz und Premium Komfort',
                          'confortomodernoefuncional': 'Modern und Funktionaler Komfort'
                        };
                        return translations[taglineKey] || translations['vistapanorâmicasobreomar'] || apartment.tagline;
                      }
                      
                      return t(`apartment.${taglineKey}`) || apartment.tagline;
                    })()}</p>
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
                  {(() => {
                    const currentLang = currentLanguage || 'pt';
                    if (currentLang === 'en') return 'About the Apartment';
                    if (currentLang === 'fr') return 'À propos de l\'Appartement';
                    if (currentLang === 'de') return 'Über die Wohnung';
                    return 'Sobre o Apartamento';
                  })()}
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-gray-600 text-lg leading-relaxed">
                  {(() => {
                    const currentLang = currentLanguage || 'pt';
                    const description = apartment.description;
                    
                    // Tradução automática para descrições longas
                    if (currentLang === 'en') {
                      // Tradução para inglês
                      if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
                        return 'T1 apartment on the 6th floor with spectacular sea view. A cozy and stunning space to enjoy your holidays in peace. Private parking, automated gate and panoramic interior elevator.';
                      } else if (description.includes('O apartamento Prestige oferece um ambiente sofisticado com acabamentos de alta qualidade')) {
                        return 'The Prestige apartment offers a sophisticated environment with high-quality finishes. Ideal for families or groups looking for a luxury experience in the Algarve.';
                      } else if (description.includes('Apartamento duplex com design moderno distribuído em dois pisos')) {
                        return 'Duplex apartment with modern design distributed over two floors. Perfect for those who value space and privacy, with living areas separate from the bedrooms.';
                      } else if (description.includes('O apartamento Deluxe combina funcionalidade com estilo contemporâneo')) {
                        return 'The Deluxe apartment combines functionality with contemporary style. An excellent choice for couples or small families looking for quality at an affordable price.';
                      }
                      return description; // Fallback
                    } else if (currentLang === 'fr') {
                      // Tradução para francês
                      if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
                        return 'Appartement T1 au 6ème étage avec vue mer spectaculaire. Un espace confortable et magnifique pour profiter de vos vacances en toute tranquillité. Parking privé, portail automatisé et ascenseur panoramique intérieur.';
                      } else if (description.includes('O apartamento Prestige oferece um ambiente sofisticado com acabamentos de alta qualidade')) {
                        return 'L\'appartement Prestige offre un environnement sophistiqué avec des finitions de haute qualité. Idéal pour les familles ou les groupes cherchant une expérience de luxe dans l\'Algarve.';
                      } else if (description.includes('Apartamento duplex com design moderno distribuído em dois pisos')) {
                        return 'Appartement duplex avec design moderne réparti sur deux étages. Parfait pour ceux qui valorisent l\'espace et la intimité, avec des zones de vie séparées des chambres.';
                      } else if (description.includes('O apartamento Deluxe combina funcionalidade com estilo contemporâneo')) {
                        return 'L\'appartement Deluxe combine fonctionnalité avec style contemporain. Un excellent choix pour les couples ou petites familles cherchant la qualité à un prix abordable.';
                      }
                      return description; // Fallback
                    } else if (currentLang === 'de') {
                      // Tradução para alemão
                      if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
                        return 'T1 Wohnung im 6. Stock mit spektakulärem Meerblick. Ein gemütlicher und beeindruckender Raum, um Ihre Ferien in Ruhe zu genießen. Privater Parkplatz, automatisches Tor und Panorama-Innenaufzug.';
                      } else if (description.includes('O apartamento Prestige oferece um ambiente sofisticado com acabamentos de alta qualidade')) {
                        return 'Die Prestige Wohnung bietet eine sophisticated Umgebung mit hochwertigen Ausstattungen. Ideal für Familien oder Gruppen, die eine Luxuserfahrung in der Algarve suchen.';
                      } else if (description.includes('Apartamento duplex com design moderno distribuído em dois pisos')) {
                        return 'Duplex Wohnung mit modernem Design verteilt auf zwei Etagen. Perfekt für diejenigen, die Raum und Privatsphäre schätzen, mit Wohnbereichen getrennt von den Schlafzimmern.';
                      } else if (description.includes('O apartamento Deluxe combina funcionalidade com estilo contemporâneo')) {
                        return 'Die Deluxe Wohnung kombiniert Funktionalität mit zeitgemäßem Stil. Eine ausgezeichnete Wahl für Paare oder kleine Familien, die Qualität zu einem erschwinglichen Preis suchen.';
                      }
                      return description; // Fallback
                    }
                    
                    // Fallback para português
                    return description;
                  })()}
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  {t('apartment.amenityTitle')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {apartment.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <FeatureIcon feature={feature} className="h-4 w-4 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700 text-xs truncate">{(() => {
                      const currentLang = currentLanguage || 'pt';
                      
                      // Função para normalizar string (remover acentos e caracteres especiais)
                      const normalizeString = (str: string) => {
                        return str.toLowerCase()
                          .replace(/\s+/g, '')
                          .replace(/[^\w\s]/gi, '')
                          .replace(/[àáâãäå]/g, 'a')
                          .replace(/[èéêë]/g, 'e')
                          .replace(/[ìíîï]/g, 'i')
                          .replace(/[òóôõö]/g, 'o')
                          .replace(/[ùúûü]/g, 'u')
                          .replace(/[ýÿ]/g, 'y')
                          .replace(/[ñ]/g, 'n')
                          .replace(/[ç]/g, 'c');
                      };
                      
                      const featureKey = normalizeString(feature);
                      
                      // Tradução automática para features - EXPANDIDA
                      if (currentLang === 'en') {
                        const translations: Record<string, string> = {
                          'secadordecabelo': 'Hair Dryer',
                          'piscina': 'Pool',
                          'cobertores': 'Blankets',
                          'cofre': 'Safe',
                          'tbuadeengomar': 'Ironing Board',
                          'tábuadeengomar': 'Ironing Board',
                          'toalhas': 'Towels',
                          'roupadecama': 'Bed Linen',
                          'elevador': 'Elevator',
                          'parking': 'Parking',
                          'garagempreosobconsulta': 'Garage (price on request)',
                          'garagem(preçosobconsulta)': 'Garage (price on request)',
                          'microondas': 'Microwave',
                          'micro-ondas': 'Microwave',
                          'frigorfico': 'Fridge',
                          'frigorifico': 'Fridge',
                          'mquinadelavarloia': 'Dishwasher',
                          'maquinadelavarloiça': 'Dishwasher',
                          'utensliosdecozinha': 'Kitchen Utensils',
                          'utensiliosdecozinha': 'Kitchen Utensils',
                          'utensíliosdecozinha': 'Kitchen Utensils',
                          'mquinadelavarroupa': 'Washing Machine',
                          'maquinadelavarroupa': 'Washing Machine',
                          'ferrodeengomar': 'Iron',
                          'berodisponvel': 'Baby Cot Available',
                          'bercodisponivel': 'Baby Cot Available',
                          'bercodisponível': 'Baby Cot Available',
                          'camadecasal': 'Double Bed',
                          'torradeira': 'Toaster',
                          'chaleira': 'Kettle',
                          'vistamar': 'Sea View',
                          'vistacidade': 'City View',
                          'varanda': 'Balcony',
                          'arcondicionado': 'Air Conditioning',
                          'wi-fi': 'WiFi',
                          'tv': 'TV',
                          'cozinhaequipada': 'Equipped Kitchen',
                          'estacionamento': 'Parking',
                          '2quartos': '2 Bedrooms'
                        };
                        return translations[featureKey] || feature;
                      } else if (currentLang === 'fr') {
                        const translations: Record<string, string> = {
                          'secadordecabelo': 'Sèche-cheveux',
                          'piscina': 'Piscine',
                          'cobertores': 'Couvertures',
                          'cofre': 'Coffre',
                          'tbuadeengomar': 'Table à Repasser',
                          'tábuadeengomar': 'Table à Repasser',
                          'toalhas': 'Serviettes',
                          'roupadecama': 'Linge de Lit',
                          'elevador': 'Ascenseur',
                          'parking': 'Parking',
                          'garagempreosobconsulta': 'Garage (prix sur demande)',
                          'garagem(preçosobconsulta)': 'Garage (prix sur demande)',
                          'microondas': 'Micro-ondes',
                          'micro-ondas': 'Micro-ondes',
                          'frigorfico': 'Réfrigérateur',
                          'frigorifico': 'Réfrigérateur',
                          'mquinadelavarloia': 'Lave-vaisselle',
                          'maquinadelavarloiça': 'Lave-vaisselle',
                          'utensliosdecozinha': 'Ustensiles de Cuisine',
                          'utensiliosdecozinha': 'Ustensiles de Cuisine',
                          'utensíliosdecozinha': 'Ustensiles de Cuisine',
                          'mquinadelavarroupa': 'Machine à Laver',
                          'maquinadelavarroupa': 'Machine à Laver',
                          'ferrodeengomar': 'Fer à Repasser',
                          'berodisponvel': 'Lit Bébé Disponible',
                          'bercodisponivel': 'Lit Bébé Disponible',
                          'bercodisponível': 'Lit Bébé Disponible',
                          'camadecasal': 'Lit Double',
                          'torradeira': 'Grille-pain',
                          'chaleira': 'Bouilloire',
                          'vistamar': 'Vue Mer',
                          'vistacidade': 'Vue Ville',
                          'varanda': 'Balcon',
                          'arcondicionado': 'Climatisation',
                          'wi-fi': 'WiFi',
                          'tv': 'TV',
                          'cozinhaequipada': 'Cuisine Équipée',
                          'estacionamento': 'Parking',
                          '2quartos': '2 Chambres'
                        };
                        return translations[featureKey] || feature;
                      } else if (currentLang === 'de') {
                        const translations: Record<string, string> = {
                          'secadordecabelo': 'Haartrockner',
                          'piscina': 'Pool',
                          'cobertores': 'Decken',
                          'cofre': 'Tresor',
                          'tbuadeengomar': 'Bügelbrett',
                          'tábuadeengomar': 'Bügelbrett',
                          'toalhas': 'Handtücher',
                          'roupadecama': 'Bettwäsche',
                          'elevador': 'Aufzug',
                          'parking': 'Parkplatz',
                          'garagempreosobconsulta': 'Garage (Preis auf Anfrage)',
                          'garagem(preçosobconsulta)': 'Garage (Preis auf Anfrage)',
                          'microondas': 'Mikrowelle',
                          'micro-ondas': 'Mikrowelle',
                          'frigorfico': 'Kühlschrank',
                          'frigorifico': 'Kühlschrank',
                          'mquinadelavarloia': 'Geschirrspüler',
                          'maquinadelavarloiça': 'Geschirrspüler',
                          'utensliosdecozinha': 'Küchenutensilien',
                          'utensiliosdecozinha': 'Küchenutensilien',
                          'utensíliosdecozinha': 'Küchenutensilien',
                          'mquinadelavarroupa': 'Waschmaschine',
                          'maquinadelavarroupa': 'Waschmaschine',
                          'ferrodeengomar': 'Bügeleisen',
                          'berodisponvel': 'Kinderbett Verfügbar',
                          'bercodisponivel': 'Kinderbett Verfügbar',
                          'bercodisponível': 'Kinderbett Verfügbar',
                          'camadecasal': 'Doppelbett',
                          'torradeira': 'Toaster',
                          'chaleira': 'Wasserkocher',
                          'vistamar': 'Meerblick',
                          'vistacidade': 'Stadtblick',
                          'varanda': 'Balkon',
                          'arcondicionado': 'Klimaanlage',
                          'wi-fi': 'WiFi',
                          'tv': 'TV',
                          'cozinhaequipada': 'Ausgestattete Küche',
                          'estacionamento': 'Parkplatz',
                          '2quartos': '2 Schlafzimmer'
                        };
                        return translations[featureKey] || feature;
                      }
                      
                      return t(`features.${featureKey}`) || feature;
                    })()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {(() => {
                      const currentLang = currentLanguage || 'pt';
                      if (currentLang === 'en') return `Gallery ${apartment.images?.length ? `(${apartment.images.length} photos)` : ''}`;
                      if (currentLang === 'fr') return `Galerie ${apartment.images?.length ? `(${apartment.images.length} photos)` : ''}`;
                      if (currentLang === 'de') return `Galerie ${apartment.images?.length ? `(${apartment.images.length} Fotos)` : ''}`;
                      return `Galeria ${(apartment.images?.length || 0) > 0 ? `(${apartment.images.length} fotos)` : ''}`;
                    })()}
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
                      {(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'View all';
                        if (currentLang === 'fr') return 'Voir tout';
                        if (currentLang === 'de') return 'Alle ansehen';
                        return 'Ver todas';
                      })()}
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
                    {(() => {
                      const currentLang = currentLanguage || 'pt';
                      if (currentLang === 'en') return 'Additional Information';
                      if (currentLang === 'fr') return 'Informations Supplémentaires';
                      if (currentLang === 'de') return 'Zusätzliche Informationen';
                      return 'Informações Adicionais';
                    })()}
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {(() => {
                        const currentLang = currentLanguage || 'pt';
                        const additionalInfo = apartment.additionalInfo;
                        
                        // Tradução automática para informações adicionais
                        if (currentLang === 'en') {
                          // Tradução para inglês
                          if (additionalInfo.includes('T1+1 com 100m2')) {
                            return `T1+1 with 100m2

Terrace ideal for enjoying a meal for two or with family, enjoying a view over the beach and the city. Or simply to relax with an impressive sea view.

Living room - common living room and dining room, furnished with the same class as the entire property, equipped with TV, LCD and A/C, with sofa bed (1 place).

Bedroom - master bedroom with queen size double bed, wardrobe, A/C and direct access to the terrace.

Bedroom with a bunk bed, thinking especially of children.

Kitchen - completely furnished and equipped with all utensils and small appliances necessary for your convenience.`;
                          }
                        } else if (currentLang === 'fr') {
                          // Tradução para francês
                          if (additionalInfo.includes('T1+1 com 100m2')) {
                            return `T1+1 avec 100m2

Terrasse idéale pour apprécier un repas à deux ou en famille, profitant d\'une vue sur la plage et la ville. Ou simplement pour vous détendre avec une vue imprenue sur la mer.

Salon - salon et salle à manger communs, meublés avec la même classe que l\'ensemble du bien, équipés avec TV, LCD et C/L, avec canapé-lit (1 place).

Chambre - chambre principale avec lit double queen size, penderie, C/L et accès direct à la terrasse.

Chambre avec lit superposé, pensant spécialement aux enfants.

Cuisine - entièrement meublée et équipée avec tous les ustensiles et petits électroménagers nécessaires pour votre confort.`;
                          }
                        } else if (currentLang === 'de') {
                          // Tradução para alemão
                          if (additionalInfo.includes('T1+1 com 100m2')) {
                            return `T1+1 mit 100m2

Terrasse ideal für ein Essen zu zweit oder mit der Familie, mit Blick auf den Strand und die Stadt. Oder einfach zum Entspannen mit beeindruckendem Meerblick.

Wohnzimmer - gemeinsames Wohn- und Esszimmer, möbliert mit der gleichen Klasse wie die gesamte Immobilie, ausgestattet mit TV, LCD und Klimaanlage, mit Schlafcouch (1 Platz).

Schlafzimmer - Hauptschlafzimmer mit Queen-Size-Doppelbett, Kleiderschrank, Klimaanlage und direktem Zugang zur Terrasse.

Schlafzimmer mit Etagenbett, besonders für Kinder gedacht.

Küche - vollständig möbliert und ausgestattet mit allen Utensilien und Kleingeräten, die für Ihren Komfort notwendig sind.`;
                          }
                        }
                        
                        // Fallback para português
                        return additionalInfo;
                      })()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-modern p-6 sticky top-24">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                  {(() => {
                    const currentLang = currentLanguage || 'pt';
                    if (currentLang === 'en') return 'Information';
                    if (currentLang === 'fr') return 'Informations';
                    if (currentLang === 'de') return 'Informationen';
                    return 'Informações';
                  })()}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Users className="h-5 w-5 text-primary-500" />
                      <span>{(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'Capacity';
                        if (currentLang === 'fr') return 'Capacité';
                        if (currentLang === 'de') return 'Kapazität';
                        return 'Capacidade';
                      })()}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {apartment.capacity} {(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'PAX';
                        if (currentLang === 'fr') return 'PAX';
                        if (currentLang === 'de') return 'PAX';
                        return 'PAX';
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Moon className="h-5 w-5 text-primary-500" />
                      <span>{(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'Minimum Stay';
                        if (currentLang === 'fr') return 'Séjour Minimum';
                        if (currentLang === 'de') return 'Mindestaufenthalt';
                        return 'Estadia mínima';
                      })()}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {apartment.minNights} {(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'nights';
                        if (currentLang === 'fr') return 'nuits';
                        if (currentLang === 'de') return 'Nächte';
                        return 'noites';
                      })()}
                    </span>
                  </div>
                </div>

                {/* Availability Calendar */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    <span>{t('calendar.availability')}</span>
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
                      <p>{t('calendar.checkAvailability')}</p>
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
                    {t('apartments.bookNow')}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                  >
                    {t('apartments.bookNow')}
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
                    {(() => {
                      const currentLang = currentLanguage || 'pt';
                      if (currentLang === 'en') return 'See Reviews';
                      if (currentLang === 'fr') return 'Voir les Avis';
                      if (currentLang === 'de') return 'Bewertungen Ansehen';
                      return 'Ver Avaliações';
                    })()}
                  </a>
                )}

                {/* Social Links & Reviews */}
                {(content.socialLinks?.tripadvisor || content.socialLinks?.airbnb || content.socialLinks?.booking || content.socialLinks?.googleReviews || content.socialLinks?.facebook || content.socialLinks?.instagram) && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-500 mb-3">{(() => {
                      const currentLang = currentLanguage || 'pt';
                      if (currentLang === 'en') return 'Follow us and see reviews';
                      if (currentLang === 'fr') return 'Suivez-nous et voir les avis';
                      if (currentLang === 'de') return 'Folgen Sie uns und sehen Sie Bewertungen';
                      return 'Siga-nos e veja avaliações';
                    })()}</p>
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
        images={apartment.images.map(img => ({ imageUrl: img }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
