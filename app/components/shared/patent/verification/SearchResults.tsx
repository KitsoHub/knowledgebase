import React from 'react'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'

interface SearchResult {
  title: string
  relevance: 'High' | 'Medium' | 'Low'
  source: string
  publicationDate: string
}

interface SearchResultsProps {
  results: SearchResult[]
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <>
      <div className="p-4 bg-muted">
        <h4 className="font-medium">Search Results</h4>
        <p className="text-sm text-muted-foreground">
          {results.length} potentially relevant patents found
        </p>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between">
                <h5 className="font-medium">{result.title}</h5>
                <Badge
                  className={cn(
                    result.relevance === 'High'
                      ? 'bg-patent-red/20 text-patent-red'
                      : 'bg-patent-yellow/20 text-patent-yellow'
                  )}
                >
                  {result.relevance} Relevance
                </Badge>
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span>{result.source}</span>
                <span className="mx-2">•</span>
                <span>Published: {result.publicationDate}</span>
              </div>
              <div className="mt-2 flex">
                <Button variant="outline" size="sm" className="mr-2">
                  View Full Patent
                </Button>
                <Button variant="outline" size="sm">
                  Compare Claims
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export default SearchResults
