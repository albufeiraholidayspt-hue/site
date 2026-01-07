import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Home,
  Building2,
  Phone,
  Save,
  LogOut,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Tag,
  Settings,
  Search,
  Star,
  MapPin,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ImageUploadImgBB } from '../../components/ImageUploadImgBB';
import { GalleryUploadImgBB } from '../../components/GalleryUploadImgBB';
import { AutoExport } from '../../components/AutoExport';
import '../../utils/contentSync'; // Importa para disponibilizar globalmente

// Lista de todas as comodidades disponíveis
const AVAILABLE_FEATURES = [
  // Vistas
  'Vista Mar',
  'Vista Mar Parcial',
  'Vista Cidade',
  'Vista Piscina',
  'Vista Jardim',
  'Vista Montanha',
  // Espaços exteriores
  'Varanda',
  'Terraço',
  'Jardim Privado',
  'Pátio',
  // Estrutura
  '2 Pisos',
  'Duplex',
  'Penthouse',
  // Quartos
  '1 Quarto',
  '2 Quartos',
  '3 Quartos',
  'Suite',
  'Cama de Casal',
  'Camas Twin',
  'Sofá-Cama',
  'Berço Disponível',
  // Casas de banho
  'Casa de Banho Privativa',
  'Banheira',
  'Chuveiro',
  'Secador de Cabelo',
  // Climatização
  'Ar Condicionado',
  'Aquecimento Central',
  'Lareira',
  'Ventilador',
  // Tecnologia
  'Wi-Fi',
  'Wi-Fi Fibra',
  'TV',
  'Smart TV',
  'Netflix',
  'TV Cabo',
  // Cozinha
  'Cozinha Equipada',
  'Micro-ondas',
  'Forno',
  'Placa Vitrocerâmica',
  'Frigorífico',
  'Congelador',
  'Máquina de Café',
  'Torradeira',
  'Chaleira',
  'Máquina de Lavar Loiça',
  'Utensílios de Cozinha',
  // Lavandaria
  'Máquina de Lavar Roupa',
  'Máquina de Secar',
  'Ferro de Engomar',
  'Tábua de Engomar',
  // Conforto
  'Toalhas',
  'Roupa de Cama',
  'Almofadas Extra',
  'Cobertores',
  // Segurança
  'Cofre',
  'Alarme',
  'Fechadura Digital',
  'Detector de Fumo',
  'Extintor',
  'Kit Primeiros Socorros',
  // Edifício
  'Elevador',
  'Estacionamento',
  'Estacionamento Privado',
  'Garagem (preço sob consulta)',
  'Porteiro',
  'Entrada Privada',
  // Lazer
  'Piscina',
  'Piscina Privada',
  'Piscina Partilhada',
  'Jacuzzi',
  'Ginásio',
  'Sauna',
  'Churrasqueira',
  'Mobília de Exterior',
  // Extras
  'Animais Permitidos',
  'Não Fumadores',
  'Acessível a Cadeira de Rodas',
  'Check-in Autónomo',
  'Limpeza Incluída',
  'Produtos de Higiene',
];

