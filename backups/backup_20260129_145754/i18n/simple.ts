// Simple i18n system without complex dependencies
import { useState, useEffect, useCallback } from 'react';

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
    'apartment.vistapanormicasobreomar': 'Vista panorâmica sobre o mar',
    'apartment.eleganciaeconfortopremium': 'Elegância e conforto premium',
    'apartment.elegnciaeconfortopremium': 'Elegância e conforto premium',
    'apartment.espacoamploemduspisos': 'Espaço amplo em dois pisos',
    'apartment.espaoamploemdoispisos': 'Espaço amplo em dois pisos',
    'apartment.confortomodernofuncional': 'Conforto moderno e funcional',
    'apartment.confortomodernoefuncional': 'Conforto moderno e funcional',
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
    
    // Amenities - Views
    'amenity.seaView': 'Vista Mar',
    'amenity.partialSeaView': 'Vista Mar Parcial',
    'amenity.cityView': 'Vista Cidade',
    'amenity.poolView': 'Vista Piscina',
    'amenity.gardenView': 'Vista Jardim',
    'amenity.mountainView': 'Vista Montanha',
    // Amenities - Outdoor
    'amenity.balcony': 'Varanda',
    'amenity.terrace': 'Terraço',
    'amenity.privateGarden': 'Jardim Privado',
    'amenity.patio': 'Pátio',
    // Amenities - Structure
    'amenity.2floors': '2 Pisos',
    'amenity.duplex': 'Duplex',
    'amenity.penthouse': 'Penthouse',
    // Amenities - Bedrooms
    'amenity.1bedroom': '1 Quarto',
    'amenity.2bedrooms': '2 Quartos',
    'amenity.3bedrooms': '3 Quartos',
    'amenity.suite': 'Suite',
    'amenity.doubleBed': 'Cama de Casal',
    'amenity.twinBeds': 'Camas Individuais',
    'amenity.sofaBed': 'Sofá-Cama',
    'amenity.cribAvailable': 'Berço Disponível',
    // Amenities - Bathroom
    'amenity.privateBathroom': 'Casa de Banho Privada',
    'amenity.bathtub': 'Banheira',
    'amenity.shower': 'Chuveiro',
    'amenity.hairDryer': 'Secador de Cabelo',
    // Amenities - Climate
    'amenity.airConditioning': 'Ar Condicionado',
    'amenity.centralHeating': 'Aquecimento Central',
    'amenity.fireplace': 'Lareira',
    'amenity.fan': 'Ventoinha',
    // Amenities - Connectivity
    'amenity.wifi': 'Wi-Fi',
    'amenity.wifiFiber': 'Wi-Fi Fibra',
    'amenity.tv': 'TV',
    'amenity.smartTv': 'Smart TV',
    'amenity.netflix': 'Netflix',
    'amenity.cableTv': 'TV por Cabo',
    // Amenities - Kitchen
    'amenity.equippedKitchen': 'Cozinha Equipada',
    'amenity.microwave': 'Micro-ondas',
    'amenity.oven': 'Forno',
    'amenity.ceramicHob': 'Placa Vitrocerâmica',
    'amenity.refrigerator': 'Frigorífico',
    'amenity.freezer': 'Congelador',
    'amenity.coffeeMachine': 'Máquina de Café',
    'amenity.toaster': 'Torradeira',
    'amenity.kettle': 'Chaleira',
    'amenity.dishwasher': 'Máquina de Lavar Loiça',
    'amenity.kitchenUtensils': 'Utensílios de Cozinha',
    // Amenities - Laundry
    'amenity.washingMachine': 'Máquina de Lavar Roupa',
    'amenity.dryer': 'Máquina de Secar',
    'amenity.iron': 'Ferro de Engomar',
    'amenity.ironingBoard': 'Tábua de Engomar',
    // Amenities - Comfort
    'amenity.towels': 'Toalhas',
    'amenity.bedLinen': 'Roupa de Cama',
    'amenity.extraPillows': 'Almofadas Extra',
    'amenity.blankets': 'Cobertores',
    // Amenities - Safety
    'amenity.safe': 'Cofre',
    'amenity.alarm': 'Alarme',
    'amenity.digitalLock': 'Fechadura Digital',
    'amenity.smokeDetector': 'Detetor de Fumo',
    'amenity.fireExtinguisher': 'Extintor',
    'amenity.firstAidKit': 'Kit de Primeiros Socorros',
    // Amenities - Building
    'amenity.elevator': 'Elevador',
    'amenity.parking': 'Estacionamento',
    'amenity.privateParking': 'Estacionamento Privado',
    'amenity.garage': 'Garagem (preço sob consulta)',
    'amenity.doorman': 'Porteiro',
    'amenity.privateEntrance': 'Entrada Privada',
    // Amenities - Leisure
    'amenity.pool': 'Piscina',
    'amenity.privatePool': 'Piscina Privada',
    'amenity.sharedPool': 'Piscina Partilhada',
    'amenity.jacuzzi': 'Jacuzzi',
    'amenity.gym': 'Ginásio',
    'amenity.sauna': 'Sauna',
    'amenity.barbecue': 'Churrasqueira',
    'amenity.outdoorFurniture': 'Mobília de Exterior',
    // Amenities - Policies
    'amenity.petsAllowed': 'Animais Permitidos',
    'amenity.noSmoking': 'Não Fumadores',
    'amenity.wheelchairAccessible': 'Acessível a Cadeira de Rodas',
    'amenity.selfCheckIn': 'Check-in Autónomo',
    'amenity.cleaningIncluded': 'Limpeza Incluída',
    'amenity.toiletries': 'Artigos de Higiene',
    
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
    'contact.contactInfo': 'Informações de Contacto',
    'contact.sendUsMessage': 'Envie-nos uma Mensagem',
    'contact.fillForm': 'Preencha o formulário abaixo e entraremos em contacto consigo',
    'contact.name': 'Nome',
    'contact.yourName': 'O seu nome',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.subject': 'Assunto',
    'contact.messageSubject': 'Assunto da mensagem',
    'contact.message': 'Mensagem',
    'contact.writeMessage': 'Escreva a sua mensagem aqui...',
    'contact.send': 'Enviar Mensagem',
    'contact.sending': 'A enviar...',
    'contact.messageSent': 'Mensagem Enviada!',
    'contact.messageReceived': 'A sua mensagem foi recebida. Entraremos em contacto em breve.',
    'contact.sendAnother': 'Enviar Outra Mensagem',
    'contact.sendError': 'Erro ao Enviar',
    'contact.errorOccurred': 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
    'contact.tryAgain': 'Tentar Novamente',
    'contact.makeReservation': 'Fazer Reserva',
    'contact.checkAvailability': 'Verifique a disponibilidade e reserve o seu apartamento',
    'contact.bookNow': 'Reservar Agora',
    'contact.address': 'Morada',
    
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
    'calendar.clear': 'Limpar',
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
    'apartment.vistapanormicasobreomar': 'Panoramic sea view',
    'apartment.eleganciaeconfortopremium': 'Premium elegance and comfort',
    'apartment.elegnciaeconfortopremium': 'Premium elegance and comfort',
    'apartment.espacoamploemduspisos': 'Spacious space on two floors',
    'apartment.espaoamploemdoispisos': 'Spacious space on two floors',
    'apartment.confortomodernofuncional': 'Modern and functional comfort',
    'apartment.confortomodernoefuncional': 'Modern and functional comfort',
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
    
    // Amenities - Views
    'amenity.seaView': 'Sea View',
    'amenity.partialSeaView': 'Partial Sea View',
    'amenity.cityView': 'City View',
    'amenity.poolView': 'Pool View',
    'amenity.gardenView': 'Garden View',
    'amenity.mountainView': 'Mountain View',
    // Amenities - Outdoor
    'amenity.balcony': 'Balcony',
    'amenity.terrace': 'Terrace',
    'amenity.privateGarden': 'Private Garden',
    'amenity.patio': 'Patio',
    // Amenities - Structure
    'amenity.2floors': '2 Floors',
    'amenity.duplex': 'Duplex',
    'amenity.penthouse': 'Penthouse',
    // Amenities - Bedrooms
    'amenity.1bedroom': '1 Bedroom',
    'amenity.2bedrooms': '2 Bedrooms',
    'amenity.3bedrooms': '3 Bedrooms',
    'amenity.suite': 'Suite',
    'amenity.doubleBed': 'Double Bed',
    'amenity.twinBeds': 'Twin Beds',
    'amenity.sofaBed': 'Sofa Bed',
    'amenity.cribAvailable': 'Crib Available',
    // Amenities - Bathroom
    'amenity.privateBathroom': 'Private Bathroom',
    'amenity.bathtub': 'Bathtub',
    'amenity.shower': 'Shower',
    'amenity.hairDryer': 'Hair Dryer',
    // Amenities - Climate
    'amenity.airConditioning': 'Air Conditioning',
    'amenity.centralHeating': 'Central Heating',
    'amenity.fireplace': 'Fireplace',
    'amenity.fan': 'Fan',
    // Amenities - Connectivity
    'amenity.wifi': 'Wi-Fi',
    'amenity.wifiFiber': 'Fiber Wi-Fi',
    'amenity.tv': 'TV',
    'amenity.smartTv': 'Smart TV',
    'amenity.netflix': 'Netflix',
    'amenity.cableTv': 'Cable TV',
    // Amenities - Kitchen
    'amenity.equippedKitchen': 'Equipped Kitchen',
    'amenity.microwave': 'Microwave',
    'amenity.oven': 'Oven',
    'amenity.ceramicHob': 'Ceramic Hob',
    'amenity.refrigerator': 'Refrigerator',
    'amenity.freezer': 'Freezer',
    'amenity.coffeeMachine': 'Coffee Machine',
    'amenity.toaster': 'Toaster',
    'amenity.kettle': 'Kettle',
    'amenity.dishwasher': 'Dishwasher',
    'amenity.kitchenUtensils': 'Kitchen Utensils',
    // Amenities - Laundry
    'amenity.washingMachine': 'Washing Machine',
    'amenity.dryer': 'Dryer',
    'amenity.iron': 'Iron',
    'amenity.ironingBoard': 'Ironing Board',
    // Amenities - Comfort
    'amenity.towels': 'Towels',
    'amenity.bedLinen': 'Bed Linen',
    'amenity.extraPillows': 'Extra Pillows',
    'amenity.blankets': 'Blankets',
    // Amenities - Safety
    'amenity.safe': 'Safe',
    'amenity.alarm': 'Alarm',
    'amenity.digitalLock': 'Digital Lock',
    'amenity.smokeDetector': 'Smoke Detector',
    'amenity.fireExtinguisher': 'Fire Extinguisher',
    'amenity.firstAidKit': 'First Aid Kit',
    // Amenities - Building
    'amenity.elevator': 'Elevator',
    'amenity.parking': 'Parking',
    'amenity.privateParking': 'Private Parking',
    'amenity.garage': 'Garage (price on request)',
    'amenity.doorman': 'Doorman',
    'amenity.privateEntrance': 'Private Entrance',
    // Amenities - Leisure
    'amenity.pool': 'Pool',
    'amenity.privatePool': 'Private Pool',
    'amenity.sharedPool': 'Shared Pool',
    'amenity.jacuzzi': 'Jacuzzi',
    'amenity.gym': 'Gym',
    'amenity.sauna': 'Sauna',
    'amenity.barbecue': 'Barbecue',
    'amenity.outdoorFurniture': 'Outdoor Furniture',
    // Amenities - Policies
    'amenity.petsAllowed': 'Pets Allowed',
    'amenity.noSmoking': 'No Smoking',
    'amenity.wheelchairAccessible': 'Wheelchair Accessible',
    'amenity.selfCheckIn': 'Self Check-in',
    'amenity.cleaningIncluded': 'Cleaning Included',
    'amenity.toiletries': 'Toiletries',
    
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
    'contact.contactInfo': 'Contact Information',
    'contact.sendUsMessage': 'Send Us a Message',
    'contact.fillForm': 'Fill out the form below and we will get back to you',
    'contact.name': 'Name',
    'contact.yourName': 'Your name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.subject': 'Subject',
    'contact.messageSubject': 'Message subject',
    'contact.message': 'Message',
    'contact.writeMessage': 'Write your message here...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.messageSent': 'Message Sent!',
    'contact.messageReceived': 'Your message has been received. We will contact you soon.',
    'contact.sendAnother': 'Send Another Message',
    'contact.sendError': 'Send Error',
    'contact.errorOccurred': 'An error occurred while sending the message. Please try again.',
    'contact.tryAgain': 'Try Again',
    'contact.makeReservation': 'Make a Reservation',
    'contact.checkAvailability': 'Check availability and book your apartment',
    'contact.bookNow': 'Book Now',
    'contact.address': 'Address',
    
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
    'calendar.clear': 'Clear',
    
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
    'apartment.vistapanormicasobreomar': 'Vue panoramique sur la mer',
    'apartment.eleganciaeconfortopremium': 'Élégance et confort premium',
    'apartment.elegnciaeconfortopremium': 'Élégance et confort premium',
    'apartment.espacoamploemduspisos': 'Espace spacieux sur deux étages',
    'apartment.espaoamploemdoispisos': 'Espace spacieux sur deux étages',
    'apartment.confortomodernofuncional': 'Confort moderne et fonctionnel',
    'apartment.confortomodernoefuncional': 'Confort moderne et fonctionnel',
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
    
    // Amenities - Views
    'amenity.seaView': 'Vue Mer',
    'amenity.partialSeaView': 'Vue Mer Partielle',
    'amenity.cityView': 'Vue Ville',
    'amenity.poolView': 'Vue Piscine',
    'amenity.gardenView': 'Vue Jardin',
    'amenity.mountainView': 'Vue Montagne',
    // Amenities - Outdoor
    'amenity.balcony': 'Balcon',
    'amenity.terrace': 'Terrasse',
    'amenity.privateGarden': 'Jardin Privé',
    'amenity.patio': 'Patio',
    // Amenities - Structure
    'amenity.2floors': '2 Étages',
    'amenity.duplex': 'Duplex',
    'amenity.penthouse': 'Penthouse',
    // Amenities - Bedrooms
    'amenity.1bedroom': '1 Chambre',
    'amenity.2bedrooms': '2 Chambres',
    'amenity.3bedrooms': '3 Chambres',
    'amenity.suite': 'Suite',
    'amenity.doubleBed': 'Lit Double',
    'amenity.twinBeds': 'Lits Jumeaux',
    'amenity.sofaBed': 'Canapé-Lit',
    'amenity.cribAvailable': 'Lit Bébé Disponible',
    // Amenities - Bathroom
    'amenity.privateBathroom': 'Salle de Bain Privée',
    'amenity.bathtub': 'Baignoire',
    'amenity.shower': 'Douche',
    'amenity.hairDryer': 'Sèche-Cheveux',
    // Amenities - Climate
    'amenity.airConditioning': 'Climatisation',
    'amenity.centralHeating': 'Chauffage Central',
    'amenity.fireplace': 'Cheminée',
    'amenity.fan': 'Ventilateur',
    // Amenities - Connectivity
    'amenity.wifi': 'Wi-Fi',
    'amenity.wifiFiber': 'Wi-Fi Fibre',
    'amenity.tv': 'TV',
    'amenity.smartTv': 'Smart TV',
    'amenity.netflix': 'Netflix',
    'amenity.cableTv': 'TV par Câble',
    // Amenities - Kitchen
    'amenity.equippedKitchen': 'Cuisine Équipée',
    'amenity.microwave': 'Micro-ondes',
    'amenity.oven': 'Four',
    'amenity.ceramicHob': 'Plaque Vitrocéramique',
    'amenity.refrigerator': 'Réfrigérateur',
    'amenity.freezer': 'Congélateur',
    'amenity.coffeeMachine': 'Machine à Café',
    'amenity.toaster': 'Grille-Pain',
    'amenity.kettle': 'Bouilloire',
    'amenity.dishwasher': 'Lave-Vaisselle',
    'amenity.kitchenUtensils': 'Ustensiles de Cuisine',
    // Amenities - Laundry
    'amenity.washingMachine': 'Machine à Laver',
    'amenity.dryer': 'Sèche-Linge',
    'amenity.iron': 'Fer à Repasser',
    'amenity.ironingBoard': 'Planche à Repasser',
    // Amenities - Comfort
    'amenity.towels': 'Serviettes',
    'amenity.bedLinen': 'Linge de Lit',
    'amenity.extraPillows': 'Oreillers Supplémentaires',
    'amenity.blankets': 'Couvertures',
    // Amenities - Safety
    'amenity.safe': 'Coffre-Fort',
    'amenity.alarm': 'Alarme',
    'amenity.digitalLock': 'Serrure Numérique',
    'amenity.smokeDetector': 'Détecteur de Fumée',
    'amenity.fireExtinguisher': 'Extincteur',
    'amenity.firstAidKit': 'Trousse de Premiers Secours',
    // Amenities - Building
    'amenity.elevator': 'Ascenseur',
    'amenity.parking': 'Parking',
    'amenity.privateParking': 'Parking Privé',
    'amenity.garage': 'Garage (prix sur demande)',
    'amenity.doorman': 'Portier',
    'amenity.privateEntrance': 'Entrée Privée',
    // Amenities - Leisure
    'amenity.pool': 'Piscine',
    'amenity.privatePool': 'Piscine Privée',
    'amenity.sharedPool': 'Piscine Partagée',
    'amenity.jacuzzi': 'Jacuzzi',
    'amenity.gym': 'Salle de Sport',
    'amenity.sauna': 'Sauna',
    'amenity.barbecue': 'Barbecue',
    'amenity.outdoorFurniture': 'Mobilier d\'Extérieur',
    // Amenities - Policies
    'amenity.petsAllowed': 'Animaux Acceptés',
    'amenity.noSmoking': 'Non-Fumeurs',
    'amenity.wheelchairAccessible': 'Accessible en Fauteuil Roulant',
    'amenity.selfCheckIn': 'Enregistrement Autonome',
    'amenity.cleaningIncluded': 'Ménage Inclus',
    'amenity.toiletries': 'Articles de Toilette',
    
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
    'contact.contactInfo': 'Informations de Contact',
    'contact.sendUsMessage': 'Envoyez-nous un Message',
    'contact.fillForm': 'Remplissez le formulaire ci-dessous et nous vous recontacterons',
    'contact.name': 'Nom',
    'contact.yourName': 'Votre nom',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.subject': 'Sujet',
    'contact.messageSubject': 'Sujet du message',
    'contact.message': 'Message',
    'contact.writeMessage': 'Écrivez votre message ici...',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi en cours...',
    'contact.messageSent': 'Message Envoyé!',
    'contact.messageReceived': 'Votre message a été reçu. Nous vous contacterons bientôt.',
    'contact.sendAnother': 'Envoyer un Autre Message',
    'contact.sendError': 'Erreur d\'Envoi',
    'contact.errorOccurred': 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.',
    'contact.tryAgain': 'Réessayer',
    'contact.makeReservation': 'Faire une Réservation',
    'contact.checkAvailability': 'Vérifiez la disponibilité et réservez votre appartement',
    'contact.bookNow': 'Réserver Maintenant',
    'contact.address': 'Adresse',
    
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
    'calendar.clear': 'Effacer',
    
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
    
    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Wir helfen Ihnen gerne bei der Planung Ihres perfekten Urlaubs',
    'contact.contactInfo': 'Kontaktinformationen',
    'contact.sendUsMessage': 'Senden Sie uns eine Nachricht',
    'contact.fillForm': 'Füllen Sie das Formular aus und wir werden uns bei Ihnen melden',
    'contact.name': 'Name',
    'contact.yourName': 'Ihr Name',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'contact.subject': 'Betreff',
    'contact.messageSubject': 'Nachrichtenbetreff',
    'contact.message': 'Nachricht',
    'contact.writeMessage': 'Schreiben Sie hier Ihre Nachricht...',
    'contact.send': 'Nachricht Senden',
    'contact.sending': 'Wird gesendet...',
    'contact.messageSent': 'Nachricht Gesendet!',
    'contact.messageReceived': 'Ihre Nachricht wurde empfangen. Wir werden uns bald bei Ihnen melden.',
    'contact.sendAnother': 'Weitere Nachricht Senden',
    'contact.sendError': 'Sendefehler',
    'contact.errorOccurred': 'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    'contact.tryAgain': 'Erneut Versuchen',
    'contact.makeReservation': 'Reservierung Vornehmen',
    'contact.checkAvailability': 'Verfügbarkeit prüfen und Apartment buchen',
    'contact.bookNow': 'Jetzt Buchen',
    'contact.address': 'Adresse',
  },
  oldde: {
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
    'apartment.vistapanormicasobreomar': 'Panoramablick auf das Meer',
    'apartment.eleganciaeconfortopremium': 'Premium-Eleganz und Komfort',
    'apartment.elegnciaeconfortopremium': 'Premium-Eleganz und Komfort',
    'apartment.espacoamploemduspisos': 'Großzügiger Raum auf zwei Etagen',
    'apartment.espaoamploemdoispisos': 'Großzügiger Raum auf zwei Etagen',
    'apartment.confortomodernofuncional': 'Modern und funktionaler Komfort',
    'apartment.confortomodernoefuncional': 'Modern und funktionaler Komfort',
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
    
    // Amenities - Views
    'amenity.seaView': 'Meerblick',
    'amenity.partialSeaView': 'Teilweiser Meerblick',
    'amenity.cityView': 'Stadtblick',
    'amenity.poolView': 'Poolblick',
    'amenity.gardenView': 'Gartenblick',
    'amenity.mountainView': 'Bergblick',
    // Amenities - Outdoor
    'amenity.balcony': 'Balkon',
    'amenity.terrace': 'Terrasse',
    'amenity.privateGarden': 'Privater Garten',
    'amenity.patio': 'Innenhof',
    // Amenities - Structure
    'amenity.2floors': '2 Stockwerke',
    'amenity.duplex': 'Duplex',
    'amenity.penthouse': 'Penthouse',
    // Amenities - Bedrooms
    'amenity.1bedroom': '1 Schlafzimmer',
    'amenity.2bedrooms': '2 Schlafzimmer',
    'amenity.3bedrooms': '3 Schlafzimmer',
    'amenity.suite': 'Suite',
    'amenity.doubleBed': 'Doppelbett',
    'amenity.twinBeds': 'Einzelbetten',
    'amenity.sofaBed': 'Schlafsofa',
    'amenity.cribAvailable': 'Kinderbett Verfügbar',
    // Amenities - Bathroom
    'amenity.privateBathroom': 'Privates Badezimmer',
    'amenity.bathtub': 'Badewanne',
    'amenity.shower': 'Dusche',
    'amenity.hairDryer': 'Haartrockner',
    // Amenities - Climate
    'amenity.airConditioning': 'Klimaanlage',
    'amenity.centralHeating': 'Zentralheizung',
    'amenity.fireplace': 'Kamin',
    'amenity.fan': 'Ventilator',
    // Amenities - Connectivity
    'amenity.wifi': 'Wi-Fi',
    'amenity.wifiFiber': 'Glasfaser Wi-Fi',
    'amenity.tv': 'TV',
    'amenity.smartTv': 'Smart TV',
    'amenity.netflix': 'Netflix',
    'amenity.cableTv': 'Kabel-TV',
    // Amenities - Kitchen
    'amenity.equippedKitchen': 'Ausgestattete Küche',
    'amenity.microwave': 'Mikrowelle',
    'amenity.oven': 'Backofen',
    'amenity.ceramicHob': 'Glaskeramik-Kochfeld',
    'amenity.refrigerator': 'Kühlschrank',
    'amenity.freezer': 'Gefrierschrank',
    'amenity.coffeeMachine': 'Kaffeemaschine',
    'amenity.toaster': 'Toaster',
    'amenity.kettle': 'Wasserkocher',
    'amenity.dishwasher': 'Geschirrspüler',
    'amenity.kitchenUtensils': 'Küchenutensilien',
    // Amenities - Laundry
    'amenity.washingMachine': 'Waschmaschine',
    'amenity.dryer': 'Trockner',
    'amenity.iron': 'Bügeleisen',
    'amenity.ironingBoard': 'Bügelbrett',
    // Amenities - Comfort
    'amenity.towels': 'Handtücher',
    'amenity.bedLinen': 'Bettwäsche',
    'amenity.extraPillows': 'Extra Kissen',
    'amenity.blankets': 'Decken',
    // Amenities - Safety
    'amenity.safe': 'Tresor',
    'amenity.alarm': 'Alarm',
    'amenity.digitalLock': 'Digitales Schloss',
    'amenity.smokeDetector': 'Rauchmelder',
    'amenity.fireExtinguisher': 'Feuerlöscher',
    'amenity.firstAidKit': 'Erste-Hilfe-Kasten',
    // Amenities - Building
    'amenity.elevator': 'Aufzug',
    'amenity.parking': 'Parkplatz',
    'amenity.privateParking': 'Privater Parkplatz',
    'amenity.garage': 'Garage (Preis auf Anfrage)',
    'amenity.doorman': 'Portier',
    'amenity.privateEntrance': 'Privater Eingang',
    // Amenities - Leisure
    'amenity.pool': 'Pool',
    'amenity.privatePool': 'Privater Pool',
    'amenity.sharedPool': 'Gemeinschaftspool',
    'amenity.jacuzzi': 'Jacuzzi',
    'amenity.gym': 'Fitnessstudio',
    'amenity.sauna': 'Sauna',
    'amenity.barbecue': 'Grill',
    'amenity.outdoorFurniture': 'Gartenmöbel',
    // Amenities - Policies
    'amenity.petsAllowed': 'Haustiere Erlaubt',
    'amenity.noSmoking': 'Nichtraucher',
    'amenity.wheelchairAccessible': 'Rollstuhlgerecht',
    'amenity.selfCheckIn': 'Selbst-Check-in',
    'amenity.cleaningIncluded': 'Reinigung Inklusive',
    'amenity.toiletries': 'Toilettenartikel',
    
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
    'contact.contactInfo': 'Kontaktinformationen',
    'contact.sendUsMessage': 'Senden Sie uns eine Nachricht',
    'contact.fillForm': 'Füllen Sie das Formular aus und wir werden uns bei Ihnen melden',
    'contact.name': 'Name',
    'contact.yourName': 'Ihr Name',
    'contact.email': 'Email',
    'contact.phone': 'Telefon',
    'contact.subject': 'Betreff',
    'contact.messageSubject': 'Nachrichtenbetreff',
    'contact.message': 'Nachricht',
    'contact.writeMessage': 'Schreiben Sie Ihre Nachricht hier...',
    'contact.send': 'Nachricht Senden',
    'contact.makeReservation': 'Reservierung Vornehmen',
    'contact.checkAvailability': 'Verfügbarkeit prüfen und Ihre Wohnung buchen',
    'contact.bookNow': 'Jetzt Buchen',
    'contact.address': 'Adresse',
    
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
    'calendar.clear': 'Löschen',
    
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

// Event emitter para notificar mudanças de idioma
type LanguageChangeListener = (lang: string) => void;
const listeners: Set<LanguageChangeListener> = new Set();

class SimpleI18n {
  private currentLanguage: string = 'pt';
  
  constructor() {
    this.currentLanguage = this.detectLanguage();
  }
  
  private detectLanguage(): string {
    const stored = localStorage.getItem('language');
    if (stored && ['pt', 'en', 'fr', 'de'].includes(stored)) {
      return stored;
    }
    
    const browserLang = navigator.language.split('-')[0];
    if (['pt', 'en', 'fr', 'de'].includes(browserLang)) {
      return browserLang;
    }
    
    return 'pt';
  }
  
  setLanguage(lang: string): void {
    if (['pt', 'en', 'fr', 'de'].includes(lang) && lang !== this.currentLanguage) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      // Notificar todos os listeners imediatamente
      listeners.forEach(listener => listener(lang));
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
  
  subscribe(listener: LanguageChangeListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
}

export const simpleI18n = new SimpleI18n();

// Hook for React components with instant updates
export function useTranslation() {
  const [lang, setLang] = useState(simpleI18n.getCurrentLanguage());
  
  useEffect(() => {
    // Subscrever a mudanças de idioma
    const unsubscribe = simpleI18n.subscribe((newLang) => {
      setLang(newLang);
    });
    return unsubscribe;
  }, []);
  
  const setLanguage = useCallback((newLang: string) => {
    simpleI18n.setLanguage(newLang);
  }, []);
  
  return {
    t: (key: string, params?: Record<string, string | number>) => simpleI18n.translate(key, params),
    currentLanguage: lang,
    setLanguage,
    languages: simpleI18n.getSupportedLanguages(),
  };
}
