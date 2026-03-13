# ⚡ PromptForge

Générateur de prompts IA propulsé par Claude. Entre une idée → reçois 3 prompts pro + les meilleures IA recommandées.

---

## 🚀 Déploiement sur Vercel (gratuit, 2 minutes)

### Étape 1 — Crée un compte Vercel
👉 https://vercel.com/signup (gratuit, connecte-toi avec GitHub)

### Étape 2 — Upload le projet
1. Va sur https://vercel.com/new
2. Clique **"Browse"** → sélectionne le dossier `promptforge`
3. Clique **Deploy** (sans rien changer)

### Étape 3 — Ajoute ta clé API Anthropic
1. Dans ton projet Vercel → **Settings** → **Environment Variables**
2. Ajoute :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : `sk-ant-xxxxxxxxxxxxxxxx` (ta clé depuis https://console.anthropic.com)
3. Clique **Save**
4. Va dans **Deployments** → clique les 3 points → **Redeploy**

### C'est tout ! 🎉
Ton site est en ligne sur `https://promptforge-xxx.vercel.app`

---

## Structure du projet

```
promptforge/
├── api/
│   └── generate.js      ← Backend (appel API Anthropic sécurisé)
├── public/
│   └── index.html       ← Frontend du site
├── vercel.json          ← Config Vercel
└── package.json
```

## Où obtenir une clé API Anthropic ?
👉 https://console.anthropic.com → API Keys → Create Key
(Les nouveaux comptes ont des crédits gratuits)
