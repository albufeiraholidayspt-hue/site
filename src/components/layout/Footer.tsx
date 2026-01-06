import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Footer() {
  const { content } = useStore();

  return (
    <footer className="bg-orange-50 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-symbol.png" 
                alt="Albufeira Holidays" 
                className="h-10 w-auto transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-orange-700 text-sm leading-relaxed">
              Apartamentos de férias premium no coração de Albufeira.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-orange-900 mb-4">Apartamentos</h3>
            <div className="space-y-2">
              {content.apartments.map((apt) => (
                <Link
                  key={apt.id}
                  to={`/apartamento/${apt.slug}`}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-500 transition-colors text-sm group"
                >
                  <span>{apt.name}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-orange-900 mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-orange-600 hover:text-orange-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm">{content.contact.phone}</span>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-3 text-orange-600 hover:text-orange-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm">{content.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-orange-600">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm leading-relaxed">{content.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-orange-900 mb-4">Redes Sociais</h3>
            <div className="flex gap-3 mb-6">
              {content.socialLinks?.facebook && (
                <a
                  href={content.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.instagram && (
                <a
                  href={content.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.twitter && (
                <a
                  href={content.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.youtube && (
                <a
                  href={content.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.whatsapp && (
                <a
                  href={content.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
            
            {/* Livro de Reclamações */}
            {content.socialLinks?.livroReclamacoes && (
              <a
                href={content.socialLinks.livroReclamacoes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 p-3 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors group"
                title="Livro de Reclamações"
              >
                <svg className="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
                <div className="text-left">
                  <span className="text-xs text-orange-600 block">LIVRO DE</span>
                  <span className="text-sm font-semibold text-orange-700">RECLAMAÇÕES</span>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-orange-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-orange-600 text-sm">
            © {new Date().getFullYear()} {content.contact.companyName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-orange-500 hover:text-orange-600 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-600 text-sm transition-colors">
              Termos de Uso
            </a>
            <Link
              to="/admin"
              className="text-orange-500 hover:text-orange-600 text-sm transition-colors"
            >
              Área Reservada
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
