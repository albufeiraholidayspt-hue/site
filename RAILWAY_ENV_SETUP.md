# Configuração de Variáveis de Ambiente no Railway

## ⚠️ URGENTE: Cloudinary retornando erro 401 (Unauthorized)

As fotos não estão a fazer upload porque as credenciais do Cloudinary não estão configuradas no Railway.

## Variáveis que DEVEM estar configuradas no Railway:

### 1. Database (PostgreSQL)
```
DATABASE_URL=postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway
```
(Esta já deve estar configurada automaticamente pelo Railway)

### 2. Cloudinary (OBRIGATÓRIO para fotos)
```
VITE_CLOUDINARY_CLOUD_NAME=dqh8jxqxq
VITE_CLOUDINARY_API_KEY=154852278618715
VITE_CLOUDINARY_API_SECRET=tdIVQUu2HL7iN2vAMK8Sqawfsa8
VITE_CLOUDINARY_UPLOAD_PRESET=albufeira_holidays
```

## Como configurar no Railway:

1. Aceda ao projeto no Railway: https://railway.app
2. Clique no serviço "albufeira-holidays"
3. Vá a "Variables"
4. Adicione cada variável acima (copie e cole exatamente como está)
5. Clique em "Deploy" para aplicar as alterações

## Verificar se está a funcionar:

Após configurar, espere 2-3 minutos pelo deploy e tente fazer upload de uma foto no backoffice.
O erro 401 deve desaparecer.

## Nota Importante:

- **DATABASE_URL**: Já deve estar configurada automaticamente
- **VITE_CLOUDINARY_***: Estas DEVEM ser adicionadas manualmente
- Sem estas variáveis, as fotos não funcionam!
