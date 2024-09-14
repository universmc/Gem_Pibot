const OpenAI = require("openai");
const fetch = require("node-fetch"); // Importer node-fetch pour télécharger l'image
const fs = require("fs"); // Importer fs pour écrire le fichier localement

const openai = new OpenAI();

  async function main() {
    const prompts = [
      "Generate for me a programmable high-definition multidimensional programmable illustrating a map of the universe on a digital PUZZLE (grid display) Space & Time mappping process l'image doit etre en 16:9 au format .webp",
      "An illustration of a beginner-friendly fullStack DevOps coding guide, with a simple button component example, showing a laptop with code editor open, and a user learning coding basics.",
      "A developer creating a new fullStack DevOps project on their laptop terminal, typing 'npx create-react-app my-button-app', with an illustration of a browser showing the default code Source.",
      "A simple fullStack DevOps button component code, with highlighted props 'label' and 'onClick', and an illustration of a button with 'Click Me' label.",
      "A modern and colorful button design with CSS styles applied, showcasing different states like hover, click, and default.",
      "An application interface showing a styled button in action, with a pop-up alert saying 'Button clicked!' upon clicking.",
      "An educational infographic with fullStack DevOps tips for beginners, showing props usage, and CSS integration with components."
    ];
    
    try {

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `${prompts}`,
        n: 1,
        size: "1792x1024",
      });
  
      const imageUrl = response.data[0].url;
      if (!imageUrl) throw new Error('No image URL returned from DALL-E');
  
      // Créer le répertoire de sortie si nécessaire
      const path = './output';
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
  
      // Télécharger et sauvegarder l'image
      const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `${path}/file-name_${dateStr}.webp`;
  
      const responseFetch = await fetch(imageUrl);
      const buffer = await responseFetch.buffer();
  
      fs.writeFile(fileName, buffer, (err) => {
        if (err) throw err;
        console.log(`Image sauvegardée en tant que ${fileName}`);
      });
    } catch (error) {
      console.error('Erreur lors de la génération ou du téléchargement de l\'image :', error);
    }
  }
  
  main();