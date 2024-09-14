const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");
const openai = new OpenAI();

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'assistant', content: "Vous êtes une IA, une Machine à optimisé les Prompts. Developpez le prompt Ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates} et ## le {resultat}{feedback} attentdu:"}],
    model: 'gpt-4o',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();