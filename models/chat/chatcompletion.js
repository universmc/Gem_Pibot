const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const openai = new OpenAI();

async function main(
) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Creation de ChatCompletion.js et affichage de la response du role:assistant dans une page html." }],
      model: "gpt-4o",
    });

    // Ajout d'un élément HTML pour afficher la réponse
    const responseDiv = document.getElementById("openai-response");
    responseDiv.innerHTML = ""; // Supprime tout contenu existant dans l'élément
    // Parcourez toutes les réponses de l'appel OpenAI
    for (const choice of completion.choices) {
      // Créez un nouveau <p> pour chaque réponse
    const newParagraph = document.createElement("p");
      newParagraph.textContent = choice;
      
      // Ajoutez le <p> dans la <div>
    responseDiv.appendChild(newParagraph);
    }
}

main();
