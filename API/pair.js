 export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { number } = req.body;
  if (!number || !/^\d{9,15}$/.test(number)) {
    return res.status(400).json({ error: 'Numéro invalide' });
  }

  const BACKEND_URL = 'http://95.111.252.213:19112/api/pair';

  try {
    console.log(`[Proxy] Appel du backend : ${BACKEND_URL} pour le numéro ${number}`);
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });

    const data = await response.json();
    console.log(`[Proxy] Réponse backend : status=${response.status}`, data);

    res.status(response.status).json(data);
  } catch (err) {
    console.error(`[Proxy] Erreur : ${err.message}`);
    res.status(500).json({ error: `Erreur proxy : ${err.message}` });
  }
}