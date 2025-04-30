import { OpenAI } from 'openai';


// Initialize OpenAIApi with API key directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw new Error('Failed to get response from OpenAI');
  }
}

