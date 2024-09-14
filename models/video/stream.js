const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const openai = new OpenAI();

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "assistant", content: "initialisation mode:streaming" },
            { role: "user", content: "/dev this is stream:true on gpt-4o" }
        ],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();