import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import emailjs from '@emailjs/browser';
import { useTranslation } from '../i18n/simple';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'albufeiraholidays.pt';
const EMAILJS_TEMPLATE_ID = 'template_wlkwop7';
const EMAILJS_PUBLIC_KEY = '_NbJOpDuu9ruCLQL6';

export function Contact() {
  const { content } = useStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          phone: formData.phone || 'Não fornecido',
          subject: formData.subject || 'Contacto via Website',
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: unknown) {
      console.error('Erro ao enviar email:', error);
      if (error && typeof error === 'object' && 'text' in error) {
        console.error('Detalhes do erro:', (error as { text: string }).text);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-orange-500 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-orange-100 max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Contact Form - First on mobile */}
            <div className="lg:col-span-2 flex flex-col order-1 lg:order-2">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm flex-1 flex flex-col">
                <h2 className="font-semibold text-gray-900 mb-2">{t('contact.sendUsMessage')}</h2>
                <p className="text-gray-500 text-sm mb-6">{t('contact.fillForm')}</p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.messageSent')}</h3>
                    <p className="text-gray-600 text-sm mb-4">{t('contact.messageReceived')}</p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-primary-600 text-sm font-medium hover:underline"
                    >
                      {t('contact.sendAnother')}
                    </button>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.sendError')}</h3>
                    <p className="text-gray-600 text-sm mb-4">{t('contact.errorOccurred')}</p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-primary-600 text-sm font-medium hover:underline"
                    >
                      {t('contact.tryAgain')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact.name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact.email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.message')} *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t('contact.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {t('contact.sendMessage')}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info - Second on mobile */}
            <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
              {/* Info Cards */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-6">{t('contact.contactInfo')}</h2>
                
                <div className="space-y-5">
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.phone')}</p>
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
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.email')}</p>
                      <p className="font-medium text-gray-900 break-all">{content.contact.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{t('contact.address')}</p>
                      <p className="font-medium text-gray-900">{content.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed - Small */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8!2d-8.2517451!3d37.0887034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1acdb1d8016371%3A0xa3fefccb5c8fa1fd!2sAlbufeira%20Holidays!5e0!3m2!1spt-PT!2spt!4v1704672000000!5m2!1spt-PT!2spt"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Albufeira Holidays"
                />
              </div>

              {/* Quick Booking */}
              <div className="bg-primary-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">{t('contact.makeReservation')}</h3>
                <p className="text-primary-100 text-sm mb-4">
                  {t('contact.checkAvailability')}
                </p>
                <a
                  href={content.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors"
                >
                  {t('apartments.bookNow')}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
