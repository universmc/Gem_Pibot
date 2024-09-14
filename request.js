require('dotenv').config();
const fetch = require("node-fetch"); // Importer node-fetch pour télécharger l'image
const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = 3144;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Assurez-vous de définir votre clé d'API OpenAI comme une variable d'environnement
  });

app.use(express.static('public')); // Servir les fichiers statiques de notre dossier 'public'

app.get('/generate', async (req, res) => {
  const prompt = req.query.prompt || "Hello, how can I assist you today?";

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const message = response.choices[0].message.content;
    res.json({ message });
  } catch (error) {
    console.error('Erreur lors de la requête OpenAI:', error);
    res.status(500).json({ error: `Erreur lors de la requête à l'API OpenAI: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
