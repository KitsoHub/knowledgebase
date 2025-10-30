'use client'

import { KnowledgeCard } from '@/app/components/shared/knowledge/knowledge-card'
import { knowledgeCategories } from '@/lib/knowledge-data'

export function KnowledgeGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {knowledgeCategories.map(category => (
        <KnowledgeCard key={category.id} category={category} />
      ))}
    </div>
  )
}
