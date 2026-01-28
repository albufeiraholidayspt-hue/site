# Configuração Neon PostgreSQL (3GB Gratuito)

## Passo 1: Criar Conta
1. Vai a: https://neon.tech
2. Clica "Sign Up" (Google/GitHub ou email)
3. **100% GRATUITO** - sem cartão de crédito

## Passo 2: Criar Projeto
1. Após login, clica "Create a project"
2. Nome: `albufeira-holidays`
3. Região: **Europe (Frankfurt)** (mais perto de Portugal)
4. PostgreSQL version: **16** (mais recente)
5. Clica "Create Project"

## Passo 3: Obter Connection String
1. Na página do projeto, vê a secção "Connection Details"
2. Copia o **DATABASE_URL** (connection string completa)
3. Formato: `postgresql://user:password@host/database?sslmode=require`

## Passo 4: Configurar no Render
1. Vai ao dashboard do Render
2. Seleciona o serviço `albufeira-holidays`
3. Vai a "Environment"
4. Adiciona a variável:
   - `DATABASE_URL` = (connection string copiada)
5. Clica "Save Changes"

## Passo 5: Deploy
O Render vai fazer redeploy automático com a nova variável.

## Verificação
Após deploy, acede ao backoffice e testa guardar alterações.
Os dados devem persistir no Neon (3GB gratuito para sempre).

## Plano Gratuito Neon
✅ 3GB storage
✅ PostgreSQL 16
✅ Serverless
✅ Backup automático
✅ **GRATUITO PARA SEMPRE**
