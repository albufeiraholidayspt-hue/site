import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Contact() {
  const { content } = useStore();

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Estamos aqui para ajudar</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contacte<span className="text-gradient">-nos</span>
            </h1>
            <div className="accent-line mx-auto my-6" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Estamos disponíveis para responder a todas as suas questões sobre os nossos apartamentos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="card-modern p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
                  Informações de Contacto
                </h2>

                <div className="space-y-6">
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 text-gray-600 hover:text-primary-600 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p className="font-semibold text-gray-900">{content.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${content.contact.email}`}
                    className="flex items-center gap-4 text-gray-600 hover:text-primary-600 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{content.contact.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 text-gray-600">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Morada</p>
                      <p className="font-semibold text-gray-900">{content.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-semibold text-gray-900">Seg - Dom: 9:00 - 20:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Dados da Empresa</h3>
                  <p className="text-gray-600 text-sm">{content.contact.companyName}</p>
                  <p className="text-gray-600 text-sm">NIF: {content.contact.nif}</p>
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="space-y-6">
              <div className="card-modern p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Faça a sua Reserva
                </h2>
                <div className="accent-line mb-6" />
                <p className="text-gray-600 mb-8">
                  Utilize o nosso sistema de reservas online para verificar disponibilidade e reservar o seu apartamento.
                </p>
                <a
                  href={content.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  Verificar Disponibilidade
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              {/* Map placeholder */}
              <div className="card-modern h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary-600" />
                  </div>
                  <p className="text-gray-900 font-semibold">Albufeira</p>
                  <p className="text-gray-500 text-sm">Algarve, Portugal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
