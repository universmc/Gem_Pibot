const express = require('express');
const Groq = require('groq-sdk');
const groq = new Groq();
const OpenAI = require("openai");
const openai = new OpenAI();

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

app.post('/api', async (req, res) => {
  try {
    const response = await openai.createCompletion("text-davinci-002", {
      prompt: req.body.text,
      max_tokens: 150
    });
    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});