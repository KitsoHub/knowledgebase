'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import { SiteData, SiteViewMode } from '@/lib/types/sitesData'
import { motion } from 'framer-motion'
import { useSites } from '@/app/hooks/use-sites'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Building2, Home, LocateFixedIcon, LocateIcon } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

// Dynamically load map (SSR-safe)
const BotswanaMap = dynamic(() => import('@/app/components/shared/map/botswana-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Loading Heritage Site Map...</p>
      </div>
    </div>
  )
})

export default function ExplorerPage() {
  const { sites, isLoading, isError, refreshSites } = useSites();
  const [siteData, setSiteData] = useState<SiteData[]>([])
  const [viewMode, setViewMode] = useState<SiteViewMode>("Heritage")
  const [showLayer, setShowLayer] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const [selectedSite, setSelectedSite] = useState<Partial<SiteData> | null>(null)
  const [sortBy, setSortBy] = useState('name')

  const heritageSitesData = sites.filter(
    site =>
      // site.metadata?.sensitivity_level === 'public' &&
      site.category_display === "Heritage"
  )

  const tribalSitesData = sites.filter(
    site =>
      // site.metadata?.sensitivity_level === 'public' &&
      site.category_display === "Tribal"
  )
  const currentData = viewMode === "Heritage" ? heritageSitesData : tribalSitesData


  const filteredSites = currentData.filter(site => {
    const matchesSearch =
      site.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter

    return matchesSearch && matchesCategory
  })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.site_name.localeCompare(b.site_name)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const handleItemSelect = (item: Partial<SiteData> | null) => {
    if (viewMode === "Heritage") {
      setSelectedSite(item as unknown as Partial<SiteData>)

    }
  }


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />
        <h1 className="text-4xl md:text-5xl mb-4">
          Cultural Heritage Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover and explore publicly accessible cultural heritage sites in
          Botswana.
        </p>
      </motion.div>
      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        <BotswanaMap
          viewMode={viewMode}
          siteData={filteredSites}
          onItemSelect={handleItemSelect}
          selectedItem={selectedSite}
          showLayer={showLayer}
        />
{selectedSite && (
  <div className='absolute bottom-4 right-4 z-[1000]'>
    <Card className="w-80 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
     <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 font-semibold">
                {viewMode === "Heritage" ? (
                  <LocateFixedIcon className="h-4 w-4 text-blue-500" />
                ) : (
                  <LocateIcon className="h-4 w-4 text-blue-500" />
                )}
                <span className="truncate">
                  {viewMode === "Heritage" ? selectedSite.site_name : selectedSite.description}
                </span>
              </CardTitle>
              <CardContent className='space-y-3'>
                             {viewMode === "Heritage" ? (
                <>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize text-xs">
                      {selectedSite.category_display}
                    </Badge>

                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Description:</span>
                     <span className="font-semibold text-lg">{selectedSite.description}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Population Density:</span>
                      <span className="font-semibold text-lg">{selectedSite.population_density}</span>
                    </div>


                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">District:</span>
                      <span className="font-medium text-sm">{selectedSite.migration_route}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize text-xs">
                      {selectedSite.category_display}
                    </Badge>

                  </div>

                  <div className="space-y-2">


                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Population Density:</span>
                      <span className="font-semibold text-lg text-green-600">

                        <span className="text-sm font-normal">{selectedSite.population_density}</span>
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600 leading-relaxed">{selectedSite.description}</p>
                    </div>
                  </div>
                </>
              )}

                <div className="pt-2 border-t">
                <div className="text-xs text-gray-500 font-mono">
                         <div className="mt-6">
              <Button
                asChild
                variant={'secondary'}
                className="transition-all duration-300"
              >
                <Link href={`/map/${selectedSite.id}`}>View Details</Link>
              </Button>
            </div>
                </div>
                </div>
              </CardContent>
     </CardHeader>
    </Card>

  </div>
) }
      </div>


    </div>
  )
}
