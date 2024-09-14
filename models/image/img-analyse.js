const OpenAI = require("openai");

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-hsDz58BxUCy74BZ6VdsPqHY7/user-Zr2B1GVVRF27gK9k3TZoU2in/img-WWVdStI9jKLgmFE8ZDTJSZ9K.png?st=2024-09-11T14%3A14%3A00Z&se=2024-09-11T16%3A14%3A00Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-10T23%3A23%3A08Z&ske=2024-09-11T23%3A23%3A08Z&sks=b&skv=2024-08-04&sig=Lzy9w4FrRi6fXdhP9ewtH%2BTI2tBzEAYsV/PlwjK8mrQ%3D",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();