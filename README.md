# Albufeira Holidays

Website moderno para apartamentos de férias no coração de Albufeira com vista mar, com sistema de backoffice completo para gestão de conteúdos.

## 🏖️ Descrição

Plataforma completa para reserva de apartamentos de férias em Albufeira, Algarve. Desenvolvido com React, TypeScript e Tailwind CSS, featuring upload de imagens via ImgBB e backoffice intuitivo.

## ✨ Funcionalidades

### Website Público
- **Página Inicial**: Hero section com slideshow, listagem de apartamentos, promoções
- **Páginas de Apartamentos**: Detalhes completos, galeria de imagens, comodidades, calendário de disponibilidade
- **Página de Contacto**: Informações de contacto, formulário de contacto
- **Design Responsivo**: Experiência perfeita em mobile, tablet e desktop

### Backoffice Completo
- **Autenticação Segura**: Login protegido para área de gestão
- **Gestão de Conteúdos**:
  - Edição de textos e imagens da página inicial
  - Gestão completa de apartamentos (descrições, capacidade, comodidades)
  - Upload múltiplo de imagens (até 40 simultâneas)
  - Sistema de promoções com códigos de desconto
  - Configuração de calendários iCal
  - URLs de reserva (Avaibook)

### Sistema de Imagens
- **Upload Automático**: Integração com ImgBB
- **Múltiplas Imagens**: Upload em lote com progresso
- **Galeria Visual**: Interface em grade com drag & drop
- **Persistência**: URLs salvas automaticamente

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Estado**: Zustand com persistência localStorage
- **Upload**: ImgBB API (gratuito e ilimitado)
- **Build**: Vite
- **Deploy**: Netlify com build automático

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Configurar API Key do ImgBB
cp .env.example .env
# Editar .env com sua API key

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Configuração

### ImgBB API
1. Crie conta em [ImgBB](https://imgbb.com/)
2. Obtenha sua API key gratuita
3. Configure em `.env`:
   ```
   VITE_IMGBB_API_KEY=sua_api_key_aqui
   ```

### Acesso ao Backoffice
- URL: `/admin`
- Utilizador: `admin`
- Password: `albufeira2024`

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes React reutilizáveis
│   ├── GalleryUploadImgBB.tsx    # Upload múltiplo de imagens
│   ├── ImageUploadImgBB.tsx      # Upload individual
│   ├── AvailabilityCalendar.tsx  # Calendário iCal
│   └── AutoExport.tsx           # Persistência automática
├── pages/            # Páginas do site
│   ├── admin/
│   │   ├── Dashboard.tsx        # Backoffice completo
│   │   └── Login.tsx            # Autenticação
│   ├── Home.tsx                 # Página inicial
│   ├── ApartmentDetail.tsx      # Detalhes do apartamento
│   └── Contact.tsx              # Página de contacto
├── store/            # Estado global (Zustand)
├── services/         # Serviços externos
│   └── imgbb.ts      # Integração ImgBB
├── utils/            # Utilitários e helpers
├── data/             # Dados iniciais
└── types/            # Tipos TypeScript
```

## 🚀 Deploy Automático

### Opção 1: Script de Deploy Automático
```bash
# Deploy completo (com commit e upload para Netlify)
npm run deploy

# Build rápido (apenas gera pasta dist)
npm run deploy:build
```

### Opção 2: Watch Automático
```bash
# Monitora mudanças e build automático
npm run watch
```
- **Build automático** a cada 10 segundos se houver mudanças
- **Ideal para desenvolvimento** contínuo
- **Pasta dist sempre atualizada** para upload

### Opção 3: Deploy Manual Rápido
```bash
# Build tradicional
npm run build

# Upload da pasta 'dist' para Netlify
# Acesse: https://app.netlify.com
```

## 🌐 Deploy na Netlify

### Configuração Inicial
1. **Conecte repositório** ao Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Variáveis de ambiente**:
   - `VITE_IMGBB_API_KEY` (sua API key do ImgBB)

### Deploy Automático com Git
```bash
# Commit das mudanças
git add .
git commit -m "Atualização do site"
git push

# Netlify faz deploy automático após cada push!
```

### Scripts Disponíveis
- `npm run deploy` - Deploy completo com commit
- `npm run watch` - Monitoramento automático
- `npm run deploy:build` - Build rápido
- `npm run build` - Build tradicional

## 📱 Features Técnicas

### Upload de Imagens
- ✅ Upload múltiplo simultâneo (até 40 imagens)
- ✅ Barra de progresso em tempo real
- ✅ Validação de tipo e tamanho
- ✅ Reordenação via drag & drop
- ✅ Exclusão com confirmação
- ✅ Hospedagem gratuita via ImgBB

### Persistência de Dados
- ✅ Auto-save no localStorage
- ✅ Backup automático
- ✅ Sincronização com build
- ✅ Recuperação de dados
- ✅ Migracão automática de versões

### Gestão de Conteúdo
- ✅ Edição em tempo real
- ✅ Preview instantâneo
- ✅ Validação de formulários
- ✅ Interface intuitiva
- ✅ Acesso seguro

## 🎯 SEO e Performance

- **Meta Tags**: Otimizadas para SEO
- **Imagens Otimizadas**: Via ImgBB CDN
- **Lazy Loading**: Carregamento progressivo
- **Responsive Design**: Mobile-first
- **Performance**: Build otimizado com Vite

## 📄 Licença

MIT License - consulte arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie branch para sua feature
3. Commit suas mudanças
4. Push para o branch
5. Abra Pull Request

---

**Albufeira Holidays** © 2024 - Apartamentos de férias no coração de Albufeira com vista mar
