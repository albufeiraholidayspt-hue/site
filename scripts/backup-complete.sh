#!/bin/bash

# Script de Backup Completo - Albufeira Holidays
# Faz backup de TUDO: base de dados, configurações, código

BACKUP_DIR="backups/complete-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "🔄 Iniciando backup completo..."

# 1. Backup da Base de Dados PostgreSQL (Railway)
echo "📦 Backup da base de dados..."
curl -s https://albufeira-holidays.up.railway.app/api/get-content -o "$BACKUP_DIR/database-content.json"

# 2. Backup das Variáveis de Ambiente
echo "🔐 Backup das variáveis de ambiente..."
cp .env "$BACKUP_DIR/env-local.txt" 2>/dev/null || echo "# .env não encontrado" > "$BACKUP_DIR/env-local.txt"
cp .env.production "$BACKUP_DIR/env-production.txt" 2>/dev/null || echo "# .env.production não encontrado" > "$BACKUP_DIR/env-production.txt"

# 3. Backup das Configurações do Projeto
echo "⚙️ Backup das configurações..."
cp package.json "$BACKUP_DIR/"
cp package-lock.json "$BACKUP_DIR/" 2>/dev/null
cp tsconfig.json "$BACKUP_DIR/" 2>/dev/null
cp vite.config.ts "$BACKUP_DIR/" 2>/dev/null
cp tailwind.config.js "$BACKUP_DIR/" 2>/dev/null
cp railway.json "$BACKUP_DIR/" 2>/dev/null
cp server.js "$BACKUP_DIR/"

# 4. Backup do Código Fonte
echo "💻 Backup do código fonte..."
mkdir -p "$BACKUP_DIR/src"
cp -r src/* "$BACKUP_DIR/src/"

# 5. Backup dos Assets Públicos
echo "🖼️ Backup dos assets públicos..."
mkdir -p "$BACKUP_DIR/public"
cp -r public/* "$BACKUP_DIR/public/" 2>/dev/null || echo "# Sem assets públicos"

# 6. Criar arquivo de informações do backup
echo "📝 Criando arquivo de informações..."
cat > "$BACKUP_DIR/BACKUP_INFO.txt" << EOF
===========================================
BACKUP COMPLETO - ALBUFEIRA HOLIDAYS
===========================================

Data do Backup: $(date)
Versão do Node: $(node --version)
Versão do npm: $(npm --version)

CONTEÚDO DO BACKUP:
-------------------
✅ Base de Dados PostgreSQL (Railway)
   - Todos os apartamentos (Penthouse, Prestige, Duplex, Deluxe)
   - Todas as traduções (PT, EN, FR, DE)
   - Todas as imagens e URLs
   - Links YouTube, iCal, Google Maps
   - Configurações do backoffice
   - Reviews e avaliações
   - Informações do Algarve
   - Contactos e redes sociais

✅ Variáveis de Ambiente
   - .env (local)
   - .env.production (produção)

✅ Configurações do Projeto
   - package.json
   - tsconfig.json
   - vite.config.ts
   - tailwind.config.js
   - railway.json
   - server.js

✅ Código Fonte Completo
   - /src (todo o código React/TypeScript)
   - Componentes
   - Páginas
   - Hooks
   - Serviços
   - Utils
   - Store (Zustand)

✅ Assets Públicos
   - Logos
   - Imagens
   - Ícones

COMO RESTAURAR:
--------------
1. Base de Dados:
   - Fazer POST para /api/save-content com o conteúdo de database-content.json

2. Código:
   - Copiar src/ para o projeto
   - npm install
   - Configurar variáveis de ambiente
   - npm run dev (local) ou deploy no Railway

3. Variáveis de Ambiente:
   - Copiar env-local.txt para .env
   - Copiar env-production.txt para .env.production
   - Configurar no Railway Dashboard

===========================================
EOF

# 7. Comprimir tudo
echo "📦 Comprimindo backup..."
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"

# 8. Resumo
echo ""
echo "✅ BACKUP COMPLETO CRIADO!"
echo "📁 Pasta: $BACKUP_DIR"
echo "📦 Arquivo: $BACKUP_DIR.tar.gz"
echo "📊 Tamanho: $(du -h "$BACKUP_DIR.tar.gz" | cut -f1)"
echo ""
echo "🔒 Backup inclui:"
echo "   - Base de dados PostgreSQL"
echo "   - Variáveis de ambiente"
echo "   - Configurações do projeto"
echo "   - Código fonte completo"
echo "   - Assets públicos"
echo ""
