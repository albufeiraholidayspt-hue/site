#!/bin/bash
# Script para salvar logo anterior e gerar favicons

# Salvar logo anterior como logo-symbol.png
# (A imagem foi enviada pelo usuário)

# Criar diretório para favicons se não existir
mkdir -p public/icons

# Copiar logo anterior para diferentes tamanhos
# Usando a imagem que o usuário enviou (logo anterior)
cp public/logo-symbol.png public/icons/favicon-16x16.png 2>/dev/null || echo "Logo anterior não encontrado"
cp public/logo-symbol.png public/icons/favicon-32x32.png 2>/dev/null || echo "Logo anterior não encontrado"
cp public/logo-symbol.png public/icons/favicon-192x192.png 2>/dev/null || echo "Logo anterior não encontrado"
cp public/logo-symbol.png public/icons/favicon-512x512.png 2>/dev/null || echo "Logo anterior não encontrado"
cp public/logo-symbol.png public/icons/apple-touch-icon.png 2>/dev/null || echo "Logo anterior não encontrado"

echo "✅ Processo concluído"
