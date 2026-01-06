// API Route para CORS proxy de iCal URLs
export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    console.log('Fetching iCal URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/calendar,text/plain,application/octet-stream,*/*',
        'User-Agent': 'Mozilla/5.0 (compatible; AlbufeiraHolidays/1.0)'
      },
      timeout: 15000
    });

    if (!response.ok) {
      console.log('iCal fetch failed:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `Failed to fetch iCal: ${response.statusText}` 
      });
    }

    const data = await response.text();
    
    if (!data || !data.trim()) {
      return res.status(404).json({ error: 'Empty response from iCal URL' });
    }

    // Verificar se é um iCal válido
    if (!data.includes('BEGIN:VCALENDAR') && !data.includes('DTSTART')) {
      console.log('Invalid iCal format received');
      return res.status(400).json({ error: 'Invalid iCal format' });
    }

    console.log('✅ iCal data fetched successfully, length:', data.length);
    
    // Retornar os dados do iCal
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.status(200).send(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
