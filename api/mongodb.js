// API REST para MongoDB Atlas
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { MongoClient } = require('mongodb');
    
    // Connection string do MongoDB Atlas
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const db = client.db('albufeira-holidays');
    const collection = db.collection('siteData');

    if (req.method === 'GET') {
      // Carregar dados
      const document = await collection.findOne({ _id: 'main' });
      res.status(200).json(document || {});
    } else if (req.method === 'POST') {
      // Salvar dados
      const data = req.body;
      const document = {
        _id: 'main',
        ...data,
        lastUpdated: new Date().toISOString()
      };
      
      await collection.replaceOne(
        { _id: 'main' },
        document,
        { upsert: true }
      );
      
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    
    await client.close();
  } catch (error) {
    console.error('MongoDB API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
