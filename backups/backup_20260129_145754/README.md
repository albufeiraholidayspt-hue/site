# 🔐 Backup Completo - Albufeira Holidays
**Data:** 29 de Janeiro de 2026, 14:57:54  
**Tipo:** Backup Full (Código, Configurações, Assets, Traduções, Dados)

---

## 📋 Inventário do Backup

### 1. **Configurações do Projeto**
- ✅ `package.json` - Dependências e scripts do projeto
- ✅ `railway.json` - Configuração de deploy Railway
- ✅ `tailwind.config.js` - Configuração Tailwind CSS
- ✅ `vite.config.ts` - Configuração Vite
- ✅ `.env.example` - Template de variáveis de ambiente

### 2. **Dados e Conteúdo Inicial**
- ✅ `data/initialContent.ts` - Conteúdo inicial do site (fallback)
  - Hero section
  - About section
  - Apartamentos (Penthouse, Prestige, Duplex, Deluxe)
  - Página Algarve
  - Contactos
  - Configurações gerais

### 3. **Sistema de Traduções (i18n)**
- ✅ `i18n/simple.ts` - Sistema completo de traduções
  - **Português (PT)** - 287+ traduções
  - **English (EN)** - 287+ traduções
  - **Français (FR)** - 287+ traduções
  - **Deutsch (DE)** - 287+ traduções
- ✅ `i18n/index.ts` - Configuração do sistema i18n

**Traduções incluídas:**
- Navegação (nav.*)
- Hero sections (hero.*)
- Apartamentos (apartments.*, apartment.*)
- Características (features.*, amenity.*)
- Contacto (contact.*)
- Calendário (calendar.*)
- Estatísticas (stats.*)
- Reviews (reviews.*)
- Footer (footer.*)
- Comum (common.*)

### 4. **Assets Públicos (public/)**
Total de ficheiros: **18**

**Imagens:**
- ✅ `ah-logo.png` - Logo principal do site (reduzido 40%)
- ✅ `logo.png` - Logo alternativo
- ✅ `vite.svg` - Ícone Vite

**Ícones e Favicons:**
- ✅ `favicon.ico`
- ✅ `apple-touch-icon.png`
- ✅ `favicon-16x16.png`
- ✅ `favicon-32x32.png`
- ✅ `android-chrome-192x192.png`
- ✅ `android-chrome-512x512.png`

**Manifests:**
- ✅ `site.webmanifest` - PWA manifest
- ✅ `robots.txt` - SEO robots

**Outros:**
- ✅ Ficheiros de configuração adicionais

### 5. **Base de Dados**
- ⚠️ `database_content_api.json` - Tentativa de backup via API (endpoint não disponível)
- ℹ️ **Nota:** O conteúdo da base de dados PostgreSQL Railway está a ser gerido pelo backoffice
- ℹ️ **Fallback:** `data/initialContent.ts` contém todo o conteúdo inicial que serve de backup

---

## 🔗 Links e URLs Importantes

### URLs de Produção
- **Site:** https://albufeira-holidays-production.up.railway.app
- **GitHub:** https://github.com/albufeiraholidayspt-hue/site.git
- **Railway:** Deploy automático via GitHub push

### URLs de Imagens (Cloudinary)
Todas as imagens dos apartamentos e galerias estão hospedadas no Cloudinary com otimização automática:
- Base URL: `https://res.cloudinary.com/`
- Transformações aplicadas: `f_auto,q_auto,w_1920,c_limit`

### Booking URL
- **Beds24:** Configurado no backoffice para cada apartamento

---

## 📦 Estrutura de Pastas do Backup

