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
  Shirt
} from 'lucide-react';

// Mapeamento de comodidades para ícones
const featureIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Vista
  'vista mar': Waves,
  'vista cidade': Building2,
  'vista montanha': Mountain,
  'vista jardim': TreePine,
  'vista mar parcial': Waves,
  
  // Espaços
  'varanda': Sun,
  'terraço': Sun,
  'terrace': Sun,
  'balcony': Sun,
  '2 pisos': Building2,
  'duplex': Building2,
  
  // Climatização
  'ar condicionado': AirVent,
  'air conditioning': AirVent,
  'a/c': AirVent,
  'aquecimento': Wind,
  
  // Tecnologia
  'wi-fi': Wifi,
  'wifi': Wifi,
  'tv': Tv,
  'televisão': Tv,
  'lcd': Tv,
  
  // Cozinha
  'cozinha equipada': UtensilsCrossed,
  'kitchen': UtensilsCrossed,
  'cozinha': UtensilsCrossed,
  'frigorífico': Refrigerator,
  'microondas': Microwave,
  'máquina de lavar': Shirt,
  'máquina de café': Coffee,
  
  // Quartos
  'quarto': Bed,
  '2 quartos': Bed,
  '3 quartos': Bed,
  'bedroom': Bed,
  'suite': Bed,
  
  // Casa de banho
  'casa de banho': Bath,
  'wc': Bath,
  'bathroom': Bath,
  'banheira': Bath,
  'chuveiro': Bath,
  
  // Estacionamento
  'estacionamento': Car,
  'parking': Car,
  'garagem': Car,
  
  // Outros
  'elevador': DoorOpen,
  'piscina': Waves,
  'pool': Waves,
  'segurança': Lock,
  'cofre': Key,
  'limpeza': Sparkles,
  'roupa de cama': Bed,
  'toalhas': Bath,
  'sofá': Sofa,
  'sofá cama': Sofa,
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
