const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const openai = new OpenAI();

async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Creation de ChatCompletion.js et affichage de la response du role:assistant dans une page html." }],
      model: "gpt-4o",
    });
  
    console.log(completion.choices[0]);
  }
  
  main();