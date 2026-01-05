#!/bin/bash

# Script de Deploy Automático - Albufeira Holidays
# Uso: ./scripts/deploy.sh

echo "🚀 Iniciando deploy automático - Albufeira Holidays"

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script na pasta do projeto."
    exit 1
fi

# Verificar se há mudanças
if git status --porcelain | grep -q .; then
    echo "📝 Mudanças detectadas:"
    git status --short
    
    echo ""
    read -p "Deseja fazer commit das mudanças? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo "📦 Fazendo commit das mudanças..."
        git add .
        git commit -m "🚀 Auto deploy - $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ Commit realizado com sucesso!"
    else
        echo "⚠️  Deploy cancelado pelo usuário."
        exit 0
    fi
else
    echo "✅ Nenhuma mudança detectada, mas continuando com deploy..."
fi

# Build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Deploy cancelado."
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Deploy para Netlify (se netlify-cli estiver instalado)
if command -v netlify &> /dev/null; then
    echo "🌐 Fazendo deploy para Netlify..."
    netlify deploy --prod --dir=dist
    if [ $? -eq 0 ]; then
        echo "🎉 Deploy realizado com sucesso!"
        echo "🌍 Site atualizado em: https://albufeiraholidays.netlify.app"
    else
        echo "❌ Erro no deploy para Netlify."
        exit 1
    fi
else
    echo "📋 Build concluído! Upload manual necessário:"
    echo "   1. Acesse: https://app.netlify.com"
    echo "   2. Faça upload da pasta 'dist'"
    echo "   3. Ou instale netlify-cli: npm install -g netlify-cli"
fi

echo "🎯 Deploy automático concluído!"
