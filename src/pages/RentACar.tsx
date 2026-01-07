import { useEffect } from 'react';

export function RentACar() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // SEO
    document.title = 'Rent a Car - Aluguer de Carros | Albufeira Holidays';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Alugue um carro para explorar o Algarve. Serviço de rent a car com os melhores preços e condições.');
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <iframe
        src="https://auto-prudente.com"
        title="Rent a Car - Auto Prudente"
        className="w-full h-[calc(100vh-5rem)] border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
