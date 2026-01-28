import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Users, Moon, ArrowRight, Calendar, Facebook, Instagram, Star, ImageIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { FeatureIcon } from '../utils/featureIcons';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { ImageLightbox } from '../components/ImageLightbox';
import { useTranslation } from '../i18n/simple';
import { optimizeHeroImage, optimizeThumbnail } from '../utils/imageOptimizer';

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
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const apartment = content.apartments.find((apt) => apt.slug === slug);

  // Update SEO meta tags
  useEffect(() => {
    if (apartment) {
      const title = apartment.seoTitle || `${apartment.name} - Albufeira Holidays`;
      const description = apartment.seoDescription || apartment.description.substring(0, 160);
      const ogImage = apartment.ogImage || apartment.heroImage;
      const url = window.location.href;

      document.title = title;
      
      // Update or create meta tags
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attr}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attr, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMeta('description', description);
      updateMeta('keywords', apartment.seoKeywords || 'apartamento, albufeira, férias, algarve');
      updateMeta('og:title', title, true);
      updateMeta('og:description', description, true);
      updateMeta('og:image', ogImage, true);
      updateMeta('og:url', url, true);
      updateMeta('og:type', 'website', true);
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', title);
      updateMeta('twitter:description', description);
      updateMeta('twitter:image', ogImage);
    }
  }, [apartment]);

  if (!apartment) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {apartment.heroVideoUrl ? (
            <div className="absolute inset-0 bg-gray-900 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(apartment.heroVideoUrl)}?start=${apartment.heroVideoStartTime || 0}&autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(apartment.heroVideoUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                title={`${apartment.name} Video`}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ 
                  transform: 'translate(-50%, -50%)',
                  width: '100vw',
                  height: '56.25vw', // 16:9 aspect ratio
                  minWidth: '177.77vh', // 16:9 aspect ratio
                  minHeight: '100vh'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ) : (
            <img
              src={optimizeHeroImage(apartment.heroImage)}
              alt={apartment.name}
              loading="eager"
              decoding="async"
              className={`w-full h-full object-cover ${apartment.enableAnimation !== false ? 'animate-kenburns' : ''}`}
              style={{ objectPosition: apartment.heroImagePosition || 'center' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        
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
                          'eleganciaeconfortopremium': 'Elegance and Premium Comfort',
                          'elegnciaeconfortopremium': 'Elegance and Premium Comfort',
                          'espacoamploemdoispisos': 'Spacious Space on Two Floors',
                          'espaoamploemdoispisos': 'Spacious Space on Two Floors',
                          'confortomodernofuncional': 'Modern and Functional Comfort',
                          'confortomodernoefuncional': 'Modern and Functional Comfort'
                        };
                        return translations[taglineKey] || translations['vistapanorâmicasobreomar'] || apartment.tagline;
                      } else if (currentLang === 'fr') {
                        const translations: Record<string, string> = {
                          'vistapanorâmicasobreomar': 'Vue Panoramique sur la Mer',
                          'vistapanoramicasobreomar': 'Vue Panoramique sur la Mer',
                          'vistapanormicasobreomar': 'Vue Panoramique sur la Mer',
                          'elegânciaeconfortopremium': 'Élégance et Confort Premium',
                          'eleganciaeconfortopremium': 'Élégance et Confort Premium',
                          'elegnciaeconfortopremium': 'Élégance et Confort Premium',
                          'espacoamploemdoispisos': 'Espace Spacieux sur Deux Étages',
                          'espaoamploemdoispisos': 'Espace Spacieux sur Deux Étages',
                          'confortomodernofuncional': 'Confort Moderne et Fonctionnel',
                          'confortomodernoefuncional': 'Confort Moderne et Fonctionnel'
                        };
                        return translations[taglineKey] || translations['vistapanorâmicasobreomar'] || apartment.tagline;
                      } else if (currentLang === 'de') {
                        const translations: Record<string, string> = {
                          'vistapanorâmicasobreomar': 'Panoramablick auf das Meer',
                          'vistapanoramicasobreomar': 'Panoramablick auf das Meer',
                          'vistapanormicasobreomar': 'Panoramablick auf das Meer',
                          'elegânciaeconfortopremium': 'Eleganz und Premium Komfort',
                          'eleganciaeconfortopremium': 'Eleganz und Premium Komfort',
                          'elegnciaeconfortopremium': 'Eleganz und Premium Komfort',
                          'espacoamploemdoispisos': 'Geräumiger Raum auf Zwei Etagen',
                          'espaoamploemdoispisos': 'Geräumiger Raum auf Zwei Etagen',
                          'confortomodernofuncional': 'Moderner und Funktionaler Komfort',
                          'confortomodernoefuncional': 'Moderner und Funktionaler Komfort'
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
                    
                    // Usar traduções guardadas no apartamento se disponíveis
                    if (currentLang === 'en' && apartment.description_en) {
                      return apartment.description_en;
                    }
                    if (currentLang === 'fr' && apartment.description_fr) {
                      return apartment.description_fr;
                    }
                    if (currentLang === 'de' && apartment.description_de) {
                      return apartment.description_de;
                    }
                    
                    // Fallback para traduções hardcoded
                    if (currentLang === 'en') {
                      // Tradução para inglês
                      if (description.includes('T1+1 with 90m') || description.includes('Espaço, conforto e elegância')) {
                        return 'T1+1 with 90m²\n\nSpace, comfort and elegance just minutes from the beach, in the heart of Albufeira.\n\nThis magnificent apartment offers the perfect setting for couple or family holidays. With a large terrace accessible from the dining room, you can enjoy outdoor meals with an impressive view and moments of pure relaxation.\n\nThe social area consists of an open space living and dining room, decorated with class, equipped with LCD TV, air conditioning and a comfortable chaise longue.\n\nThe suite has a queen size bed, wardrobe, private bathroom with shower base, air conditioning and direct access to the terrace.\n\nThe secondary bedroom has a double bed and storage space, being ideal for the little ones.\n\nThe kitchen is fully equipped with all utensils and small appliances that ensure a practical and comfortable stay.\n\nA SPACIOUS RETREAT FOR UNFORGETTABLE HOLIDAYS... FEEL AT HOME, WITH THE COMFORT OF ALWAYS!';
                      } else if (description.includes('Em pleno coração de Albufeira')) {
                        return 'In the heart of Albufeira, just steps from the beach and all the local entertainment, this apartment was designed for those seeking tranquility without giving up comfort and elegance. Located in a modern building with 3 elevators, the space offers a cozy atmosphere, with a private balcony, abundant natural light and careful decoration, where every detail invites relaxation. Fully furnished and equipped, it is ideal for couple holidays, family or even extended stays. At the end of the day, enjoy the sea breeze and a glass of wine while the sky is painted with the colors of the sunset. ALLOW YOURSELF... RELAX AND FEEL AT HOME!';
                      } else if (description.includes('localização privilegiada') || description.includes('praia dos pescadores')) {
                        return 'With a privileged location, in front of the fishermen\'s beach in the center of Albufeira, a 6-story development that offers unparalleled privacy and an impressive beach and city view. It also stands out for its 2 panoramic elevators, panoramic pool on the 3rd floor and surrounding space. Private parking and interior elevator.\n\nOur apartments are fully furnished and equipped, with elegant and charming decoration, designed for your comfort...\n\nYou can also be enchanted in the late afternoon with an impressive sunset.\n\nALLOW YOURSELF... RELAX AND FEEL AT HOME!';
                      } else if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
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
                      if (description.includes('T1+1 with 90m') || description.includes('Espaço, conforto e elegância')) {
                        return 'T1+1 avec 90m²\n\nEspace, confort et élégance à quelques minutes de la plage, au cœur d\'Albufeira.\n\nCe magnifique appartement offre le cadre parfait pour des vacances en couple ou en famille. Avec une grande terrasse accessible depuis la salle à manger, vous pourrez profiter de repas en plein air avec une vue impressionnante et de moments de pure détente.\n\nL\'espace social se compose d\'un salon et salle à manger en open space, décoré avec classe, équipé d\'une TV LCD, climatisation et d\'une confortable chaise longue.\n\nLa suite dispose d\'un lit queen size, d\'une armoire, d\'une salle de bain privée avec douche, climatisation et accès direct à la terrasse.\n\nLa chambre secondaire dispose d\'un lit double et d\'un espace de rangement, idéal pour les plus jeunes.\n\nLa cuisine est entièrement équipée avec tous les ustensiles et petits électroménagers qui garantissent un séjour pratique et confortable.\n\nUN REFUGE SPACIEUX POUR DES VACANCES INOUBLIABLES... SENTEZ-VOUS CHEZ VOUS, AVEC LE CONFORT DE TOUJOURS!';
                      } else if (description.includes('Em pleno coração de Albufeira')) {
                        return 'Au cœur d\'Albufeira, à quelques pas de la plage et de toute l\'animation locale, cet appartement a été conçu pour ceux qui recherchent la tranquillité sans renoncer au confort et à l\'élégance. Situé dans un bâtiment moderne avec 3 ascenseurs, l\'espace offre une atmosphère chaleureuse, avec un balcon privé, une lumière naturelle abondante et une décoration soignée, où chaque détail invite à la détente. Entièrement meublé et équipé, il est idéal pour des vacances en couple, en famille ou même pour des séjours prolongés. En fin de journée, profitez de la brise marine et d\'un verre de vin tandis que le ciel se pare des couleurs du coucher de soleil. PERMETTEZ-VOUS... DÉTENDEZ-VOUS ET SENTEZ-VOUS CHEZ VOUS!';
                      } else if (description.includes('localização privilegiada') || description.includes('praia dos pescadores')) {
                        return 'Avec un emplacement privilégié, face à la plage des pêcheurs au centre d\'Albufeira, un immeuble de 6 étages qui offre une intimité incomparable et une vue imprenable sur la plage et la ville. Il se distingue également par ses 2 ascenseurs panoramiques, sa piscine panoramique au 3ème étage et son espace environnant. Parking privé et ascenseur intérieur.\n\nNos appartements sont entièrement meublés et équipés, avec une décoration élégante et charmante, pensée pour votre confort...\n\nVous pouvez également vous laisser enchanter en fin d\'après-midi par un coucher de soleil impressionnant.\n\nPERMETTEZ-VOUS... DÉTENDEZ-VOUS ET SENTEZ-VOUS CHEZ VOUS!';
                      } else if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
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
                      if (description.includes('T1+1 with 90m') || description.includes('Espaço, conforto e elegância')) {
                        return 'T1+1 mit 90m²\n\nRaum, Komfort und Eleganz nur wenige Minuten vom Strand entfernt, im Herzen von Albufeira.\n\nDiese wunderschöne Wohnung bietet die perfekte Umgebung für Paar- oder Familienurlaub. Mit einer großen Terrasse, die vom Esszimmer aus zugänglich ist, können Sie Mahlzeiten im Freien mit einer beeindruckenden Aussicht und Momente purer Entspannung genießen.\n\nDer Wohnbereich besteht aus einem offenen Wohn- und Esszimmer, mit Klasse dekoriert, ausgestattet mit LCD-TV, Klimaanlage und einer bequemen Chaiselongue.\n\nDie Suite verfügt über ein Queen-Size-Bett, Kleiderschrank, privates Badezimmer mit Dusche, Klimaanlage und direkten Zugang zur Terrasse.\n\nDas zweite Schlafzimmer verfügt über ein Doppelbett und Stauraum, ideal für die Kleinen.\n\nDie Küche ist komplett ausgestattet mit allen Utensilien und kleinen Elektrogeräten, die einen praktischen und komfortablen Aufenthalt garantieren.\n\nEIN GERÄUMIGER RÜCKZUGSORT FÜR UNVERGESSLICHE FERIEN... FÜHLEN SIE SICH WIE ZU HAUSE, MIT DEM KOMFORT VON IMMER!';
                      } else if (description.includes('Em pleno coração de Albufeira')) {
                        return 'Im Herzen von Albufeira, nur wenige Schritte vom Strand und dem lokalen Nachtleben entfernt, wurde diese Wohnung für diejenigen konzipiert, die Ruhe suchen, ohne auf Komfort und Eleganz zu verzichten. In einem modernen Gebäude mit 3 Aufzügen gelegen, bietet der Raum eine gemütliche Atmosphäre mit privatem Balkon, reichlich natürlichem Licht und sorgfältiger Dekoration, wo jedes Detail zur Entspannung einlädt. Komplett möbliert und ausgestattet, ist es ideal für Paarurlaub, Familie oder sogar längere Aufenthalte. Am Ende des Tages genießen Sie die Meeresbrise und ein Glas Wein, während der Himmel sich mit den Farben des Sonnenuntergangs färbt. GÖNNEN SIE SICH... ENTSPANNEN SIE SICH UND FÜHLEN SIE SICH WIE ZU HAUSE!';
                      } else if (description.includes('localização privilegiada') || description.includes('praia dos pescadores')) {
                        return 'Mit privilegierter Lage, gegenüber dem Fischerstrand im Zentrum von Albufeira, bietet dieses 6-stöckige Gebäude unvergleichliche Privatsphäre und einen beeindruckenden Blick auf Strand und Stadt. Es zeichnet sich auch durch seine 2 Panorama-Aufzüge, den Panorama-Pool im 3. Stock und den umliegenden Bereich aus. Privater Parkplatz und Innenaufzug.\n\nUnsere Apartments sind komplett möbliert und ausgestattet, mit eleganter und charmanter Dekoration, die für Ihren Komfort konzipiert wurde...\n\nSie können sich auch am späten Nachmittag von einem beeindruckenden Sonnenuntergang verzaubern lassen.\n\nGÖNNEN SIE SICH... ENTSPANNEN SIE SICH UND FÜHLEN SIE SICH WIE ZU HAUSE!';
                      } else if (description.includes('Apartamento T1 no 6º andar com vista mar espetacular')) {
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
                <div className={`grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 gap-1 ${!showAllAmenities ? 'md:grid' : ''}`}>
                  {apartment.features.slice(0, showAllAmenities ? apartment.features.length : 5).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-1 p-1 rounded-md bg-gray-50 border border-gray-100"
                    >
                      <FeatureIcon feature={feature} className="h-3 w-3 md:h-4 md:w-4 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700 text-[10px] md:text-xs truncate">{(() => {
                      const currentLang = currentLanguage || 'pt';
                      
                      // Função para normalizar string (remover acentos e caracteres especiais)
                      const normalizeString = (str: string) => {
                        return str.toLowerCase()
                          .replace(/[àáâãäå]/g, 'a')
                          .replace(/[èéêë]/g, 'e')
                          .replace(/[ìíîï]/g, 'i')
                          .replace(/[òóôõö]/g, 'o')
                          .replace(/[ùúûü]/g, 'u')
                          .replace(/[ýÿ]/g, 'y')
                          .replace(/[ñ]/g, 'n')
                          .replace(/[ç]/g, 'c')
                          .replace(/\s+/g, '')
                          .replace(/[^\w]/gi, '');
                      };
                      
                      const featureKey = normalizeString(feature);
                      
                      // Tradução automática para features - EXPANDIDA
                      if (currentLang === 'en') {
                        const translations: Record<string, string> = {
                          // Views
                          'vistamar': 'Sea View',
                          'vistamarparcial': 'Partial Sea View',
                          'vistacidade': 'City View',
                          'vistapiscina': 'Pool View',
                          'vistajardim': 'Garden View',
                          'vistamontanha': 'Mountain View',
                          // Outdoor
                          'varanda': 'Balcony',
                          'terraco': 'Terrace',
                          'terrao': 'Terrace',
                          'jardimprivado': 'Private Garden',
                          'patio': 'Patio',
                          // Structure
                          '2pisos': '2 Floors',
                          'duplex': 'Duplex',
                          'penthouse': 'Penthouse',
                          // Bedrooms
                          '1quarto': '1 Bedroom',
                          '2quartos': '2 Bedrooms',
                          '3quartos': '3 Bedrooms',
                          'suite': 'Suite',
                          'camadecasal': 'Double Bed',
                          'camasindividuais': 'Twin Beds',
                          'sofacama': 'Sofa Bed',
                          'sofa-cama': 'Sofa Bed',
                          'bercodisponivel': 'Crib Available',
                          'bercodisponível': 'Crib Available',
                          'berodisponvel': 'Crib Available',
                          // Bathroom
                          'casadebanhoprivada': 'Private Bathroom',
                          'banheira': 'Bathtub',
                          'chuveiro': 'Shower',
                          'secadordecabelo': 'Hair Dryer',
                          // Climate
                          'arcondicionado': 'Air Conditioning',
                          'aquecimentocentral': 'Central Heating',
                          'lareira': 'Fireplace',
                          'ventoinha': 'Fan',
                          // Connectivity
                          'wi-fi': 'Wi-Fi',
                          'wifi': 'Wi-Fi',
                          'wi-fififibra': 'Fiber Wi-Fi',
                          'wififibra': 'Fiber Wi-Fi',
                          'tv': 'TV',
                          'smarttv': 'Smart TV',
                          'netflix': 'Netflix',
                          'tvporcabo': 'Cable TV',
                          // Kitchen
                          'cozinhaequipada': 'Equipped Kitchen',
                          'microondas': 'Microwave',
                          'micro-ondas': 'Microwave',
                          'forno': 'Oven',
                          'placavitroceramica': 'Ceramic Hob',
                          'frigorifico': 'Refrigerator',
                          'frigorfico': 'Refrigerator',
                          'congelador': 'Freezer',
                          'freezer': 'Freezer',
                          'maquinadecafe': 'Coffee Machine',
                          'máquinadecafé': 'Coffee Machine',
                          'torradeira': 'Toaster',
                          'chaleira': 'Kettle',
                          'maquinadelavarloica': 'Dishwasher',
                          'maquinadelavarloiça': 'Dishwasher',
                          'mquinadelavarloia': 'Dishwasher',
                          'utensiliosdecozinha': 'Kitchen Utensils',
                          'utensíliosdecozinha': 'Kitchen Utensils',
                          'utensliosdecozinha': 'Kitchen Utensils',
                          // Laundry
                          'maquinadelavarroupa': 'Washing Machine',
                          'mquinadelavarroupa': 'Washing Machine',
                          'maquinadesecar': 'Dryer',
                          'ferrodeengomar': 'Iron',
                          'tabuadeengomar': 'Ironing Board',
                          'tábuadeengomar': 'Ironing Board',
                          'tbuadeengomar': 'Ironing Board',
                          // Comfort
                          'toalhas': 'Towels',
                          'roupadecama': 'Bed Linen',
                          'almoladasextra': 'Extra Pillows',
                          'cobertores': 'Blankets',
                          // Safety
                          'cofre': 'Safe',
                          'alarme': 'Alarm',
                          'fechaduradigital': 'Digital Lock',
                          'detetordefumo': 'Smoke Detector',
                          'extintor': 'Fire Extinguisher',
                          'kitdeprimeirossocorros': 'First Aid Kit',
                          // Building
                          'elevador': 'Elevator',
                          'estacionamento': 'Parking',
                          'parking': 'Parking',
                          'estacionamentoprivado': 'Private Parking',
                          'garagemprecosobconsulta': 'Garage (price on request)',
                          'porteiro': 'Doorman',
                          'entradaprivada': 'Private Entrance',
                          // Leisure
                          'piscina': 'Pool',
                          'piscinaprivada': 'Private Pool',
                          'piscinapartilhada': 'Shared Pool',
                          'jacuzzi': 'Jacuzzi',
                          'ginasio': 'Gym',
                          'ginásio': 'Gym',
                          'sauna': 'Sauna',
                          'churrasqueira': 'Barbecue',
                          'mobiliadeexterior': 'Outdoor Furniture',
                          // Policies
                          'animaispermitidos': 'Pets Allowed',
                          'naofumadores': 'No Smoking',
                          'nãofumadores': 'No Smoking',
                          'acessivelacadeiraderodas': 'Wheelchair Accessible',
                          'acessívelacadeiraderodas': 'Wheelchair Accessible',
                          'check-inautonomo': 'Self Check-in',
                          'checkinautonomo': 'Self Check-in',
                          'limpezaincluida': 'Cleaning Included',
                          'limpezaincluída': 'Cleaning Included',
                          'artigosdehigiene': 'Toiletries',
                          'toiletries': 'Toiletries'
                        };
                        return translations[featureKey] || feature;
                      } else if (currentLang === 'fr') {
                        const translations: Record<string, string> = {
                          // Views
                          'vistamar': 'Vue Mer',
                          'vistamarparcial': 'Vue Mer Partielle',
                          'vistacidade': 'Vue Ville',
                          'vistapiscina': 'Vue Piscine',
                          'vistajardim': 'Vue Jardin',
                          'vistamontanha': 'Vue Montagne',
                          // Outdoor
                          'varanda': 'Balcon',
                          'terraco': 'Terrasse',
                          'terrao': 'Terrasse',
                          'jardimprivado': 'Jardin Privé',
                          'patio': 'Patio',
                          // Structure
                          '2pisos': '2 Étages',
                          'duplex': 'Duplex',
                          'penthouse': 'Penthouse',
                          // Bedrooms
                          '1quarto': '1 Chambre',
                          '2quartos': '2 Chambres',
                          '3quartos': '3 Chambres',
                          'suite': 'Suite',
                          'camadecasal': 'Lit Double',
                          'camasindividuais': 'Lits Jumeaux',
                          'sofacama': 'Canapé-Lit',
                          'sofa-cama': 'Canapé-Lit',
                          'bercodisponivel': 'Lit Bébé Disponible',
                          'bercodisponível': 'Lit Bébé Disponible',
                          'berodisponvel': 'Lit Bébé Disponible',
                          // Bathroom
                          'casadebanhoprivada': 'Salle de Bain Privée',
                          'banheira': 'Baignoire',
                          'chuveiro': 'Douche',
                          'secadordecabelo': 'Sèche-Cheveux',
                          // Climate
                          'arcondicionado': 'Climatisation',
                          'aquecimentocentral': 'Chauffage Central',
                          'lareira': 'Cheminée',
                          'ventoinha': 'Ventilateur',
                          // Connectivity
                          'wi-fi': 'Wi-Fi',
                          'wifi': 'Wi-Fi',
                          'wififibra': 'Wi-Fi Fibre',
                          'tv': 'TV',
                          'smarttv': 'Smart TV',
                          'netflix': 'Netflix',
                          'tvporcabo': 'TV par Câble',
                          // Kitchen
                          'cozinhaequipada': 'Cuisine Équipée',
                          'microondas': 'Micro-ondes',
                          'micro-ondas': 'Micro-ondes',
                          'forno': 'Four',
                          'placavitroceramica': 'Plaque Vitrocéramique',
                          'frigorifico': 'Réfrigérateur',
                          'frigorfico': 'Réfrigérateur',
                          'congelador': 'Congélateur',
                          'freezer': 'Congélateur',
                          'maquinadecafe': 'Machine à Café',
                          'torradeira': 'Grille-Pain',
                          'chaleira': 'Bouilloire',
                          'maquinadelavarloica': 'Lave-Vaisselle',
                          'maquinadelavarloiça': 'Lave-Vaisselle',
                          'mquinadelavarloia': 'Lave-Vaisselle',
                          'utensiliosdecozinha': 'Ustensiles de Cuisine',
                          'utensíliosdecozinha': 'Ustensiles de Cuisine',
                          'utensliosdecozinha': 'Ustensiles de Cuisine',
                          // Laundry
                          'maquinadelavarroupa': 'Machine à Laver',
                          'mquinadelavarroupa': 'Machine à Laver',
                          'maquinadesecar': 'Sèche-Linge',
                          'ferrodeengomar': 'Fer à Repasser',
                          'tabuadeengomar': 'Planche à Repasser',
                          'tábuadeengomar': 'Planche à Repasser',
                          'tbuadeengomar': 'Planche à Repasser',
                          // Comfort
                          'toalhas': 'Serviettes',
                          'roupadecama': 'Linge de Lit',
                          'almoladasextra': 'Oreillers Supplémentaires',
                          'cobertores': 'Couvertures',
                          // Safety
                          'cofre': 'Coffre-Fort',
                          'alarme': 'Alarme',
                          'fechaduradigital': 'Serrure Numérique',
                          'detetordefumo': 'Détecteur de Fumée',
                          'extintor': 'Extincteur',
                          'kitdeprimeirossocorros': 'Trousse de Premiers Secours',
                          // Building
                          'elevador': 'Ascenseur',
                          'estacionamento': 'Parking',
                          'parking': 'Parking',
                          'estacionamentoprivado': 'Parking Privé',
                          'garagemprecosobconsulta': 'Garage (prix sur demande)',
                          'porteiro': 'Portier',
                          'entradaprivada': 'Entrée Privée',
                          // Leisure
                          'piscina': 'Piscine',
                          'piscinaprivada': 'Piscine Privée',
                          'piscinapartilhada': 'Piscine Partagée',
                          'jacuzzi': 'Jacuzzi',
                          'ginasio': 'Salle de Sport',
                          'ginásio': 'Salle de Sport',
                          'sauna': 'Sauna',
                          'churrasqueira': 'Barbecue',
                          'mobiliadeexterior': 'Mobilier d\'Extérieur',
                          // Policies
                          'animaispermitidos': 'Animaux Acceptés',
                          'naofumadores': 'Non-Fumeurs',
                          'nãofumadores': 'Non-Fumeurs',
                          'acessivelacadeiraderodas': 'Accessible en Fauteuil Roulant',
                          'check-inautonomo': 'Enregistrement Autonome',
                          'checkinautonomo': 'Enregistrement Autonome',
                          'limpezaincluida': 'Ménage Inclus',
                          'limpezaincluída': 'Ménage Inclus',
                          'artigosdehigiene': 'Articles de Toilette',
                          'toiletries': 'Articles de Toilette'
                        };
                        return translations[featureKey] || feature;
                      } else if (currentLang === 'de') {
                        const translations: Record<string, string> = {
                          // Views
                          'vistamar': 'Meerblick',
                          'vistamarparcial': 'Teilweiser Meerblick',
                          'vistacidade': 'Stadtblick',
                          'vistapiscina': 'Poolblick',
                          'vistajardim': 'Gartenblick',
                          'vistamontanha': 'Bergblick',
                          // Outdoor
                          'varanda': 'Balkon',
                          'terraco': 'Terrasse',
                          'terrao': 'Terrasse',
                          'jardimprivado': 'Privater Garten',
                          'patio': 'Innenhof',
                          // Structure
                          '2pisos': '2 Stockwerke',
                          'duplex': 'Duplex',
                          'penthouse': 'Penthouse',
                          // Bedrooms
                          '1quarto': '1 Schlafzimmer',
                          '2quartos': '2 Schlafzimmer',
                          '3quartos': '3 Schlafzimmer',
                          'suite': 'Suite',
                          'camadecasal': 'Doppelbett',
                          'camasindividuais': 'Einzelbetten',
                          'sofacama': 'Schlafsofa',
                          'sofa-cama': 'Schlafsofa',
                          'bercodisponivel': 'Kinderbett Verfügbar',
                          'bercodisponível': 'Kinderbett Verfügbar',
                          'berodisponvel': 'Kinderbett Verfügbar',
                          // Bathroom
                          'casadebanhoprivada': 'Privates Badezimmer',
                          'banheira': 'Badewanne',
                          'chuveiro': 'Dusche',
                          'secadordecabelo': 'Haartrockner',
                          // Climate
                          'arcondicionado': 'Klimaanlage',
                          'aquecimentocentral': 'Zentralheizung',
                          'lareira': 'Kamin',
                          'ventoinha': 'Ventilator',
                          // Connectivity
                          'wi-fi': 'Wi-Fi',
                          'wifi': 'Wi-Fi',
                          'wififibra': 'Glasfaser Wi-Fi',
                          'tv': 'TV',
                          'smarttv': 'Smart TV',
                          'netflix': 'Netflix',
                          'tvporcabo': 'Kabel-TV',
                          // Kitchen
                          'cozinhaequipada': 'Ausgestattete Küche',
                          'microondas': 'Mikrowelle',
                          'micro-ondas': 'Mikrowelle',
                          'forno': 'Backofen',
                          'placavitroceramica': 'Glaskeramik-Kochfeld',
                          'frigorifico': 'Kühlschrank',
                          'frigorfico': 'Kühlschrank',
                          'congelador': 'Gefrierschrank',
                          'freezer': 'Gefrierschrank',
                          'maquinadecafe': 'Kaffeemaschine',
                          'torradeira': 'Toaster',
                          'chaleira': 'Wasserkocher',
                          'maquinadelavarloica': 'Geschirrspüler',
                          'maquinadelavarloiça': 'Geschirrspüler',
                          'mquinadelavarloia': 'Geschirrspüler',
                          'utensiliosdecozinha': 'Küchenutensilien',
                          'utensíliosdecozinha': 'Küchenutensilien',
                          'utensliosdecozinha': 'Küchenutensilien',
                          // Laundry
                          'maquinadelavarroupa': 'Waschmaschine',
                          'mquinadelavarroupa': 'Waschmaschine',
                          'maquinadesecar': 'Trockner',
                          'ferrodeengomar': 'Bügeleisen',
                          'tabuadeengomar': 'Bügelbrett',
                          'tábuadeengomar': 'Bügelbrett',
                          'tbuadeengomar': 'Bügelbrett',
                          // Comfort
                          'toalhas': 'Handtücher',
                          'roupadecama': 'Bettwäsche',
                          'almoladasextra': 'Extra Kissen',
                          'cobertores': 'Decken',
                          // Safety
                          'cofre': 'Tresor',
                          'alarme': 'Alarm',
                          'fechaduradigital': 'Digitales Schloss',
                          'detetordefumo': 'Rauchmelder',
                          'extintor': 'Feuerlöscher',
                          'kitdeprimeirossocorros': 'Erste-Hilfe-Kasten',
                          // Building
                          'elevador': 'Aufzug',
                          'estacionamento': 'Parkplatz',
                          'parking': 'Parkplatz',
                          'estacionamentoprivado': 'Privater Parkplatz',
                          'garagemprecosobconsulta': 'Garage (Preis auf Anfrage)',
                          'porteiro': 'Portier',
                          'entradaprivada': 'Privater Eingang',
                          // Leisure
                          'piscina': 'Pool',
                          'piscinaprivada': 'Privater Pool',
                          'piscinapartilhada': 'Gemeinschaftspool',
                          'jacuzzi': 'Jacuzzi',
                          'ginasio': 'Fitnessstudio',
                          'ginásio': 'Fitnessstudio',
                          'sauna': 'Sauna',
                          'churrasqueira': 'Grill',
                          'mobiliadeexterior': 'Gartenmöbel',
                          // Policies
                          'animaispermitidos': 'Haustiere Erlaubt',
                          'naofumadores': 'Nichtraucher',
                          'nãofumadores': 'Nichtraucher',
                          'acessivelacadeiraderodas': 'Rollstuhlgerecht',
                          'check-inautonomo': 'Selbst-Check-in',
                          'checkinautonomo': 'Selbst-Check-in',
                          'limpezaincluida': 'Reinigung Inklusive',
                          'limpezaincluída': 'Reinigung Inklusive',
                          'artigosdehigiene': 'Toilettenartikel',
                          'toiletries': 'Toilettenartikel'
                        };
                        return translations[featureKey] || feature;
                      }
                      
                      // Para português, usar o texto original da feature
                      const translated = t(`features.${featureKey}`);
                      // Se a tradução retornar a chave (não encontrada), usar o texto original
                      if (translated === `features.${featureKey}` || !translated) {
                        return feature;
                      }
                      return translated;
                    })()}</span>
                    </div>
                  ))}
                </div>
                
                {/* Botão para expandir/colapsar comodidades - Mobile */}
                {apartment.features.length > 5 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="md:hidden mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                  >
                    {showAllAmenities ? (
                      <>
                        {(() => {
                          const currentLang = currentLanguage || 'pt';
                          if (currentLang === 'en') return '- Hide amenities';
                          if (currentLang === 'fr') return '- Masquer les équipements';
                          if (currentLang === 'de') return '- Ausstattung ausblenden';
                          return '- Ocultar comodidades';
                        })()}
                      </>
                    ) : (
                      <>
                        {(() => {
                          const currentLang = currentLanguage || 'pt';
                          if (currentLang === 'en') return `+ ${apartment.features.length - 5} more amenities`;
                          if (currentLang === 'fr') return `+ ${apartment.features.length - 5} équipements supplémentaires`;
                          if (currentLang === 'de') return `+ ${apartment.features.length - 5} weitere Ausstattungen`;
                          return `+ ${apartment.features.length - 5} comodidades`;
                        })()}
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Availability Calendar - Mobile */}
              <div className="md:hidden mb-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  <span>{t('calendar.availability')}</span>
                </div>
                {apartment.icalUrl ? (
                  <AvailabilityCalendar 
                    icalUrl={apartment.icalUrl} 
                    minNights={apartment.minNights}
                    minNightsByMonth={apartment.minNightsByMonth}
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

              {/* Booking Information - Mobile */}
              <div className="md:hidden mb-6">
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
                      {apartment.capacity} PAX
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {apartment.images.slice(0, typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 6).map((image, index) => {
                      const mobileLimit = 4;
                      const desktopLimit = 6;
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                      const limit = isMobile ? mobileLimit : desktopLimit;
                      const isLast = index === limit - 1;
                      const hasMore = apartment.images.length > limit;
                      
                      return (
                      <button
                        key={index}
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer"
                      >
                        <img
                          src={optimizeThumbnail(image)}
                          alt={`${apartment.name} - Imagem ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-32 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        {isLast && hasMore && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{apartment.images.length - limit}</span>
                          </div>
                        )}
                      </button>
                    )})}
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
                          if (additionalInfo.includes('T1+1 with 90m') || additionalInfo.includes('Espaço, conforto e elegância')) {
                            return 'T1+1 with 90m²\n\nSpace, comfort and elegance just minutes from the beach, in the heart of Albufeira.\n\nThis magnificent apartment offers the perfect setting for couple or family holidays. With a large terrace accessible from the dining room, you can enjoy outdoor meals with an impressive view and moments of pure relaxation.\n\nThe social area consists of an open space living and dining room, decorated with class, equipped with LCD TV, air conditioning and a comfortable chaise longue.\n\nThe suite has a queen size bed, wardrobe, private bathroom with shower base, air conditioning and direct access to the terrace.\n\nThe secondary bedroom has a double bed and storage space, being ideal for the little ones.\n\nThe kitchen is fully equipped with all utensils and small appliances that ensure a practical and comfortable stay.\n\nA SPACIOUS RETREAT FOR UNFORGETTABLE HOLIDAYS... FEEL AT HOME, WITH THE COMFORT OF ALWAYS!';
                          } else if (additionalInfo.includes('localização privilegiada') || additionalInfo.includes('praia dos pescadores')) {
                            return 'With a privileged location, in front of the fishermen\'s beach in the center of Albufeira, a 6-story development that offers unparalleled privacy and an impressive beach and city view. It also stands out for its 2 panoramic elevators, panoramic pool on the 3rd floor and surrounding space. Private parking and interior elevator.\n\nOur apartments are fully furnished and equipped, with elegant and charming decoration, designed for your comfort...\n\nYou can also be enchanted in the late afternoon with an impressive sunset.\n\nALLOW YOURSELF... RELAX AND FEEL AT HOME!';
                          } else if (additionalInfo.includes('T2 com 130m2') || additionalInfo.includes('Terraço - através da sala de jantar')) {
                            return `T2 with 130m2

Terrace - through the dining room you can access the terrace, ideal for enjoying a meal while taking in an impressive view.

Living room - common living and dining room, furnished with the same class as the entire property, TV, LCD and A/C. 2-seater sofa bed.

Bedroom - with queen size double bed, 1 wardrobe, A/C and direct access to the terrace.

Suite - on the upper floor, consisting of 2 single beds, wardrobe, A/C, full bathroom with bathtub, and a private terrace.

Kitchen - completely furnished and equipped with all utensils and small appliances necessary for your convenience.`;
                          } else if (additionalInfo.includes('T1+1 com 100m2')) {
                            return `T1+1 with 100m2

Terrace ideal for enjoying a meal for two or with family, enjoying a view over the beach and the city. Or simply to relax with an impressive sea view.

Living room - common living room and dining room, furnished with the same class as the entire property, equipped with TV, LCD and A/C, with sofa bed (1 place).

Bedroom - master bedroom with queen size double bed, wardrobe, A/C and direct access to the terrace.

Bedroom with a bunk bed, thinking especially of children.

Kitchen - completely furnished and equipped with all utensils and small appliances necessary for your convenience.`;
                          }
                        } else if (currentLang === 'fr') {
                          // Tradução para francês
                          if (additionalInfo.includes('T1+1 with 90m') || additionalInfo.includes('Espaço, conforto e elegância')) {
                            return 'T1+1 avec 90m²\n\nEspace, confort et élégance à quelques minutes de la plage, au cœur d\'Albufeira.\n\nCe magnifique appartement offre le cadre parfait pour des vacances en couple ou en famille. Avec une grande terrasse accessible depuis la salle à manger, vous pourrez profiter de repas en plein air avec une vue impressionnante et de moments de pure détente.\n\nL\'espace social se compose d\'un salon et salle à manger en open space, décoré avec classe, équipé d\'une TV LCD, climatisation et d\'une confortable chaise longue.\n\nLa suite dispose d\'un lit queen size, d\'une armoire, d\'une salle de bain privée avec douche, climatisation et accès direct à la terrasse.\n\nLa chambre secondaire dispose d\'un lit double et d\'un espace de rangement, idéal pour les plus jeunes.\n\nLa cuisine est entièrement équipée avec tous les ustensiles et petits électroménagers qui garantissent un séjour pratique et confortable.\n\nUN REFUGE SPACIEUX POUR DES VACANCES INOUBLIABLES... SENTEZ-VOUS CHEZ VOUS, AVEC LE CONFORT DE TOUJOURS!';
                          } else if (additionalInfo.includes('localização privilegiada') || additionalInfo.includes('praia dos pescadores')) {
                            return 'Avec un emplacement privilégié, face à la plage des pêcheurs au centre d\'Albufeira, un immeuble de 6 étages qui offre une intimité incomparable et une vue imprenable sur la plage et la ville. Il se distingue également par ses 2 ascenseurs panoramiques, sa piscine panoramique au 3ème étage et son espace environnant. Parking privé et ascenseur intérieur.\n\nNos appartements sont entièrement meublés et équipés, avec une décoration élégante et charmante, pensée pour votre confort...\n\nVous pouvez également vous laisser enchanter en fin d\'après-midi par un coucher de soleil impressionnant.\n\nPERMETTEZ-VOUS... DÉTENDEZ-VOUS ET SENTEZ-VOUS CHEZ VOUS!';
                          } else if (additionalInfo.includes('T2 com 130m2') || additionalInfo.includes('Terraço - através da sala de jantar')) {
                            return `T2 avec 130m2

Terrasse - par la salle à manger vous pouvez accéder à la terrasse, idéale pour apprécier un repas tout en profitant d'une vue impressionnante.

Salon - salon et salle à manger communs, meublés avec la même classe que l'ensemble du bien, TV, LCD et climatisation. Canapé-lit 2 places.

Chambre - avec lit double queen size, 1 armoire, climatisation et accès direct à la terrasse.

Suite - à l'étage supérieur, composée de 2 lits simples, armoire, climatisation, salle de bain complète avec baignoire, et une terrasse privée.

Cuisine - entièrement meublée et équipée avec tous les ustensiles et petits électroménagers nécessaires pour votre confort.`;
                          } else if (additionalInfo.includes('T1+1 com 100m2')) {
                            return `T1+1 avec 100m2

Terrasse idéale pour apprécier un repas à deux ou en famille, profitant d\'une vue sur la plage et la ville. Ou simplement pour vous détendre avec une vue imprenue sur la mer.

Salon - salon et salle à manger communs, meublés avec la même classe que l\'ensemble du bien, équipés avec TV, LCD et C/L, avec canapé-lit (1 place).

Chambre - chambre principale avec lit double queen size, penderie, C/L et accès direct à la terrasse.

Chambre avec lit superposé, pensant spécialement aux enfants.

Cuisine - entièrement meublée et équipée avec tous les ustensiles et petits électroménagers nécessaires pour votre confort.`;
                          }
                        } else if (currentLang === 'de') {
                          // Tradução para alemão
                          if (additionalInfo.includes('T1+1 with 90m') || additionalInfo.includes('Espaço, conforto e elegância')) {
                            return 'T1+1 mit 90m²\n\nRaum, Komfort und Eleganz nur wenige Minuten vom Strand entfernt, im Herzen von Albufeira.\n\nDiese wunderschöne Wohnung bietet die perfekte Umgebung für Paar- oder Familienurlaub. Mit einer großen Terrasse, die vom Esszimmer aus zugänglich ist, können Sie Mahlzeiten im Freien mit einer beeindruckenden Aussicht und Momente purer Entspannung genießen.\n\nDer Wohnbereich besteht aus einem offenen Wohn- und Esszimmer, mit Klasse dekoriert, ausgestattet mit LCD-TV, Klimaanlage und einer bequemen Chaiselongue.\n\nDie Suite verfügt über ein Queen-Size-Bett, Kleiderschrank, privates Badezimmer mit Dusche, Klimaanlage und direkten Zugang zur Terrasse.\n\nDas zweite Schlafzimmer verfügt über ein Doppelbett und Stauraum, ideal für die Kleinen.\n\nDie Küche ist komplett ausgestattet mit allen Utensilien und kleinen Elektrogeräten, die einen praktischen und komfortablen Aufenthalt garantieren.\n\nEIN GERÄUMIGER RÜCKZUGSORT FÜR UNVERGESSLICHE FERIEN... FÜHLEN SIE SICH WIE ZU HAUSE, MIT DEM KOMFORT VON IMMER!';
                          } else if (additionalInfo.includes('localização privilegiada') || additionalInfo.includes('praia dos pescadores')) {
                            return 'Mit privilegierter Lage, gegenüber dem Fischerstrand im Zentrum von Albufeira, bietet dieses 6-stöckige Gebäude unvergleichliche Privatsphäre und einen beeindruckenden Blick auf Strand und Stadt. Es zeichnet sich auch durch seine 2 Panorama-Aufzüge, den Panorama-Pool im 3. Stock und den umliegenden Bereich aus. Privater Parkplatz und Innenaufzug.\n\nUnsere Apartments sind komplett möbliert und ausgestattet, mit eleganter und charmanter Dekoration, die für Ihren Komfort konzipiert wurde...\n\nSie können sich auch am späten Nachmittag von einem beeindruckenden Sonnenuntergang verzaubern lassen.\n\nGÖNNEN SIE SICH... ENTSPANNEN SIE SICH UND FÜHLEN SIE SICH WIE ZU HAUSE!';
                          } else if (additionalInfo.includes('T2 com 130m2') || additionalInfo.includes('Terraço - através da sala de jantar')) {
                            return `T2 mit 130m2

Terrasse - durch das Esszimmer gelangen Sie zur Terrasse, ideal um eine Mahlzeit zu genießen und dabei eine beeindruckende Aussicht zu haben.

Wohnzimmer - gemeinsames Wohn- und Esszimmer, möbliert mit der gleichen Klasse wie die gesamte Immobilie, TV, LCD und Klimaanlage. 2-Sitzer Schlafsofa.

Schlafzimmer - mit Queen-Size-Doppelbett, 1 Kleiderschrank, Klimaanlage und direktem Zugang zur Terrasse.

Suite - im Obergeschoss, bestehend aus 2 Einzelbetten, Kleiderschrank, Klimaanlage, Vollbad mit Badewanne und einer privaten Terrasse.

Küche - vollständig möbliert und ausgestattet mit allen Utensilien und Kleingeräten, die für Ihren Komfort notwendig sind.`;
                          } else if (additionalInfo.includes('T1+1 com 100m2')) {
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

                {/* Informações de capacidade e estadia mínima - apenas Desktop */}
                <div className="hidden md:block space-y-4 mb-6">
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

                {/* Availability Calendar - Desktop */}
                <div className="hidden md:block mb-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    <span>{t('calendar.availability')}</span>
                  </div>
                  {apartment.icalUrl ? (
                    <AvailabilityCalendar 
                      icalUrl={apartment.icalUrl} 
                      minNights={apartment.minNights}
                      minNightsByMonth={apartment.minNightsByMonth}
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

                {/* Apartment Reviews */}
                {(() => {
                  const apartmentReviews = content.reviews?.filter(r => r.active && r.apartment === apartment.name) || [];
                  if (apartmentReviews.length === 0) return null;
                  
                  return (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {(() => {
                          const currentLang = currentLanguage || 'pt';
                          if (currentLang === 'en') return 'Reviews';
                          if (currentLang === 'fr') return 'Avis';
                          if (currentLang === 'de') return 'Bewertungen';
                          return 'Avaliações';
                        })()}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {apartmentReviews.slice(0, 6).map((review) => (
                          <div key={review.id} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                            <div className="flex items-center gap-0.5 mb-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-2.5 w-2.5 fill-current text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-gray-600 text-[10px] line-clamp-3 leading-tight">
                              {(() => {
                                const lang = currentLanguage || 'pt';
                                if (lang === 'en' && review.text_en) return review.text_en;
                                if (lang === 'fr' && review.text_fr) return review.text_fr;
                                if (lang === 'de' && review.text_de) return review.text_de;
                                return review.text;
                              })()}
                            </p>
                            <p className="text-gray-500 text-[9px] mt-1 font-medium">{review.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

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
                          <img src="/Airbnb.png" alt="Airbnb" className="h-5 w-5 object-contain" />
                        </a>
                      )}
                      {content.socialLinks?.booking && (
                        <a href={content.socialLinks.booking} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Booking.com">
                          <img src="/Booking.svg" alt="Booking.com" className="h-5 w-5 object-contain" />
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
