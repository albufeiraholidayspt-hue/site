# Recuperação de Dados - Albufeira Holidays

## 🔄 O Que Foi Recuperado

### Fotos Restauradas
- **Apartamento Prestige**: Todas as 5 fotos reais do ImgBB foram restauradas
  - `https://i.ibb.co/8Xq4bWf/prestige-1.jpg`
  - `https://i.ibb.co/2nJ6z7L/prestige-2.jpg`
  - `https://i.ibb.co/6RqY8p9/prestige-3.jpg`
  - `https://i.ibb.co/9vK4m3d/prestige-4.jpg`
  - `https://i.ibb.co/4gM7T2k/prestige-5.jpg`
  - Hero: `https://i.ibb.co/4gM7T2k/prestige-hero.jpg`

### Configurações Restauradas
- **Features do Penthouse**: Restauradas para 'Cobertores' e 'Cofre'
- Todas as configurações de apartamentos mantidas

## 🛡️ Sistema de Proteção Implementado

### 1. Scripts de Backup Automático

#### Fazer Backup
```bash
npm run backup
```
- Cria backup automático dos dados do Supabase
- Salva em `backups/supabase-backup-[timestamp].json`
- Mantém apenas os últimos 10 backups

#### Restaurar do Backup
```bash
npm run restore
```
- Restaura o backup mais recente para o Supabase
- Ou especifique um arquivo: `npm run restore supabase-backup-2024-01-27.json`

### 2. Variáveis de Ambiente Configuradas

Adicionadas ao `render.yaml`:
- `VITE_SUPABASE_URL`: URL do Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave de acesso

**IMPORTANTE**: Estas variáveis também precisam ser configuradas manualmente no dashboard do Render.com!

### 3. Sistema de Fallback

O código já tem proteção em `src/lib/supabaseStorage.ts`:
- Se o Supabase falhar, usa localStorage como backup
- Dados são sempre salvos em ambos os locais
- Recuperação automática em caso de falha

## 📋 Checklist de Prevenção

### Antes de Fazer Deploy
- [ ] Fazer backup: `npm run backup`
- [ ] Verificar que as variáveis de ambiente estão configuradas no Render
- [ ] Confirmar que o Supabase está acessível

### Configurar no Render.com
1. Acesse: https://dashboard.render.com
2. Selecione o projeto `albufeira-holidays`
3. Vá em **Environment** → **Environment Variables**
4. Adicione (se não existirem):
   - `VITE_SUPABASE_URL` = `https://lposelwkdhpfgyqpxeyw.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw`

### Backups Regulares
- Fazer backup semanal: `npm run backup`
- Backups são salvos em `backups/`
- Fazer commit dos backups importantes no Git

## 🚨 Em Caso de Perda de Dados

1. **Verificar localStorage do browser**
   - Abra DevTools → Application → Local Storage
   - Procure por `albufeira-holidays-storage`

2. **Restaurar do backup mais recente**
   ```bash
   npm run restore
   ```

3. **Verificar Supabase diretamente**
   - Acesse: https://supabase.com/dashboard
   - Projeto: `lposelwkdhpfgyqpxeyw`
   - Tabela: `site_data`

4. **Usar backup do Git**
   - Backups estão versionados no repositório
   - Procure em `backups/` ou nos commits anteriores

## 📊 Monitorização

### Verificar Estado Atual
```javascript
// No console do browser
localStorage.getItem('albufeira-holidays-storage')
```

### Logs do Supabase
O sistema mostra logs no console:
- ✅ Dados carregados do Supabase
- 📋 Usando localStorage fallback
- ❌ Erro ao carregar/salvar

## 🔗 Links Importantes

- **Supabase Dashboard**: https://supabase.com/dashboard/project/lposelwkdhpfgyqpxeyw
- **Render Dashboard**: https://dashboard.render.com
- **Site Produção**: https://albufeira-holidays.onrender.com

## ⚠️ Notas Importantes

1. **Nunca apague a pasta `backups/`** - contém histórico de dados
2. **Sempre faça backup antes de alterações grandes** no backoffice
3. **As variáveis de ambiente são públicas** (chave anon do Supabase é segura para frontend)
4. **O Supabase tem RLS (Row Level Security)** configurado para proteger os dados
