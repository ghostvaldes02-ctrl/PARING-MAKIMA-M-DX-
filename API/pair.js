 export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { number } = req.body;
  if (!number || !/^\d{9,15}$/.test(number)) {
    return res.status(400).json({ error: 'Numéro invalide' });
  }

  // Backend original
  const BACKEND_URL = 'http://95.111.252.213:19112/api/pair';
  // Proxy CORS public (cors-anywhere)
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

  try {
    // Utiliser le proxy pour contourner les restrictions CORS/mixte
    const response = await fetch(PROXY_URL + BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Impossible de contacter le serveur d’appairage' });
  }
}