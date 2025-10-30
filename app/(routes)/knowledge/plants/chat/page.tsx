'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Send, Sprout } from 'lucide-react'
import { useToast } from '@/app/hooks/use-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

export default function PlantChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { role: 'user' as const, content: input }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/plants/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: input }),
        })

        if (!response.ok) throw new Error('Failed to get response')

        const data = await response.json()
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: data.content,
            sources: data.sources,
          },
        ])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: 'Error',
          description:
            'Failed to get response from PlantBot. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container py-6 md:py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold">
            <Sprout className="h-8 w-8" />
            Chat with PlantBot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-[500px] space-y-4 overflow-y-auto rounded-lg bg-muted p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.sources && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Sources: {message.sources.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about indigenous plants..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
