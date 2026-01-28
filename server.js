// Servidor Express para API de persistência de dados
// Serve o frontend estático + API endpoints
// Base de dados: Neon (PostgreSQL serverless - 3GB gratuito)

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Conexão Neon PostgreSQL
const sql = neon(process.env.DATABASE_URL);

// Criar tabela se não existir
async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content JSONB NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version VARCHAR(10) DEFAULT '1.0'
      )
    `;
    
    console.log('✅ Base de dados Neon PostgreSQL inicializada');
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
      return res.status(400).setHeader('Content-Type', 'application/json').json({ error: 'Content is required' });
    }

    const lastUpdated = timestamp || new Date().toISOString();

    // Verificar se já existe conteúdo
    const existing = await sql`SELECT id FROM site_content LIMIT 1`;
    
    if (existing.length > 0) {
      // Atualizar conteúdo existente
      console.log('🔄 Atualizando conteúdo existente, ID:', existing[0].id);
      await sql`
        UPDATE site_content 
        SET content = ${JSON.stringify(content)}, 
            last_updated = ${lastUpdated}
        WHERE id = ${existing[0].id}
      `;
    } else {
      // Inserir novo conteúdo
      console.log('➕ Inserindo novo conteúdo');
      await sql`
        INSERT INTO site_content (content, last_updated) 
        VALUES (${JSON.stringify(content)}, ${lastUpdated})
      `;
    }

    console.log('✅ Conteúdo guardado no Neon:', lastUpdated);

    const response = {
      success: true,
      message: 'Content saved successfully',
      timestamp: lastUpdated,
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Erro ao guardar:', error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      error: 'Failed to save content',
      details: error.message,
    });
  }
});

// API: Carregar conteúdo
app.get('/api/get-content', async (req, res) => {
  try {
    console.log('📥 Recebido pedido get-content');
    const result = await sql`SELECT * FROM site_content ORDER BY id DESC LIMIT 1`;

    if (result.length === 0) {
      console.log('❌ Nenhum conteúdo encontrado');
      res.setHeader('Content-Type', 'application/json');
      return res.status(404).json({
        error: 'Content not found',
        message: 'No saved content available',
      });
    }

    const row = result[0];
    const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;

    console.log('✅ Conteúdo carregado do Neon:', row.last_updated);

    const response = {
      success: true,
      content: content,
      lastUpdated: row.last_updated,
      version: row.version || '1.0',
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Erro ao carregar:', error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      error: 'Failed to load content',
      details: error.message,
    });
  }
});

// Servir frontend estático (dist)
app.use(express.static(join(__dirname, 'dist')));

// Todas as outras rotas retornam index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`�️ Base de dados: Neon PostgreSQL`);
});
