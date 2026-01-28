# 🔒 Guia de Backup e Restauro - Albufeira Holidays

## 📦 Backup Completo

### O que está incluído no backup:

✅ **Base de Dados PostgreSQL (Railway)**
- Todos os 4 apartamentos (Penthouse, Prestige, Duplex, Deluxe)
- Todas as traduções (PT, EN, FR, DE)
- Todas as imagens e URLs do Cloudinary
- Links YouTube para vídeos
- Links iCal para calendários
- Links Google Maps para localizações
- Configurações completas do backoffice
- Reviews e avaliações
- Informações da página Algarve
- Contactos e redes sociais
- Configurações SEO

✅ **Variáveis de Ambiente**
- `.env` (desenvolvimento local)
- `.env.production` (produção Railway)
- Credenciais Cloudinary
- Credenciais PostgreSQL
- API Keys

✅ **Código Fonte Completo**
- Todo o código React/TypeScript
- Componentes
- Páginas (Home, Apartamentos, Algarve, Admin)
- Hooks personalizados
- Serviços (tradução, persistência, Cloudinary)
- Utils e helpers
- Store Zustand
- Configurações i18n

✅ **Configurações do Projeto**
- `package.json` e dependências
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.js`
- `railway.json`
- `server.js` (backend Express)

✅ **Assets Públicos**
- Logos
- Imagens
- Ícones
- Favicon

---

## 🚀 Como Fazer Backup

### Backup Automático (Recomendado)

```bash
# Executar script de backup completo
./scripts/backup-complete.sh
```

Isto cria:
- Pasta com todos os ficheiros: `backups/complete-backup-YYYYMMDD-HHMMSS/`
- Arquivo comprimido: `backups/complete-backup-YYYYMMDD-HHMMSS.tar.gz`
- Arquivo de informações: `BACKUP_INFO.txt`

### Backup Manual da Base de Dados

```bash
# Fazer backup apenas da base de dados
curl -s https://albufeira-holidays.up.railway.app/api/get-content -o backup-db.json
```

---

## 🔄 Como Restaurar

### 1. Restaurar Base de Dados

```bash
# Restaurar conteúdo para o servidor
curl -X POST https://albufeira-holidays.up.railway.app/api/save-content \
  -H "Content-Type: application/json" \
  -d @backups/complete-backup-YYYYMMDD-HHMMSS/database-content.json
```

### 2. Restaurar Código

```bash
# Clonar repositório
git clone https://github.com/albufeiraholidayspt-hue/site.git
cd site

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp backups/complete-backup-YYYYMMDD-HHMMSS/env-local.txt .env
cp backups/complete-backup-YYYYMMDD-HHMMSS/env-production.txt .env.production

# Testar localmente
npm run dev

# Deploy para Railway
git push origin main
```

### 3. Configurar Variáveis de Ambiente no Railway

No Railway Dashboard:
1. Ir para o projeto
2. Settings → Variables
3. Adicionar as seguintes variáveis:

```
# PostgreSQL (Railway fornece automaticamente)
DATABASE_URL=postgresql://...

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=dkqfxafe0
VITE_CLOUDINARY_API_KEY=seu_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# Outras
NODE_ENV=production
```

---

## 📋 Checklist de Restauro Completo

- [ ] Restaurar base de dados PostgreSQL
- [ ] Verificar que todos os apartamentos estão presentes
- [ ] Verificar traduções (PT, EN, FR, DE)
- [ ] Verificar imagens do Cloudinary
- [ ] Verificar links YouTube
- [ ] Verificar links iCal
- [ ] Verificar links Google Maps
- [ ] Configurar variáveis de ambiente
- [ ] Testar login do backoffice
- [ ] Testar upload de imagens
- [ ] Testar traduções automáticas
- [ ] Testar calendários de disponibilidade
- [ ] Verificar responsividade mobile
- [ ] Verificar performance de carregamento

---

## 🔐 Segurança

### Onde Guardar Backups

1. **Local** (este computador)
   - `backups/` - Backups automáticos locais
   
2. **GitHub** (repositório privado)
   - Todo o código está versionado
   - Commits regulares mantêm histórico
   
3. **Railway** (base de dados)
   - PostgreSQL com backups automáticos
   - Snapshots diários

4. **Cloudinary** (imagens)
   - Todas as imagens estão no Cloudinary
   - Backup automático da plataforma

### Recomendações

- ✅ Fazer backup antes de alterações grandes
- ✅ Fazer backup semanal automático
- ✅ Guardar backups em 2+ locais diferentes
- ✅ Testar restauro periodicamente
- ✅ Manter backups dos últimos 30 dias

---

## 📞 Suporte

Em caso de problemas:
1. Verificar logs do Railway
2. Verificar console do browser (F12)
3. Verificar ficheiro `BACKUP_INFO.txt` no backup
4. Contactar suporte técnico

---

## 📅 Última Atualização

**Data:** 28 de Janeiro de 2026  
**Versão:** 1.0  
**Status:** ✅ Backup completo criado e testado