export function Dashboard() {
  const navigate = useNavigate();
  const { user, content, updateHero, updateAbout, updateContact, updateBookingUrl, updateApartment, addPromotion, updatePromotion, deletePromotion, addReview, updateReview, deleteReview, updateSeo, updateSocialLinks, updateAlgarve, addAlgarveImage, updateAlgarveImage, deleteAlgarveImage, logout } = useStore();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [expandedApartment, setExpandedApartment] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    code: '',
    discount: '',
    validUntil: '',
  });
  const [newReview, setNewReview] = useState({
    name: '',
    country: '',
    rating: 5,
    text: '',
    apartment: '',
  });

  if (!user.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'hero', name: 'Página Inicial', icon: Home },
    { id: 'algarve', name: 'Página Algarve', icon: MapPin },
    { id: 'promotions', name: 'Promoções', icon: Tag },
    { id: 'reviews', name: 'Avaliações', icon: Star },
    { id: 'apartments', name: 'Apartamentos', icon: Building2 },
    { id: 'contact', name: 'Contacto', icon: Phone },
    { id: 'social', name: 'Redes Sociais', icon: Settings },
    { id: 'seo', name: 'SEO & Analytics', icon: Search },
  ];

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text) return;
    addReview({
      id: Date.now().toString(),
      ...newReview,
      active: true,
    });
    setNewReview({ name: '', country: '', rating: 5, text: '', apartment: '' });
    showSaved();
  };

  const handleAddPromotion = () => {
    if (!newPromotion.title) return;
    addPromotion({
      id: Date.now().toString(),
      ...newPromotion,
      active: true,
    });
    setNewPromotion({ title: '', description: '', code: '', discount: '', validUntil: '' });
    showSaved();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AutoExport enabled={false} />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-display text-xl font-bold text-gray-900">
              Backoffice - Albufeira Holidays
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const size = new Blob([localStorage.getItem('albufeira-holidays-storage') || '']).size;
                  const sizeKB = (size / 1024).toFixed(1);
                  const sizeMB = (size / (1024 * 1024)).toFixed(2);
                  alert(`Tamanho do armazenamento: ${sizeKB} KB (${sizeMB} MB)\nLimite: ~5 MB\n\nSe estiver cheio, limpe o cache ou use URLs externas para imagens.`);
                }}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Ver Armazenamento
              </button>
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
                    localStorage.removeItem('albufeira-holidays-storage');
                    window.location.reload();
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 underline"
              >
                Limpar Cache
              </button>
              <a
                href="/"
                target="_blank"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Ver Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="h-5 w-5" />
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Hero Section */}
              {activeSection === 'hero' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Página Inicial
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        value={content.hero.title}
                        onChange={(e) => updateHero({ title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtítulo
                      </label>
                      <textarea
                        value={content.hero.subtitle}
                        onChange={(e) => updateHero({ subtitle: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem de Fundo (URL)
                      </label>
                      <input
                        type="url"
                        value={content.hero.backgroundImage}
                        onChange={(e) => updateHero({ backgroundImage: e.target.value })}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      {content.hero.backgroundImage && (
                        <img
                          src={content.hero.backgroundImage}
                          alt="Preview"
                          className="mt-4 rounded-lg h-40 w-full object-cover"
                        />
                      )}
                    </div>
                    
                    <ImageUploadImgBB
                      label="Ou faça upload de uma imagem"
                      value=""
                      onChange={(url) => {
                        updateHero({ backgroundImage: url });
                      }}
                    />

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Slideshow de Imagens</h4>
                      <p className="text-xs text-gray-500 mb-4">
                        Adicione várias imagens para criar um slideshow automático no fundo.
                      </p>
                      
                      <GalleryUploadImgBB
                        label="Imagens do Slideshow"
                        images={content.hero.backgroundImages || []}
                        onChange={(images) => updateHero({ backgroundImages: images })}
                        maxImages={5}
                      />

                      <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={content.hero.enableAnimation !== false}
                            onChange={(e) => updateHero({ enableAnimation: e.target.checked })}
                            className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Ativar animação Ken Burns (movimento nas imagens)
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Vídeo YouTube (Fundo)</h4>
                      <p className="text-xs text-gray-500 mb-4">
                        Se configurar um vídeo, ele será usado como fundo em vez das imagens.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL do Vídeo YouTube
                          </label>
                          <input
                            type="url"
                            value={content.hero.videoUrl || ''}
                            onChange={(e) => updateHero({ videoUrl: e.target.value })}
                            placeholder="https://www.youtube.com/watch?v=XXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Segundo de Início
                          </label>
                          <input
                            type="number"
                            value={content.hero.videoStartTime || 0}
                            onChange={(e) => updateHero({ videoStartTime: parseInt(e.target.value) || 0 })}
                            min={0}
                            placeholder="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Secção Sobre</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            value={content.about.title}
                            onChange={(e) => updateAbout({ title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição
                          </label>
                          <textarea
                            value={content.about.description}
                            onChange={(e) => updateAbout({ description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>

                        <ImageUploadImgBB
                          label="Imagem (alternativa ao vídeo)"
                          value={content.about.image}
                          onChange={(url) => updateAbout({ image: url })}
                        />

                        <div className="border-t pt-4 mt-4">
                          <h4 className="font-medium text-gray-900 mb-3">Vídeo YouTube</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL do Vídeo YouTube
                              </label>
                              <input
                                type="url"
                                value={content.about.videoUrl || ''}
                                onChange={(e) => updateAbout({ videoUrl: e.target.value })}
                                placeholder="https://www.youtube.com/watch?v=XXXXXXX"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Cole o URL completo do vídeo YouTube (ex: https://www.youtube.com/watch?v=9dQqiVTNTj4)
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Segundo de Início
                              </label>
                              <input
                                type="number"
                                value={content.about.videoStartTime || 0}
                                onChange={(e) => updateAbout({ videoStartTime: parseInt(e.target.value) || 0 })}
                                min={0}
                                placeholder="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                O vídeo começará a partir deste segundo (ex: 54 para começar no segundo 54)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL de Reservas (Avaibook)
                        </label>
                        <input
                          type="url"
                          value={content.bookingUrl}
                          onChange={(e) => updateBookingUrl(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={showSaved}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Guardar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* Algarve Section */}
              {activeSection === 'algarve' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Página do Algarve
                  </h2>

                  <div className="space-y-6">
                    {/* Hero */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Hero Section</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            value={content.algarve?.hero?.title || ''}
                            onChange={(e) => updateAlgarve({ 
                              hero: { ...content.algarve?.hero, title: e.target.value, subtitle: content.algarve?.hero?.subtitle || '', backgroundImage: content.algarve?.hero?.backgroundImage || '' }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subtítulo
                          </label>
                          <textarea
                            value={content.algarve?.hero?.subtitle || ''}
                            onChange={(e) => updateAlgarve({ 
                              hero: { ...content.algarve?.hero, subtitle: e.target.value, title: content.algarve?.hero?.title || '', backgroundImage: content.algarve?.hero?.backgroundImage || '' }
                            })}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Video */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Vídeo YouTube</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL do YouTube
                          </label>
                          <input
                            type="url"
                            value={content.algarve?.video?.youtubeUrl || ''}
                            onChange={(e) => updateAlgarve({ 
                              video: { ...content.algarve?.video, youtubeUrl: e.target.value, title: content.algarve?.video?.title || '', description: content.algarve?.video?.description || '' }
                            })}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={content.algarve?.video?.enabledInHero !== false}
                                onChange={(e) => updateAlgarve({ 
                                  video: { ...content.algarve?.video, enabledInHero: e.target.checked, title: content.algarve?.video?.title || '', description: content.algarve?.video?.description || '', youtubeUrl: content.algarve?.video?.youtubeUrl || '' }
                                })}
                                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                              />
                              <span className="text-sm font-medium text-gray-700">Mostrar Vídeo no Hero</span>
                            </label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ordem no Hero
                            </label>
                            <input
                              type="number"
                              value={content.algarve?.video?.heroOrder ?? 0}
                              onChange={(e) => updateAlgarve({ 
                                video: { ...content.algarve?.video, heroOrder: parseInt(e.target.value) || 0, title: content.algarve?.video?.title || '', description: content.algarve?.video?.description || '', youtubeUrl: content.algarve?.video?.youtubeUrl || '' }
                              })}
                              min={0}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activities Section */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Atividades e Paisagens</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Adicione imagens a cada atividade para tornar a seção mais visual.
                      </p>
                      <div className="space-y-4">
                        {content.algarve?.activities?.items?.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start gap-4">
                              {item.imageUrl && (
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.title}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">{item.icon}</span>
                                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Imagem da Atividade
                                  </label>
                                  <ImageUploadImgBB
                                    value={item.imageUrl || ''}
                                    onChange={(url) => {
                                      const updatedItems = [...(content.algarve?.activities?.items || [])];
                                      updatedItems[index] = { ...updatedItems[index], imageUrl: url };
                                      updateAlgarve({
                                        activities: {
                                          ...content.algarve?.activities,
                                          title: content.algarve?.activities?.title || '',
                                          description: content.algarve?.activities?.description || '',
                                          items: updatedItems
                                        }
                                      });
                                    }}
                                    showUrlInput={true}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link do Google Maps
                                  </label>
                                  <input
                                    type="url"
                                    value={item.googleMapsUrl || ''}
                                    onChange={(e) => {
                                      const updatedItems = [...(content.algarve?.activities?.items || [])];
                                      updatedItems[index] = { ...updatedItems[index], googleMapsUrl: e.target.value };
                                      updateAlgarve({
                                        activities: {
                                          ...content.algarve?.activities,
                                          title: content.algarve?.activities?.title || '',
                                          description: content.algarve?.activities?.description || '',
                                          items: updatedItems
                                        }
                                      });
                                    }}
                                    placeholder="https://maps.google.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Travel Methods Section */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Como Viajar - Métodos de Transporte</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Adicione imagens a cada método de transporte.
                      </p>
                      <div className="space-y-4">
                        {content.algarve?.travel?.methods?.map((method, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start gap-4">
                              {method.imageUrl && (
                                <img 
                                  src={method.imageUrl} 
                                  alt={method.title}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">{method.icon}</span>
                                  <h4 className="font-semibold text-gray-900">{method.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600">{method.description}</p>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Imagem do Transporte
                                  </label>
                                  <ImageUploadImgBB
                                    value={method.imageUrl || ''}
                                    onChange={(url) => {
                                      const updatedMethods = [...(content.algarve?.travel?.methods || [])];
                                      updatedMethods[index] = { ...updatedMethods[index], imageUrl: url };
                                      updateAlgarve({
                                        travel: {
                                          ...content.algarve?.travel,
                                          title: content.algarve?.travel?.title || '',
                                          description: content.algarve?.travel?.description || '',
                                          methods: updatedMethods
                                        }
                                      });
                                    }}
                                    showUrlInput={true}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link do Google Maps
                                  </label>
                                  <input
                                    type="url"
                                    value={method.googleMapsUrl || ''}
                                    onChange={(e) => {
                                      const updatedMethods = [...(content.algarve?.travel?.methods || [])];
                                      updatedMethods[index] = { ...updatedMethods[index], googleMapsUrl: e.target.value };
                                      updateAlgarve({
                                        travel: {
                                          ...content.algarve?.travel,
                                          title: content.algarve?.travel?.title || '',
                                          description: content.algarve?.travel?.description || '',
                                          methods: updatedMethods
                                        }
                                      });
                                    }}
                                    placeholder="https://maps.google.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Beaches Section */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Praias Premiadas</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Adicione praias com fotos e prémios (Bandeira Azul, etc).
                      </p>
                      <div className="space-y-4">
                        {content.algarve?.beaches?.items?.map((beach, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start gap-4">
                              {beach.imageUrl && (
                                <img 
                                  src={beach.imageUrl} 
                                  alt={beach.name}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input
                                      type="text"
                                      value={beach.name}
                                      onChange={(e) => {
                                        const updatedItems = [...(content.algarve?.beaches?.items || [])];
                                        updatedItems[index] = { ...updatedItems[index], name: e.target.value };
                                        updateAlgarve({
                                          beaches: {
                                            ...content.algarve?.beaches,
                                            title: content.algarve?.beaches?.title || '',
                                            description: content.algarve?.beaches?.description || '',
                                            blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                            features: content.algarve?.beaches?.features || [],
                                            items: updatedItems
                                          }
                                        });
                                      }}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prémios (separados por vírgula)</label>
                                    <input
                                      type="text"
                                      value={beach.awards?.join(', ') || ''}
                                      onChange={(e) => {
                                        const updatedItems = [...(content.algarve?.beaches?.items || [])];
                                        updatedItems[index] = { ...updatedItems[index], awards: e.target.value.split(',').map(a => a.trim()).filter(a => a) };
                                        updateAlgarve({
                                          beaches: {
                                            ...content.algarve?.beaches,
                                            title: content.algarve?.beaches?.title || '',
                                            description: content.algarve?.beaches?.description || '',
                                            blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                            features: content.algarve?.beaches?.features || [],
                                            items: updatedItems
                                          }
                                        });
                                      }}
                                      placeholder="Bandeira Azul, Top 10 Europa"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                  <input
                                    type="text"
                                    value={beach.description}
                                    onChange={(e) => {
                                      const updatedItems = [...(content.algarve?.beaches?.items || [])];
                                      updatedItems[index] = { ...updatedItems[index], description: e.target.value };
                                      updateAlgarve({
                                        beaches: {
                                          ...content.algarve?.beaches,
                                          title: content.algarve?.beaches?.title || '',
                                          description: content.algarve?.beaches?.description || '',
                                          blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                          features: content.algarve?.beaches?.features || [],
                                          items: updatedItems
                                        }
                                      });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                                  <ImageUploadImgBB
                                    value={beach.imageUrl || ''}
                                    onChange={(url) => {
                                      const updatedItems = [...(content.algarve?.beaches?.items || [])];
                                      updatedItems[index] = { ...updatedItems[index], imageUrl: url };
                                      updateAlgarve({
                                        beaches: {
                                          ...content.algarve?.beaches,
                                          title: content.algarve?.beaches?.title || '',
                                          description: content.algarve?.beaches?.description || '',
                                          blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                          features: content.algarve?.beaches?.features || [],
                                          items: updatedItems
                                        }
                                      });
                                    }}
                                    showUrlInput={true}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Link do Google Maps</label>
                                  <input
                                    type="url"
                                    value={beach.googleMapsUrl || ''}
                                    onChange={(e) => {
                                      const updatedItems = [...(content.algarve?.beaches?.items || [])];
                                      updatedItems[index] = { ...updatedItems[index], googleMapsUrl: e.target.value };
                                      updateAlgarve({
                                        beaches: {
                                          ...content.algarve?.beaches,
                                          title: content.algarve?.beaches?.title || '',
                                          description: content.algarve?.beaches?.description || '',
                                          blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                          features: content.algarve?.beaches?.features || [],
                                          items: updatedItems
                                        }
                                      });
                                    }}
                                    placeholder="https://maps.google.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  const updatedItems = content.algarve?.beaches?.items?.filter((_, i) => i !== index) || [];
                                  updateAlgarve({
                                    beaches: {
                                      ...content.algarve?.beaches,
                                      title: content.algarve?.beaches?.title || '',
                                      description: content.algarve?.beaches?.description || '',
                                      blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                      features: content.algarve?.beaches?.features || [],
                                      items: updatedItems
                                    }
                                  });
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Remover praia"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newBeach = {
                              name: 'Nova Praia',
                              description: 'Descrição da praia',
                              imageUrl: '',
                              googleMapsUrl: '',
                              awards: []
                            };
                            updateAlgarve({
                              beaches: {
                                ...content.algarve?.beaches,
                                title: content.algarve?.beaches?.title || 'Praias',
                                description: content.algarve?.beaches?.description || '',
                                blueFlagCount: content.algarve?.beaches?.blueFlagCount || 0,
                                features: content.algarve?.beaches?.features || [],
                                items: [...(content.algarve?.beaches?.items || []), newBeach]
                              }
                            });
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                          Adicionar Nova Praia
                        </button>
                      </div>
                    </div>

                    {/* Golf Section */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Seção de Golfe</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            value={content.algarve?.golf?.title || ''}
                            onChange={(e) => updateAlgarve({ 
                              golf: { ...content.algarve?.golf, title: e.target.value, description: content.algarve?.golf?.description || '' }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição
                          </label>
                          <textarea
                            value={content.algarve?.golf?.description || ''}
                            onChange={(e) => updateAlgarve({ 
                              golf: { ...content.algarve?.golf, description: e.target.value, title: content.algarve?.golf?.title || '' }
                            })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Imagem (opcional)
                          </label>
                          <ImageUploadImgBB
                            value={content.algarve?.golf?.imageUrl || ''}
                            onChange={(url) => updateAlgarve({ 
                              golf: { ...content.algarve?.golf, imageUrl: url, title: content.algarve?.golf?.title || '', description: content.algarve?.golf?.description || '' }
                            })}
                            showUrlInput={true}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Posição da Imagem
                          </label>
                          <select
                            value={content.algarve?.golf?.imagePosition || 'right'}
                            onChange={(e) => updateAlgarve({ 
                              golf: { ...content.algarve?.golf, imagePosition: e.target.value, title: content.algarve?.golf?.title || '', description: content.algarve?.golf?.description || '' }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            title="Posição da imagem"
                          >
                            <option value="left">Esquerda</option>
                            <option value="right">Direita</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link do Google Maps
                          </label>
                          <input
                            type="url"
                            value={content.algarve?.golf?.googleMapsUrl || ''}
                            onChange={(e) => updateAlgarve({ 
                              golf: { ...content.algarve?.golf, googleMapsUrl: e.target.value, title: content.algarve?.golf?.title || '', description: content.algarve?.golf?.description || '' }
                            })}
                            placeholder="https://maps.google.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="border-b pb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Galeria de Imagens & Hero Slideshow</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Configure quais imagens aparecem no slideshow do hero e ajuste a posição de cada imagem.
                      </p>
                      <div className="space-y-4">
                        {content.algarve?.gallery?.images?.map((image) => (
                          <div key={image.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start gap-4">
                              <img 
                                src={image.imageUrl} 
                                alt={image.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Título
                                    </label>
                                    <input
                                      type="text"
                                      value={image.title}
                                      onChange={(e) => updateAlgarveImage(image.id, { title: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Descrição
                                    </label>
                                    <input
                                      type="text"
                                      value={image.description}
                                      onChange={(e) => updateAlgarveImage(image.id, { description: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    URL da Imagem
                                  </label>
                                  <ImageUploadImgBB
                                    value={image.imageUrl}
                                    onChange={(url) => updateAlgarveImage(image.id, { imageUrl: url })}
                                    showUrlInput={true}
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                                  <div>
                                    <label className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={image.enabledInHero !== false}
                                        onChange={(e) => updateAlgarveImage(image.id, { enabledInHero: e.target.checked })}
                                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                      />
                                      <span className="text-sm font-medium text-gray-700">Mostrar no Hero</span>
                                    </label>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Ordem no Hero
                                    </label>
                                    <input
                                      type="number"
                                      value={image.heroOrder ?? 999}
                                      onChange={(e) => updateAlgarveImage(image.id, { heroOrder: parseInt(e.target.value) || 0 })}
                                      min={0}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Posição da Imagem
                                    </label>
                                    <select
                                      value={image.imagePosition || 'center'}
                                      onChange={(e) => updateAlgarveImage(image.id, { imagePosition: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                      title="Posição da imagem"
                                    >
                                      <option value="center">Centro</option>
                                      <option value="top">Topo</option>
                                      <option value="bottom">Baixo</option>
                                      <option value="left">Esquerda</option>
                                      <option value="right">Direita</option>
                                    </select>
                                  </div>
                                </div>
                                {/* Link do Google Maps */}
                                <div className="pt-2 border-t">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link do Google Maps
                                  </label>
                                  <input
                                    type="url"
                                    value={image.googleMapsUrl || ''}
                                    onChange={(e) => updateAlgarveImage(image.id, { googleMapsUrl: e.target.value })}
                                    placeholder="https://maps.google.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  if (confirm('Tem certeza que deseja remover esta imagem?')) {
                                    deleteAlgarveImage(image.id);
                                  }
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Remover imagem"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => {
                            const newImage = {
                              id: Date.now().toString(),
                              title: 'Nova Imagem',
                              description: 'Descrição da imagem',
                              imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
                              category: 'beach' as const,
                            };
                            addAlgarveImage(newImage);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                          Adicionar Nova Imagem
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={showSaved}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Save className="h-5 w-5" />
                        Guardar Alterações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotions Section */}
              {activeSection === 'promotions' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Promoções e Códigos Promocionais
                  </h2>

                  {/* Add New Promotion */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Adicionar Nova Promoção
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título *
                        </label>
                        <input
                          type="text"
                          value={newPromotion.title}
                          onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                          placeholder="Ex: Desconto Early Bird"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código Promocional
                        </label>
                        <input
                          type="text"
                          value={newPromotion.code}
                          onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value.toUpperCase() })}
                          placeholder="Ex: EARLY15"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição
                        </label>
                        <input
                          type="text"
                          value={newPromotion.description}
                          onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                          placeholder="Ex: Reserve com 30 dias de antecedência e ganhe desconto"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desconto
                        </label>
                        <input
                          type="text"
                          value={newPromotion.discount}
                          onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                          placeholder="Ex: 15%"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Válido até
                        </label>
                        <input
                          type="date"
                          value={newPromotion.validUntil}
                          onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddPromotion}
                      className="mt-4 btn-primary flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Adicionar Promoção
                    </button>
                  </div>

                  {/* Existing Promotions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Promoções Existentes</h3>
                    {(!content.promotions || content.promotions.length === 0) ? (
                      <p className="text-gray-500 text-sm">Nenhuma promoção criada ainda.</p>
                    ) : (
                      content.promotions.map((promo) => (
                        <div
                          key={promo.id}
                          className={`border rounded-xl p-4 ${promo.active ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{promo.title}</h4>
                                {promo.code && (
                                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-mono rounded">
                                    {promo.code}
                                  </span>
                                )}
                                {promo.discount && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                    {promo.discount}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{promo.description}</p>
                              {promo.validUntil && (
                                <p className="text-xs text-gray-500 mt-1">Válido até: {promo.validUntil}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={promo.active}
                                  onChange={(e) => updatePromotion(promo.id, { active: e.target.checked })}
                                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-600">Ativa</span>
                              </label>
                              <button
                                onClick={() => deletePromotion(promo.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar promoção"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {activeSection === 'reviews' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Avaliações dos Hóspedes
                  </h2>

                  {/* Add New Review */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Adicionar Nova Avaliação
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome do Hóspede
                        </label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="Maria S."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País
                        </label>
                        <input
                          type="text"
                          value={newReview.country}
                          onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                          placeholder="Portugal"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartamento
                        </label>
                        <select
                          value={newReview.apartment}
                          onChange={(e) => setNewReview({ ...newReview, apartment: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        >
                          <option value="">Selecionar...</option>
                          {content.apartments.map((apt) => (
                            <option key={apt.id} value={apt.name}>{apt.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Avaliação
                        </label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="p-1"
                            >
                              <Star
                                className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texto da Avaliação (curto)
                      </label>
                      <textarea
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        rows={2}
                        placeholder="Apartamento fantástico com vista mar incrível!"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>
                    <button
                      onClick={handleAddReview}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Adicionar Avaliação
                    </button>
                  </div>

                  {/* Existing Reviews */}
                  <div className="space-y-4">
                    {!content.reviews || content.reviews.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma avaliação adicionada.</p>
                    ) : (
                      content.reviews.map((review) => (
                        <div
                          key={review.id}
                          className={`bg-white border rounded-xl p-4 ${review.active ? 'border-gray-200' : 'border-gray-200 opacity-50'}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-900">{review.name}</span>
                                {review.country && (
                                  <span className="text-sm text-gray-500">• {review.country}</span>
                                )}
                                {review.apartment && (
                                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
                                    {review.apartment}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 text-sm">{review.text}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={review.active}
                                  onChange={(e) => updateReview(review.id, { active: e.target.checked })}
                                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-600">Ativa</span>
                              </label>
                              <button
                                onClick={() => deleteReview(review.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar avaliação"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Apartments Section */}
              {activeSection === 'apartments' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Apartamentos
                  </h2>

                  <div className="space-y-4">
                    {content.apartments.map((apartment) => (
                      <div
                        key={apartment.id}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedApartment(
                            expandedApartment === apartment.id ? null : apartment.id
                          )}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={apartment.heroImage}
                              alt={apartment.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900">{apartment.name}</h3>
                              <p className="text-sm text-gray-500">{apartment.tagline}</p>
                            </div>
                          </div>
                          {expandedApartment === apartment.id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </button>

                        {expandedApartment === apartment.id && (
                          <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Nome
                                </label>
                                <input
                                  type="text"
                                  value={apartment.name}
                                  onChange={(e) => updateApartment(apartment.id, { name: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tagline
                                </label>
                                <input
                                  type="text"
                                  value={apartment.tagline}
                                  onChange={(e) => updateApartment(apartment.id, { tagline: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição
                              </label>
                              <textarea
                                value={apartment.description}
                                onChange={(e) => updateApartment(apartment.id, { description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Informações Adicionais
                              </label>
                              <textarea
                                value={apartment.additionalInfo || ''}
                                onChange={(e) => updateApartment(apartment.id, { additionalInfo: e.target.value })}
                                rows={4}
                                placeholder="Regras da casa, instruções de check-in, informações sobre a zona, etc."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Este texto aparece numa secção separada na página do apartamento.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Capacidade (pessoas)
                                </label>
                                <input
                                  type="number"
                                  value={apartment.capacity}
                                  onChange={(e) => updateApartment(apartment.id, { capacity: parseInt(e.target.value) })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Noites Mínimas
                                </label>
                                <input
                                  type="number"
                                  value={apartment.minNights}
                                  onChange={(e) => updateApartment(apartment.id, { minNights: parseInt(e.target.value) })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                />
                              </div>
                            </div>

                            <ImageUploadImgBB
                              label="Imagem Principal"
                              value={apartment.heroImage}
                              onChange={(url) => updateApartment(apartment.id, { heroImage: url })}
                            />

                            {/* Image Position Control */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Posição da Imagem Principal
                              </label>
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                {[
                                  { value: 'top', label: 'Topo' },
                                  { value: 'center', label: 'Centro' },
                                  { value: 'bottom', label: 'Baixo' },
                                ].map((pos) => (
                                  <button
                                    key={pos.value}
                                    type="button"
                                    onClick={() => updateApartment(apartment.id, { heroImagePosition: pos.value })}
                                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                                      (apartment.heroImagePosition || 'center') === pos.value
                                        ? 'bg-primary-500 text-white border-primary-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                                    }`}
                                  >
                                    {pos.label}
                                  </button>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500">
                                Ajusta a posição vertical da imagem quando cortada.
                              </p>
                            </div>

                            <GalleryUploadImgBB
                              label="Galeria de Imagens"
                              images={apartment.images}
                              onChange={(images) => updateApartment(apartment.id, { images })}
                              maxImages={40}
                            />

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Comodidades
                              </label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {AVAILABLE_FEATURES.map((feature) => (
                                  <label
                                    key={feature}
                                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                                      apartment.features.includes(feature)
                                        ? 'bg-primary-50 border-primary-300 text-primary-700'
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={apartment.features.includes(feature)}
                                      onChange={(e) => {
                                        const newFeatures = e.target.checked
                                          ? [...apartment.features, feature]
                                          : apartment.features.filter(f => f !== feature);
                                        updateApartment(apartment.id, { features: newFeatures });
                                      }}
                                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm">{feature}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="border-t pt-6 mt-6">
                              <h4 className="font-semibold text-gray-900 mb-4">Vídeo e Animação</h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL do Vídeo YouTube
                                  </label>
                                  <input
                                    type="url"
                                    value={apartment.videoUrl || ''}
                                    onChange={(e) => updateApartment(apartment.id, { videoUrl: e.target.value })}
                                    placeholder="https://www.youtube.com/watch?v=XXXXXXX"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Se configurar um vídeo, ele será usado como fundo na página do apartamento.
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Segundo de Início do Vídeo
                                  </label>
                                  <input
                                    type="number"
                                    value={apartment.videoStartTime || 0}
                                    onChange={(e) => updateApartment(apartment.id, { videoStartTime: parseInt(e.target.value) || 0 })}
                                    min={0}
                                    placeholder="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={apartment.enableAnimation !== false}
                                      onChange={(e) => updateApartment(apartment.id, { enableAnimation: e.target.checked })}
                                      className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                      Ativar animação Ken Burns (movimento na imagem)
                                    </span>
                                  </label>
                                  <p className="text-xs text-gray-500 mt-1 ml-8">
                                    Se não tiver vídeo configurado, a imagem terá um efeito de zoom suave.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-6 mt-6">
                              <h4 className="font-semibold text-gray-900 mb-4">Calendário e Reservas</h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL do iCal (Avaibook)
                                  </label>
                                  <input
                                    type="url"
                                    value={apartment.icalUrl || ''}
                                    onChange={(e) => updateApartment(apartment.id, { icalUrl: e.target.value })}
                                    placeholder="https://www.avaibook.com/ical/xxxxx.ics"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    URL do calendário iCal do Avaibook para sincronizar disponibilidade.
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL de Reserva Direta
                                  </label>
                                  <input
                                    type="url"
                                    value={apartment.bookingUrl || ''}
                                    onChange={(e) => updateApartment(apartment.id, { bookingUrl: e.target.value })}
                                    placeholder="https://www.avaibook.com/reservas/..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Link direto para a página de reserva deste apartamento no Avaibook.
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL de Avaliações
                                  </label>
                                  <input
                                    type="url"
                                    value={apartment.reviewsUrl || ''}
                                    onChange={(e) => updateApartment(apartment.id, { reviewsUrl: e.target.value })}
                                    placeholder="https://bookonline.pro/pt/property/...#reviews-section"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Link para a secção de avaliações do Avaibook/BookOnline.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-6 mt-6">
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                SEO da Página
                              </h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título SEO
                                  </label>
                                  <input
                                    type="text"
                                    value={apartment.seoTitle || ''}
                                    onChange={(e) => updateApartment(apartment.id, { seoTitle: e.target.value })}
                                    placeholder={`${apartment.name} - Albufeira Holidays`}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Título que aparece no Google (deixe vazio para usar o padrão)</p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição SEO
                                  </label>
                                  <textarea
                                    value={apartment.seoDescription || ''}
                                    onChange={(e) => updateApartment(apartment.id, { seoDescription: e.target.value })}
                                    rows={3}
                                    placeholder={apartment.description.substring(0, 160)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Descrição para o Google (máx. 160 caracteres)</p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Palavras-chave
                                  </label>
                                  <input
                                    type="text"
                                    value={apartment.seoKeywords || ''}
                                    onChange={(e) => updateApartment(apartment.id, { seoKeywords: e.target.value })}
                                    placeholder="apartamento, albufeira, férias, algarve..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Separadas por vírgula</p>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={showSaved}
                              className="btn-primary flex items-center gap-2"
                            >
                              <Save className="h-5 w-5" />
                              Guardar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Informações de Contacto
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <input
                          type="text"
                          value={content.contact.phone}
                          onChange={(e) => updateContact({ phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={content.contact.email}
                          onChange={(e) => updateContact({ email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Morada
                      </label>
                      <textarea
                        value={content.contact.address}
                        onChange={(e) => updateContact({ address: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Empresa
                        </label>
                        <input
                          type="text"
                          value={content.contact.companyName}
                          onChange={(e) => updateContact({ companyName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NIF
                        </label>
                        <input
                          type="text"
                          value={content.contact.nif}
                          onChange={(e) => updateContact({ nif: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={showSaved}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Guardar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* Social Links Section */}
              {activeSection === 'social' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    Redes Sociais & Avaliações
                  </h2>

                  <div className="space-y-6">
                    {/* Social Media */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Redes Sociais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.facebook || ''}
                            onChange={(e) => updateSocialLinks({ facebook: e.target.value })}
                            placeholder="https://facebook.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.instagram || ''}
                            onChange={(e) => updateSocialLinks({ instagram: e.target.value })}
                            placeholder="https://instagram.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            YouTube
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.youtube || ''}
                            onChange={(e) => updateSocialLinks({ youtube: e.target.value })}
                            placeholder="https://youtube.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            TikTok
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.tiktok || ''}
                            onChange={(e) => updateSocialLinks({ tiktok: e.target.value })}
                            placeholder="https://tiktok.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Twitter / X
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.twitter || ''}
                            onChange={(e) => updateSocialLinks({ twitter: e.target.value })}
                            placeholder="https://twitter.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            WhatsApp
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.whatsapp || ''}
                            onChange={(e) => updateSocialLinks({ whatsapp: e.target.value })}
                            placeholder="https://wa.me/351..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Review Platforms */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Plataformas de Avaliações</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Reviews
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.googleReviews || ''}
                            onChange={(e) => updateSocialLinks({ googleReviews: e.target.value })}
                            placeholder="https://g.page/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            TripAdvisor
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.tripadvisor || ''}
                            onChange={(e) => updateSocialLinks({ tripadvisor: e.target.value })}
                            placeholder="https://tripadvisor.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Airbnb
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.airbnb || ''}
                            onChange={(e) => updateSocialLinks({ airbnb: e.target.value })}
                            placeholder="https://airbnb.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Booking.com
                          </label>
                          <input
                            type="url"
                            value={content.socialLinks?.booking || ''}
                            onChange={(e) => updateSocialLinks({ booking: e.target.value })}
                            placeholder="https://booking.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Legal */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Obrigatório por Lei</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Livro de Reclamações
                        </label>
                        <input
                          type="url"
                          value={content.socialLinks?.livroReclamacoes || ''}
                          onChange={(e) => updateSocialLinks({ livroReclamacoes: e.target.value })}
                          placeholder="https://www.livroreclamacoes.pt/Inicio/"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Link obrigatório por lei para o Livro de Reclamações Eletrónico</p>
                      </div>
                    </div>

                    <button
                      onClick={showSaved}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Guardar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* SEO & Analytics Section */}
              {activeSection === 'seo' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                    SEO & Analytics
                  </h2>

                  <div className="space-y-6">
                    {/* Meta Tags */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Meta Tags (SEO)
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título do Site
                          </label>
                          <input
                            type="text"
                            value={content.seo?.siteTitle || ''}
                            onChange={(e) => updateSeo({ siteTitle: e.target.value })}
                            placeholder="Albufeira Holidays - Apartamentos de Férias"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Aparece no separador do browser e nos resultados do Google</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição do Site
                          </label>
                          <textarea
                            value={content.seo?.siteDescription || ''}
                            onChange={(e) => updateSeo({ siteDescription: e.target.value })}
                            rows={3}
                            placeholder="Apartamentos de férias de luxo em Albufeira..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Descrição que aparece nos resultados do Google (máx. 160 caracteres)</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Palavras-chave
                          </label>
                          <input
                            type="text"
                            value={content.seo?.keywords || ''}
                            onChange={(e) => updateSeo({ keywords: e.target.value })}
                            placeholder="albufeira, algarve, apartamentos, férias..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Separadas por vírgula</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Imagem de Partilha (Open Graph)
                          </label>
                          <input
                            type="url"
                            value={content.seo?.ogImage || ''}
                            onChange={(e) => updateSeo({ ogImage: e.target.value })}
                            placeholder="https://exemplo.com/imagem-partilha.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Imagem que aparece ao partilhar o site nas redes sociais (1200x630px recomendado)</p>
                        </div>
                      </div>
                    </div>

                    {/* Google Analytics & Ads */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Google Analytics & Ads
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Analytics ID (GA4)
                          </label>
                          <input
                            type="text"
                            value={content.seo?.googleAnalyticsId || ''}
                            onChange={(e) => updateSeo({ googleAnalyticsId: e.target.value })}
                            placeholder="G-XXXXXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                          <p className="text-xs text-gray-500 mt-1">ID de medição do Google Analytics 4</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Ads ID
                          </label>
                          <input
                            type="text"
                            value={content.seo?.googleAdsId || ''}
                            onChange={(e) => updateSeo({ googleAdsId: e.target.value })}
                            placeholder="AW-XXXXXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                          <p className="text-xs text-gray-500 mt-1">ID da conta Google Ads para remarketing</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Ads Conversion ID
                          </label>
                          <input
                            type="text"
                            value={content.seo?.googleAdsConversionId || ''}
                            onChange={(e) => updateSeo({ googleAdsConversionId: e.target.value })}
                            placeholder="AW-XXXXXXXXXX/XXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                          <p className="text-xs text-gray-500 mt-1">ID de conversão para rastrear reservas</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Tag Manager ID
                          </label>
                          <input
                            type="text"
                            value={content.seo?.googleTagManagerId || ''}
                            onChange={(e) => updateSeo({ googleTagManagerId: e.target.value })}
                            placeholder="GTM-XXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                          <p className="text-xs text-gray-500 mt-1">Para gestão centralizada de tags</p>
                        </div>
                      </div>
                    </div>

                    {/* Facebook Pixel */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Facebook Pixel</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook Pixel ID
                        </label>
                        <input
                          type="text"
                          value={content.seo?.facebookPixelId || ''}
                          onChange={(e) => updateSeo({ facebookPixelId: e.target.value })}
                          placeholder="XXXXXXXXXXXXXXXX"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Para rastrear conversões do Facebook/Instagram Ads</p>
                      </div>
                    </div>

                    {/* Site Verification */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Verificação de Motores de Busca</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Search Console
                          </label>
                          <input
                            type="text"
                            value={content.seo?.googleSiteVerification || ''}
                            onChange={(e) => updateSeo({ googleSiteVerification: e.target.value })}
                            placeholder="Código de verificação do Google"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bing Webmaster Tools
                          </label>
                          <input
                            type="text"
                            value={content.seo?.bingSiteVerification || ''}
                            onChange={(e) => updateSeo({ bingSiteVerification: e.target.value })}
                            placeholder="Código de verificação do Bing"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Robots.txt */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Robots.txt</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Conteúdo do robots.txt
                        </label>
                        <textarea
                          value={content.seo?.robotsTxt || ''}
                          onChange={(e) => updateSeo({ robotsTxt: e.target.value })}
                          rows={5}
                          placeholder="User-agent: *&#10;Allow: /"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-mono text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">Instruções para os motores de busca</p>
                      </div>
                    </div>

                    <button
                      onClick={showSaved}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Guardar Alterações
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save notification */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Save className="h-5 w-5" />
          Alterações guardadas!
        </div>
      )}
    </div>
  );
}
