import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Footer() {
  const { content } = useStore();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-symbol.png" 
                alt="Albufeira Holidays" 
                className="h-10 w-auto transition-transform hover:scale-105"
              />
            </Link>
            
            {/* Company Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold">COSMIC POWER BUSINESS, LDA</p>
              <p>NIF: 505 957 086</p>
              <p>Capital Social 10.000 Euros</p>
              <p>Albufeira | Algarve</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-4">
              {content.socialLinks?.facebook && (
                <a
                  href={content.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 transition-colors"
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
                  className="text-orange-500 hover:text-orange-600 transition-colors"
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
                  className="text-orange-500 hover:text-orange-600 transition-colors"
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
                  className="text-orange-500 hover:text-orange-600 transition-colors"
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
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-sm">{content.contact.phone}</span>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-sm">{content.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{content.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Livro de Reclamações */}
          <div className="flex flex-col items-center justify-center">
            {content.socialLinks?.livroReclamacoes && (
              <a
                href={content.socialLinks.livroReclamacoes}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                title="Livro de Reclamações"
              >
                <div className="text-center">
                  <span className="text-xs text-gray-500 block">LIVRO DE</span>
                  <span className="text-sm font-semibold text-gray-700">RECLAMAÇÕES</span>
                </div>
                <img 
                  src="/livro-reclamacoes.png" 
                  alt="Livro de Reclamações" 
                  className="h-6 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </a>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-orange-500 mt-8 pt-6 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} {content.contact.companyName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white hover:text-orange-100 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-white hover:text-orange-100 text-sm transition-colors">
              Termos de Uso
            </a>
            <Link
              to="/admin"
              className="text-white hover:text-orange-100 text-sm transition-colors"
            >
              Área Reservada
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
