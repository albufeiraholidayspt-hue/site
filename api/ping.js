// Vercel Serverless Function - Health check
module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Vercel Serverless Functions working',
    timestamp: new Date().toISOString()
  });
};
