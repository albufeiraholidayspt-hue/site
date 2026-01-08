import { Shield, Cookie, UserCheck } from 'lucide-react';
import { useTranslation } from '../i18n/simple';

export function PrivacyPolicy() {
  const { currentLanguage } = useTranslation();

  // Privacy Policy translations
  const privacyTexts: Record<string, Record<string, string>> = {
    title: {
      pt: 'Política de Privacidade',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      de: 'Datenschutzrichtlinie',
    },
    subtitle: {
      pt: 'A sua privacidade é importante para nós. Conheça como protegemos e utilizamos os seus dados.',
      en: 'Your privacy is important to us. Learn how we protect and use your data.',
      fr: 'Votre vie privée est importante pour nous. Découvrez comment nous protégeons et utilisons vos données.',
      de: 'Ihre Privatsphäre ist uns wichtig. Erfahren Sie, wie wir Ihre Daten schützen und verwenden.',
    },
    intro1: {
      pt: 'A sua privacidade é importante para nós. É política da Albufeira Holidays respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Albufeira Holidays e outros sites que possuímos e operamos. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.',
      en: 'Your privacy is important to us. It is Albufeira Holidays\' policy to respect your privacy regarding any information we may collect on the Albufeira Holidays website and other sites we own and operate. We only ask for personal information when we truly need it to provide you with a service.',
      fr: 'Votre vie privée est importante pour nous. La politique d\'Albufeira Holidays est de respecter votre vie privée concernant toute information que nous pouvons collecter sur le site Albufeira Holidays et autres sites que nous possédons et exploitons. Nous ne demandons des informations personnelles que lorsque nous en avons vraiment besoin pour vous fournir un service.',
      de: 'Ihre Privatsphäre ist uns wichtig. Es ist die Richtlinie von Albufeira Holidays, Ihre Privatsphäre in Bezug auf alle Informationen zu respektieren, die wir auf der Albufeira Holidays-Website und anderen von uns betriebenen Websites sammeln können. Wir fragen nur nach persönlichen Informationen, wenn wir sie wirklich benötigen, um Ihnen einen Service zu bieten.',
    },
    intro2: {
      pt: 'Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado. Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como o acesso, divulgação, cópia, uso ou modificação não autorizadas.',
      en: 'We do so by fair and legal means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used. We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.',
      fr: 'Nous le faisons par des moyens justes et légaux, avec votre connaissance et votre consentement. Nous vous informons également pourquoi nous collectons ces informations et comment elles seront utilisées. Nous ne conservons les informations collectées que le temps nécessaire pour vous fournir le service demandé. Les données que nous stockons sont protégées par des moyens commercialement acceptables pour éviter les pertes et les vols, ainsi que l\'accès, la divulgation, la copie, l\'utilisation ou la modification non autorisés.',
      de: 'Wir tun dies auf faire und legale Weise, mit Ihrem Wissen und Ihrer Zustimmung. Wir informieren Sie auch, warum wir sammeln und wie es verwendet wird. Wir behalten gesammelte Informationen nur so lange, wie es notwendig ist, um Ihnen den angeforderten Service zu bieten. Die Daten, die wir speichern, schützen wir mit kommerziell akzeptablen Mitteln, um Verlust und Diebstahl sowie unbefugten Zugriff, Offenlegung, Kopieren, Verwendung oder Änderung zu verhindern.',
    },
    intro3: {
      pt: 'Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.',
      en: 'We don\'t share any personally identifying information publicly or with third-parties, except when required to by law.',
      fr: 'Nous ne partageons aucune information personnelle identifiable publiquement ou avec des tiers, sauf lorsque la loi l\'exige.',
      de: 'Wir teilen keine persönlich identifizierenden Informationen öffentlich oder mit Dritten, außer wenn dies gesetzlich vorgeschrieben ist.',
    },
    intro4: {
      pt: 'O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respetivas políticas de privacidade. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.',
      en: 'Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility for their respective privacy policies. You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.',
      fr: 'Notre site peut contenir des liens vers des sites externes qui ne sont pas exploités par nous. Veuillez noter que nous n\'avons aucun contrôle sur le contenu et les pratiques de ces sites et ne pouvons accepter la responsabilité de leurs politiques de confidentialité respectives. Vous êtes libre de refuser notre demande d\'informations personnelles, étant entendu que nous pourrions ne pas être en mesure de vous fournir certains des services souhaités.',
      de: 'Unsere Website kann Links zu externen Websites enthalten, die nicht von uns betrieben werden. Bitte beachten Sie, dass wir keine Kontrolle über den Inhalt und die Praktiken dieser Websites haben und keine Verantwortung für deren jeweilige Datenschutzrichtlinien übernehmen können. Sie können unsere Anfrage nach Ihren persönlichen Daten ablehnen, mit dem Verständnis, dass wir Ihnen möglicherweise einige der gewünschten Dienste nicht anbieten können.',
    },
    intro5: {
      pt: 'O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.',
      en: 'Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.',
      fr: 'Votre utilisation continue de notre site sera considérée comme une acceptation de nos pratiques concernant la confidentialité et les informations personnelles. Si vous avez des questions sur la façon dont nous traitons les données des utilisateurs et les informations personnelles, n\'hésitez pas à nous contacter.',
      de: 'Ihre fortgesetzte Nutzung unserer Website wird als Akzeptanz unserer Praktiken in Bezug auf Datenschutz und persönliche Informationen angesehen. Wenn Sie Fragen dazu haben, wie wir Benutzerdaten und persönliche Informationen behandeln, kontaktieren Sie uns bitte.',
    },
    cookiesTitle: {
      pt: 'Política de Cookies',
      en: 'Cookies Policy',
      fr: 'Politique de Cookies',
      de: 'Cookie-Richtlinie',
    },
    whatAreCookies: {
      pt: 'O que são cookies?',
      en: 'What are cookies?',
      fr: 'Que sont les cookies?',
      de: 'Was sind Cookies?',
    },
    whatAreCookiesText: {
      pt: 'Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar a sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou \'quebrar\' certos elementos da funcionalidade do site.',
      en: 'As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however this may downgrade or \'break\' certain elements of the site\'s functionality.',
      fr: 'Comme c\'est la pratique courante avec presque tous les sites Web professionnels, ce site utilise des cookies, qui sont de petits fichiers téléchargés sur votre ordinateur, pour améliorer votre expérience. Cette page décrit quelles informations ils collectent, comment nous les utilisons et pourquoi nous devons parfois stocker ces cookies. Nous partagerons également comment vous pouvez empêcher le stockage de ces cookies, mais cela peut dégrader ou \'casser\' certains éléments de la fonctionnalité du site.',
      de: 'Wie bei fast allen professionellen Websites üblich, verwendet diese Website Cookies, kleine Dateien, die auf Ihren Computer heruntergeladen werden, um Ihre Erfahrung zu verbessern. Diese Seite beschreibt, welche Informationen sie sammeln, wie wir sie verwenden und warum wir diese Cookies manchmal speichern müssen. Wir werden auch mitteilen, wie Sie verhindern können, dass diese Cookies gespeichert werden, dies kann jedoch bestimmte Elemente der Website-Funktionalität herabstufen oder \'brechen\'.',
    },
    userCommitment: {
      pt: 'Compromisso do Usuário',
      en: 'User Commitment',
      fr: 'Engagement de l\'Utilisateur',
      de: 'Benutzerverplichtung',
    },
    consumerInfo: {
      pt: 'Informação ao Consumidor',
      en: 'Consumer Information',
      fr: 'Information au Consommateur',
      de: 'Verbraucherinformation',
    },
    companyInfo: {
      pt: 'Informações da Empresa',
      en: 'Company Information',
      fr: 'Informations sur l\'Entreprise',
      de: 'Unternehmensinformationen',
    },
    contact: {
      pt: 'Contacto',
      en: 'Contact',
      fr: 'Contact',
      de: 'Kontakt',
    },
    privacyPolicy: {
      pt: 'Política de Privacidade',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      de: 'Datenschutzrichtlinie',
    },
    // Cookies section
    howWeUseCookies: {
      pt: 'Como usamos os cookies?',
      en: 'How do we use cookies?',
      fr: 'Comment utilisons-nous les cookies?',
      de: 'Wie verwenden wir Cookies?',
    },
    howWeUseCookiesText1: {
      pt: 'Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.',
      en: 'We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.',
      fr: 'Nous utilisons des cookies pour diverses raisons détaillées ci-dessous. Malheureusement, dans la plupart des cas, il n\'existe pas d\'options standard de l\'industrie pour désactiver les cookies sans désactiver complètement les fonctionnalités qu\'ils ajoutent à ce site. Il est recommandé de laisser tous les cookies si vous n\'êtes pas sûr d\'en avoir besoin ou non.',
      de: 'Wir verwenden Cookies aus verschiedenen Gründen, die unten aufgeführt sind. Leider gibt es in den meisten Fällen keine Industriestandardoptionen zum Deaktivieren von Cookies, ohne die Funktionalität vollständig zu deaktivieren. Es wird empfohlen, alle Cookies aktiviert zu lassen, wenn Sie sich nicht sicher sind, ob Sie sie benötigen.',
    },
    howWeUseCookiesText2: {
      pt: 'Para desativar cookies você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.',
      en: 'You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.',
      fr: 'Vous pouvez empêcher la configuration des cookies en ajustant les paramètres de votre navigateur. Sachez que la désactivation des cookies affectera la fonctionnalité de ce site et de nombreux autres sites que vous visitez. La désactivation des cookies entraînera généralement la désactivation de certaines fonctionnalités de ce site.',
      de: 'Sie können das Setzen von Cookies verhindern, indem Sie die Einstellungen in Ihrem Browser anpassen. Beachten Sie, dass das Deaktivieren von Cookies die Funktionalität dieser und vieler anderer Websites beeinträchtigt. Das Deaktivieren von Cookies führt normalerweise auch zur Deaktivierung bestimmter Funktionen dieser Website.',
    },
    thirdPartyCookies: {
      pt: 'Cookies de Terceiros',
      en: 'Third Party Cookies',
      fr: 'Cookies Tiers',
      de: 'Cookies von Drittanbietern',
    },
    thirdPartyCookiesText1: {
      pt: 'Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.',
      en: 'In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.',
      fr: 'Dans certains cas particuliers, nous utilisons également des cookies fournis par des tiers de confiance. La section suivante détaille les cookies tiers que vous pourriez rencontrer sur ce site.',
      de: 'In einigen besonderen Fällen verwenden wir auch Cookies von vertrauenswürdigen Dritten. Der folgende Abschnitt beschreibt, welche Cookies von Drittanbietern Sie auf dieser Website finden können.',
    },
    thirdPartyCookiesText2: {
      pt: 'Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.',
      en: 'This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.',
      fr: 'Ce site utilise Google Analytics, l\'une des solutions d\'analyse les plus répandues et les plus fiables sur le web, pour nous aider à comprendre comment vous utilisez le site et comment nous pouvons améliorer votre expérience. Ces cookies peuvent suivre des éléments tels que le temps que vous passez sur le site et les pages que vous visitez.',
      de: 'Diese Website verwendet Google Analytics, eine der am weitesten verbreiteten und vertrauenswürdigsten Analyselösungen im Web, um uns zu helfen zu verstehen, wie Sie die Website nutzen und wie wir Ihre Erfahrung verbessern können. Diese Cookies können Dinge wie die Zeit, die Sie auf der Website verbringen, und die besuchten Seiten verfolgen.',
    },
    consumerInfoText: {
      pt: 'Ao abrigo do disposto no artigo 18.º da Lei n.º 144/2015, em caso de litígio o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de consumo:',
      en: 'Under the provisions of Article 18 of Law No. 144/2015, in case of dispute the consumer may resort to an Alternative Dispute Resolution Entity:',
      fr: 'En vertu des dispositions de l\'article 18 de la loi n° 144/2015, en cas de litige, le consommateur peut recourir à une entité de résolution alternative des litiges:',
      de: 'Gemäß Artikel 18 des Gesetzes Nr. 144/2015 kann der Verbraucher im Streitfall eine alternative Streitbeilegungsstelle anrufen:',
    },
    userCommitmentText: {
      pt: 'O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Albufeira Holidays oferece no site e com caráter enunciativo, mas não limitativo:',
      en: 'The user agrees to make appropriate use of the content and information that Albufeira Holidays offers on the site, including but not limited to:',
      fr: 'L\'utilisateur s\'engage à faire un usage approprié du contenu et des informations qu\'Albufeira Holidays propose sur le site, y compris mais sans s\'y limiter:',
      de: 'Der Benutzer verpflichtet sich, die Inhalte und Informationen, die Albufeira Holidays auf der Website anbietet, angemessen zu nutzen, einschließlich, aber nicht beschränkt auf:',
    },
    commitmentA: {
      pt: 'Não se envolver em atividades que sejam ilegais ou contrárias à boa-fé e à ordem pública;',
      en: 'Not to engage in activities that are illegal or contrary to good faith and public order;',
      fr: 'Ne pas s\'engager dans des activités illégales ou contraires à la bonne foi et à l\'ordre public;',
      de: 'Sich nicht an Aktivitäten zu beteiligen, die illegal oder gegen Treu und Glauben und die öffentliche Ordnung verstoßen;',
    },
    commitmentB: {
      pt: 'Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;',
      en: 'Not to spread propaganda or content of a racist, xenophobic nature, any type of illegal pornography, apology for terrorism or against human rights;',
      fr: 'Ne pas diffuser de propagande ou de contenu de nature raciste, xénophobe, tout type de pornographie illégale, apologie du terrorisme ou contre les droits de l\'homme;',
      de: 'Keine Propaganda oder Inhalte rassistischer, fremdenfeindlicher Natur, illegale Pornografie, Terrorismusverherrlichung oder gegen Menschenrechte zu verbreiten;',
    },
    commitmentC: {
      pt: 'Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Albufeira Holidays, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.',
      en: 'Not to cause damage to the physical (hardware) and logical (software) systems of Albufeira Holidays, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems capable of causing the aforementioned damage.',
      fr: 'Ne pas causer de dommages aux systèmes physiques (matériels) et logiques (logiciels) d\'Albufeira Holidays, de ses fournisseurs ou de tiers, pour introduire ou diffuser des virus informatiques ou tout autre système matériel ou logiciel capable de causer les dommages susmentionnés.',
      de: 'Den physischen (Hardware) und logischen (Software) Systemen von Albufeira Holidays, seinen Lieferanten oder Dritten keinen Schaden zuzufügen, keine Computerviren oder andere Hardware- oder Softwaresysteme einzuführen oder zu verbreiten, die die oben genannten Schäden verursachen können.',
    },
    conclusion: {
      pt: 'Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.',
      en: 'Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren\'t sure whether you need or not it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.',
      fr: 'Nous espérons que cela a clarifié les choses pour vous et comme mentionné précédemment, s\'il y a quelque chose dont vous n\'êtes pas sûr d\'avoir besoin ou non, il est généralement plus sûr de laisser les cookies activés au cas où ils interagiraient avec l\'une des fonctionnalités que vous utilisez sur notre site.',
      de: 'Hoffentlich hat das die Dinge für Sie geklärt und wie bereits erwähnt, wenn es etwas gibt, bei dem Sie sich nicht sicher sind, ob Sie es brauchen oder nicht, ist es normalerweise sicherer, Cookies aktiviert zu lassen, falls sie mit einer der Funktionen interagieren, die Sie auf unserer Website verwenden.',
    },
    policyEffective: {
      pt: 'Esta política é efetiva a partir de Novembro/2021.',
      en: 'This policy is effective as of November 2021.',
      fr: 'Cette politique est effective à partir de Novembre 2021.',
      de: 'Diese Richtlinie gilt ab November 2021.',
    },
    thirdPartyCookiesText3: {
      pt: 'Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics. As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.',
      en: 'For more information on Google Analytics cookies, see the official Google Analytics page. Third-party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit, which helps us understand how we can improve the site for you.',
      fr: 'Pour plus d\'informations sur les cookies Google Analytics, consultez la page officielle de Google Analytics. Les analyses tierces sont utilisées pour suivre et mesurer l\'utilisation de ce site afin que nous puissions continuer à produire du contenu attrayant. Ces cookies peuvent suivre des éléments tels que le temps que vous passez sur le site ou les pages que vous visitez.',
      de: 'Weitere Informationen zu Google Analytics-Cookies finden Sie auf der offiziellen Google Analytics-Seite. Analysen von Drittanbietern werden verwendet, um die Nutzung dieser Website zu verfolgen und zu messen, damit wir weiterhin ansprechende Inhalte produzieren können. Diese Cookies können Dinge wie die Zeit, die Sie auf der Website verbringen, oder die besuchten Seiten verfolgen.',
    },
    thirdPartyCookiesText4: {
      pt: 'Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.',
      en: 'From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimizations our users appreciate the most.',
      fr: 'De temps en temps, nous testons de nouvelles fonctionnalités et apportons des modifications subtiles à la façon dont le site est présenté. Lorsque nous testons encore de nouvelles fonctionnalités, ces cookies peuvent être utilisés pour vous garantir une expérience cohérente sur le site.',
      de: 'Von Zeit zu Zeit testen wir neue Funktionen und nehmen subtile Änderungen an der Art und Weise vor, wie die Website bereitgestellt wird. Wenn wir noch neue Funktionen testen, können diese Cookies verwendet werden, um sicherzustellen, dass Sie ein konsistentes Erlebnis auf der Website erhalten.',
    },
    thirdPartyCookiesText5: {
      pt: 'À medida que apresentamos um serviço, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente solicitam informações e, portanto, esse é o tipo de dados que esses cookies rastrearão. Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analisar nossos custos de publicidade e para garantir o melhor preço possível.',
      en: 'As we provide a service it is important for us to understand statistics about how many of the visitors to our site actually request information and as such this is the kind of data that these cookies will track. This is important to you as it means that we can accurately make business predictions that allow us to monitor our advertising costs to ensure the best possible price.',
      fr: 'Comme nous fournissons un service, il est important pour nous de comprendre les statistiques sur le nombre de visiteurs de notre site qui demandent réellement des informations et c\'est donc le type de données que ces cookies suivront. Cela est important pour vous car cela signifie que nous pouvons faire des prévisions commerciales précises.',
      de: 'Da wir einen Service anbieten, ist es für uns wichtig, Statistiken darüber zu verstehen, wie viele Besucher unserer Website tatsächlich Informationen anfordern, und daher ist dies die Art von Daten, die diese Cookies verfolgen werden. Dies ist wichtig für Sie, da es bedeutet, dass wir genaue Geschäftsprognosen erstellen können.',
    },
    thirdPartyCookiesText6: {
      pt: 'O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você. Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense. Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos.',
      en: 'The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you. For more information on Google AdSense see the official Google AdSense privacy FAQs. We use adverts to offset the costs of running this site and provide funding for future development.',
      fr: 'Le service Google AdSense que nous utilisons pour diffuser de la publicité utilise un cookie DoubleClick pour diffuser des annonces plus pertinentes sur le Web et limiter le nombre de fois qu\'une annonce donnée vous est présentée. Pour plus d\'informations sur Google AdSense, consultez les FAQ officielles sur la confidentialité de Google AdSense.',
      de: 'Der Google AdSense-Dienst, den wir zur Schaltung von Werbung verwenden, verwendet ein DoubleClick-Cookie, um relevantere Anzeigen im Web zu schalten und die Häufigkeit zu begrenzen, mit der Ihnen eine bestimmte Anzeige angezeigt wird. Weitere Informationen zu Google AdSense finden Sie in den offiziellen Google AdSense-Datenschutz-FAQs.',
    },
    thirdPartyCookiesText7: {
      pt: 'Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que seja fornecido os anúncios mais relevantes sempre que possível, rastreado anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.',
      en: 'The behavioral advertising cookies used by this site are designed to ensure that we provide you with the most relevant adverts where possible by anonymously tracking your interests and presenting similar things that may be of interest.',
      fr: 'Les cookies de publicité comportementale utilisés par ce site sont conçus pour garantir que nous vous fournissons les publicités les plus pertinentes dans la mesure du possible en suivant anonymement vos intérêts et en présentant des choses similaires qui pourraient vous intéresser.',
      de: 'Die auf dieser Website verwendeten Cookies für verhaltensbasierte Werbung sollen sicherstellen, dass wir Ihnen nach Möglichkeit die relevantesten Anzeigen liefern, indem wir Ihre Interessen anonym verfolgen und ähnliche Dinge präsentieren, die Sie interessieren könnten.',
    },
    // CIMAAL section
    cimaalTitle: {
      pt: 'CIMAAL – Centro de Informação, Mediação e Arbitragem de Conflitos de Consumo do Algarve',
      en: 'CIMAAL – Algarve Consumer Conflict Information, Mediation and Arbitration Centre',
      fr: 'CIMAAL – Centre d\'Information, Médiation et Arbitrage des Conflits de Consommation de l\'Algarve',
      de: 'CIMAAL – Informations-, Mediations- und Schlichtungszentrum für Verbraucherkonflikte der Algarve',
    },
    covers: {
      pt: 'Abrange',
      en: 'Covers',
      fr: 'Couvre',
      de: 'Umfasst',
    },
    coversText: {
      pt: 'Municípios do distrito de Faro',
      en: 'Municipalities of the Faro district',
      fr: 'Municipalités du district de Faro',
      de: 'Gemeinden des Bezirks Faro',
    },
    addressLabel: {
      pt: 'Morada',
      en: 'Address',
      fr: 'Adresse',
      de: 'Adresse',
    },
    phoneLabel: {
      pt: 'Telefone',
      en: 'Phone',
      fr: 'Téléphone',
      de: 'Telefon',
    },
  };

  const getText = (key: string): string => {
    return privacyTexts[key]?.[currentLanguage] || privacyTexts[key]?.['pt'] || key;
  };

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
              {getText('title')}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {getText('subtitle')}
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
                  {getText('intro1')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {getText('intro2')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {getText('intro3')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {getText('intro4')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  {getText('intro5')}
                </p>
              </div>
            </div>

            {/* Cookies Policy */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">{getText('cookiesTitle')}</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{getText('whatAreCookies')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getText('whatAreCookiesText')}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{getText('howWeUseCookies')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getText('howWeUseCookiesText1')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('howWeUseCookiesText2')}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{getText('thirdPartyCookies')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getText('thirdPartyCookiesText1')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText2')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText3')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText4')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText5')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText6')}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  {getText('thirdPartyCookiesText7')}
                </p>
              </div>
            </div>

            {/* Consumer Information */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">{getText('consumerInfo')}</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {getText('consumerInfoText')}
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-3">{getText('cimaalTitle')}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>{getText('covers')}:</strong> {getText('coversText')}</p>
                      <p><strong>{getText('addressLabel')}:</strong> Ninho de Empresas, Edifício ANJE, Estrada da Penha, 3º andar, sala 26, 8000 Faro</p>
                      <p><strong>{getText('phoneLabel')}:</strong> <a href="tel:289823135" className="text-primary-600 hover:underline">289 823 135</a></p>
                      <p><strong>Email:</strong> <a href="mailto:cimaal@mail.telepac.pt" className="text-primary-600 hover:underline">cimaal@mail.telepac.pt</a></p>
                      <p><strong>Website:</strong> <a href="http://www.consumoalgarve.pt" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.consumoalgarve.pt</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Commitment */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">{getText('userCommitment')}</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {getText('userCommitmentText')}
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">A</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {getText('commitmentA')}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">B</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {getText('commitmentB')}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">C</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {getText('commitmentC')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-6 md:p-8">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {getText('conclusion')}
                </p>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>{getText('policyEffective')}</strong>
                  </p>
                </div>

                <div className="mt-6 p-6 bg-primary-50 rounded-lg border border-primary-100">
                  <h3 className="font-semibold text-gray-900 mb-4">{getText('companyInfo')}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>COSMIC POWER BUSINESS, LDA</strong></p>
                    <p>TLM: <a href="tel:+351962104415" className="text-primary-600 hover:underline">+351 962 104 415</a></p>
                    <p>Estrada de Santa Eulália, Edf. Ondas do Mar Loja F,<br />8200-269 Albufeira | Algarve</p>
                    <p>NIF: 505 957 086</p>
                    <p>Capital Social 10.000 Euros</p>
                    <p>Albufeira | Algarve</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-primary-100 flex gap-4 text-sm">
                    <a href="/contacto" className="text-primary-600 hover:underline">{getText('contact')}</a>
                    <a href="/politica-privacidade" className="text-primary-600 hover:underline">{getText('privacyPolicy')}</a>
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
