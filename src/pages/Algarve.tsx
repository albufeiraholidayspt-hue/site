import { useEffect, useState } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ImageLightbox } from '../components/ImageLightbox';
import { WeatherWidget } from '../components/WeatherWidget';
import { useTranslation } from '../i18n/simple';
import { optimizeHeroImage, optimizeCardImage, optimizeThumbnail } from '../utils/imageOptimizer';

const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export function Algarve() {
  const { content, updateAlgarve } = useStore();
  const { currentLanguage } = useTranslation();
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
    
    // Open Graph meta tags
    const ogImage = algarve?.seo?.ogImage || algarve?.hero?.backgroundImage || '';
    const url = window.location.href;
    
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
    
    updateMeta('og:title', seoTitle, true);
    updateMeta('og:description', seoDescription, true);
    if (ogImage) updateMeta('og:image', ogImage, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', 'website', true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', seoTitle);
    updateMeta('twitter:description', seoDescription);
    if (ogImage) updateMeta('twitter:image', ogImage);
    
    // Se não existir conteúdo do Algarve, inicializar com dados padrão
    if (!algarve) {
      console.log('⚠️ Conteúdo do Algarve não encontrado, inicializando...');
      import('../data/initialContent').then(({ initialContent }) => {
        if (initialContent.algarve) {
          updateAlgarve(initialContent.algarve);
        }
      });
    } else if (algarve?.gallery?.images) {
      // Verificar se Lagos e Sagres estão em falta e adicionar
      const existingTitles = algarve.gallery.images.map(img => img.title);
      const missingLocations: { title: string; description: string; imageUrl: string; category: 'beach' | 'city' | 'landscape'; googleMapsUrl: string; enabledInHero: boolean; heroOrder: number; imagePosition: string; id: string }[] = [];
      
      if (!existingTitles.includes('Lagos')) {
        missingLocations.push({
          id: 'lagos-' + Date.now(),
          title: 'Lagos',
          description: 'Cidade histórica com praias deslumbrantes',
          imageUrl: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          category: 'city' as const,
          enabledInHero: true,
          heroOrder: 6,
          imagePosition: 'center',
          googleMapsUrl: 'https://maps.google.com/?q=Lagos,+Algarve,+Portugal',
        });
      }
      
      if (!existingTitles.includes('Sagres')) {
        missingLocations.push({
          id: 'sagres-' + Date.now(),
          title: 'Sagres',
          description: 'O extremo sudoeste da Europa',
          imageUrl: 'https://images.unsplash.com/photo-1559628233-100c795629d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          category: 'city' as const,
          enabledInHero: true,
          heroOrder: 7,
          imagePosition: 'center',
          googleMapsUrl: 'https://maps.google.com/?q=Sagres,+Algarve,+Portugal',
        });
      }
      
      if (missingLocations.length > 0) {
        console.log('📍 Adicionando locais em falta:', missingLocations.map(l => l.title));
        
        // Separar Ponta da Piedade para colocar no final
        const pontaDaPiedade = algarve.gallery.images.find(img => img.title === 'Ponta da Piedade');
        const imagesWithoutPonta = algarve.gallery.images.filter(img => img.title !== 'Ponta da Piedade');
        
        const newImages = [
          ...imagesWithoutPonta,
          ...missingLocations,
          ...(pontaDaPiedade ? [pontaDaPiedade] : []),
        ];
        
        updateAlgarve({
          ...algarve,
          gallery: {
            ...algarve.gallery,
            images: newImages,
          },
        });
      }
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

  // Translations for Algarve page content
  const getAlgarveText = (key: string, fallback: string): string => {
    const translations: Record<string, Record<string, string>> = {
      pt: {
        'discoverPortugal': 'Descubra Portugal',
        'contentLoading': 'Conteúdo em Preparação',
        'pageBeingConfigured': 'A página do Algarve está a ser configurada.',
        'loadContent': 'Carregar Conteúdo do Algarve',
        'awardedBeaches': 'Praias Premiadas',
        'clickToEnlarge': 'Clique para ampliar',
        'viewOnGoogleMaps': 'Ver no Google Maps',
        'temperature': 'Temperatura',
        'sea': 'Mar',
        'rain': 'Chuvas',
        'weatherForecast': 'Previsão Meteorológica',
        'goToSlide': 'Ir para slide',
      },
      en: {
        'discoverPortugal': 'Discover Portugal',
        'contentLoading': 'Content Loading',
        'pageBeingConfigured': 'The Algarve page is being configured.',
        'loadContent': 'Load Algarve Content',
        'awardedBeaches': 'Award-Winning Beaches',
        'clickToEnlarge': 'Click to enlarge',
        'viewOnGoogleMaps': 'View on Google Maps',
        'temperature': 'Temperature',
        'sea': 'Sea',
        'rain': 'Rainfall',
        'weatherForecast': 'Weather Forecast',
        'goToSlide': 'Go to slide',
      },
      fr: {
        'discoverPortugal': 'Découvrez le Portugal',
        'contentLoading': 'Contenu en Préparation',
        'pageBeingConfigured': 'La page de l\'Algarve est en cours de configuration.',
        'loadContent': 'Charger le Contenu de l\'Algarve',
        'awardedBeaches': 'Plages Primées',
        'clickToEnlarge': 'Cliquez pour agrandir',
        'viewOnGoogleMaps': 'Voir sur Google Maps',
        'temperature': 'Température',
        'sea': 'Mer',
        'rain': 'Pluies',
        'weatherForecast': 'Prévisions Météo',
        'goToSlide': 'Aller à la diapositive',
      },
      de: {
        'discoverPortugal': 'Entdecken Sie Portugal',
        'contentLoading': 'Inhalt wird vorbereitet',
        'pageBeingConfigured': 'Die Algarve-Seite wird konfiguriert.',
        'loadContent': 'Algarve-Inhalt laden',
        'awardedBeaches': 'Preisgekrönte Strände',
        'clickToEnlarge': 'Klicken zum Vergrößern',
        'viewOnGoogleMaps': 'Auf Google Maps ansehen',
        'temperature': 'Temperatur',
        'sea': 'Meer',
        'rain': 'Niederschlag',
        'weatherForecast': 'Wettervorhersage',
        'goToSlide': 'Zur Folie gehen',
      },
    };
    return translations[currentLanguage]?.[key] || translations['pt'][key] || fallback;
  };

  // Translate dynamic content from database
  const translateContent = (text: string): string => {
    if (currentLanguage === 'pt') return text;
    
    const contentTranslations: Record<string, Record<string, string>> = {
      // Hero section
      'O Algarve': {
        en: 'The Algarve',
        fr: 'L\'Algarve',
        de: 'Die Algarve',
      },
      'O extremo mais meridional de Portugal com mais dias de sol do que a Califórnia!': {
        en: 'The southernmost tip of Portugal with more sunny days than California!',
        fr: 'L\'extrémité la plus méridionale du Portugal avec plus de jours de soleil que la Californie!',
        de: 'Der südlichste Punkt Portugals mit mehr Sonnentagen als Kalifornien!',
      },
      // Stats
      'Praias com Bandeira Azul': {
        en: 'Blue Flag Beaches',
        fr: 'Plages Pavillon Bleu',
        de: 'Blaue Flagge Strände',
      },
      'Dias de Sol por Ano': {
        en: 'Sunny Days per Year',
        fr: 'Jours de Soleil par An',
        de: 'Sonnentage pro Jahr',
      },
      'Costa': {
        en: 'Coastline',
        fr: 'Côte',
        de: 'Küste',
      },
      'Visitantes Anuais': {
        en: 'Annual Visitors',
        fr: 'Visiteurs Annuels',
        de: 'Jährliche Besucher',
      },
      // Introduction section
      'Paraíso do Sul de Portugal': {
        en: 'Paradise of Southern Portugal',
        fr: 'Paradis du Sud du Portugal',
        de: 'Paradies Südportugals',
      },
      'O Algarve é o extremo mais meridional de Portugal e tem mais dias de sol do que a Califórnia! Não é surpresa que 7 milhões de pessoas visitem a cada ano as suas praias premiadas, as suas cidades históricas, os seus campos de golfe de nível competitivo e as suas deslumbrantes paisagens. As belas praias de areia dourada são algumas das melhores do mundo. 86 receberam o muito cobiçado prémio Bandeira Azul, pelo que não é surpresa que sejam uma das principais atrações do Algarve.': {
        en: 'The Algarve is the southernmost tip of Portugal and has more sunny days than California! It\'s no surprise that 7 million people visit each year its award-winning beaches, historic towns, competitive-level golf courses and stunning landscapes. The beautiful golden sand beaches are some of the best in the world. 86 have received the coveted Blue Flag award, so it\'s no surprise they are one of the main attractions of the Algarve.',
        fr: 'L\'Algarve est l\'extrémité la plus méridionale du Portugal et compte plus de jours de soleil que la Californie ! Il n\'est pas surprenant que 7 millions de personnes visitent chaque année ses plages primées, ses villes historiques, ses terrains de golf de niveau compétitif et ses paysages époustouflants. Les belles plages de sable doré sont parmi les meilleures au monde. 86 ont reçu le très convoité prix Pavillon Bleu, il n\'est donc pas surprenant qu\'elles soient l\'une des principales attractions de l\'Algarve.',
        de: 'Die Algarve ist der südlichste Punkt Portugals und hat mehr Sonnentage als Kalifornien! Es ist keine Überraschung, dass jedes Jahr 7 Millionen Menschen die preisgekrönten Strände, historischen Städte, Golfplätze auf Wettbewerbsniveau und atemberaubenden Landschaften besuchen. Die wunderschönen goldenen Sandstrände gehören zu den besten der Welt. 86 haben die begehrte Blaue Flagge erhalten, daher ist es keine Überraschung, dass sie eine der Hauptattraktionen der Algarve sind.',
      },
      // Beaches section
      'Praias Premiadas': {
        en: 'Award-Winning Beaches',
        fr: 'Plages Primées',
        de: 'Preisgekrönte Strände',
      },
      'As praias estão totalmente preparadas para atender a todas as suas necessidades, oferecendo vistas espetaculares do litoral, bares para relaxar e restaurantes à beira-mar, espreguiçadeiras, guarda-sóis e atividades de desportos aquáticos para diversão de verão e muito mais...': {
        en: 'The beaches are fully prepared to meet all your needs, offering spectacular views of the coastline, bars to relax and seaside restaurants, sun loungers, parasols and water sports activities for summer fun and much more...',
        fr: 'Les plages sont entièrement préparées pour répondre à tous vos besoins, offrant des vues spectaculaires sur le littoral, des bars pour se détendre et des restaurants en bord de mer, des transats, des parasols et des activités de sports nautiques pour s\'amuser en été et bien plus encore...',
        de: 'Die Strände sind vollständig darauf vorbereitet, alle Ihre Bedürfnisse zu erfüllen, mit spektakulären Aussichten auf die Küste, Bars zum Entspannen und Restaurants am Meer, Sonnenliegen, Sonnenschirmen und Wassersportaktivitäten für Sommerspaß und vieles mehr...',
      },
      // Climate section
      'O Tempo no Algarve': {
        en: 'Weather in the Algarve',
        fr: 'Le Temps en Algarve',
        de: 'Das Wetter an der Algarve',
      },
      'O Algarve desfruta do melhor clima da Europa. Com apenas um curto período de chuvas (entre novembro e março) e longas horas de sol (a média mais alta da Europa). Durante os meses de verão, as temperaturas são altas, com a água do mar a rondar os 22°C.': {
        en: 'The Algarve enjoys the best climate in Europe. With only a short rainy period (between November and March) and long hours of sunshine (the highest average in Europe). During the summer months, temperatures are high, with sea water around 22°C.',
        fr: 'L\'Algarve bénéficie du meilleur climat d\'Europe. Avec seulement une courte période de pluie (entre novembre et mars) et de longues heures d\'ensoleillement (la moyenne la plus élevée d\'Europe). Pendant les mois d\'été, les températures sont élevées, avec une eau de mer autour de 22°C.',
        de: 'Die Algarve genießt das beste Klima Europas. Mit nur einer kurzen Regenzeit (zwischen November und März) und langen Sonnenstunden (der höchste Durchschnitt in Europa). In den Sommermonaten sind die Temperaturen hoch, mit Meerwasser um die 22°C.',
      },
      // Activities section
      'Atividades e Paisagens': {
        en: 'Activities and Landscapes',
        fr: 'Activités et Paysages',
        de: 'Aktivitäten und Landschaften',
      },
      'O Algarve também é conhecido pelo seu contraste único entre a costa dourada e a bela paisagem rural, os seus diversos locais históricos e milhares de espécies de flora e fauna. Se ainda quiser mais do que apenas umas férias na praia, este é o destino perfeito para:': {
        en: 'The Algarve is also known for its unique contrast between the golden coast and the beautiful rural landscape, its diverse historic sites and thousands of species of flora and fauna. If you want more than just a beach holiday, this is the perfect destination for:',
        fr: 'L\'Algarve est également connue pour son contraste unique entre la côte dorée et le magnifique paysage rural, ses divers sites historiques et des milliers d\'espèces de flore et de faune. Si vous voulez plus que de simples vacances à la plage, c\'est la destination parfaite pour:',
        de: 'Die Algarve ist auch bekannt für ihren einzigartigen Kontrast zwischen der goldenen Küste und der wunderschönen ländlichen Landschaft, ihren vielfältigen historischen Stätten und Tausenden von Flora- und Fauna-Arten. Wenn Sie mehr als nur einen Strandurlaub wollen, ist dies das perfekte Reiseziel für:',
      },
      // Golf section
      'Vilamoura, O Melhor Destino de Golfe': {
        en: 'Vilamoura, The Best Golf Destination',
        fr: 'Vilamoura, La Meilleure Destination de Golf',
        de: 'Vilamoura, Das Beste Golfziel',
      },
      'O Algarve é um dos principais destinos de golfe da Europa, com campos de nível mundial que atraem jogadores de todo o globo.': {
        en: 'The Algarve is one of Europe\'s leading golf destinations, with world-class courses that attract players from around the globe.',
        fr: 'L\'Algarve est l\'une des principales destinations de golf en Europe, avec des parcours de classe mondiale qui attirent des joueurs du monde entier.',
        de: 'Die Algarve ist eines der führenden Golfziele Europas mit Weltklasse-Plätzen, die Spieler aus der ganzen Welt anziehen.',
      },
      // Travel section
      'Como Viajar Até o Algarve': {
        en: 'How to Travel to the Algarve',
        fr: 'Comment Voyager Jusqu\'en Algarve',
        de: 'Wie man an die Algarve reist',
      },
      'O Algarve é facilmente acessível através de várias opções de transporte:': {
        en: 'The Algarve is easily accessible through various transport options:',
        fr: 'L\'Algarve est facilement accessible via diverses options de transport:',
        de: 'Die Algarve ist über verschiedene Transportmöglichkeiten leicht erreichbar:',
      },
      // Travel methods
      'Aéreo': { en: 'By Air', fr: 'Par Avion', de: 'Mit dem Flugzeug' },
      'Aeroporto de Faro com voos diretos de toda a Europa': {
        en: 'Faro Airport with direct flights from all over Europe',
        fr: 'Aéroport de Faro avec des vols directs de toute l\'Europe',
        de: 'Flughafen Faro mit Direktflügen aus ganz Europa',
      },
      'Carro': { en: 'By Car', fr: 'En Voiture', de: 'Mit dem Auto' },
      'Acesso fácil pela A2 a partir de Lisboa (aprox. 3h)': {
        en: 'Easy access via A2 from Lisbon (approx. 3h)',
        fr: 'Accès facile par l\'A2 depuis Lisbonne (environ 3h)',
        de: 'Einfacher Zugang über die A2 von Lissabon (ca. 3h)',
      },
      'Autocarro': { en: 'By Bus', fr: 'En Bus', de: 'Mit dem Bus' },
      'Ligações regulares das principais cidades portuguesas': {
        en: 'Regular connections from major Portuguese cities',
        fr: 'Liaisons régulières depuis les principales villes portugaises',
        de: 'Regelmäßige Verbindungen aus den wichtigsten portugiesischen Städten',
      },
      'Comboio': { en: 'By Train', fr: 'En Train', de: 'Mit dem Zug' },
      'Ligação CP de Lisboa ao Algarve com paradas em principais estações': {
        en: 'CP connection from Lisbon to the Algarve with stops at main stations',
        fr: 'Liaison CP de Lisbonne à l\'Algarve avec arrêts aux principales gares',
        de: 'CP-Verbindung von Lissabon an die Algarve mit Halt an den wichtigsten Bahnhöfen',
      },
      // Activities
      'Fotografia': { en: 'Photography', fr: 'Photographie', de: 'Fotografie' },
      'Paisagens deslumbrantes para capturar': {
        en: 'Stunning landscapes to capture',
        fr: 'Paysages magnifiques à capturer',
        de: 'Atemberaubende Landschaften zum Fotografieren',
      },
      'Caminhadas': { en: 'Hiking', fr: 'Randonnée', de: 'Wandern' },
      'Trilhos na costa e no interior': {
        en: 'Trails on the coast and inland',
        fr: 'Sentiers sur la côte et à l\'intérieur',
        de: 'Wanderwege an der Küste und im Landesinneren',
      },
      'Ciclismo': { en: 'Cycling', fr: 'Cyclisme', de: 'Radfahren' },
      'Rotas cénicas por toda a região': {
        en: 'Scenic routes throughout the region',
        fr: 'Routes panoramiques dans toute la région',
        de: 'Malerische Routen durch die gesamte Region',
      },
      'Vela': { en: 'Sailing', fr: 'Voile', de: 'Segeln' },
      'Águas calmas para navegar': {
        en: 'Calm waters for sailing',
        fr: 'Eaux calmes pour naviguer',
        de: 'Ruhige Gewässer zum Segeln',
      },
      // Gallery
      'Galeria do Algarve': { en: 'Algarve Gallery', fr: 'Galerie de l\'Algarve', de: 'Algarve Galerie' },
      'Imagens capturadas nos locais mais bonitos da região': {
        en: 'Images captured in the most beautiful places in the region',
        fr: 'Images capturées dans les plus beaux endroits de la région',
        de: 'Bilder, die an den schönsten Orten der Region aufgenommen wurden',
      },
      'Praia da Marinha': { en: 'Marinha Beach', fr: 'Plage de Marinha', de: 'Marinha Strand' },
      'Uma das praias mais emblemáticas do Algarve': {
        en: 'One of the most iconic beaches in the Algarve',
        fr: 'L\'une des plages les plus emblématiques de l\'Algarve',
        de: 'Einer der ikonischsten Strände der Algarve',
      },
      'Praia da Falésia': { en: 'Falésia Beach', fr: 'Plage de Falésia', de: 'Falésia Strand' },
      'Ponta da Piedade': { en: 'Ponta da Piedade', fr: 'Ponta da Piedade', de: 'Ponta da Piedade' },
      'Formações rochosas espetaculares e águas cristalinas': {
        en: 'Spectacular rock formations and crystal clear waters',
        fr: 'Formations rocheuses spectaculaires et eaux cristallines',
        de: 'Spektakuläre Felsformationen und kristallklares Wasser',
      },
      'Sagres': { en: 'Sagres', fr: 'Sagres', de: 'Sagres' },
      'O extremo sudoeste da Europa': {
        en: 'The southwestern tip of Europe',
        fr: 'L\'extrémité sud-ouest de l\'Europe',
        de: 'Die südwestliche Spitze Europas',
      },
      'Faro': { en: 'Faro', fr: 'Faro', de: 'Faro' },
      'Capital do Algarve com charme histórico': {
        en: 'Capital of the Algarve with historic charm',
        fr: 'Capitale de l\'Algarve au charme historique',
        de: 'Hauptstadt der Algarve mit historischem Charme',
      },
      'Albufeira': { en: 'Albufeira', fr: 'Albufeira', de: 'Albufeira' },
      'Sol, mar, história e encanto algarvio': {
        en: 'Sun, sea, history and Algarve charm',
        fr: 'Soleil, mer, histoire et charme de l\'Algarve',
        de: 'Sonne, Meer, Geschichte und Algarve-Charme',
      },
      'Falésia Beach': { en: 'Falésia Beach', fr: 'Plage de Falésia', de: 'Falésia Strand' },
      'Falésias vermelhas espetaculares': {
        en: 'Spectacular red cliffs',
        fr: 'Falaises rouges spectaculaires',
        de: 'Spektakuläre rote Klippen',
      },
      'Gruta de Benagil': { en: 'Benagil Cave', fr: 'Grotte de Benagil', de: 'Benagil Höhle' },
      'Maravilha natural acessível por mar': {
        en: 'Natural wonder accessible by sea',
        fr: 'Merveille naturelle accessible par la mer',
        de: 'Naturwunder, das über das Meer erreichbar ist',
      },
      'Lagos': { en: 'Lagos', fr: 'Lagos', de: 'Lagos' },
      'Cidade histórica com praias deslumbrantes': {
        en: 'Historic city with stunning beaches',
        fr: 'Ville historique avec des plages magnifiques',
        de: 'Historische Stadt mit atemberaubenden Stränden',
      },
      // Backoffice texts
      'Upload de imagem disponível no backoffice': {
        en: 'Image upload available in backoffice',
        fr: 'Téléchargement d\'image disponible dans le backoffice',
        de: 'Bild-Upload im Backoffice verfügbar',
      },
      'Configure na secção "Algarve"': {
        en: 'Configure in the "Algarve" section',
        fr: 'Configurer dans la section "Algarve"',
        de: 'Konfigurieren Sie im Abschnitt "Algarve"',
      },
    };

    // Check for exact match first
    if (contentTranslations[text]?.[currentLanguage]) {
      return contentTranslations[text][currentLanguage];
    }

    // Check for partial match
    for (const [ptText, translations] of Object.entries(contentTranslations)) {
      if (text.includes(ptText) || ptText.includes(text)) {
        return translations[currentLanguage] || text;
      }
    }

    return text;
  };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{getAlgarveText('contentLoading', 'Conteúdo em Preparação')}</h2>
          <p className="text-gray-600 mb-6">{getAlgarveText('pageBeingConfigured', 'A página do Algarve está a ser configurada.')}</p>
          <button
            onClick={handleInitialize}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {getAlgarveText('loadContent', 'Carregar Conteúdo do Algarve')}
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
              src={optimizeHeroImage(currentSlideData.data.imageUrl)}
              alt={currentSlideData.data.title}
              loading="eager"
              decoding="async"
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
            <span>{getAlgarveText('discoverPortugal', 'Descubra Portugal')}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg">
            {translateContent(algarve.hero?.title || 'O Algarve')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow">
            {translateContent(algarve.hero?.subtitle || 'O extremo mais meridional de Portugal com mais dias de sol do que a Califórnia!')}
          </p>
          
          {/* Stats */}
          {algarve.gallery?.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {algarve.gallery.stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{translateContent(stat.label)}</div>
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
                {translateContent(algarve.introduction.title)}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {translateContent(algarve.introduction.description)}
              </p>
            </div>
          )}

          {/* Beaches Section */}
          {algarve.beaches && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {translateContent(algarve.beaches.title)}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {translateContent(algarve.beaches.description)}
              </p>
              
              {/* Praias Premiadas */}
              {algarve.beaches.items && algarve.beaches.items.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">{getAlgarveText('awardedBeaches', 'Praias Premiadas')}</h3>
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {algarve.beaches.items.map((beach, index) => (
                      <div key={index} className="group bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        {beach.imageUrl && (
                          <div 
                            className="relative h-32 md:h-56 overflow-hidden cursor-pointer"
                            onClick={() => {
                              setBeachLightboxIndex(index);
                              setBeachLightboxOpen(true);
                            }}
                          >
                            <img 
                              src={optimizeCardImage(beach.imageUrl)} 
                              alt={beach.name}
                              loading={index < 3 ? "eager" : "lazy"}
                              decoding="async"
                              fetchPriority={index < 3 ? "high" : "auto"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                                {getAlgarveText('clickToEnlarge', 'Clique para ampliar')}
                              </span>
                            </div>
                            {beach.googleMapsUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(beach.googleMapsUrl, '_blank');
                                }}
                                className="absolute bottom-3 right-3 hover:scale-110 transition-all duration-300"
                                title={getAlgarveText('viewOnGoogleMaps', 'Ver no Google Maps')}
                              >
                                <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                              </button>
                            )}
                          </div>
                        )}
                        <div className="p-3 md:p-5">
                          <h4 className="font-bold text-sm md:text-lg text-gray-900 mb-1">{beach.name}</h4>
                          <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 line-clamp-3">{beach.description}</p>
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
                {translateContent(algarve.climate.title)}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-2xl">
                {translateContent(algarve.climate.description)}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">{getAlgarveText('temperature', 'Temperatura')}</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.temperatureRange}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">{getAlgarveText('sea', 'Mar')}</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.seaTemperature}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <div className="text-xs text-gray-500 mb-1">{getAlgarveText('rain', 'Chuvas')}</div>
                  <div className="font-semibold text-gray-900">{algarve.climate.rainySeason}</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{getAlgarveText('weatherForecast', 'Previsão Meteorológica')}</h3>
                <WeatherWidget />
              </div>
            </div>
          )}

          {/* Activities Section */}
          {algarve.activities && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {translateContent(algarve.activities.title)}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {translateContent(algarve.activities.description)}
              </p>
              <div className="grid grid-cols-4 gap-2 md:gap-6">
                {algarve.activities.items.map((item, index) => (
                  <div key={index} className="group relative rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg transition-all h-32 md:h-64">
                    {item.imageUrl ? (
                      <>
                        <img 
                          src={optimizeCardImage(item.imageUrl)} 
                          alt={item.title}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index < 3 ? "high" : "auto"}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5 text-white">
                          <h3 className="font-bold text-[10px] md:text-xl mb-0 md:mb-2">{translateContent(item.title)}</h3>
                          <p className="text-white/90 text-[8px] md:text-sm hidden md:block">{translateContent(item.description)}</p>
                        </div>
                        {item.googleMapsUrl && (
                          <button
                            onClick={() => window.open(item.googleMapsUrl, '_blank')}
                            className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300"
                            title={getAlgarveText('viewOnGoogleMaps', 'Ver no Google Maps')}
                          >
                            <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="h-full bg-blue-50 flex flex-col justify-center p-6 text-center">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{translateContent(item.title)}</h3>
                        <p className="text-gray-600 text-sm">{translateContent(item.description)}</p>
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
                    src={optimizeHeroImage(algarve.golf.imageUrl)} 
                    alt={algarve.golf.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[8000ms] ease-out animate-slow-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-emerald-600/50 flex items-center">
                    <div className="max-w-2xl mx-auto px-8 md:px-12 text-white">
                      <h2 className="text-3xl font-bold mb-4">
                        {translateContent(algarve.golf.title)}
                      </h2>
                      <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
                        {translateContent(algarve.golf.description)}
                      </p>
                    </div>
                  </div>
                  {algarve.golf.googleMapsUrl && (
                    <button
                      onClick={() => window.open(algarve.golf?.googleMapsUrl, '_blank')}
                      className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300 z-10"
                      title={getAlgarveText('viewOnGoogleMaps', 'Ver no Google Maps')}
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
                      {translateContent(algarve.golf?.title || 'Golfe no Algarve')}
                    </h2>
                    <p className="text-xl text-green-50 leading-relaxed">
                      {translateContent(algarve.golf?.description || 'O Algarve é um dos melhores destinos de golfe da Europa.')}
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
                {translateContent(algarve.travel.title)}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {translateContent(algarve.travel.description)}
              </p>
              <div className="grid grid-cols-4 gap-2 md:gap-6">
                {algarve.travel.methods.map((method, index) => (
                  <div key={index} className="group relative rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg transition-all h-32 md:h-64">
                    {method.imageUrl ? (
                      <>
                        <img 
                          src={optimizeCardImage(method.imageUrl)} 
                          alt={method.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5 text-white">
                          <h3 className="font-bold text-[10px] md:text-xl mb-0 md:mb-2">{translateContent(method.title)}</h3>
                          <p className="text-white/90 text-[8px] md:text-sm hidden md:block">{translateContent(method.description)}</p>
                        </div>
                        {method.googleMapsUrl && (
                          <button
                            onClick={() => window.open(method.googleMapsUrl, '_blank')}
                            className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300"
                            title={getAlgarveText('viewOnGoogleMaps', 'Ver no Google Maps')}
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
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{translateContent(method.title)}</h3>
                        <p className="text-gray-600 text-sm">{translateContent(method.description)}</p>
                        <div className="mt-4 text-xs text-gray-500">
                          <p>• {translateContent('Upload de imagem disponível no backoffice')}</p>
                          <p>• {translateContent('Configure na secção "Algarve"')}</p>
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
                  {translateContent(algarve.gallery.title)}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {translateContent(algarve.gallery.description)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {(() => {
                  // Separar featured das normais
                  const allImages = [...algarve.gallery.images].sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
                  const featuredImages = allImages.filter(img => img.featured);
                  const normalImages = allImages.filter(img => !img.featured);
                  
                  // Ordem: primeira featured, depois normais ordenadas, depois última featured
                  const orderedImages = [
                    ...(featuredImages.length > 0 ? [featuredImages[0]] : []),
                    ...normalImages,
                    ...(featuredImages.length > 1 ? featuredImages.slice(1) : []),
                  ];
                  
                  return orderedImages;
                })().map((image, index) => {
                  return (
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
                        src={optimizeThumbnail(image.imageUrl)}
                        alt={image.title}
                        loading="lazy"
                        decoding="async"
                        className={`w-full ${image.featured ? 'h-64 md:h-96' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-500`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className={`font-semibold ${image.featured ? 'text-xl' : 'text-lg'} mb-1`}>
                          {translateContent(image.title)}
                        </h3>
                        <p className="text-sm text-white/90">{translateContent(image.description)}</p>
                      </div>
                    </div>
                    {image.googleMapsUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image.googleMapsUrl, '_blank');
                        }}
                        className="absolute bottom-4 right-4 hover:scale-110 transition-all duration-300 z-10"
                        title={getAlgarveText('viewOnGoogleMaps', 'Ver no Google Maps')}
                      >
                        <MapPin className="h-5 w-5 text-white drop-shadow-lg" />
                      </button>
                    )}
                  </div>
                  );
                })}
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
