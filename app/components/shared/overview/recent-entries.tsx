'use client'

import { Leaf, BookOpen, History, Globe, Users } from 'lucide-react'
const recentEntries = [
  {
    id: 1,
    title: 'Traditional Medicinal Plants',
    category: 'Flora',
    source: 'Indigenous Knowledge Repository',
    date: '2 hours ago',
    icon: Leaf,
  },
  {
    id: 2,
    title: 'Comparative Analysis of Migration Patterns',
    category: 'Academic',
    source: 'Journal of Anthropological Studies',
    date: '1 day ago',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Oral Histories of Traditional Fishing Practices',
    category: 'Indigenous Knowledge',
    source: 'Cultural Preservation Project',
    date: '2 days ago',
    icon: Users,
  },
  {
    id: 4,
    title: 'Endangered Species Documentation in the Okavango Delta',
    category: 'Fauna',
    source: 'Biodiversity Research Institute',
    date: '1 day ago',
    icon: Globe,
  },
  {
    id: 5,
    title: 'Archaeological Findings in Kanye Sites',
    category: 'Artifacts',
    source: 'Historical Archives',
    date: '5 hours ago',
    icon: History,
  },
]

export function RecentEntries() {
  return (
    <div className="space-y-4">
      {recentEntries.map(entry => (
        <div key={entry.id} className="flex items-center space-x-4">
          <div className="rounded-md bg-primary/10 p-2">
            <entry.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{entry.title}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{entry.category}</span>
              <span className="mx-1">•</span>
              <span>{entry.source}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
