# Configurar API Key do ImgBB no Vercel

## Passos para configurar:

1. **Acesse o dashboard do Vercel:**
   - Vá para https://vercel.com/dashboard
   - Selecione o projeto `albufeiraholidays`

2. **Vá para Settings:**
   - Clique na aba "Settings"
   - No menu lateral, clique em "Environment Variables"

3. **Adicione a variável de ambiente:**
   - **Name**: `VITE_IMGBB_API_KEY`
   - **Value**: `dbd2aebb695d29ee20f3fc151c316242`
   - **Environments**: Selecione `Production`, `Preview`, `Development`
   - Clique em "Save"

4. **Redeploy o projeto:**
   - Vá para "Deployments"
   - Clique nos três pontos (...) no deployment mais recente
   - Selecione "Redeploy"

## API Key disponível:
```
VITE_IMGBB_API_KEY=dbd2aebb695d29ee20f3fc151c316242
```

Após configurar, o upload de imagens funcionará corretamente no ambiente de produção do Vercel.
