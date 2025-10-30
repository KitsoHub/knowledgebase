'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { memo } from 'react'
import { Message } from '@/lib/types'
import { generateUUID } from '@/lib/utils'
import { Overview } from './overview'

interface SuggestedActionsProps {
  appendAndTrigger: (message: Message) => Promise<void>
}

function PureSuggestedActions({ appendAndTrigger }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Explain the significance',
      label: 'of traditional ceremonies in Botswana',
      action: 'Explain the significance of traditional ceremonies in Botswana',
    },
    {
      title: 'Describe the traditional',
      label: `dances of the Tswana people`,
      action: `Describe the traditional dances of the Tswana people`,
    },
    {
      title: 'What are the common',
      label: `indigenous foods in Botswana?`,
      action: `What are the common indigenous foods in Botswana?`,
    },
    {
      title: 'Tell me about the history',
      label: 'of the San people in Botswana',
      action: 'Tell me about the history of the San people in Botswana',
    },
  ]

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-3xl mx-auto p-4">
      {/* Overview Section */}
      <Overview />
      <div className="grid sm:grid-cols-2 gap-2 w-full">
        {suggestedActions.map((suggestedAction, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * index }}
            key={`suggested-action-${suggestedAction.title}-${index}`}
            className={index > 1 ? 'hidden sm:block' : 'block'}
          >
            <Button
              variant="ghost"
              onClick={async () => {
                console.log(`Action clicked: ${suggestedAction.action}`)
                await appendAndTrigger({
                  id: generateUUID(),
                  role: 'user',
                  content: suggestedAction.action,
                })
              }}
              className="md:pb-5 text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 lg:h-[70px] md:h-[60px] sm:flex-col w-full h-auto justify-start items-start"
            >
              <span className="font-medium">{suggestedAction.title}</span>
              <span className="text-muted-foreground">
                {suggestedAction.label}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const SuggestedActions = memo(PureSuggestedActions, () => true)
