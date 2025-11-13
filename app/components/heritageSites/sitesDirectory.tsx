'use client'
import {  } from '@/lib/types/community'
import {
  Calendar,
  Crown,
  Filter,
  MapPin,
  Search,
  TreePine,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { useCommunityCreationStore } from '@/lib/store/communityCreation'
import { useCommunityStore } from '@/lib/store/communityStore'
import {
  CommunityGovernance,
  CulturalProtocol,
  SiteSensitivityLevel,
} from '@/lib/constants/community'
import { useSites } from '@/app/hooks/use-sites'
import { SiteData } from '@/lib/types/sitesData'

interface DirectoryProps {
  onNavigate?: (view: string) => void
}
export function SitesDirectory({ onNavigate }: DirectoryProps) {

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [sensitivityFilter, setSensitivityFilter] = useState<string>('all')
      const [sortBy, setSortBy] = useState('name')
  const [selectedGovernance, setSelectedGovernance] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const { communities, setCurrentCommunity } = useCommunityStore()
  const { sites, isLoading, isError, refreshSites } = useSites();
//   to set current site to view details

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

    const sensitivityIcons = {
      [SiteSensitivityLevel.RESTRICTED]: Crown,
      [SiteSensitivityLevel.PUBLIC]: Users,
      [SiteSensitivityLevel.CLOSED]: TreePine,
    }

  const governanceIcons = {
    [CommunityGovernance.ELDER_COUNCIL]: Crown,
    [CommunityGovernance.INDIGENOUS_COUNCIL]: Users,
    [CommunityGovernance.STEWARDSHIP_CIRCLE]: TreePine,
  }

  const governanceColors = {
    [CommunityGovernance.ELDER_COUNCIL]:
      'bg-secondary text-secondary-foreground',
    [CommunityGovernance.INDIGENOUS_COUNCIL]:
      'bg-primary text-primary-foreground',
    [CommunityGovernance.STEWARDSHIP_CIRCLE]: 'bg-green-600 text-white',
  }

  const protocolColors = {
    [CulturalProtocol.PUBLIC]: 'protocol-public',
    [CulturalProtocol.COMMUNITY_ONLY]: 'protocol-community',
    [CulturalProtocol.ELDER_APPROVAL_REQUIRED]: 'protocol-restricted',
    [CulturalProtocol.GENDER_RESTRICTED]: 'protocol-restricted',
  }

 const filteredSites = sites.filter(site => {
      const matchesSearch =
        site.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description?.toLowerCase().includes(searchQuery.toLowerCase())

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

  const regions = Array.from(
    new Set(
      communities
        .map(c => c.identity.region)
        .filter((region): region is string => Boolean(region))
    )
  )

  const handleViewSite= () => {
        console.log('To View site:')
    // console.log('To View site:', community.communityIdentifier)
    // setCurrentCommunity(community)
    // onNavigate?.('community-dashboard')
  }
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2"> Directory</h2>
        <p className="text-muted-foreground">
          Discover Heritage sites
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Governance Model
                  </label>
                  <Select
                    value={selectedGovernance}
                    onValueChange={setSelectedGovernance}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Governance Models</SelectItem>
                      <SelectItem value={CommunityGovernance.ELDER_COUNCIL}>
                        Elder Council
                      </SelectItem>
                      <SelectItem
                        value={CommunityGovernance.INDIGENOUS_COUNCIL}
                      >
                        Indigenous Council
                      </SelectItem>
                      <SelectItem
                        value={CommunityGovernance.STEWARDSHIP_CIRCLE}
                      >
                        Stewardship Circle
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Region
                  </label>
                  <Select
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredSites.length} sites found
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Map View
          </Button>
          <Button variant="outline" size="sm">
            List View
          </Button>
        </div>
      </div>

      {/*  Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map(site => {
          const GovernanceIcon = site.metadata?.sensitivity_level
            ? sensitivityIcons[site.metadata?.sensitivity_level.toLocaleUpperCase() as SiteSensitivityLevel]
            : Crown

          return (
            <Card
              key={site.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 font-cultural">
                      {site.site_name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {site.description}
                    </CardDescription>
                  </div>
                  <Badge
                    className={`${sensitivityIcons[site.metadata?.sensitivity_level.toLocaleUpperCase() as SiteSensitivityLevel]} flex items-center space-x-1`}
                  >
                    <GovernanceIcon className="w-3 h-3" />
                    <span className="text-xs">
                      {site.metadata?.sensitivity_level.toLocaleUpperCase() ===
                      SiteSensitivityLevel.PUBLIC
                        ? 'Public'
                        : site.metadata?.sensitivity_level.toLocaleUpperCase() ===
                            SiteSensitivityLevel.CLOSED
                          ? 'Closed'
                          : 'Restricted'}
                    </span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {community.identity.region}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Est.{' '}
                    {community.identity.establishedDate
                      ? typeof community.identity.establishedDate === 'string'
                        ? community.identity.establishedDate
                        : community.identity.establishedDate.toLocaleDateString()
                      : ''}
                  </div>
                </div> */}

                {/* Affiliates */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Affiliates:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
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

                {/* Cultural Protocols */}
                {/* <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Cultural Protocols:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {community.protocols.map((protocol, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`text-xs ${protocolColors[protocol] || ''}`}
                      >
                        {protocol.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div> */}

                {/* Leadership */}
                {/* <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Leadership:
                  </p>
                  <div className="text-sm">
                    <p className="font-medium">
                      {community.identity.leadership?.primaryContact.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {community.identity.leadership?.primaryContact
                        .culturalTitle ||
                        community.identity.leadership?.primaryContact.role}
                    </p>
                  </div>

                  {community.identity.leadership?.eldersCouncil &&
                    community.identity.leadership.eldersCouncil?.length > 0 && (
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <Crown className="w-3 h-3 mr-1" />
                        {
                          community.identity.leadership.eldersCouncil.length
                        }{' '}
                        Elder
                        {community.identity.leadership.eldersCouncil.length > 1
                          ? 's'
                          : ''}{' '}
                        in Council
                      </div>
                    )}
                </div> */}

                {/* Stats */}
                {/* <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center">
                  <div>
                    <p className="text-lg font-semibold text-primary">
                      {community.stats.totalItems}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Knowledge Items
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-primary">
                      {community.stats.memberCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                </div> */}

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleViewSite()}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredSites.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Sites found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setCategoryFilter('all')
                setSelectedRegion('all')
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
