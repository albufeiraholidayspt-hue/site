import { 
  Waves, 
  Wind, 
  Wifi, 
  Tv, 
  UtensilsCrossed, 
  Car, 
  Sun,
  Bath,
  Bed,
  Coffee,
  Refrigerator,
  Microwave,
  AirVent,
  Building2,
  Mountain,
  TreePine,
  Sofa,
  DoorOpen,
  Lock,
  Key,
  Sparkles,
  Check,
  Shirt,
  Baby,
  Flame,
  Snowflake,
  Armchair,
  BedDouble,
  Home,
  CigaretteOff,
  ShowerHead,
  Droplets,
  Utensils,
  Blinds,
  Shield,
  PackageCheck,
  Thermometer
} from 'lucide-react';

// Mapeamento de comodidades para ícones
const featureIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Vista
  'vista mar': Waves,
  'vista cidade': Building2,
  'vista montanha': Mountain,
  'vista jardim': TreePine,
  'vista mar parcial': Waves,
  'vistamar': Waves,
  'vistacidade': Building2,
  'vistamontanha': Mountain,
  'vistajardim': TreePine,
  'vistamarparcial': Waves,
  
  // Espaços
  'varanda': Sun,
  'terraço': Sun,
  'terrace': Sun,
  'balcony': Sun,
  '2 pisos': Building2,
  'duplex': Building2,
  'penthouse': Building2,
  
  // Climatização
  'ar condicionado': AirVent,
  'air conditioning': AirVent,
  'a/c': AirVent,
  'aquecimento': Thermometer,
  
  // Tecnologia
  'wi-fi': Wifi,
  'wifi': Wifi,
  'tv': Tv,
  'televisão': Tv,
  'lcd': Tv,
  'smart tv': Tv,
  'smarttv': Tv,
  
  // Cozinha
  'cozinha equipada': UtensilsCrossed,
  'kitchen': UtensilsCrossed,
  'cozinha': UtensilsCrossed,
  'frigorífico': Refrigerator,
  'frigorifico': Refrigerator,
  'microondas': Microwave,
  'micro-ondas': Microwave,
  'máquina de lavar': Shirt,
  'maquina de lavar roupa': Shirt,
  'maquinadelavarroupa': Shirt,
  'máquina de café': Coffee,
  'torradeira': UtensilsCrossed,
  'chaleira': Coffee,
  'ferro de engomar': Thermometer,
  'ferrodeengomar': Thermometer,
  'tábua de engomar': Thermometer,
  'tabuadeengomar': Thermometer,
  
  // Quartos
  'quarto': Bed,
  '2 quartos': Bed,
  '3 quartos': Bed,
  'bedroom': Bed,
  'suite': BedDouble,
  'cama de casal': BedDouble,
  'camadecasal': BedDouble,
  'berço disponível': Baby,
  'bercodisponivel': Baby,
  'secador de cabelo': Wind,
  'secadordecabelo': Wind,
  'roupa de cama': Bed,
  'roupadecama': Bed,
  'cobertores': Bed,
  
  // Casa de banho
  'casa de banho': Bath,
  'wc': Bath,
  'bathroom': Bath,
  'banheira': Bath,
  'chuveiro': ShowerHead,
  'toalhas': Bath,
  'artigos de higiene': Droplets,
  'artigosdehigiene': Droplets,
  
  // Estacionamento
  'estacionamento': Car,
  'parking': Car,
  'garagem': Car,
  'garagem (preço sob consulta)': Car,
  'garagemprecosob': Car,
  
  // Outros
  'elevador': DoorOpen,
  'piscina': Waves,
  'pool': Waves,
  'segurança': Lock,
  'cofre': Key,
  'limpeza': Sparkles,
  'limpeza incluída': Sparkles,
  'limpezaincluida': Sparkles,
  'sofá': Sofa,
  'sofá cama': Sofa,
  'sofacama': Sofa,
  'não fumadores': CigaretteOff,
  'naofumadores': CigaretteOff,
  'check-in autónomo': Key,
  'checkinautonomo': Key,
};

export function getFeatureIcon(feature: string): React.ComponentType<{ className?: string }> {
  const normalizedFeature = feature.toLowerCase().trim();
  
  // Procurar correspondência exata
  if (featureIconMap[normalizedFeature]) {
    return featureIconMap[normalizedFeature];
  }
  
  // Procurar correspondência parcial
  for (const [key, icon] of Object.entries(featureIconMap)) {
    if (normalizedFeature.includes(key) || key.includes(normalizedFeature)) {
      return icon;
    }
  }
  
  // Ícone padrão
  return Check;
}

interface FeatureIconProps {
  feature: string;
  className?: string;
}

export function FeatureIcon({ feature, className = "h-5 w-5" }: FeatureIconProps) {
  const Icon = getFeatureIcon(feature);
  return <Icon className={className} />;
}
