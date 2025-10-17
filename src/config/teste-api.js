import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // sua variável do Vite
});

async function testarAPI() {
  try {
    const resposta = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Diga apenas: API funcionando!" }],
    });

    console.log(resposta.choices[0].message.content);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

testarAPI();
