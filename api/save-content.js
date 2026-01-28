// Vercel Serverless Function - Guardar conteúdo
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

    const lastUpdated = timestamp || new Date().toISOString();

    // Usar Neon HTTP API
    const neonResponse = await fetch(`${process.env.DATABASE_URL.replace('postgresql://', 'https://').split('@')[1].split('/')[0]}/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DATABASE_URL.split(':')[2].split('@')[0]}`
      },
      body: JSON.stringify({
        query: `
          INSERT INTO site_content (content, last_updated) 
          VALUES ($1, $2)
          ON CONFLICT (id) DO UPDATE 
          SET content = $1, last_updated = $2
          RETURNING id
        `,
        params: [JSON.stringify(content), lastUpdated]
      })
    });

    if (!neonResponse.ok) {
      throw new Error(`Neon API error: ${neonResponse.statusText}`);
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
