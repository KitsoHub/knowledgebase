import { NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/openai'
import { getmedChatResponse } from '@/lib/medicine-chat'

export async function POST(request: Request) {
  try {
    const { messages, category } = await request.json()
    const userMessage = messages[messages.length - 1].content.toLowerCase()
    const documentPath = 'public/documents/botswana-plants.pdf'
    const isPlantRelated =
      /plants?|indigenous plants?|botswana plants?|medicinal plants?/i.test(
        userMessage
      )

    if (isPlantRelated) {
      const { content, sources } = await getmedChatResponse(
        userMessage,
        documentPath
      )
      return NextResponse.json({
        message: content,
        source: sources[0] || 'botswana-plants.pdf',
      })
    } else {
      const systemMessage = {
        role: 'system',
        content: `You are KitsoAI, an expert on Botswana's indigenous knowledge, specifically about ${category}.
                    Provide accurate, culturally sensitive information based on traditional knowledge.
                    Keep responses concise and informative.`,
      }
      const response = await getChatResponse([systemMessage, ...messages])
      return NextResponse.json({
        message: response,
        source: 'General knowledge',
      })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}
