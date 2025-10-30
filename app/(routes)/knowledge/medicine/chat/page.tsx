'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Send } from 'lucide-react'
import { knowledgeCategories } from '@/lib/knowledge-data'
import { useToast } from '@/app/hooks/use-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function KitsoChatPage() {
  const params = useParams()
  const category = knowledgeCategories.find(c => c.id === params.category)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement | null>(null) // Ref to scroll to the latest message
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null) // To highlight the latest message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async (presetInput?: string) => {
    const content = presetInput || input

    if (content.trim() && !isLoading) {
      const userMessage = { role: 'user' as const, content }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            category: category?.title || 'Indigenous Knowledge',
          }),
        })

        if (!response.ok) throw new Error('Failed to get response')

        const data = await response.json()

        // bypass eslint
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message.content,
        }

        setMessages(prev => [...prev, assistantMessage])
        setHighlightedIndex(messages.length) // Highlight the new response
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Failed to get response from KitsoAI. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Scroll to the latest message whenever the messages array changes
  useEffect(() => {
    scrollToBottom()
    if (highlightedIndex !== null) {
      const timer = setTimeout(() => setHighlightedIndex(null), 3000) // Remove highlight after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [messages, highlightedIndex])

  return (
    <div className="container py-6 md:py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Ask KitsoAI about {category?.title || 'Indigenous Knowledge'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-[500px] space-y-4 overflow-y-auto rounded-lg bg-muted p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : `bg-secondary ${
                          index === highlightedIndex
                            ? 'ring-2 ring-purple-500'
                            : ''
                        }`
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset FAQ Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              className="faq-button"
              onClick={() => handleSend('What are remedies for headaches?')}
            >
              A headache remedy please
            </button>
            <button
              className="faq-button"
              onClick={() => handleSend('What are remedies for back pain?')}
            >
              A back pain remedy please
            </button>
          </div>

          {/* Input and Send Button */}
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about traditional knowledge..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button onClick={() => handleSend()} disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
