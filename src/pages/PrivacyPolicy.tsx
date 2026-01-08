import { Shield, Cookie, UserCheck } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              A sua privacidade é importante para nós. Conheça como protegemos e utilizamos os seus dados.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            
            {/* Introduction */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  A sua privacidade é importante para nós. É política da Albufeira Holidays respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Albufeira Holidays e outros sites que possuímos e operamos. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado. Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como o acesso, divulgação, cópia, uso ou modificação não autorizadas.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respetivas políticas de privacidade. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
                </p>
              </div>
            </div>

            {/* Cookies Policy */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Política de Cookies</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">O que são cookies?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar a sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Como usamos os cookies?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Para desativar cookies você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cookies de Terceiros</h3>
                <p className="text-gray-600 leading-relaxed">
                  Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics. As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  À medida que apresentamos um serviço, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente solicitam informações e, portanto, esse é o tipo de dados que esses cookies rastrearão. Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analisar nossos custos de publicidade e para garantir o melhor preço possível.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você. Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense. Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que seja fornecido os anúncios mais relevantes sempre que possível, rastreado anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
                </p>
              </div>
            </div>

            {/* User Commitment */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Compromisso do Usuário</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Albufeira Holidays oferece no site e com caráter enunciativo, mas não limitativo:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">A</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Não se envolver em atividades que sejam ilegais ou contrárias à boa-fé e à ordem pública;
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">B</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">C</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Albufeira Holidays, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-6 md:p-8">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                </p>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Esta política é efetiva a partir de Novembro/2021.</strong>
                  </p>
                </div>

                <div className="mt-6 p-6 bg-primary-50 rounded-lg border border-primary-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Informações da Empresa</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>COSMIC POWER BUSINESS, LDA</strong></p>
                    <p>TLM: <a href="tel:+351962104415" className="text-primary-600 hover:underline">+351 962 104 415</a></p>
                    <p>Estrada de Santa Eulália, Edf. Ondas do Mar Loja F,<br />8200-269 Albufeira | Algarve</p>
                    <p>NIF: 505 957 086</p>
                    <p>Capital Social 10.000 Euros</p>
                    <p>Albufeira | Algarve</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-primary-100 flex gap-4 text-sm">
                    <a href="/contacto" className="text-primary-600 hover:underline">Contacto</a>
                    <a href="/politica-privacidade" className="text-primary-600 hover:underline">Política de Privacidade</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
