import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Building2, MapPin, Car } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../i18n/simple';
import { cn } from '../../lib/utils';
import { SimpleLanguageSelector } from '../SimpleLanguageSelector';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

export function Header() {
  const { content } = useStore();
  const { currentLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = [
    { name: (() => {
      const currentLang = currentLanguage || 'pt';
      if (currentLang === 'en') return 'Home';
      if (currentLang === 'fr') return 'Accueil';
      if (currentLang === 'de') return 'Startseite';
      return 'Início';
    })(), href: '/', icon: Home },
    ...content.apartments.map((apt) => ({
      name: apt.name, // Não traduzir nomes dos apartamentos
      href: `/apartamento/${apt.slug}`,
      icon: Building2,
    })),
    { name: (() => {
      const currentLang = currentLanguage || 'pt';
      if (currentLang === 'en') return 'Algarve';
      if (currentLang === 'fr') return 'Algarve';
      if (currentLang === 'de') return 'Algarve';
      return 'Algarve';
    })(), href: '/algarve', icon: MapPin },
    { name: (() => {
      const currentLang = currentLanguage || 'pt';
      if (currentLang === 'en') return 'Rent a Car';
      if (currentLang === 'fr') return 'Rent a Car';
      if (currentLang === 'de') return 'Rent a Car';
      return 'Rent a Car';
    })(), href: '/rent-a-car', icon: Car },
    { name: (() => {
      const currentLang = currentLanguage || 'pt';
      if (currentLang === 'en') return 'Contact';
      if (currentLang === 'fr') return 'Contact';
      if (currentLang === 'de') return 'Kontakt';
      return 'Contacto';
    })(), href: '/contacto', icon: Phone },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-md' 
        : 'bg-white/80 backdrop-blur-sm'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo-symbol.png" 
              alt="Albufeira Holidays" 
              className="h-12 md:h-14 w-auto rounded-lg transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:text-white hover:bg-primary-600"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    isActive(item.href)
                      ? 'bg-gray-100 text-gray-700'
                      : 'text-gray-600 hover:text-white hover:bg-primary-600'
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
            <SimpleLanguageSelector />
            <a
              href={content.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-primary text-sm py-2 px-6"
            >
              {(() => {
                const currentLang = currentLanguage || 'pt';
                if (currentLang === 'en') return 'Book';
                if (currentLang === 'fr') return 'Réserver';
                if (currentLang === 'de') return 'Buchen';
                return 'Reservar';
              })()}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-gray-600 hover:text-white hover:bg-primary-600"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-700'
                        : 'text-gray-600 hover:text-white hover:bg-primary-600'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              ))}
              <a
                href={content.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary text-center"
              >
                {(() => {
                  const currentLang = currentLanguage || 'pt';
                  if (currentLang === 'en') return 'Book';
                  if (currentLang === 'fr') return 'Réserver';
                  if (currentLang === 'de') return 'Buchen';
                  return 'Reservar';
                })()}
              </a>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <SimpleLanguageSelector />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
