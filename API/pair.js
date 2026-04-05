 // api/pair.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { number } = req.body;
  if (!number || !/^\d{9,15}$/.test(number)) {
    return res.status(400).json({ error: 'Numéro invalide' });
  }

  // ✅ Nouvelle URL de votre backend Nginx (HTTPS)
  const BACKEND_URL = 'https://95.111.252.213.nip.io/api/pair';

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Erreur de connexion au serveur d’appairage' });
  }
}