import { openai } from './openai'
import { loadStore } from './document-store'

export async function getmedChatResponse(
  question: string,
  documentPath: string
) {
  try {
    console.log(documentPath)
    const store = await loadStore(documentPath)
    const results = await store.similaritySearch(question, 1)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `You are PlantBot, an expert on Botswana's indigenous plants and their traditional uses as medicines.
                   Answer questions based on the provided context from verified documents about local plants.
                   If you cannot answer with the given context, acknowledge that and suggest asking about documented plants.`,
        },
        {
          role: 'user',
          content: `Answer the following question using the provided context about indigenous plants.
                   Question: ${question}
                   Context: ${results.map(r => r.pageContent).join('\n')}`,
        },
      ],
    })

    return {
      content: response.choices[0].message.content,
      sources: results.map(r => r.metadata.source),
    }
  } catch (error) {
    console.error('Plant Chat Error:', error)
    throw new Error('Failed to get response from PlantBot')
  }
}
