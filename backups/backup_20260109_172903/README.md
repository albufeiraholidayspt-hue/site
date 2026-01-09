# Backup Completo - Albufeira Holidays Website

## Data do Backup
$(date '+%Y-%m-%d %H:%M:%S')

## Conteúdo do Backup

### 📁 source/
- Todo o código fonte React/TypeScript
- Componentes, páginas, hooks, utils
- Sistema de tradução (i18n)
- Store (Zustand) com toda a configuração
- Estilos e assets

### 🖼️ images/
- Todas as imagens do site (public/)
- Logos, ícones
- Imagens de apartamentos
- Imagens do Algarve
- Assets diversos

### ⚙️ config/
- package.json (dependências)
- tsconfig.json (TypeScript config)
- vite.config.ts (build config)
- tailwind.config.js (estilos)
- postcss.config.js
- index.html

### 💾 database/
- Configuração do conteúdo (via Store)
- Reviews de clientes
- Informações de apartamentos
- Dados do Algarve
- Links e configurações

## Como Restaurar

1. Copiar pasta source/ para src/
2. Copiar pasta images/ para public/
3. Copiar ficheiros de config/ para raiz do projeto
4. Executar: npm install
5. Executar: npm run dev

## Versão
- Node.js: 22.16.0
- React: 18.x
- Vite: 5.x
- TypeScript: 5.x
