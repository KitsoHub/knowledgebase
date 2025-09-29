import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { MapPin, Search, Filter, Eye, Users, Calendar, Globe, Image, Video, Music } from 'lucide-react';

interface CulturalSite {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration';
  language?: string;
  tribe?: string;
  images: string[];
  videos: string[];
  audio: string[];
  metadata: {
    unesco: boolean;
    undp: boolean;
    unicef: boolean;
    localContext: string;
    indigenousSystem: string;
    rights: string;
    ipMetadata: string;
    sensitivityLevel: 'public' | 'restricted' | 'closed';
    accessProtocol: string;
  };
  populationDensity?: number;
  migrationRoute?: string;
  dateCreated: string;
  lastUpdated: string;
}

interface PublicViewProps {
  sites: CulturalSite[];
}

export function PublicView({ sites }: PublicViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Only show public sites
  const publicSites = sites.filter(site => site.metadata.sensitivityLevel === 'public');

  const filteredSites = publicSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.tribe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.language?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || site.language === languageFilter;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const uniqueLanguages = [...new Set(publicSites.map(site => site.language).filter(Boolean))];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'heritage': return 'bg-amber-100 text-amber-800';
      case 'language': return 'bg-blue-100 text-blue-800';
      case 'botanical': return 'bg-green-100 text-green-800';
      case 'tribal': return 'bg-purple-100 text-purple-800';
      case 'migration': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heritage': return '🏛️';
      case 'language': return '🗣️';
      case 'botanical': return '🌿';
      case 'tribal': return '👥';
      case 'migration': return '🛤️';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Cultural Heritage Explorer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and explore publicly accessible cultural heritage sites, languages, 
          botanical knowledge, and migration trails from indigenous communities worldwide.
        </p>
        <div className="flex justify-center items-center gap-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{publicSites.length} Public Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{uniqueLanguages.length} Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Global Coverage</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cultural sites, languages, tribes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="heritage">Heritage Sites</SelectItem>
                <SelectItem value="language">Language Sites</SelectItem>
                <SelectItem value="botanical">Botanical Sites</SelectItem>
                <SelectItem value="tribal">Tribal Sites</SelectItem>
                <SelectItem value="migration">Migration Routes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {uniqueLanguages.map(language => (
                  <SelectItem key={language} value={language!}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {filteredSites.length} of {publicSites.length} sites
            </p>
            <div className="flex gap-2">
              {['heritage', 'language', 'botanical', 'tribal', 'migration'].map(category => {
                const count = filteredSites.filter(site => site.category === category).length;
                return count > 0 ? (
                  <Badge key={category} variant="outline" className="text-xs">
                    {getCategoryIcon(category)} {count}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sites Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <Card key={site.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span>{getCategoryIcon(site.category)}</span>
                      {site.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoryColor(site.category)}>
                        {site.category}
                      </Badge>
                      {site.language && (
                        <Badge variant="outline" className="text-xs">
                          {site.language}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">{site.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{site.latitude.toFixed(2)}, {site.longitude.toFixed(2)}</span>
                  </div>
                  
                  {site.tribe && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{site.tribe}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {site.images.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        <span>{site.images.length}</span>
                      </div>
                    )}
                    {site.videos.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        <span>{site.videos.length}</span>
                      </div>
                    )}
                    {site.audio.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Music className="h-3 w-3" />
                        <span>{site.audio.length}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSite(site)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {site.metadata.unesco && <Badge className="text-xs bg-blue-50 text-blue-700">UNESCO</Badge>}
                  {site.metadata.undp && <Badge className="text-xs bg-green-50 text-green-700">UNDP</Badge>}
                  {site.metadata.unicef && <Badge className="text-xs bg-purple-50 text-purple-700">UNICEF</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSites.map(site => (
            <Card key={site.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getCategoryIcon(site.category)}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{site.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getCategoryColor(site.category)}>
                            {site.category}
                          </Badge>
                          {site.language && (
                            <Badge variant="outline" className="text-xs">
                              {site.language}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{site.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}</span>
                      </div>
                      
                      {site.tribe && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{site.tribe}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Added {site.dateCreated}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {site.metadata.unesco && <Badge className="text-xs bg-blue-50 text-blue-700">UNESCO</Badge>}
                        {site.metadata.undp && <Badge className="text-xs bg-green-50 text-green-700">UNDP</Badge>}
                        {site.metadata.unicef && <Badge className="text-xs bg-purple-50 text-purple-700">UNICEF</Badge>}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {site.images.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            <span>{site.images.length} images</span>
                          </div>
                        )}
                        {site.videos.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            <span>{site.videos.length} videos</span>
                          </div>
                        )}
                        {site.audio.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Music className="h-3 w-3" />
                            <span>{site.audio.length} audio</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSite(site)}
                    className="ml-4"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredSites.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sites found</h3>
            <p className="text-gray-600">
              {searchQuery || categoryFilter !== 'all' || languageFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'No public sites are currently available.'}
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
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">{getCategoryIcon(selectedSite.category)}</span>
                    {selectedSite.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getCategoryColor(selectedSite.category)}>
                      {selectedSite.category}
                    </Badge>
                    {selectedSite.language && (
                      <Badge variant="outline">
                        {selectedSite.language}
                      </Badge>
                    )}
                    <Badge className="bg-green-100 text-green-800">Public Access</Badge>
                  </div>
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
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedSite.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Latitude: {selectedSite.latitude}</p>
                    <p>Longitude: {selectedSite.longitude}</p>
                    {selectedSite.populationDensity && (
                      <p>Population Density: {selectedSite.populationDensity}/km²</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cultural Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {selectedSite.language && <p>Language: {selectedSite.language}</p>}
                    {selectedSite.tribe && <p>Community: {selectedSite.tribe}</p>}
                    {selectedSite.migrationRoute && <p>Migration Route: {selectedSite.migrationRoute}</p>}
                  </div>
                </div>
              </div>

              {selectedSite.metadata.localContext && (
                <div>
                  <h4 className="font-medium mb-2">Cultural Context</h4>
                  <p className="text-sm text-gray-600">{selectedSite.metadata.localContext}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Standards & Compliance</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSite.metadata.unesco && <Badge className="bg-blue-50 text-blue-700">UNESCO Standards</Badge>}
                  {selectedSite.metadata.undp && <Badge className="bg-green-50 text-green-700">UNDP Guidelines</Badge>}
                  {selectedSite.metadata.unicef && <Badge className="bg-purple-50 text-purple-700">UNICEF Standards</Badge>}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Rights & Access</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Rights:</span> {selectedSite.metadata.rights}</p>
                  <p><span className="font-medium">Access Protocol:</span> {selectedSite.metadata.accessProtocol}</p>
                </div>
              </div>

              {(selectedSite.images.length > 0 || selectedSite.videos.length > 0 || selectedSite.audio.length > 0) && (
                <div>
                  <h4 className="font-medium mb-3">Media Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedSite.images.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Image className="h-4 w-4" />
                          <span className="text-sm font-medium">Images ({selectedSite.images.length})</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          {selectedSite.images.slice(0, 3).map((image, index) => (
                            <p key={index} className="truncate">{image}</p>
                          ))}
                          {selectedSite.images.length > 3 && (
                            <p>...and {selectedSite.images.length - 3} more</p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedSite.videos.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="h-4 w-4" />
                          <span className="text-sm font-medium">Videos ({selectedSite.videos.length})</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          {selectedSite.videos.slice(0, 3).map((video, index) => (
                            <p key={index} className="truncate">{video}</p>
                          ))}
                          {selectedSite.videos.length > 3 && (
                            <p>...and {selectedSite.videos.length - 3} more</p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedSite.audio.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Music className="h-4 w-4" />
                          <span className="text-sm font-medium">Audio ({selectedSite.audio.length})</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          {selectedSite.audio.slice(0, 3).map((audio, index) => (
                            <p key={index} className="truncate">{audio}</p>
                          ))}
                          {selectedSite.audio.length > 3 && (
                            <p>...and {selectedSite.audio.length - 3} more</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-500">
                <div>
                  <p>Added on {selectedSite.dateCreated}</p>
                  <p>Last updated {selectedSite.lastUpdated}</p>
                </div>
                <div className="text-right">
                  <p>Site ID: {selectedSite.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}