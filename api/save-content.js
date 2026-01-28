// Vercel Serverless Function - Guardar conteúdo
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📥 Recebido pedido save-content');
    
    const { content, timestamp } = req.body;

    if (!content) {
      console.log('❌ Content vazio');
      return res.status(400).json({ error: 'Content is required' });
    }

    // Validar DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL não configurado');
      return res.status(500).json({ error: 'Database not configured' });
    }

    const sql = neon(process.env.DATABASE_URL);
    const lastUpdated = timestamp || new Date().toISOString();

    // Criar tabela se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        content JSONB NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version VARCHAR(10) DEFAULT '1.0'
      )
    `;

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

    return res.status(200).json({
      success: true,
      message: 'Content saved successfully',
      timestamp: lastUpdated,
    });

  } catch (error) {
    console.error('❌ Erro ao guardar:', error);
    return res.status(500).json({
      error: 'Failed to save content',
      details: error.message,
    });
  }
};
