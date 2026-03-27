import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../i18n/simple';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function Footer() {
  const { content } = useStore();
  const { currentLanguage } = useTranslation();

  return (
    <>
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Logo centered on mobile */}
        <div className="flex justify-center mb-6 md:hidden">
          <Link to="/">
            <img 
              src="/logo-symbol-small.png" 
              alt="Albufeira Holidays" 
              width="72"
              height="72"
              className="h-[72px] w-auto transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Mobile: 2 columns for Company + Contact */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {/* Brand - hidden on mobile, shown on desktop */}
          <div className="hidden md:block md:col-span-1">
            <Link to="/" className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/logo-symbol-small.png" 
                alt="Albufeira Holidays" 
                width="40"
                height="40"
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
          </div>

          {/* Company Info - Mobile only */}
          <div className="md:hidden text-center">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Empresa</h3>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium">COSMIC POWER BUSINESS</p>
              <p>NIF: 505 957 086</p>
              <p>Albufeira | Algarve</p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-center">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base md:mb-4">
              {(() => {
                const currentLang = currentLanguage || 'pt';
                if (currentLang === 'en') return 'Contact';
                if (currentLang === 'fr') return 'Contact';
                if (currentLang === 'de') return 'Kontakt';
                return 'Contacto';
              })()}
            </h3>
            <div className="space-y-1 md:space-y-3">
              <p className="text-sm text-gray-600 font-medium md:hidden">ALBUFEIRA HOLIDAYS</p>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
                  <span className="text-sm md:text-sm">{content.contact.phone}</span>
                </a>
                <a
                  href="https://whatsa.me/351962104415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </div>
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
                <span className="text-sm md:text-sm truncate">{content.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Social Links - Desktop only in grid */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-900 mb-4">
              {(() => {
                const currentLang = currentLanguage || 'pt';
                if (currentLang === 'en') return 'Social Networks';
                if (currentLang === 'fr') return 'Réseaux Sociaux';
                if (currentLang === 'de') return 'Soziale Netzwerke';
                return 'Redes Sociais';
              })()}
            </h3>
            <div className="flex justify-center gap-3 mb-6">
              {content.socialLinks?.facebook && (
                <a href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 transition-colors" title="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.instagram && (
                <a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 transition-colors" title="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {content.socialLinks?.whatsapp && (
                <a href={content.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 transition-colors" title="WhatsApp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
            
            {/* Livro de Reclamações */}
            {content.socialLinks?.livroReclamacoes && (
              <div className="flex justify-center">
                <a
                  href={content.socialLinks.livroReclamacoes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                  title="Livro de Reclamações"
                >
                  <img src="/livro-reclamacoes.png" alt="Livro de Reclamações" width="24" height="24" className="h-6 w-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="text-left">
                    <span className="text-xs text-gray-500 block">LIVRO DE</span>
                    <span className="text-sm font-semibold text-gray-700">RECLAMAÇÕES</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Social + Livro de Reclamações row */}
        <div className="flex md:hidden items-center justify-center gap-8 mt-6 pt-4 border-t border-gray-100">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {content.socialLinks?.facebook && (
              <a href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-orange-500" title="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {content.socialLinks?.instagram && (
              <a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-orange-500" title="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {content.socialLinks?.whatsapp && (
              <a href={content.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-orange-500" title="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
          </div>
          
          {/* Livro de Reclamações - compact */}
          {content.socialLinks?.livroReclamacoes && (
            <a
              href={content.socialLinks.livroReclamacoes}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs"
              title="Livro de Reclamações"
            >
              <img src="/livro-reclamacoes.png" alt="Livro de Reclamações" width="16" height="16" className="h-4 w-auto" />
              <span className="font-medium text-gray-700">Reclamações</span>
            </a>
          )}
        </div>
      </div>
    </footer>
    
    {/* Container Laranja com foto de fundo - Fora do footer */}
    <div className="relative pt-6 pb-6 flex flex-col md:flex-row justify-center items-center gap-4 px-4 overflow-hidden">
      {/* Imagem de fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/de6edaaft/image/upload/v1774623455/albufeira-holidays/footer/footer-background.jpg)'
        }}
      />
      {/* Overlay laranja */}
      <div className="absolute inset-0 bg-orange-500/90" />
      <p className="relative z-10 text-white text-sm text-center md:text-left">
        © {new Date().getFullYear()} {content.contact.companyName}. 
        {(() => {
          const currentLang = currentLanguage || 'pt';
          if (currentLang === 'en') return 'All rights reserved.';
          if (currentLang === 'fr') return 'Tous droits réservés.';
          if (currentLang === 'de') return 'Alle Rechte vorbehalten.';
          return 'Todos os direitos reservados.';
        })()}
      </p>
      <div className="relative z-10 flex items-center gap-4">
        <Link
          to="/politica-privacidade"
          className="text-white hover:text-orange-100 text-sm transition-colors"
        >
          {(() => {
            const currentLang = currentLanguage || 'pt';
            if (currentLang === 'en') return 'Privacy Policy';
            if (currentLang === 'fr') return 'Politique de Confidentialité';
            if (currentLang === 'de') return 'Datenschutzrichtlinie';
            return 'Política de Privacidade';
          })()}
        </Link>
        <Link
          to="/admin"
          className="text-white hover:text-orange-100 text-sm transition-colors"
        >
          {(() => {
            const currentLang = currentLanguage || 'pt';
            if (currentLang === 'en') return 'Reserved Area';
            if (currentLang === 'fr') return 'Zone Réservée';
            if (currentLang === 'de') return 'Geschützter Bereich';
            return 'Área Reservada';
          })()}
        </Link>
      </div>
    </div>
    </>
  );
}
