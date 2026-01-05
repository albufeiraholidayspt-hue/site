#!/bin/bash

# Script de Watch Automático - Albufeira Holidays (macOS Compatible)
# Uso: ./scripts/watch.sh

echo "👀 Iniciando watch automático - Albufeira Holidays"
echo "📁 Monitorando mudanças na pasta src/"
echo "🔄 Build automático a cada 10 segundos"
echo "⏹️  Pressione Ctrl+C para parar"

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script na pasta do projeto."
    exit 1
fi

# Build inicial
echo "🔨 Build inicial..."
npm run build

# Watch loop (macOS compatible)
while true; do
    sleep 10
    
    # Verificar se houve mudanças (comparando timestamps)
    NEW_HASH=$(find src/ -type f -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/\.git/*" -exec stat -f "%m %N" {} \; | sort | md5)
    
    if [ "$NEW_HASH" != "$LAST_HASH" ]; then
        echo ""
        echo "🔄 Mudança detectada! Fazendo build..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build atualizado com sucesso!"
            echo "📋 Pasta 'dist' pronta para upload"
            echo "🌐 Atualize em: https://app.netlify.com"
        else
            echo "❌ Erro no build. Verifique os erros acima."
        fi
        
        LAST_HASH=$NEW_HASH
    else
        echo "⏳ Monitorando... $(date '+%H:%M:%S')"
    fi
done
