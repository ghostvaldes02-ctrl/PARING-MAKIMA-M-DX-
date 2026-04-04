// api/pair.js
export default async function handler(req, res) {
  // Autoriser uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { number } = req.body;
  if (!number || !/^\d{9,15}$/.test(number)) {
    return res.status(400).json({ error: 'Numéro invalide (indicatif pays requis, ex: 237671410035)' });
  }

  // URL de ton backend Pterodactyl (HTTP)
  const BACKEND_URL = 'http://95.111.252.213:19112/api/pair';

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Impossible de contacter le serveur d’appairage. Vérifiez que le backend tourne.' });
  }
}
