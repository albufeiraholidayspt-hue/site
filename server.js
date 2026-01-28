// Servidor Express para API de persistência de dados
// Serve o frontend estático + API endpoints
// Base de dados: PlanetScale (MySQL serverless)

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from '@planetscale/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Conexão PlanetScale
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);

// Criar tabela se não existir
async function initDatabase() {
  try {
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS site_content (
        id INT PRIMARY KEY AUTO_INCREMENT,
        content JSON NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        version VARCHAR(10) DEFAULT '1.0'
      )
    `);
    
    console.log('✅ Base de dados PlanetScale inicializada');
  } catch (error) {
    console.error('❌ Erro ao inicializar base de dados:', error);
  }
}

initDatabase();

// API: Guardar conteúdo
app.post('/api/save-content', async (req, res) => {
  try {
    const { content, timestamp } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const lastUpdated = timestamp || new Date().toISOString();

    // Verificar se já existe conteúdo
    const existing = await conn.execute('SELECT id FROM site_content LIMIT 1');
    
    if (existing.rows.length > 0) {
      // Atualizar conteúdo existente
      await conn.execute(
        'UPDATE site_content SET content = ?, last_updated = ? WHERE id = ?',
        [JSON.stringify(content), lastUpdated, existing.rows[0].id]
      );
    } else {
      // Inserir novo conteúdo
      await conn.execute(
        'INSERT INTO site_content (content, last_updated) VALUES (?, ?)',
        [JSON.stringify(content), lastUpdated]
      );
    }

    console.log('✅ Conteúdo guardado no PlanetScale:', lastUpdated);

    res.json({
      success: true,
      message: 'Content saved successfully',
      timestamp: lastUpdated,
    });

  } catch (error) {
    console.error('❌ Erro ao guardar:', error);
    res.status(500).json({
      error: 'Failed to save content',
      details: error.message,
    });
  }
});

// API: Carregar conteúdo
app.get('/api/get-content', async (req, res) => {
  try {
    const result = await conn.execute('SELECT * FROM site_content ORDER BY id DESC LIMIT 1');

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Content not found',
        message: 'No saved content available',
      });
    }

    const row = result.rows[0];
    const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;

    console.log('✅ Conteúdo carregado do PlanetScale:', row.last_updated);

    res.json({
      success: true,
      content: content,
      lastUpdated: row.last_updated,
      version: row.version || '1.0',
    });

  } catch (error) {
    console.error('❌ Erro ao carregar:', error);
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
  console.log(`📁 Diretório de dados: ${DATA_DIR}`);
});
