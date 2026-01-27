#!/bin/bash
# Script para gerar favicons a partir do logo

# Criar diretório para favicons
mkdir -p public/icons

# Gerar diferentes tamanhos de favicon
# Nota: Isso requer ImageMagick instalado
# Se não tiver, vamos criar versões simples

# Copiar o logo original para diferentes tamanhos
cp public/logo.png public/icons/favicon-16x16.png
cp public/logo.png public/icons/favicon-32x32.png
cp public/logo.png public/icons/favicon-192x192.png
cp public/logo.png public/icons/favicon-512x512.png
cp public/logo.png public/icons/apple-touch-icon.png

echo "✅ Favicons criados em public/icons/"
