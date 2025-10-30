'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  className?: string
}
export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      category-filter
      {/* tabs for desktop */}
      <Tabs
        value={selectedCategory}
        onValueChange={onSelectCategory}
        className="hidden md:block"
      >
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger
            value="all"
            className={cn(
              'rounded-md text-sm',
              selectedCategory === 'all'
                ? 'font-medium'
                : 'text-muted-foreground'
            )}
          >
            All Categories
          </TabsTrigger>
          {categories.map(item => (
            <TabsTrigger
              key={item}
              value={item}
              className={cn(
                'rounded-md text-sm',
                selectedCategory === item
                  ? 'font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* Mobile screen categories */}
      <div className="md:hidden overflow-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => onSelectCategory('all')}
          >
            All categories
          </Badge>

          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
