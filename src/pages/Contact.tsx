import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Albufeira+Holidays/@37.0887034,-8.2517451,651m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd1acdb1d8016371:0xa3fefccb5c8fa1fd!8m2!3d37.0887034!4d-8.2491702!16s%2Fg%2F11fd4k61fn?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D';

export function Contact() {
  const { content } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (pode ser integrado com um serviço real depois)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Abrir email com os dados preenchidos
    const mailtoLink = `mailto:${content.contact.email}?subject=${encodeURIComponent(formData.subject || 'Contacto via Website')}&body=${encodeURIComponent(
      `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}\n\nMensagem:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contacte-nos
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Estamos disponíveis para responder a todas as suas questões sobre os nossos apartamentos.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Info Cards */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-6">Informações de Contacto</h2>
                
                <div className="space-y-5">
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Telefone</p>
                      <p className="font-medium text-gray-900">{content.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${content.contact.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                      <p className="font-medium text-gray-900 break-all">{content.contact.email}</p>
                    </div>
                  </a>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Morada</p>
                      <p className="font-medium text-gray-900">{content.contact.address}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-primary-600 mt-1 group-hover:underline">
                        Ver no Google Maps <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Horário</p>
                      <p className="font-medium text-gray-900">Seg - Dom: 9:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Dados da Empresa</h3>
                <p className="text-gray-600 text-sm">{content.contact.companyName}</p>
                <p className="text-gray-600 text-sm">NIF: {content.contact.nif}</p>
              </div>

              {/* Quick Booking */}
              <div className="bg-primary-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">Faça a sua Reserva</h3>
                <p className="text-primary-100 text-sm mb-4">
                  Verifique disponibilidade e reserve online.
                </p>
                <a
                  href={content.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors"
                >
                  Reservar Agora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-2">Envie-nos uma Mensagem</h2>
                <p className="text-gray-500 text-sm mb-6">Preencha o formulário e entraremos em contacto consigo brevemente.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mensagem Preparada!</h3>
                    <p className="text-gray-600 text-sm mb-4">O seu cliente de email foi aberto com a mensagem.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary-600 text-sm font-medium hover:underline"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                          placeholder="O seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                          placeholder="+351 000 000 000"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Assunto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                          placeholder="Assunto da mensagem"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
                        placeholder="Escreva a sua mensagem aqui..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          A enviar...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Map Embed */}
              <div className="mt-8 bg-white rounded-xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8!2d-8.2517451!3d37.0887034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1acdb1d8016371%3A0xa3fefccb5c8fa1fd!2sAlbufeira%20Holidays!5e0!3m2!1spt-PT!2spt!4v1704672000000!5m2!1spt-PT!2spt"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Albufeira Holidays"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
