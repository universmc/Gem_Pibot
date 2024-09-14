const OpenAI = require("openai");
const fetch = require("node-fetch"); // Importer node-fetch pour télécharger l'image
const fs = require("fs"); // Importer fs pour écrire le fichier localement

const openai = new OpenAI();

  async function main() {
 

// Définir les variables pour chaque composant de la page web
const headerDescription = "Un en-tête moderne avec un logo à gauche, un menu de navigation centré, et une barre de recherche à droite.";
const heroSectionDescription = "Une section héros avec une grande image d'arrière-plan, un titre principal accrocheur, un sous-titre, et un bouton d'appel à l'action.";
const contentGridDescription = "Une grille de contenu en trois colonnes pour afficher des articles ou produits en vedette avec des images, des titres, et des descriptions.";
const testimonialsDescription = "Une section témoignages avec des avatars d'utilisateurs, des citations, et des notes affichées dans un format de grille soigné.";
const productCardDescription = "Des cartes de produit comprenant une image, un titre, une description courte, un prix, et un bouton 'Ajouter au Panier'.";
const contactFormDescription = "Un formulaire de contact avec des champs pour le nom, l'email, le sujet, et le message, accompagné d'un bouton 'Envoyer'.";
const blogSectionDescription = "Une section blog affichant les derniers articles avec des images, des titres, des extraits, et un lien 'Lire plus'.";
const footerDescription = "Un pied de page avec plusieurs colonnes pour les liens de navigation, les icônes de réseaux sociaux, et un formulaire d'abonnement à la newsletter.";

// Modèle de prompt avec des variables JavaScript
const prompt = `
Générer un wireframe de page web complète qui inclut les éléments suivants :

1. **En-tête (Header) :** ${headerDescription}
2. **Section Héros (Hero Section) :** ${heroSectionDescription}
3. **Grille de Contenu (Content Grid) :** ${contentGridDescription}
4. **Section Témoignages (Testimonials) :** ${testimonialsDescription}
5. **Carte de Produit (Product Card) :** ${productCardDescription}
6. **Formulaire de Contact (Contact Form) :** ${contactFormDescription}
7. **Section Blog (Blog Section) :** ${blogSectionDescription}
8. **Pied de Page (Footer) :** ${footerDescription}

L'ensemble doit être présenté dans un style de wireframe minimaliste, avec des placeholders pour les images et du texte indicatif. La mise en page doit être claire et facile à naviguer, avec une hiérarchie visuelle bien définie.
`;
// Afficher le prompt généré
console.log(prompt);

    try {

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `${prompt}`,
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
      const fileName = `${path}/WireFram_${dateStr}.webp`;
  
      const responseFetch = await fetch(imageUrl);
      const buffer = await responseFetch.buffer();
  
      fs.writeFile(fileName, buffer, (err) => {
        if (err) throw err;
        console.log(`Image du WireFram sauvegardée en tant que ${fileName}`);
      });
    } catch (error) {
      console.error('Erreur lors de la génération ou du téléchargement de l\'image :', error);
    }
  }
  
  main();