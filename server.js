// Servidor Express para API de persistência de dados
// Serve o frontend estático + API endpoints
// Base de dados: Neon (PostgreSQL serverless - 3GB gratuito)

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS com headers explícitos
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type'],
  credentials: false
}));
app.use(express.json({ limit: '50mb' }));

// Log de todas as requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ENDPOINT DE TESTE - NÃO DEPENDE DE NADA
app.get('/api/ping', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Validar DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ ERRO CRÍTICO: DATABASE_URL não está configurado!');
  console.error('Configure a variável de ambiente DATABASE_URL no Render');
  process.exit(1);
}

console.log('✅ DATABASE_URL configurado');

// Conexão PostgreSQL (Railway)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Criar tabela se não existir
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content JSONB NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version VARCHAR(10) DEFAULT '1.0'
      )
    `);
    
    console.log('✅ Base de dados PostgreSQL (Railway) inicializada');
  } catch (error) {
    console.error('❌ Erro ao inicializar base de dados:', error);
  }
}

initDatabase();

// API: Guardar conteúdo
app.post('/api/save-content', async (req, res) => {
  try {
    console.log('📥 Recebido pedido save-content');
    const { content, timestamp } = req.body;

    if (!content) {
      console.log('❌ Content vazio');
      return res
        .status(400)
        .type('application/json')
        .json({ error: 'Content is required' });
    }

    const lastUpdated = timestamp || new Date().toISOString();

    // Verificar se já existe conteúdo
    const existing = await pool.query('SELECT id FROM site_content LIMIT 1');
    
    if (existing.rows.length > 0) {
      // Atualizar conteúdo existente
      console.log('🔄 Atualizando conteúdo existente, ID:', existing.rows[0].id);
      await pool.query(
        'UPDATE site_content SET content = $1, last_updated = $2 WHERE id = $3',
        [JSON.stringify(content), lastUpdated, existing.rows[0].id]
      );
    } else {
      // Inserir novo conteúdo
      console.log('➕ Inserindo novo conteúdo');
      await pool.query(
        'INSERT INTO site_content (content, last_updated) VALUES ($1, $2)',
        [JSON.stringify(content), lastUpdated]
      );
    }

    console.log('✅ Conteúdo guardado no Neon:', lastUpdated);

    // Enviar resposta com headers explícitos
    return res
      .status(200)
      .type('application/json')
      .json({
        success: true,
        message: 'Content saved successfully',
        timestamp: lastUpdated,
      });

  } catch (error) {
    console.error('❌ Erro ao guardar:', error);
    return res
      .status(500)
      .type('application/json')
      .json({
        error: 'Failed to save content',
        details: error.message,
      });
  }
});

// API: Upload para Cloudinary (assinado)
app.post('/api/upload-cloudinary', async (req, res) => {
  try {
    const crypto = await import('crypto');
    
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'albufeira-holidays';
    
    // Gerar assinatura manualmente (sem upload_preset)
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${process.env.VITE_CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    res.json({
      signature,
      timestamp,
      cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.VITE_CLOUDINARY_API_KEY
    });
  } catch (error) {
    console.error('❌ Erro ao gerar assinatura Cloudinary:', error);
    res.status(500).json({ error: 'Erro ao gerar assinatura' });
  }
});

// API: Carregar conteúdo
app.get('/api/get-content', async (req, res) => {
  try {
    console.log('📥 Recebido pedido get-content');
    const result = await pool.query('SELECT * FROM site_content ORDER BY id DESC LIMIT 1');

    if (result.rows.length === 0) {
      console.log('❌ Nenhum conteúdo encontrado');
      return res
        .status(404)
        .type('application/json')
        .json({
          error: 'Content not found',
          message: 'No saved content available',
        });
    }

    const row = result.rows[0];
    const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;

    console.log('✅ Conteúdo carregado do Neon:', row.last_updated);

    return res
      .status(200)
      .type('application/json')
      .json({
        success: true,
        content: content,
        lastUpdated: row.last_updated,
        version: row.version || '1.0',
      });

  } catch (error) {
    console.error('❌ Erro ao carregar:', error);
    return res
      .status(500)
      .type('application/json')
      .json({
        error: 'Failed to load content',
        details: error.message,
      });
  }
});

// Error handler global (ANTES do catch-all)
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  res.status(500).type('application/json').json({
    error: 'Internal server error',
    message: err.message
  });
});

// Servir arquivos públicos (public) - para clear-cache.html, etc
app.use(express.static(join(__dirname, 'public')));

// Servir frontend estático (dist)
app.use(express.static(join(__dirname, 'dist')));

// Todas as outras rotas retornam index.html (SPA) - DEVE SER O ÚLTIMO
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🗄️ Base de dados: Neon PostgreSQL`);
  console.log(`📡 Endpoints disponíveis:`);
  console.log(`   POST /api/save-content`);
  console.log(`   GET  /api/get-content`);
});
