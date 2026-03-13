export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea } = req.body;
  if (!idea) return res.status(400).json({ error: 'Idea is required' });

  const systemPrompt = `Tu es expert en prompt engineering. L'utilisateur te donne une idée brute.
Retourne UNIQUEMENT un objet JSON valide (sans markdown, sans backticks) avec cette structure :
{
  "ias": [{"nom":"...","usage":"...","top":true/false}],
  "prompts": [{"style":"...","texte":"..."}]
}
3 à 4 IA pertinentes selon le type de tâche (image→Midjourney/DALL-E/Stable Diffusion, vidéo→Sora/Runway/Kling AI, texte→ChatGPT/Claude/Gemini, code→GitHub Copilot/Claude). Une seule IA avec top:true.
Exactement 3 prompts avec styles différents (ex: Descriptif, Créatif, Cinématique, Technique, Narratif...).
Prompts détaillés, longs, prêts à copier-coller, en français.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: `Mon idée : ${idea}` }],
      }),
    });

    const data = await response.json();
    const raw = data.content?.[0]?.text?.trim() || '';

    let parsed;
    try { parsed = JSON.parse(raw); }
    catch {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed) return res.status(500).json({ error: 'JSON invalide retourné par le modèle' });

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
