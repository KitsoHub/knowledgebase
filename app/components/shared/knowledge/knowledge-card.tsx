/* eslint-disable @next/next/no-img-element */
'use client'

import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { KnowledgeCategory } from '@/lib/knowledge-data'

interface KnowledgeCardProps {
  category: KnowledgeCategory
}

export function KnowledgeCard({ category }: KnowledgeCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={category.thumbnail}
            alt={category.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">
            {category.title}
          </h3>
          <p className="text-white/90 mb-4 line-clamp-2">
            {category.description}
          </p>
          <Button asChild className="w-full" variant="secondary">
            <Link href={`/knowledge/${category.id}/chat`}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask KitsoAI
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
