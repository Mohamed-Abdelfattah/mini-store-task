// /api/ping.js
export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    try {
      const response = await fetch('https://mini-store-task-tan.vercel.app/products?category=all');
      const status = response.status;
      console.log(`Pinged website. Status: ${status}`);
      return new Response(JSON.stringify({ message: 'Ping successful', status }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Ping failed:', error);
      return new Response(JSON.stringify({ message: 'Ping failed', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }