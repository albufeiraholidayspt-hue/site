// Simple i18n system without complex dependencies

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.apartments': 'Apartamentos',
    'nav.algarve': 'Algarve',
    'nav.contact': 'Contacto',
    'nav.language': 'Idioma',
    'nav.rentCar': 'Rent a Car',
    
    // Hero
    'hero.title': 'Albufeira Holidays',
    'hero.subtitle': 'Apartamentos de férias no coração de Albufeira com vista mar. Desfrute das suas férias em paz e conforto.',
    'hero.cta': 'Ver Apartamentos',
    'hero.watchVideo': 'Ver Vídeo',
    
    // Apartments
    'apartments.title': 'Nossos Apartamentos',
    'apartments.capacity': 'pessoas',
    'apartments.minNights': 'Estadia mínima de {{count}} noites',
    'apartments.features': 'Características',
    'apartments.viewDetails': 'Ver Detalhes',
    'apartments.bookNow': 'Reservar Agora',
    'apartments.availability': 'Disponibilidade',
    'apartments.reviews': 'Avaliações',
    'apartments.gallery': 'Galeria',
    'apartments.description': 'Descrição',
    'apartments.capacityLabel': 'Capacidade',
    'apartments.minStayLabel': 'Estadia mínima',
    'apartments.choosePerfect': 'Escolha o apartamento perfeito para as suas férias em Albufeira',
    'apartments.viewAvailability': 'Ver Disponibilidade',
    
    // Stats
    'stats.apartments': 'Apartamentos',
    'stats.rating': 'Classificação',
    'stats.location': 'Localização',
    'stats.experience': 'Anos de Experiência',
    'stats.support': 'Suporte',
    
    // Reviews
    'reviews.title': 'O que dizem os nossos clientes',
    'reviews.subtitle': 'O que dizem os nossos clientes',
    'reviews.description': 'Avaliações reais de hóspedes que ficaram nos nossos apartamentos',
    
    // Apartment Taglines
    'taglines.vistapanoramicasobreomar': 'Vista panorâmica sobre o mar',
    'taglines.vistapanormicasobreomar': 'Vista panorâmica sobre o mar',
    'taglines.eleganciaeconfortopremium': 'Elegância e conforto premium',
    'taglines.elegnciaeconfortopremium': 'Elegância e conforto premium',
    'taglines.espacoamploemduspisos': 'Espaço amplo em dois pisos',
    'taglines.espaoamploemdoispisos': 'Espaço amplo em dois pisos',
    'taglines.confortomodernofuncional': 'Conforto moderno e funcional',
    'taglines.confortomodernoefuncional': 'Conforto moderno e funcional',
    
    // Apartment Features
    'apartment.seaView': 'Vista Mar',
    'apartment.cityView': 'Vista Cidade',
    'apartment.penthouse': 'Penthouse',
    'apartment.balcony': 'Varanda',
    'apartment.duplex': 'Duplex',
    'apartment.twoFloors': '2 Pisos',
    'apartment.spacious': 'Espaço amplo',
    'apartment.panoramic': 'Vista panorâmica sobre o mar',
    'apartment.vistapanoramicasobreomar': 'Vista panorâmica sobre o mar',
    'apartment.eleganciaeconfortopremium': 'Elegância e conforto premium',
    'apartment.espacoamploemduspisos': 'Espaço amplo em dois pisos',
    'apartment.confortomodernofuncional': 'Conforto moderno e funcional',
    'apartment.amenityTitle': 'Comodidades',
    // Features
    'features.wifigratuito': 'WiFi Gratuito',
    'features.parking': 'Estacionamento',
    'features.ac': 'Ar Condicionado',
    'features.kitchen': 'Cozinha Equipada',
    'features.balcony': 'Varanda',
    'features.tv': 'TV',
    'features.washing': 'Máquina de Lavar',
    'features.safety': 'Cofre',
    'features.vistamar': 'Vista Mar',
    'features.vistacidade': 'Vista Cidade',
    'features.penthouse': 'Penthouse',
    'features.varanda': 'Varanda',
    'features.duplex': 'Duplex',
    'features.2pisos': '2 Pisos',
    'features.espacoamplo': 'Espaço amplo',
    'features.vistapanoramica': 'Vista panorâmica',
    'features.wifi': 'Wi-Fi',
    'features.arcondicionado': 'Ar Condicionado',
    'features.cozinhaequipada': 'Cozinha Equipada',
    'features.estacionamento': 'Estacionamento',
    'features.vistamarparcial': 'Vista Mar Parcial',
    'features.terrao': 'Terraço',
    'features.2quartos': '2 Quartos',
    'features.camacasal': 'Cama de Casal',
    'features.camadecasal': 'Cama de Casal',
    
    // About
    'about.title': 'Bem-vindo ao Algarve',
    'about.description': 'Descubra o melhor do Algarve nos nossos apartamentos de luxo em Albufeira. Localizados no centro da cidade, com vista mar deslumbrante, os nossos espaços oferecem todo o conforto para umas férias inesquecíveis. Estacionamento privado, elevador panorâmico e acesso fácil às melhores praias.',
    'about.blueFlagBeaches': 'Praias com Bandeira Azul',
    'about.sunnyDays': 'Dias de Sol por Ano',
    'about.coastline': 'Costa',
    'about.annualVisitors': 'Visitantes Anuais',
    
    // Contact
    'contact.title': 'Entre em Contacto',
    'contact.subtitle': 'Estamos aqui para ajudar a planear as suas férias perfeitas',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar Mensagem',
    
    // Footer
    'footer.about': 'Sobre Nós',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos e Condições',
    'footer.copyright': '© 2024 Albufeira Holidays. Todos os direitos reservados.',
    
    // Calendar
    'calendar.months': 'Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro',
    'calendar.days': 'Seg,Ter,Qua,Qui,Sex,Sáb,Dom',
    'calendar.available': 'Disponível',
    'calendar.unavailable': 'Indisponível',
    'calendar.selected': 'Selecionado',
    'calendar.checkIn': 'Check-in',
    'calendar.checkOut': 'Check-out',
    'calendar.selectDates': 'Selecione as datas',
    'calendar.minNights': 'Mínimo de {{count}} noites',
    'calendar.minNightsShort': 'Mín. {{count}} noites',
    'calendar.free': 'Livre',
    'calendar.busy': 'Ocupado',
    'calendar.today': 'Hoje',
    'calendar.availability': 'Disponibilidade',
    'calendar.checkAvailability': 'Consulte a disponibilidade ao reservar',
    'calendar.clearSelection': 'Limpar seleção',
    // Promo
    'promo.code': 'Código',
    'promo.copied': '✓ Copiado!',
    'promo.discount': 'Promoção',
    
    // Common
    'common.loading': 'A carregar...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Adicionar',
    'common.search': 'Pesquisar',
    'common.close': 'Fechar',
    'common.open': 'Abrir',
    'common.back': 'Voltar',
    'common.next': 'Seguinte',
    'common.previous': 'Anterior',
    'common.confirm': 'Confirmar',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.book': 'Reservar',
    'common.more': 'Mais',
    'common.view': 'Ver',
    'common.details': 'Detalhes',
    'common.available': 'Disponível',
    'common.unavailable': 'Indisponível',
    'common.perfect': 'Perfeito',
    'common.amazing': 'Incrível',
    'common.beautiful': 'Lindo',
    'common.comfortable': 'Confortável',
    'common.spacious': 'Espaçoso',
    'common.modern': 'Moderno',
    'common.clean': 'Limpo',
    'common.central': 'Central',
    'common.quiet': 'Silencioso',
    'common.safe': 'Seguro',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.apartments': 'Apartments',
    'nav.algarve': 'Algarve',
    'nav.contact': 'Contact',
    'nav.language': 'Language',
    'nav.rentCar': 'Rent a Car',
    
    // Hero
    'hero.title': 'Albufeira Holidays',
    'hero.subtitle': 'Holiday apartments in the heart of Albufeira with sea views. Enjoy your holidays in peace and comfort.',
    'hero.cta': 'View Apartments',
    'hero.watchVideo': 'Watch Video',
    
    // Apartments
    'apartments.title': 'Our Apartments',
    'apartments.capacity': 'people',
    'apartments.minNights': 'Minimum stay of {{count}} nights',
    'apartments.features': 'Features',
    'apartments.viewDetails': 'View Details',
    'apartments.bookNow': 'Book Now',
    'apartments.availability': 'Availability',
    'apartments.reviews': 'Reviews',
    'apartments.gallery': 'Gallery',
    'apartments.description': 'Description',
    'apartments.capacityLabel': 'Capacity',
    'apartments.minStayLabel': 'Minimum Stay',
    'apartments.choosePerfect': 'Choose the perfect apartment for your holidays in Albufeira',
    'apartments.viewAvailability': 'View Availability',
    
    // Stats
    'stats.apartments': 'Apartments',
    'stats.rating': 'Rating',
    'stats.location': 'Location',
    'stats.experience': 'Years of Experience',
    'stats.support': 'Support',
    
    // Reviews
    'reviews.title': 'What Our Clients Say',
    'reviews.subtitle': 'What Our Clients Say',
    'reviews.description': 'Real reviews from guests who stayed in our apartments',
    
    // Apartment Taglines
    'taglines.vistapanoramicasobreomar': 'Panoramic sea view',
    'taglines.vistapanormicasobreomar': 'Panoramic sea view',
    'taglines.eleganciaeconfortopremium': 'Premium elegance and comfort',
    'taglines.elegnciaeconfortopremium': 'Premium elegance and comfort',
    'taglines.espacoamploemduspisos': 'Spacious space on two floors',
    'taglines.espaoamploemdoispisos': 'Spacious space on two floors',
    'taglines.confortomodernofuncional': 'Modern and functional comfort',
    'taglines.confortomodernoefuncional': 'Modern and functional comfort',
    
    // Apartment Features
    'apartment.seaView': 'Sea View',
    'apartment.cityView': 'City View',
    'apartment.penthouse': 'Penthouse',
    'apartment.balcony': 'Balcony',
    'apartment.duplex': 'Duplex',
    'apartment.twoFloors': '2 Floors',
    'apartment.spacious': 'Spacious',
    'apartment.panoramic': 'Panoramic sea view',
    'apartment.vistapanoramicasobreomar': 'Panoramic sea view',
    'apartment.eleganciaeconfortopremium': 'Premium elegance and comfort',
    'apartment.espacoamploemduspisos': 'Spacious space on two floors',
    'apartment.confortomodernofuncional': 'Modern and functional comfort',
    'apartment.amenityTitle': 'Amenities',
    
    // Features
    'features.wifi': 'Free WiFi',
    'features.parking': 'Parking',
    'features.ac': 'Air Conditioning',
    'features.kitchen': 'Equipped Kitchen',
    'features.balcony': 'Balcony',
    'features.tv': 'TV',
    'features.washing': 'Washing Machine',
    'features.safety': 'Safe',
    'features.vistamar': 'Sea View',
    'features.vistacidade': 'City View',
    'features.penthouse': 'Penthouse',
    'features.varanda': 'Balcony',
    'features.duplex': 'Duplex',
    'features.2pisos': '2 Floors',
    'features.espacoamplo': 'Spacious',
    'features.vistapanoramica': 'Panoramic View',
    'features.terrao': 'Terrace',
    'features.2quartos': '2 Rooms',
    'features.camacasal': 'Double Bed',
    'features.camadecasal': 'Double Bed',
    
    // About
    'about.title': 'Welcome to the Algarve',
    'about.description': 'Discover the best of the Algarve in our luxury apartments in Albufeira. Located in the city center, with stunning sea views, our spaces offer all the comfort for an unforgettable holiday. Private parking, panoramic elevator and easy access to the best beaches.',
    'about.blueFlagBeaches': 'Blue Flag Beaches',
    'about.sunnyDays': 'Sunny Days per Year',
    'about.coastline': 'Coastline',
    'about.annualVisitors': 'Annual Visitors',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We are here to help you plan your perfect holidays',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.copyright': '© 2024 Albufeira Holidays. All rights reserved.',
    
    // Calendar
    'calendar.months': 'January,February,March,April,May,June,July,August,September,October,November,December',
    'calendar.days': 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
    'calendar.available': 'Available',
    'calendar.unavailable': 'Unavailable',
    'calendar.selected': 'Selected',
    'calendar.checkIn': 'Check-in',
    'calendar.checkOut': 'Check-out',
    'calendar.selectDates': 'Select dates',
    'calendar.minNights': 'Minimum {{count}} nights',
    'calendar.minNightsShort': 'Min. {{count}} nights',
    'calendar.free': 'Free',
    'calendar.busy': 'Busy',
    'calendar.today': 'Today',
    'calendar.availability': 'Availability',
    'calendar.checkAvailability': 'Check availability when booking',
    'calendar.clearSelection': 'Clear selection',
    
    // Promo
    'promo.code': 'Code',
    'promo.copied': '✓ Copied!',
    'promo.discount': 'Promo',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.book': 'Book',
    'common.more': 'More',
    'common.view': 'View',
    'common.details': 'Details',
    'common.available': 'Available',
    'common.unavailable': 'Unavailable',
    'common.perfect': 'Perfect',
    'common.amazing': 'Amazing',
    'common.beautiful': 'Beautiful',
    'common.comfortable': 'Comfortable',
    'common.spacious': 'Spacious',
    'common.modern': 'Modern',
    'common.clean': 'Clean',
    'common.central': 'Central',
    'common.quiet': 'Quiet',
    'common.safe': 'Safe',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.apartments': 'Appartements',
    'nav.algarve': 'Algarve',
    'nav.contact': 'Contact',
    'nav.language': 'Langue',
    'nav.rentCar': 'Rent a Car',
    
    // Hero
    'hero.title': 'Albufeira Holidays',
    'hero.subtitle': 'Appartements de vacances au cœur d\'Albufeira avec vue sur mer. Profitez de vos vacances en paix et confort.',
    'hero.cta': 'Voir les Appartements',
    'hero.watchVideo': 'Regarder la Vidéo',
    
    // Apartments
    'apartments.title': 'Nos Appartements',
    'apartments.capacity': 'personnes',
    'apartments.minNights': 'Séjour minimum de {{count}} nuits',
    'apartments.features': 'Caractéristiques',
    'apartments.viewDetails': 'Voir les Détails',
    'apartments.bookNow': 'Réserver Maintenant',
    'apartments.availability': 'Disponibilité',
    'apartments.reviews': 'Avis',
    'apartments.gallery': 'Galerie',
    'apartments.description': 'Description',
    'apartments.capacityLabel': 'Capacité',
    'apartments.minStayLabel': 'Séjour Minimum',
    'apartments.choosePerfect': 'Choisissez l\'appartement parfait pour vos vacances à Albufeira',
    'apartments.viewAvailability': 'Voir Disponibilité',
    
    // Stats
    'stats.apartments': 'Appartements',
    'stats.rating': 'Note',
    'stats.location': 'Emplacement',
    'stats.experience': 'Années d\'Expérience',
    'stats.support': 'Support',
    
    // Reviews
    'reviews.title': 'Ce que disent nos clients',
    'reviews.subtitle': 'Ce que disent nos clients',
    'reviews.description': 'Avis réels de clients qui ont séjourné dans nos appartements',
    
    // Apartment Taglines
    'taglines.vistapanoramicasobreomar': 'Vue panoramique sur la mer',
    'taglines.vistapanormicasobreomar': 'Vue panoramique sur la mer',
    'taglines.eleganciaeconfortopremium': 'Élégance et confort premium',
    'taglines.elegnciaeconfortopremium': 'Élégance et confort premium',
    'taglines.espacoamploemduspisos': 'Espace spacieux sur deux étages',
    'taglines.espaoamploemdoispisos': 'Espace spacieux sur deux étages',
    'taglines.confortomodernofuncional': 'Confort moderne et fonctionnel',
    'taglines.confortomodernoefuncional': 'Confort moderne et fonctionnel',
    
    // Apartment Features
    'apartment.seaView': 'Vue Mer',
    'apartment.cityView': 'Vue Ville',
    'apartment.penthouse': 'Penthouse',
    'apartment.balcony': 'Balcon',
    'apartment.duplex': 'Duplex',
    'apartment.twoFloors': '2 Étages',
    'apartment.spacious': 'Spacieux',
    'apartment.panoramic': 'Vue panoramique sur la mer',
    'apartment.vistapanoramicasobreomar': 'Vue panoramique sur la mer',
    'apartment.eleganciaeconfortopremium': 'Élégance et confort premium',
    'apartment.espacoamploemduspisos': 'Espace spacieux sur deux étages',
    'apartment.confortomodernofuncional': 'Confort moderne et fonctionnel',
    'apartment.amenityTitle': 'Équipements',
    
    // Features
    'features.wifi': 'WiFi Gratuit',
    'features.parking': 'Parking',
    'features.ac': 'Climatisation',
    'features.kitchen': 'Cuisine Équipée',
    'features.balcony': 'Balcon',
    'features.tv': 'TV',
    'features.washing': 'Machine à Laver',
    'features.safety': 'Coffre-fort',
    'features.vistamar': 'Vue Mer',
    'features.vistacidade': 'Vue Ville',
    'features.penthouse': 'Penthouse',
    'features.varanda': 'Balcon',
    'features.duplex': 'Duplex',
    'features.2pisos': '2 Étages',
    'features.espacoamplo': 'Spacieux',
    'features.vistapanoramica': 'Vue panoramique',
    'features.terrao': 'Terrasse',
    'features.2quartos': '2 Chambres',
    'features.camacasal': 'Lit Double',
    'features.camadecasal': 'Lit Double',
    
    // About
    'about.title': 'Bienvenue dans l\'Algarve',
    'about.description': 'Découvrez le meilleur de l\'Algarve dans nos appartements de luxe à Albufeira. Situés en centre-ville, avec vue imprenable sur la mer, nos espaces offrent tout le confort pour des vacances inoubliables. Parking privé, ascenseur panoramique et accès facile aux meilleures plages.',
    'about.blueFlagBeaches': 'Plages Pavillon Bleu',
    'about.sunnyDays': 'Jours ensoleillés par an',
    'about.coastline': 'Côte littorale',
    'about.annualVisitors': 'Visiteurs annuels',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes là pour vous aider à planifier vos vacances parfaites',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    
    // Footer
    'footer.about': 'À Propos',
    'footer.contact': 'Contact',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Termes et Conditions',
    'footer.copyright': '© 2024 Albufeira Holidays. Tous droits réservés.',
    
    // Calendar
    'calendar.months': 'Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre',
    'calendar.days': 'Lun,Mar,Mer,Jeu,Ven,Sam,Dim',
    'calendar.available': 'Disponible',
    'calendar.unavailable': 'Indisponible',
    'calendar.selected': 'Sélectionné',
    'calendar.checkIn': 'Check-in',
    'calendar.checkOut': 'Check-out',
    'calendar.selectDates': 'Sélectionnez les dates',
    'calendar.minNights': 'Minimum {{count}} nuits',
    'calendar.minNightsShort': 'Min. {{count}} nuits',
    'calendar.free': 'Libre',
    'calendar.busy': 'Occupé',
    'calendar.today': 'Aujourd\'hui',
    'calendar.availability': 'Disponibilité',
    'calendar.checkAvailability': 'Consultez la disponibilité lors de la réservation',
    'calendar.clearSelection': 'Effacer la sélection',
    
    // Promo
    'promo.code': 'Code',
    'promo.copied': '✓ Copié!',
    'promo.discount': 'Promo',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.add': 'Ajouter',
    'common.search': 'Rechercher',
    'common.close': 'Fermer',
    'common.open': 'Ouvrir',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.book': 'Réserver',
    'common.more': 'Plus',
    'common.view': 'Voir',
    'common.details': 'Détails',
    'common.available': 'Disponible',
    'common.unavailable': 'Indisponible',
    'common.perfect': 'Parfait',
    'common.amazing': 'Incroyable',
    'common.beautiful': 'Magnifique',
    'common.comfortable': 'Confortable',
    'common.spacious': 'Spacieux',
    'common.modern': 'Moderne',
    'common.clean': 'Propre',
    'common.central': 'Central',
    'common.quiet': 'Calme',
    'common.safe': 'Sûr',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.apartments': 'Apartments',
    'nav.algarve': 'Algarve',
    'nav.contact': 'Kontakt',
    'nav.language': 'Sprache',
    'nav.rentCar': 'Rent a Car',
    
    // Hero
    'hero.title': 'Albufeira Holidays',
    'hero.subtitle': 'Ferienapartements im Herzen von Albufeira mit Meerblick. Genießen Sie Ihren Urlaub in Frieden und Komfort.',
    'hero.cta': 'Apartments Anzeigen',
    'hero.watchVideo': 'Video Ansehen',
    
    // Apartments
    'apartments.title': 'Unsere Apartments',
    'apartments.capacity': 'Personen',
    'apartments.minNights': 'Mindestaufenthalt von {{count}} Nächten',
    'apartments.features': 'Merkmale',
    'apartments.viewDetails': 'Details Anzeigen',
    'apartments.bookNow': 'Jetzt Buchen',
    'apartments.availability': 'Verfügbarkeit',
    'apartments.reviews': 'Bewertungen',
    'apartments.gallery': 'Galerie',
    'apartments.description': 'Beschreibung',
    'apartments.capacityLabel': 'Kapazität',
    'apartments.minStayLabel': 'Mindestaufenthalt',
    'apartments.choosePerfect': 'Wählen Sie das perfekte Apartment für Ihren Urlaub in Albufeira',
    'apartments.viewAvailability': 'Verfügbarkeit Anzeigen',
    
    // Stats
    'stats.apartments': 'Apartments',
    'stats.rating': 'Bewertung',
    'stats.location': 'Standort',
    'stats.experience': 'Jahre Erfahrung',
    'stats.support': 'Support',
    
    // Reviews
    'reviews.title': 'Was Unsere Kunden Sagen',
    'reviews.subtitle': 'Was Unsere Kunden Sagen',
    'reviews.description': 'Echte Bewertungen von Gästen, die in unseren Apartments übernachtet haben',
    
    // Apartment Taglines
    'taglines.vistapanoramicasobreomar': 'Panoramablick auf das Meer',
    'taglines.vistapanormicasobreomar': 'Panoramablick auf das Meer',
    'taglines.eleganciaeconfortopremium': 'Premium-Eleganz und Komfort',
    'taglines.elegnciaeconfortopremium': 'Premium-Eleganz und Komfort',
    'taglines.espacoamploemduspisos': 'Großzügiger Raum auf zwei Etagen',
    'taglines.espaoamploemdoispisos': 'Großzügiger Raum auf zwei Etagen',
    'taglines.confortomodernofuncional': 'Modern und funktionaler Komfort',
    'taglines.confortomodernoefuncional': 'Modern und funktionaler Komfort',
    
    // Apartment Features
    'apartment.seaView': 'Meerblick',
    'apartment.cityView': 'Stadtblick',
    'apartment.penthouse': 'Penthouse',
    'apartment.balcony': 'Balkon',
    'apartment.duplex': 'Duplex',
    'apartment.twoFloors': '2 Stockwerke',
    'apartment.spacious': 'Räumig',
    'apartment.panoramic': 'Panoramablick auf das Meer',
    'apartment.vistapanoramicasobreomar': 'Panoramablick auf das Meer',
    'apartment.eleganciaeconfortopremium': 'Premium-Eleganz und Komfort',
    'apartment.espacoamploemduspisos': 'Großzügiger Raum auf zwei Etagen',
    'apartment.confortomodernofuncional': 'Modern und funktionaler Komfort',
    'apartment.amenityTitle': 'Ausstattung',
    
    // Features
    'features.wifi': 'Kostenloses WiFi',
    'features.parking': 'Parkplatz',
    'features.ac': 'Klimaanlage',
    'features.kitchen': 'Ausgestattete Küche',
    'features.balcony': 'Balkon',
    'features.tv': 'TV',
    'features.washing': 'Waschmaschine',
    'features.safety': 'Tresor',
    'features.vistamar': 'Meerblick',
    'features.vistacidade': 'Stadtblick',
    'features.penthouse': 'Penthouse',
    'features.varanda': 'Balkon',
    'features.duplex': 'Duplex',
    'features.2pisos': '2 Stockwerke',
    'features.espacoamplo': 'Räumig',
    'features.vistapanoramica': 'Panoramablick',
    'features.terrao': 'Terrasse',
    'features.2quartos': '2 Zimmer',
    'features.camacasal': 'Doppelbett',
    'features.camadecasal': 'Doppelbett',
    
    // About
    'about.title': 'Willkommen in der Algarve',
    'about.description': 'Entdecken Sie das Beste der Algarve in unseren Luxus-Apartments in Albufeira. Im Stadtzentrum gelegen, atemberaubender Meerblick, bieten unsere Räume allen Komfort für einen unvergesslichen Urlaub. Privates Parken, Panorama-Aufzug und einfacher Zugang zu den besten Stränden.',
    'about.blueFlagBeaches': 'Blau-Flagge-Strände',
    'about.sunnyDays': 'Sonnentage pro Jahr',
    'about.coastline': 'Küstenlinie',
    'about.annualVisitors': 'Jährliche Besucher',
    
    // Contact
    'contact.title': 'Kontaktieren Sie Uns',
    'contact.subtitle': 'Wir sind hier, um Ihnen bei der Planung Ihrer perfekten Ferien zu helfen',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Telefon',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht Senden',
    
    // Footer
    'footer.about': 'Über Uns',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.copyright': '© 2024 Albufeira Holidays. Alle Rechte vorbehalten.',
    
    // Calendar
    'calendar.months': 'Januar,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
    'calendar.days': 'Mon,Die,Mit,Don,Fre,Sam,Son',
    'calendar.available': 'Verfügbar',
    'calendar.unavailable': 'Nicht Verfügbar',
    'calendar.selected': 'Ausgewählt',
    'calendar.checkIn': 'Check-in',
    'calendar.checkOut': 'Check-out',
    'calendar.selectDates': 'Wählen Sie Daten',
    'calendar.minNights': 'Minimum {{count}} Nächte',
    'calendar.minNightsShort': 'Min. {{count}} Nächte',
    'calendar.free': 'Frei',
    'calendar.busy': 'Besetzt',
    'calendar.today': 'Heute',
    'calendar.availability': 'Verfügbarkeit',
    'calendar.checkAvailability': 'Verfügbarkeit bei Buchung prüfen',
    'calendar.clearSelection': 'Auswahl löschen',
    
    // Promo
    'promo.code': 'Code',
    'promo.copied': '✓ Kopiert!',
    'promo.discount': 'Promo',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.add': 'Hinzufügen',
    'common.search': 'Suchen',
    'common.close': 'Schließen',
    'common.open': 'Öffnen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Vorherige',
    'common.confirm': 'Bestätigen',
    'common.yes': 'Ja',
    'common.no': 'Nein',
    'common.book': 'Buchen',
    'common.more': 'Mehr',
    'common.view': 'Anzeigen',
    'common.details': 'Details',
    'common.available': 'Verfügbar',
    'common.unavailable': 'Nicht Verfügbar',
    'common.perfect': 'Perfekt',
    'common.amazing': 'Erstaunlich',
    'common.beautiful': 'Schön',
    'common.comfortable': 'Komfortabel',
    'common.spacious': 'Geräumig',
    'common.modern': 'Modern',
    'common.clean': 'Sauber',
    'common.central': 'Zentral',
    'common.quiet': 'Ruhig',
    'common.safe': 'Sicher',
  },
};

