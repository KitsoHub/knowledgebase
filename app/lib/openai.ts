import { OpenAIApi } from 'openai';

// Initialize OpenAIApi with API key directly
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return chatCompletion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw new Error('Failed to get response from OpenAI');
  }
}
