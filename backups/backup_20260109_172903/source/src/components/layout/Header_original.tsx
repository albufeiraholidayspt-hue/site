import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Building2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { content } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    ...content.apartments.map((apt) => ({
      name: apt.name,
      href: `/apartamento/${apt.slug}`,
      icon: Building2,
    })),
    { name: 'Contacto', href: '/contacto', icon: Phone },
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
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                )}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={content.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 btn-primary text-sm py-2 px-6"
            >
              Reservar
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
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <a
                href={content.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary text-center"
              >
                Reservar
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
