'use client'

import { Leaf, BookOpen, History, Globe, Users, Microscope } from 'lucide-react'

import { Progress } from '@/app/components/ui/progress'

const categories = [
  {
    name: 'Academic Articles',
    count: 4250,
    percentage: 34,
    icon: BookOpen,
  },
  {
    name: 'Historical Artifacts',
    count: 2830,
    percentage: 22.7,
    icon: History,
  },
  {
    name: 'Flora Records',
    count: 1980,
    percentage: 15.9,
    icon: Leaf,
  },
  {
    name: 'Fauna Records',
    count: 1640,
    percentage: 13.1,
    icon: Globe,
  },
  {
    name: 'Indigenous Knowledge',
    count: 1120,
    percentage: 9,
    icon: Users,
  },
  {
    name: 'Scientific Data',
    count: 667,
    percentage: 5.3,
    icon: Microscope,
  },
]

export function CategoryBreakdown() {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category.name} className="space-y-2">
          <div className="flex items-center">
            <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{category.name}</span>
            <span className="ml-auto text-sm text-muted-foreground">
              {category.count.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={category.percentage} className="h-2" />
            <span className="text-xs text-muted-foreground w-10">
              {category.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
