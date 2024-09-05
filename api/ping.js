// api/ping.js
const https = require('https');

export default async function handler(req, res) {
  const url = 'https://mini-store-task-tan.vercel.app/products?category=all';

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log(`Pinged website. Status: ${response.statusCode}`);
      res.status(200).json({ message: 'Ping successful', status: response.statusCode });
    });

  }).on('error', (error) => {
    console.error('Ping failed:', error);
    res.status(500).json({ message: 'Ping failed', error: error.message });
  });
}