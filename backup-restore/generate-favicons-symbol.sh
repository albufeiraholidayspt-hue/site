#!/bin/bash
# Script para gerar favicons com logo anterior (só o símbolo)

# Criar diretório para favicons se não existir
mkdir -p public/icons

# Copiar o logo anterior para diferentes tamanhos de favicon
cp public/logo-symbol.png public/icons/favicon-16x16.png
cp public/logo-symbol.png public/icons/favicon-32x32.png
cp public/logo-symbol.png public/icons/favicon-192x192.png
cp public/logo-symbol.png public/icons/favicon-512x512.png
cp public/logo-symbol.png public/icons/apple-touch-icon.png

echo "✅ Favicons criados com logo anterior (símbolo)"
