const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getCareerAdvice(message) {

    const response = await client.responses.create({
        model: "gpt-5-mini",
        input: `
You are CareerForge, an AI career and interview coach.

Give practical, concise and beginner-friendly career advice.

User question:
${message}
        `
    });

    return response.output_text;
}

module.exports = getCareerAdvice;
