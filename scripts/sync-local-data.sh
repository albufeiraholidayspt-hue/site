#!/bin/bash

# Script para sincronizar dados do localStorage com o projeto
# Uso: ./scripts/sync-local-data.sh

echo "🔄 Sincronizando dados do localStorage..."

# Verificar se existe arquivo de dados exportados
DATA_FILE="localStorage-data.json"

if [ -f "$DATA_FILE" ]; then
    echo "✅ Arquivo $DATA_FILE encontrado"
    
    # Ler o arquivo de dados
    CONTENT=$(cat "$DATA_FILE")
    
    # Extrair timestamp
    TIMESTAMP=$(echo "$CONTENT" | grep -o '"timestamp": "[^"]*"' | cut -d'"' -f4)
    
    echo "📅 Dados de: $TIMESTAMP"
    
    # Criar backup do initialContent atual
    cp src/data/initialContent.ts "src/data/initialContent.backup.$(date +%Y%m%d_%H%M%S).ts"
    
    # Gerar novo initialContent com os dados do localStorage
    cat > src/data/initialContent.ts << EOF
import { SiteContent } from '../types';

// Conteúdo sincronizado do localStorage em: $TIMESTAMP
// Para preservar alterações do backoffice entre deploys

export const initialContent: SiteContent = $CONTENT;
EOF

    echo "✅ initialContent.ts atualizado com dados do localStorage"
    echo "💾 Backup criado em src/data/initialContent.backup.*.ts"
    
    # Perguntar se quer fazer commit
    echo ""
    echo "🤔 Quer fazer commit das alterações? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        git add src/data/initialContent.ts src/data/initialContent.backup.*.ts
        git commit -m "🔄 Sincronizar dados do localStorage ($TIMESTAMP)"
        echo "✅ Commit realizado com sucesso"
    else
        echo "📋 Alterações não commitadas (use 'git add' manualmente)"
    fi
    
else
    echo "❌ Arquivo $DATA_FILE não encontrado"
    echo ""
    echo "📝 Para gerar o arquivo:"
    echo "   1. Abra o site no navegador"
    echo "   2. Faça suas alterações no backoffice"
    echo "   3. Abra o console (F12)"
    echo "   4. Execute: window.exportData()"
    echo "   5. Execute este script novamente"
fi

echo ""
echo "🎯 Após sincronizar, execute 'npm run build' para aplicar as alterações"