class SimpleI18n {
  private currentLanguage: string = 'pt';
  
  constructor() {
    // Detect language from localStorage or browser
    this.currentLanguage = this.detectLanguage();
  }
  
  private detectLanguage(): string {
    // Check localStorage first
    const stored = localStorage.getItem('language');
    if (stored && ['pt', 'en', 'fr', 'de'].includes(stored)) {
      return stored;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (['pt', 'en', 'fr', 'de'].includes(browserLang)) {
      return browserLang;
    }
    
    // Default to Portuguese
    return 'pt';
  }
  
  setLanguage(lang: string): void {
    if (['pt', 'en', 'fr', 'de'].includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
    }
  }
  
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
  
  translate(key: string, params?: Record<string, string | number>): string {
    const langTranslations = translations[this.currentLanguage as keyof typeof translations] || translations.pt;
    const translation = langTranslations[key as keyof typeof langTranslations] || key;
    
    if (params) {
      return translation.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return translation;
  }
  
  getSupportedLanguages(): Array<{ code: string; name: string; flag: string }> {
    return [
      { code: 'pt', name: 'Português', flag: '🇵🇹' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    ];
  }
}

export const simpleI18n = new SimpleI18n();

// Hook for React components
export function useTranslation() {
  return {
    t: (key: string, params?: Record<string, string | number>) => simpleI18n.translate(key, params),
    currentLanguage: simpleI18n.getCurrentLanguage(),
    setLanguage: (lang: string) => simpleI18n.setLanguage(lang),
    languages: simpleI18n.getSupportedLanguages(),
  };
}
