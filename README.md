# Albufeira Holidays - Website com Backoffice

Website moderno para alojamento local em Albufeira com sistema de backoffice para gestão de conteúdos.

## Funcionalidades

### Website Público
- **Página Inicial**: Hero section, listagem de apartamentos, secção sobre, CTA
- **Páginas de Apartamentos**: Detalhes, galeria, comodidades, botão de reserva
- **Página de Contacto**: Informações de contacto, link para reservas
- **Design Responsivo**: Adaptado para mobile, tablet e desktop

### Backoffice
- **Autenticação**: Login seguro para acesso à área de gestão
- **Gestão de Conteúdos**:
  - Editar textos da página inicial (título, subtítulo, secção sobre)
  - Editar imagens (URLs)
  - Gerir apartamentos (nome, descrição, capacidade, comodidades, imagens)
  - Editar informações de contacto
  - Configurar URL de reservas (Avaibook)

## Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navegação
- **Zustand** - State management com persistência
- **Lucide React** - Ícones

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Acesso ao Backoffice

URL: `/admin`

**Credenciais de acesso:**
- Utilizador: `admin`
- Password: `albufeira2024`

## Estrutura do Projeto

```
src/
├── components/
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Layout.tsx
├── data/
│   └── initialContent.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── admin/
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── Home.tsx
│   ├── ApartmentDetail.tsx
│   └── Contact.tsx
├── store/
│   └── useStore.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Notas

- Os dados são persistidos no localStorage do browser
- Para um ambiente de produção, recomenda-se implementar um backend com base de dados
- As imagens são referenciadas por URL (pode usar serviços como Cloudinary, Imgur, etc.)
