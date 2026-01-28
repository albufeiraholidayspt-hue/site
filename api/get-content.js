// Vercel Serverless Function - Carregar conteúdo
export default async function handler(req, res) {
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

  // Only GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📥 Recebido pedido get-content');

    // Validar DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL não configurado');
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Usar Neon HTTP API
    const neonResponse = await fetch(`${process.env.DATABASE_URL.replace('postgresql://', 'https://').split('@')[1].split('/')[0]}/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DATABASE_URL.split(':')[2].split('@')[0]}`
      },
      body: JSON.stringify({
        query: 'SELECT * FROM site_content ORDER BY id DESC LIMIT 1'
      })
    });

    if (!neonResponse.ok) {
      throw new Error(`Neon API error: ${neonResponse.statusText}`);
    }

    const result = await neonResponse.json();

    if (!result.rows || result.rows.length === 0) {
      console.log('❌ Nenhum conteúdo encontrado');
      return res.status(404).json({
        error: 'Content not found',
        message: 'No saved content available',
      });
    }

    const row = result.rows[0];
    const content = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;

    console.log('✅ Conteúdo carregado do Neon:', row.last_updated);

    return res.status(200).json({
      success: true,
      content: content,
      lastUpdated: row.last_updated,
      version: row.version || '1.0',
    });

  } catch (error) {
    console.error('❌ Erro ao carregar:', error);
    return res.status(500).json({
      error: 'Failed to load content',
      details: error.message,
    });
  }
};
