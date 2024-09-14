const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");
const openai = new OpenAI();


async function main() {
  console.log("Démarrage de la session de brainstorming");


  const chatCompletion = await openai.chat.completions.create({
    "messages": [
      {
        "role": "system",
        content: '*💡* Idée géniale** 💻 : Trouver des idées originales, des Astuces, Tips et innovation pour le développement de projet GPT openAI (📅 Gestion des ressources et de la capacité des IA AGI 🕒).',
      },
    ],
    "model": "gpt-4o",
    "temperature": 0.8,
    "max_tokens": 2042,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let fullResponse = ""; // Initialisation d'une variable pour stocker la réponse complète

  for await (const chunk of chatCompletion) {
    const content = chunk.choices[0]?.delta?.content || '';
    fullResponse += content; // Accumulation des fragments de texte dans la variable fullResponse
  }

  console.log("Réception de la réponse complète de l'IA : ", fullResponse); // Affichage de la réponse complète

  console.log("💻 Fin de la session de brainstorming[univers-mc.cloud].");
}

main().catch(console.error);