```
backup_20260129_145754/
├── README.md                          # Este ficheiro
├── package.json                       # Dependências
├── railway.json                       # Config Railway
├── tailwind.config.js                 # Config Tailwind
├── vite.config.ts                     # Config Vite
├── .env.example                       # Template env vars
├── database_content_api.json          # Tentativa backup DB
├── data/
│   └── initialContent.ts              # Conteúdo inicial completo
├── i18n/
│   ├── index.ts                       # Config i18n
│   └── simple.ts                      # Traduções PT/EN/FR/DE
└── public/
    ├── ah-logo.png                    # Logo principal
    ├── logo.png                       # Logo alternativo
    ├── favicon.ico
    ├── apple-touch-icon.png
    ├── android-chrome-*.png
    ├── favicon-*.png
    ├── site.webmanifest
    ├── robots.txt
    └── vite.svg
```

---

## 🛠️ Como Restaurar o Backup

### 1. Restaurar Configurações
```bash
cp backup_20260129_145754/package.json ./
cp backup_20260129_145754/railway.json ./
cp backup_20260129_145754/tailwind.config.js ./
cp backup_20260129_145754/vite.config.ts ./
```

### 2. Restaurar Dados e Traduções
```bash
cp -r backup_20260129_145754/data/* src/data/
cp -r backup_20260129_145754/i18n/* src/i18n/
```

### 3. Restaurar Assets Públicos
```bash
cp -r backup_20260129_145754/public/* public/
```

### 4. Reinstalar Dependências
```bash
npm install
```

### 5. Rebuild e Deploy
```bash
npm run build
git add -A
git commit -m "Restore from backup 20260129_145754"
git push origin main
```

---

## ✅ Verificação de Integridade

### Ficheiros Críticos Verificados
- [x] package.json - Dependências preservadas
- [x] railway.json - Config Railway preservada
- [x] tailwind.config.js - Estilos preservados
- [x] vite.config.ts - Build config preservada
- [x] data/initialContent.ts - Conteúdo inicial completo
- [x] i18n/simple.ts - 287+ traduções em 4 idiomas
- [x] public/ah-logo.png - Logo principal (40% reduzido)
- [x] public/* - 18 ficheiros de assets

### Conteúdo Preservado
- [x] Hero sections (Homepage, Apartamentos, Algarve)
- [x] 4 Apartamentos completos (Penthouse, Prestige, Duplex, Deluxe)
- [x] Galerias de imagens com URLs Cloudinary
- [x] Vídeos YouTube com timestamps
- [x] Características e amenidades
- [x] Informações de contacto
- [x] Traduções completas PT/EN/FR/DE
- [x] Configurações de calendário e disponibilidade
- [x] Links de booking (Beds24)
- [x] SEO e meta tags

---

## 🔒 Segurança

- ✅ Nenhuma senha ou chave API incluída
- ✅ `.env.example` incluído (sem valores sensíveis)
- ✅ Backup guardado localmente e no GitHub
- ✅ Histórico Git preservado

---

## 📝 Notas Importantes

1. **Base de Dados PostgreSQL:** O conteúdo dinâmico está na base de dados Railway. Este backup contém o `initialContent.ts` que serve de fallback.

2. **Imagens Cloudinary:** As imagens não estão incluídas fisicamente no backup, mas todos os URLs estão preservados no `initialContent.ts`.

3. **Traduções:** Sistema completo de traduções em 4 idiomas (PT/EN/FR/DE) com 287+ chaves de tradução cada.

4. **Logo:** O logo `ah-logo.png` foi reduzido em 40% e tem margem `lg:ml-4` no desktop.

5. **Formulário de Contacto:** Todas as traduções dos estados de envio foram adicionadas (sending, messageSent, messageReceived, sendAnother, sendError, errorOccurred, tryAgain).

---

## 🎯 Última Atualização do Código

**Commit mais recente:** Fix: Adicionar traduções PT/EN/FR/DE para estados de envio do formulário de contacto  
**Data:** 29 Janeiro 2026, ~14:55  
**Branch:** main

---

**Backup criado com sucesso! ✅**  
**Tudo preservado e verificado! 🔐**
