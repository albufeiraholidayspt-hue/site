import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../i18n/simple';

export function Footer() {
  const { content } = useStore();
  const { currentLanguage } = useTranslation();

  return (
    <>
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center justify-center gap-3 mb-4">
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
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {(() => {
                const currentLang = currentLanguage || 'pt';
                if (currentLang === 'en') return 'Contact';
                if (currentLang === 'fr') return 'Contact';
                if (currentLang === 'de') return 'Kontakt';
                return 'Contacto';
              })()}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-sm">{content.contact.phone}</span>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center justify-center gap-3 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-sm">{content.contact.email}</span>
              </a>
              <div className="flex items-start justify-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{content.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
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
                  <img 
                    src="/livro-reclamacoes.png" 
                    alt="Livro de Reclamações" 
                    className="h-6 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="text-left">
                    <span className="text-xs text-gray-500 block">
                      {(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'COMPLAINTS';
                        if (currentLang === 'fr') return 'RÉCLAMATIONS';
                        if (currentLang === 'de') return 'BESCHWERDEN';
                        return 'LIVRO DE';
                      })()}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {(() => {
                        const currentLang = currentLanguage || 'pt';
                        if (currentLang === 'en') return 'BOOK';
                        if (currentLang === 'fr') return 'RECLAMAÇÕES';
                        if (currentLang === 'de') return 'BESCHWERDEBUCH';
                        return 'RECLAMAÇÕES';
                      })()}
                    </span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
    
    {/* Container Laranja - Fora do footer */}
    <div className="bg-orange-500 pt-6 pb-6 flex flex-col md:flex-row justify-center items-center gap-4">
      <p className="text-white text-sm">
        © {new Date().getFullYear()} {content.contact.companyName}. 
        {(() => {
          const currentLang = currentLanguage || 'pt';
          if (currentLang === 'en') return 'All rights reserved.';
          if (currentLang === 'fr') return 'Tous droits réservés.';
          if (currentLang === 'de') return 'Alle Rechte vorbehalten.';
          return 'Todos os direitos reservados.';
        })()}
      </p>
      <div className="flex items-center gap-4">
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
