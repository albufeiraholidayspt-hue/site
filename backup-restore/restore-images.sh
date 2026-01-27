#!/bin/bash

# Script para restaurar imagens dos apartamentos
# Uso: ./restore-images.sh

echo "🔄 Restaurando imagens dos apartamentos..."

# Verificar se o arquivo de backup existe
if [ ! -f "IMAGES_BACKUP.md" ]; then
    echo "❌ Arquivo IMAGES_BACKUP.md não encontrado!"
    exit 1
fi

# Fazer backup do arquivo atual
echo "📦 Fazendo backup do initialContent.ts atual..."
cp src/data/initialContent.ts src/data/initialContent.ts.backup.$(date +%Y%m%d_%H%M%S)

echo "✅ Backup criado com sucesso!"
echo "📝 Para restaurar imagens manualmente, consulte IMAGES_BACKUP.md"
echo "🌐 Após configurar environment variables no Vercel, faça deploy"
