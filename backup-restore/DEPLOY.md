# Albufeira Holidays - Deploy Instructions

## 🚀 Deploy Options

### 1. Render (Recommended - Free)
1. Go to [render.com](https://render.com)
2. Connect GitHub repository
3. Create 'Static Site' service
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Node Version: 18+

### 2. Cloudflare Pages (Alternative - Free)
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build Command: `npm run build`
4. Build output directory: `dist`
5. Node Version: 18

### 3. DigitalOcean App Platform
1. Go to [digitalocean.com/products/app-platform](https://digitalocean.com/products/app-platform)
2. Create App from GitHub
3. Static Site type
4. Build Command: `npm run build`
5. Output Directory: `dist"

## 🔧 Why not Vercel?
- Vercel has strict CORS policies
- Blocks external API requests (iCal URLs)
- Requires complex proxy configurations
- Netlify/Render work out-of-the-box

## ✅ Recommended: Render
- Works exactly like Netlify
- Free tier available
- No CORS issues
- Simple deployment
