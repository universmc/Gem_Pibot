const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const openai = new OpenAI();

async function main() {
  try {
    // Appel à l'API OpenAI pour générer l'image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Generate for me a programmable high-definition multidimensional programmable illustrating a map of the universe on a digital PUZZLE (grid display) Space & Time mapping process l image doit etre en 16:9 au format .webp",
      n: 1,
      size: "1792x1024",
    });

    // Récupérer l'URL de l'image générée
    const imageUrl = response.data[0].url;
  //  console.log("Image URL:", imageUrl);

    // Télécharger l'image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Créer le nom du fichier avec la date actuelle
    const date = new Date().toISOString().split('T')[0];
    const fileName = `output/file-name_shell_${date}.webp`;

    // Sauvegarder l'image localement
    fs.writeFileSync(fileName, imageResponse.data);
    console.log(`Image saved locally as ${fileName}`);
  } catch (error) {
    console.error("Error generating or saving the image:", error);
  }
}

main();
