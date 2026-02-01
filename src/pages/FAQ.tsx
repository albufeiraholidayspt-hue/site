import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What are the check-in and check-out times?",
      answer: "Check-in is from 3:00 PM (15:00) and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
    },
    {
      question: "How far are the apartments from the beach?",
      answer: "Our apartments are located in Albufeira old town, just steps away from Peneco Beach and Pescadores Beach. Santa Eulalia Beach is also within walking distance. You can reach the main beaches in 2-5 minutes on foot."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we offer private parking for our guests. Please inform us in advance if you need a parking space."
    },
    {
      question: "Are the apartments air-conditioned?",
      answer: "Yes, all our apartments are fully air-conditioned for your comfort during the hot Algarve summers."
    },
    {
      question: "Is WiFi included?",
      answer: "Yes, free high-speed WiFi is included in all apartments."
    },
    {
      question: "What is the minimum stay?",
      answer: "The minimum stay varies by season. During peak season (July-August), the minimum is typically 7 nights. During low season, we accept shorter stays of 2-3 nights. Please check our booking calendar for specific dates."
    },
    {
      question: "Are pets allowed?",
      answer: "Unfortunately, pets are not allowed in our apartments to maintain the highest standards of cleanliness for all guests."
    },
    {
      question: "What amenities are included in the apartments?",
      answer: "All apartments are fully equipped with air-conditioning, free WiFi, fully equipped kitchen with dishwasher, washing machine, flat-screen TV, bed linen, towels, and household amenities. Some apartments also feature balconies or terraces with stunning sea views."
    },
    {
      question: "How do I get to the apartments from Faro Airport?",
      answer: "Faro Airport is approximately 45 km away (30-40 minutes by car). You can take a taxi, rent a car, or use our transfer service (available upon request). We can also provide detailed directions if you're driving."
    },
    {
      question: "Are there restaurants and bars nearby?",
      answer: "Yes! Our apartments are located in the heart of Albufeira old town, surrounded by numerous restaurants, bars, cafes, and shops. The lively nightlife area is within walking distance."
    },
    {
      question: "Can I cancel my reservation?",
      answer: "Cancellation policies vary depending on the rate and season. Please refer to your booking confirmation for specific cancellation terms. We recommend purchasing travel insurance for added protection."
    },
    {
      question: "Is there a swimming pool?",
      answer: "Some of our apartment buildings feature shared swimming pools. Please check the specific apartment details when booking."
    },
    {
      question: "What attractions are nearby?",
      answer: "Albufeira offers beautiful beaches with crystalline waters, the historic old town with whitewashed houses and cobblestone streets, water sports, boat tours, the famous Strip nightlife area, golf courses, and the stunning Cliff Walk. We're also close to Zoomarine, water parks, and other Algarve attractions."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we can arrange airport transfers from Faro Airport to our apartments. Please contact us in advance to book this service."
    },
    {
      question: "Is there a 24-hour service?",
      answer: "We provide 24-hour emergency contact service for our guests. For non-urgent matters, our office hours are 9:00 AM to 6:00 PM."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Albufeira Holidays</title>
        <meta name="description" content="Find answers to frequently asked questions about our beachfront vacation rentals in Albufeira. Check-in times, amenities, parking, WiFi, and more." />
        <meta name="keywords" content="albufeira apartments faq, vacation rental questions, check-in times, parking albufeira, wifi included, pet policy, cancellation policy, airport transfer" />
        <link rel="canonical" href="https://albufeiraholidays.pt/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Help Center</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Everything you need to know about our beachfront vacation rentals in Albufeira
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Our team is here to help! Contact us and we'll get back to you as soon as possible.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
