import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog'
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Users,
  Globe,
  Shield,
} from 'lucide-react'

interface CulturalSite {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration'
  language?: string
  tribe?: string
  images: string[]
  videos: string[]
  audio: string[]
  metadata: {
    unesco: boolean
    undp: boolean
    unicef: boolean
    localContext: string
    indigenousSystem: string
    rights: string
    ipMetadata: string
    sensitivityLevel: 'public' | 'restricted' | 'closed'
    accessProtocol: string
  }
  populationDensity?: number
  migrationRoute?: string
  dateCreated: string
  lastUpdated: string
}

interface SiteListProps {
  sites: CulturalSite[]
  // onUpdateSite: (id: string, updates: Partial<CulturalSite>) => void
  // onDeleteSite: (id: string) => void
}

export function SiteList({ sites}: SiteListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sensitivityFilter, setSensitivityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null)

  const filteredSites = sites
    .filter(site => {
      const matchesSearch =
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.tribe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.language?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        categoryFilter === 'all' || site.category === categoryFilter
      const matchesSensitivity =
        sensitivityFilter === 'all' ||
        site.metadata.sensitivityLevel === sensitivityFilter

      return matchesSearch && matchesCategory && matchesSensitivity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'updated':
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          )
        case 'created':
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          )
        default:
          return 0
      }
    })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'heritage':
        return 'bg-amber-100 text-amber-800'
      case 'language':
        return 'bg-blue-100 text-blue-800'
      case 'botanical':
        return 'bg-green-100 text-green-800'
      case 'tribal':
        return 'bg-purple-100 text-purple-800'
      case 'migration':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSensitivityColor = (level: string) => {
    switch (level) {
      case 'public':
        return 'bg-green-100 text-green-800'
      case 'restricted':
        return 'bg-yellow-100 text-yellow-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleSensitivityLevel = (site: CulturalSite) => {
    const levels: ('public' | 'restricted' | 'closed')[] = [
      'public',
      'restricted',
      'closed',
    ]
    const currentIndex = levels.indexOf(site.metadata.sensitivityLevel)
    const nextIndex = (currentIndex + 1) % levels.length
    const newLevel = levels[nextIndex]

    // onUpdateSite(site.id, {
    //   metadata: {
    //     ...site.metadata,
    //     sensitivityLevel: newLevel,
    //   },
    // })
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Site Management</CardTitle>
          <p className="text-sm text-gray-600">
            Manage and organize cultural heritage sites
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search sites..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="heritage">Heritage</SelectItem>
                <SelectItem value="language">Language</SelectItem>
                <SelectItem value="botanical">Botanical</SelectItem>
                <SelectItem value="tribal">Tribal</SelectItem>
                <SelectItem value="migration">Migration</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sensitivityFilter}
              onValueChange={setSensitivityFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All access levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access Levels</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {filteredSites.length} of {sites.length} sites
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">
                {
                  sites.filter(s => s.metadata.sensitivityLevel === 'public')
                    .length
                }{' '}
                Public
              </Badge>
              <Badge variant="outline">
                {
                  sites.filter(
                    s => s.metadata.sensitivityLevel === 'restricted'
                  ).length
                }{' '}
                Restricted
              </Badge>
              <Badge variant="outline">
                {
                  sites.filter(s => s.metadata.sensitivityLevel === 'closed')
                    .length
                }{' '}
                Closed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sites List */}
      <div className="grid gap-4">
        {filteredSites.map(site => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{site.name}</h3>
                    <Badge className={getCategoryColor(site.category)}>
                      {site.category}
                    </Badge>
                    <button
                      onClick={() => toggleSensitivityLevel(site)}
                      className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getSensitivityColor(site.metadata.sensitivityLevel)}`}
                    >
                      {site.metadata.sensitivityLevel}
                    </button>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {site.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                      </span>
                    </div>

                    {site.language && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{site.language}</span>
                      </div>
                    )}

                    {site.tribe && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{site.tribe}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated {site.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {site.metadata.unesco && (
                      <Badge className="text-xs bg-blue-50 text-blue-700">
                        UNESCO
                      </Badge>
                    )}
                    {site.metadata.undp && (
                      <Badge className="text-xs bg-green-50 text-green-700">
                        UNDP
                      </Badge>
                    )}
                    {site.metadata.unicef && (
                      <Badge className="text-xs bg-purple-50 text-purple-700">
                        UNICEF
                      </Badge>
                    )}

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{site.images.length} images</span>
                      <span>•</span>
                      <span>{site.videos.length} videos</span>
                      <span>•</span>
                      <span>{site.audio.length} audio</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSite(site)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would open an edit modal/form
                      console.log('Edit site:', site.id)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Site</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{site.name}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {}}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No sites found
            </h3>
            <p className="text-gray-600">
              {searchQuery ||
              categoryFilter !== 'all' ||
              sensitivityFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'Start by adding your first cultural heritage site.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Site Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {selectedSite.name}
                    <Badge className={getCategoryColor(selectedSite.category)}>
                      {selectedSite.category}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSite.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSite(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-gray-600">
                  Latitude: {selectedSite.latitude}, Longitude:{' '}
                  {selectedSite.longitude}
                </p>
                {selectedSite.populationDensity && (
                  <p className="text-sm text-gray-600">
                    Population Density: {selectedSite.populationDensity}/km²
                  </p>
                )}
              </div>

              {/* Cultural Information */}
              {(selectedSite.language || selectedSite.tribe) && (
                <div>
                  <h4 className="font-medium mb-2">Cultural Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {selectedSite.language && (
                      <p>Language: {selectedSite.language}</p>
                    )}
                    {selectedSite.tribe && (
                      <p>Tribal Group: {selectedSite.tribe}</p>
                    )}
                    {selectedSite.migrationRoute && (
                      <p>Migration Route: {selectedSite.migrationRoute}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div>
                <h4 className="font-medium mb-2">Metadata & Standards</h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedSite.metadata.unesco && (
                      <Badge className="bg-blue-50 text-blue-700">UNESCO</Badge>
                    )}
                    {selectedSite.metadata.undp && (
                      <Badge className="bg-green-50 text-green-700">UNDP</Badge>
                    )}
                    {selectedSite.metadata.unicef && (
                      <Badge className="bg-purple-50 text-purple-700">
                        UNICEF
                      </Badge>
                    )}
                  </div>

                  {selectedSite.metadata.localContext && (
                    <div>
                      <p className="text-sm font-medium">Local Context:</p>
                      <p className="text-sm text-gray-600">
                        {selectedSite.metadata.localContext}
                      </p>
                    </div>
                  )}

                  {selectedSite.metadata.indigenousSystem && (
                    <div>
                      <p className="text-sm font-medium">Indigenous System:</p>
                      <p className="text-sm text-gray-600">
                        {selectedSite.metadata.indigenousSystem}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium">
                      Rights: {selectedSite.metadata.rights}
                    </p>
                    <p className="text-sm font-medium">
                      Access Level:
                      <Badge
                        className={`ml-2 ${getSensitivityColor(selectedSite.metadata.sensitivityLevel)}`}
                      >
                        {selectedSite.metadata.sensitivityLevel}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {/* Media Assets */}
              <div>
                <h4 className="font-medium mb-2">Media Assets</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">
                      Images ({selectedSite.images.length})
                    </p>
                    <div className="space-y-1 text-gray-600">
                      {selectedSite.images.slice(0, 3).map((image, index) => (
                        <p key={index} className="truncate">
                          {image}
                        </p>
                      ))}
                      {selectedSite.images.length > 3 && (
                        <p className="text-xs">
                          ...and {selectedSite.images.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">
                      Videos ({selectedSite.videos.length})
                    </p>
                    <div className="space-y-1 text-gray-600">
                      {selectedSite.videos.slice(0, 3).map((video, index) => (
                        <p key={index} className="truncate">
                          {video}
                        </p>
                      ))}
                      {selectedSite.videos.length > 3 && (
                        <p className="text-xs">
                          ...and {selectedSite.videos.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">
                      Audio ({selectedSite.audio.length})
                    </p>
                    <div className="space-y-1 text-gray-600">
                      {selectedSite.audio.slice(0, 3).map((audio, index) => (
                        <p key={index} className="truncate">
                          {audio}
                        </p>
                      ))}
                      {selectedSite.audio.length > 3 && (
                        <p className="text-xs">
                          ...and {selectedSite.audio.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Protocol */}
              {selectedSite.metadata.accessProtocol && (
                <div>
                  <h4 className="font-medium mb-2">Access Protocol</h4>
                  <p className="text-sm text-gray-600">
                    {selectedSite.metadata.accessProtocol}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
