# Configuração PlanetScale

## Passo 1: Criar Conta
1. Vai a: https://auth.planetscale.com/sign-up
2. Cria conta (Google/GitHub ou email)

## Passo 2: Criar Base de Dados
1. Clica "Create database"
2. Nome: `albufeira-holidays`
3. Região: **Europe West (Frankfurt)**
4. Clica "Create database"

## Passo 3: Obter Credenciais
1. Na página da base de dados, clica "Connect"
2. Clica "Create password"
3. Nome da password: `render-production`
4. Copia as credenciais:
   - `DATABASE_HOST`
   - `DATABASE_USERNAME`
   - `DATABASE_PASSWORD`

## Passo 4: Configurar no Render
1. Vai ao dashboard do Render
2. Seleciona o serviço `albufeira-holidays`
3. Vai a "Environment"
4. Adiciona as 3 variáveis:
   - `DATABASE_HOST` = (valor copiado)
   - `DATABASE_USERNAME` = (valor copiado)
   - `DATABASE_PASSWORD` = (valor copiado)
5. Clica "Save Changes"

## Passo 5: Deploy
O Render vai fazer redeploy automático com as novas variáveis.

## Verificação
Após deploy, acede ao backoffice e testa guardar alterações.
Os dados devem persistir no PlanetScale (5GB gratuito).
