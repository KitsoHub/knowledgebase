import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getChatResponse(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    })

    return chatCompletion.choices[0].message
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}
