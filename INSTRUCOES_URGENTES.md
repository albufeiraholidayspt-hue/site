# 🚨 INSTRUÇÕES URGENTES - RESTAURAR FOTOS

## Problema
As fotos do apartamento Prestige não foram restauradas porque os dados estão guardados no **Supabase**, mas o código em produção está a carregar dados antigos.

## ✅ SOLUÇÃO IMEDIATA (2 minutos)

### Opção 1: Pelo Backoffice (RECOMENDADO)

1. **Acede ao backoffice:**
   - URL: https://albufeira-holidays.onrender.com/admin
   - User: `admin`
   - Password: `albufeira2024`

2. **Vai à secção "Apartamentos"**

3. **Edita o apartamento "Prestige"**

4. **Substitui as fotos pelas URLs corretas:**
   ```
   Galeria (5 fotos):
   https://i.ibb.co/8Xq4bWf/prestige-1.jpg
   https://i.ibb.co/2nJ6z7L/prestige-2.jpg
   https://i.ibb.co/6RqY8p9/prestige-3.jpg
   https://i.ibb.co/9vK4m3d/prestige-4.jpg
   https://i.ibb.co/4gM7T2k/prestige-5.jpg
   
   Foto Hero:
   https://i.ibb.co/4gM7T2k/prestige-hero.jpg
   ```

5. **Clica em "Guardar"**

6. **Recarrega o site** - as fotos devem aparecer!

### Opção 2: Pelo Supabase Dashboard

1. **Acede ao Supabase:**
   - URL: https://supabase.com/dashboard/project/lposelwkdhpfgyqpxeyw
   - Faz login com a tua conta

2. **Vai para "Table Editor"**

3. **Seleciona a tabela "site_data"**

4. **Edita o registo com id = "main"**

5. **No campo "data", procura por "apartments" → "Prestige" (id: 2)**

6. **Substitui os URLs das imagens:**
   - Procura por `"images": [`
   - Substitui os URLs do Unsplash pelos do ImgBB (acima)

7. **Guarda as alterações**

## 🔍 Verificar se Funcionou

1. Abre o site: https://albufeira-holidays.onrender.com
2. Vai ao apartamento Prestige
3. As fotos devem ser as reais (não do Unsplash)

## 📸 URLs Corretas (para copiar/colar)

**Prestige - Galeria:**
```
https://i.ibb.co/8Xq4bWf/prestige-1.jpg
https://i.ibb.co/2nJ6z7L/prestige-2.jpg
https://i.ibb.co/6RqY8p9/prestige-3.jpg
https://i.ibb.co/9vK4m3d/prestige-4.jpg
https://i.ibb.co/4gM7T2k/prestige-5.jpg
```

**Prestige - Hero:**
```
https://i.ibb.co/4gM7T2k/prestige-hero.jpg
```

## ⚠️ Porque Isto Aconteceu?

O problema é que:
1. ✅ O código local tem as fotos corretas
2. ✅ O deploy foi feito com sucesso
3. ❌ MAS o Supabase ainda tem os dados antigos
4. ❌ O site carrega dados do Supabase, não do código

**Solução permanente:** Depois de restaurar pelo backoffice, os dados ficam guardados no Supabase e não se perdem mais.

## 🆘 Se Nada Funcionar

1. Limpa o cache do browser (Ctrl+Shift+R ou Cmd+Shift+R)
2. Tenta em modo incógnito
3. Verifica se estás a ver o apartamento correto (Prestige)
4. Contacta-me para ajuda adicional

---

**IMPORTANTE:** Depois de fazer isto, faz um backup:
```bash
npm run backup
```
