#!/bin/bash

# Script para corrigir configuração Git
echo "🔧 Corrigindo configuração Git..."

# Remover configuração global
git config --global --unset user.name 2>/dev/null || true
git config --global --unset user.email 2>/dev/null || true

# Configurar localmente (só para este projeto)
git config user.name "albufeiraholidayspt-hue"
git config user.email "albufeiraholidays.pt@gmail.com"

# Configurar remote (use seu token pessoal)
git remote set-url origin https://YOUR_TOKEN@github.com/albufeiraholidayspt-hue/site.git

echo "✅ Configuração corrigida!"
echo "📋 Verificando..."
git config user.name
git config user.email
git remote -v

echo "🚀 Fazendo push..."
git push origin main
