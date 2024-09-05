// api/ping.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://mini-store-task-tan.vercel.app/products?category=all');
    const status = response.status;
    console.log(`Pinged website. Status: ${status}`);
    res.status(200).json({ message: 'Ping successful', status });
  } catch (error) {
    console.error('Ping failed:', error);
    res.status(500).json({ message: 'Ping failed', error: error.message });
  }
}