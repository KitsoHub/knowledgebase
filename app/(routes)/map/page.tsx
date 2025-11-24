'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { SiteData, SiteViewMode } from '@/lib/types/sitesData'
import { motion } from 'framer-motion'
import { useSites } from '@/app/hooks/use-sites'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Building2, Eye, EyeOff, Home, Layers, LocateFixedIcon, LocateIcon, Search, UserCircle2Icon } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { Input } from '@/app/components/ui/input'
import { useSiteStore } from '@/lib/store/siteStore'

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
  const { setCurrentSite} = useSiteStore();

  const [searchTerm, setSearchTerm] = useState("")

  const [selectedSite, setSelectedSite] = useState<Partial<SiteData> | null>(null)



  useEffect(()=>{
    setSiteData(sites)
  },[sites])
  const heritageSitesData = siteData.filter(
    site =>
      // site.metadata?.sensitivity_level === 'public' &&
      site.category_display === "Heritage"
  )

  const tribalSitesData = siteData.filter(
    site =>
      // site.metadata?.sensitivity_level === 'public' &&
      site.category_display === "Tribal"
  )
  const currentData = viewMode === "Heritage" ? heritageSitesData : tribalSitesData


  const filteredSites = currentData.filter((item) => {
    const searchFields =
      viewMode === "Heritage"
        ? [item.site_name, item.category, item.category_display]
        : [ item.description, item.status_display]

    return searchFields.some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const handleItemSelect = (item: Partial<SiteData> | null) => {
    if (viewMode === "Heritage") {
      setSelectedSite(item as unknown as Partial<SiteData>)
      setCurrentSite(item)
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
        <div className='absolute top-90 left-4 z-[1000]'>
           <Card className="w-72 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
           <CardContent className="p-3">
                        <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={viewMode === "Heritage" ? "Search heritage sites..." : "Search tribes, languages..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-gray-50 focus:bg-white transition-colors text-sm"
              />
            </div>
                        {searchTerm && (
              <div className="mt-2 max-h-32 overflow-y-auto space-y-1">
                {filteredSites.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                    onClick={() => {
                      handleItemSelect(item)
                      setSearchTerm("")
                    }}
                  >
                    {viewMode === "Heritage" ? (
                      <div>
                        <div className="font-medium text-xs">{item.site_name}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-xs">{item.category_display}</div>
                        <div className="text-xs text-gray-500">{item.status_display}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

           </CardContent>

           </Card>

        </div>

        {/* legend */}
              <div className="absolute top-90 right-28 z-[1000]">
                 <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                 <CardContent className="p-3 space-y-3">
                             {/* Mode & Control Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "Heritage" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("Heritage")}
                className="h-7 px-2 text-xs border"
              >
                <LocateFixedIcon className="h-3 w-3 mr-1" />
                Heritage
              </Button>
              <Button
                variant={viewMode === "Tribal" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("Tribal")}
                className="h-7 px-2 text-xs border"
              >
                <UserCircle2Icon className="h-3 w-3 mr-1" />
                Tribal
              </Button>
              <Button
                variant={showLayer ? "default" : "outline"}
                size="sm"
                onClick={() => setShowLayer(!showLayer)}
                className="h-7 px-2 text-xs border"
              >
                {showLayer ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </Button>
            </div>

                 {/* legend */}
                 <div className="border-t pt-2">
                                <div className="flex items-center gap-1 mb-2">
                <Layers className="h-3 w-3" />
                <span className="text-xs font-medium">
                  {viewMode === "Heritage" ? "Heritage Sites" : "Tribal Sites"}
                </span>
              </div>
              <div className="space-y-1">
                 {viewMode === "Heritage" ? (
                  <>
                                  <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>UNESCO</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>UNDP</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>UNICEF</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>SADC</span>
                    </div>

                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>2000 km2</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{tribalSitesData.length}</span>
                    </div>

                  </>
                )}

              </div>

                 </div>
                 </CardContent>

                 </Card>
              </div>
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
                          variant={'outline'}
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
        )}
      </div>


    </div>
  )
}
