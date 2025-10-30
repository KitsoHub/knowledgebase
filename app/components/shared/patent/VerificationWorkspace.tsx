'use client'

import {
  mockApplications,
  PatentApplication,
} from '@/app/utils/mock/patent-data'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { CheckCircle, SearchIcon, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import NoApplicationSelected from './verification/NoApplicationSelected'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import SearchResults from './verification/SearchResults'
import VerificationTools from './verification/VerificationTools'
import ApplicationDetails from './verification/ApplicationDetails'

type SearchResult = {
  title: string
  relevance: 'High' | 'Medium' | 'Low'
  source: string
  publicationDate: string
}

export default function VerificationWorkspace() {
  const inVerification = mockApplications
    .filter(
      app =>
        app.stage === 'Verification' && app.assignedExaminer === 'Examiner 1'
    )
    .slice(0, 1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedApplication, setSelectedApplication] =
    useState<PatentApplication | null>(
      inVerification.length > 0 ? inVerification[0] : null
    )
  const [searchResults] = useState<SearchResult[]>([
    {
      title: 'Similar method for data processing',
      relevance: 'High',
      source: 'USPTO',
      publicationDate: '2025-04-15',
    },
    {
      title: 'Related system architecture',
      relevance: 'Medium',
      source: 'WIPO',
      publicationDate: '2025-05-23',
    },
    {
      title: 'Potentially overlapping claims',
      relevance: 'Medium',
      source: 'EPO',
      publicationDate: '2025-02-10',
    },
  ])

  return (
    <Card
      className={cn(
        'col-span-3',
        !selectedApplication ? 'ring-2 ring-patent-blue bg-patent-blue/5' : ''
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Verification Workspace</span>
          {!selectedApplication && (
            <div className="text-sm font-normal text-muted-foreground flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Drag an application here to begin verification
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedApplication ? (
          <NoApplicationSelected />
        ) : (
          <div className="grid grid-cols-2 gap-6 h-[500px]">
            {/* Left side: Application details */}
            <ApplicationDetails application={selectedApplication} />

            {/* Right side: Search and verification tools */}
            <div className="flex flex-col">
              <Tabs defaultValue="search">
                <TabsList className="w-full">
                  <TabsTrigger value="search" className="flex-1">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Prior Art Search
                  </TabsTrigger>
                  <TabsTrigger value="validate" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verification
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="search"
                  className="p-0 m-0 border rounded-lg mt-4"
                >
                  <SearchResults results={searchResults} />
                </TabsContent>

                <TabsContent
                  value="validate"
                  className="m-0 border rounded-lg mt-4"
                >
                  <VerificationTools />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
