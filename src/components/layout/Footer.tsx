import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Footer() {
  const { content } = useStore();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo-symbol.png" 
                alt="Albufeira Holidays" 
                className="h-12 w-auto brightness-0 invert transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Apartamentos de férias premium no coração de Albufeira com vista mar deslumbrante.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Apartamentos</h3>
            <div className="space-y-3">
              {content.apartments.map((apt) => (
                <Link
                  key={apt.id}
                  to={`/apartamento/${apt.slug}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm group"
                >
                  <span>{apt.name}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contacto</h3>
            <div className="space-y-4">
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-sm">{content.contact.phone}</span>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-sm">{content.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-sm leading-relaxed">{content.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6">Informação Legal</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>{content.contact.companyName}</p>
              <p>NIF: {content.contact.nif}</p>
              <p>Capital Social: 10.000€</p>
            </div>
            
            {/* Livro de Reclamações */}
            {content.socialLinks?.livroReclamacoes && (
              <a
                href={content.socialLinks.livroReclamacoes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-6 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                title="Livro de Reclamações"
              >
                <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
                <div className="text-left">
                  <span className="text-xs text-gray-400 block">LIVRO DE</span>
                  <span className="text-sm font-semibold text-red-500">RECLAMAÇÕES</span>
                </div>
              </a>
            )}
            
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 mt-4 text-xs text-gray-500 hover:text-primary-400 transition-colors"
            >
              <span>Área Reservada</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {content.contact.companyName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-400 text-sm transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
