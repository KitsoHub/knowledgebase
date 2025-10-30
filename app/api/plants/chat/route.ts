import { NextResponse } from 'next/server'
import { getPlantChatResponse } from '@/lib/plant-chat'

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    // In production, you'd want to handle document paths more securely
    const documentPath = 'public/documents/botswana-plants.pdf'

    const response = await getPlantChatResponse(question, documentPath)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Plant Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from PlantBot' },
      { status: 500 }
    )
  }
}
