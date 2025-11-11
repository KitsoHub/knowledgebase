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
import { SiteData } from '@/lib/types/sitesData'



interface SiteListProps {
  sites: SiteData[]
}

export function SiteList({ sites}: SiteListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sensitivityFilter, setSensitivityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null)

  const filteredSites = sites
    .filter(site => {
      const matchesSearch =
        site.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter
      const matchesSensitivity =
        sensitivityFilter === 'all' || site.metadata?.sensitivity_level === sensitivityFilter


      return matchesSearch && matchesCategory && matchesSensitivity
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

  const toggleSensitivityLevel = (site: SiteData) => {
    const levels: ('public' | 'restricted' | 'closed')[] = [
      'public',
      'restricted',
      'closed',
    ]
    const currentIndex = levels.indexOf(site.metadata?.sensitivity_level)
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
     {sensitivityFilter && (
             <div className="flex gap-2">
              <Badge variant="outline">
                {
                  sites.filter(s => s.metadata?.sensitivity_level === 'public')
                    .length
                }{' '}
                Public
              </Badge>
              <Badge variant="outline">
                {
                  sites.filter(
                    s => s.metadata?.sensitivity_level === 'restricted'
                  ).length
                }{' '}
                Restricted
              </Badge>
              <Badge variant="outline">
                {
                  sites.filter(s => s.metadata?.sensitivity_level === 'closed')
                    .length
                }{' '}
                Closed
              </Badge>
            </div>
     )}
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
                    <h3 className="font-semibold text-lg">{site.site_name}</h3>
                    <Badge className={getCategoryColor(site.category)}>
                      {site.category}
                    </Badge>
                    <button
                      onClick={() => toggleSensitivityLevel(site)}
                      className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getSensitivityColor(site.metadata?.sensitivity_level)}`}
                    >
                      {site.metadata?.sensitivity_level}
                    </button>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {site.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {site.latitude}, {site.longitude}
                      </span>
                    </div>


                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {site.metadata?.unesco && (
                      <Badge className="text-xs bg-blue-50 text-blue-700">
                        UNESCO
                      </Badge>
                    )}
                    {site.metadata?.undp && (
                      <Badge className="text-xs bg-green-50 text-green-700">
                        UNDP
                      </Badge>
                    )}
                    {site.metadata?.unicef && (
                      <Badge className="text-xs bg-purple-50 text-purple-700">
                        UNICEF
                      </Badge>
                    )}

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
                          Are you sure you want to delete "{site.site_name}"? This
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
                    {selectedSite.site_name}
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
                {selectedSite.population_density && (
                  <p className="text-sm text-gray-600">
                    Population Density: {selectedSite.population_density}/km²
                  </p>
                )}
              </div>

              {/* Cultural Information */}


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

                  {selectedSite.metadata.local_context && (
                    <div>
                      <p className="text-sm font-medium">Local Context:</p>
                      <p className="text-sm text-gray-600">
                        {selectedSite.metadata.local_context}
                      </p>
                    </div>
                  )}

                  {selectedSite.metadata.indigenous_system && (
                    <div>
                      <p className="text-sm font-medium">Indigenous System:</p>
                      <p className="text-sm text-gray-600">
                        {selectedSite.metadata.indigenous_system}
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
                        className={`ml-2 ${getSensitivityColor(selectedSite.metadata?.sensitivity_level)}`}
                      >
                        {selectedSite.metadata?.sensitivity_level}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {/* Media Assets */}


              {/* Access Protocol */}
              {selectedSite.metadata.access_protocol && (
                <div>
                  <h4 className="font-medium mb-2">Access Protocol</h4>
                  <p className="text-sm text-gray-600">
                    {selectedSite.metadata.access_protocol}
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

export default SiteList;
