const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const OpenAI = require("openai");
const openai = new OpenAI();


const path = require('path');
const { exec } = require('child_process');

// Charger les fichiers JSON de rôles Groq
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/roles-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/roles-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/roles-user.json'), 'utf8'));

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction pour exécuter des commandes shell
function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur d'exécution de la commande: ${error}`);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  console.log(`Assistant: ${rolesAssistant.intro || "Bonjour, je suis votre assistant IA."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput(" 💻 Vous: ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Répondre avec la description de l'IA si demandé
    if (userInput.toLowerCase().includes("expertise")) {
      console.log(`✨ Assistant ✨ : ${iaDescription.expertise}`);
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const output = await executeShellCommand(config.magicCommand);
        console.log(`Résultat de la commande: ${output}`);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande: ${error}`);
      }
      continue;
    }

    // Génération de réponses à l'aide de Groq SDK
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: rolesSystem.name || "system",
            content: rolesSystem.content || "System is ready."
          },
          {
            role: rolesUser.name || "user",
            content: userInput
          }
        ],
        model: rolesSystem.modelName || "gpt-4o",
        temperature: 0.9,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      // Affichage de la réponse générée
      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`Assistant: ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  rl.close();
}

// Exécution de la fonction principale
main().catch(console.error);
