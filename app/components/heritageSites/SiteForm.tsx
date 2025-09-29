import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Plus, X, Upload, MapPin, Globe, Shield, FileText, Users } from 'lucide-react';

interface CulturalSite {
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
}

interface SiteFormProps {
  onSubmit: (site: CulturalSite) => void;
  initialData?: Partial<CulturalSite>;
}

export function SiteForm({ onSubmit, initialData }: SiteFormProps) {
  const [formData, setFormData] = useState<CulturalSite>({
    name: initialData?.name || '',
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    description: initialData?.description || '',
    category: initialData?.category || 'heritage',
    language: initialData?.language || '',
    tribe: initialData?.tribe || '',
    images: initialData?.images || [],
    videos: initialData?.videos || [],
    audio: initialData?.audio || [],
    metadata: {
      unesco: initialData?.metadata?.unesco || false,
      undp: initialData?.metadata?.undp || false,
      unicef: initialData?.metadata?.unicef || false,
      localContext: initialData?.metadata?.localContext || '',
      indigenousSystem: initialData?.metadata?.indigenousSystem || '',
      rights: initialData?.metadata?.rights || '',
      ipMetadata: initialData?.metadata?.ipMetadata || '',
      sensitivityLevel: initialData?.metadata?.sensitivityLevel || 'public',
      accessProtocol: initialData?.metadata?.accessProtocol || '',
    },
    populationDensity: initialData?.populationDensity || 0,
    migrationRoute: initialData?.migrationRoute || '',
  });

  const [newMedia, setNewMedia] = useState({ images: '', videos: '', audio: '' });

  const handleInputChange = (field: keyof CulturalSite, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMetadataChange = (field: keyof CulturalSite['metadata'], value: any) => {
    setFormData(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: value }
    }));
  };

  const addMedia = (type: 'images' | 'videos' | 'audio') => {
    if (newMedia[type].trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], newMedia[type].trim()]
      }));
      setNewMedia(prev => ({ ...prev, [type]: '' }));
    }
  };

  const removeMedia = (type: 'images' | 'videos' | 'audio', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: '',
      latitude: 0,
      longitude: 0,
      description: '',
      category: 'heritage',
      language: '',
      tribe: '',
      images: [],
      videos: [],
      audio: [],
      metadata: {
        unesco: false,
        undp: false,
        unicef: false,
        localContext: '',
        indigenousSystem: '',
        rights: '',
        ipMetadata: '',
        sensitivityLevel: 'public',
        accessProtocol: '',
      },
      populationDensity: 0,
      migrationRoute: '',
    });
    setNewMedia({ images: '', videos: '', audio: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="cultural" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Cultural Data
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="standards" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Standards
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Access Control
          </TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Location & Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Site Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter site name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heritage">Heritage Site</SelectItem>
                      <SelectItem value="language">Language Site</SelectItem>
                      <SelectItem value="botanical">Botanical Site</SelectItem>
                      <SelectItem value="tribal">Tribal Site</SelectItem>
                      <SelectItem value="migration">Migration Route</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 40.7128"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., -74.0060"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the site"
                  rows={4}
                  required
                />
              </div>

              {formData.category === 'migration' && (
                <div>
                  <Label htmlFor="migrationRoute">Migration Route Name</Label>
                  <Input
                    id="migrationRoute"
                    value={formData.migrationRoute}
                    onChange={(e) => handleInputChange('migrationRoute', e.target.value)}
                    placeholder="e.g., Eastern Woodland Trail"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="populationDensity">Population Density (per km²)</Label>
                <Input
                  id="populationDensity"
                  type="number"
                  value={formData.populationDensity}
                  onChange={(e) => handleInputChange('populationDensity', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 250"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cultural Data */}
        <TabsContent value="cultural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cultural & Linguistic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Primary Language</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    placeholder="e.g., Mohawk, Ojibwe, Cherokee"
                  />
                </div>
                <div>
                  <Label htmlFor="tribe">Tribal Group/Community</Label>
                  <Input
                    id="tribe"
                    value={formData.tribe}
                    onChange={(e) => handleInputChange('tribe', e.target.value)}
                    placeholder="e.g., Haudenosaunee, Anishinaabe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="localContext">Local Context System</Label>
                <Textarea
                  id="localContext"
                  value={formData.metadata.localContext}
                  onChange={(e) => handleMetadataChange('localContext', e.target.value)}
                  placeholder="Describe the local cultural context and traditional knowledge systems"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="indigenousSystem">Indigenous Knowledge System</Label>
                <Textarea
                  id="indigenousSystem"
                  value={formData.metadata.indigenousSystem}
                  onChange={(e) => handleMetadataChange('indigenousSystem', e.target.value)}
                  placeholder="Describe relevant indigenous knowledge systems and protocols"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Assets */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multimedia Assets</CardTitle>
              <p className="text-sm text-gray-600">
                Add images, videos, and audio recordings to document the site
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Images */}
              <div>
                <Label>Images</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newMedia.images}
                    onChange={(e) => setNewMedia(prev => ({ ...prev, images: e.target.value }))}
                    placeholder="Image URL or filename"
                  />
                  <Button type="button" onClick={() => addMedia('images')} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((image, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {image}
                      <button
                        type="button"
                        onClick={() => removeMedia('images', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <Label>Videos</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newMedia.videos}
                    onChange={(e) => setNewMedia(prev => ({ ...prev, videos: e.target.value }))}
                    placeholder="Video URL or filename"
                  />
                  <Button type="button" onClick={() => addMedia('videos')} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.videos.map((video, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {video}
                      <button
                        type="button"
                        onClick={() => removeMedia('videos', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Audio */}
              <div>
                <Label>Audio Recordings</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newMedia.audio}
                    onChange={(e) => setNewMedia(prev => ({ ...prev, audio: e.target.value }))}
                    placeholder="Audio URL or filename"
                  />
                  <Button type="button" onClick={() => addMedia('audio')} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.audio.map((audio, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {audio}
                      <button
                        type="button"
                        onClick={() => removeMedia('audio', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* International Standards */}
        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>International Standards Compliance</CardTitle>
              <p className="text-sm text-gray-600">
                Align with UNESCO, UNDP, UNICEF, and other international standards
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unesco"
                    checked={formData.metadata.unesco}
                    onCheckedChange={(checked) => handleMetadataChange('unesco', checked)}
                  />
                  <Label htmlFor="unesco" className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">UNESCO</Badge>
                    Follows UNESCO cultural heritage standards
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="undp"
                    checked={formData.metadata.undp}
                    onCheckedChange={(checked) => handleMetadataChange('undp', checked)}
                  />
                  <Label htmlFor="undp" className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">UNDP</Badge>
                    Aligns with UNDP sustainable development goals
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unicef"
                    checked={formData.metadata.unicef}
                    onCheckedChange={(checked) => handleMetadataChange('unicef', checked)}
                  />
                  <Label htmlFor="unicef" className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">UNICEF</Badge>
                    Complies with UNICEF child protection standards
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="rights">Rights & Ownership</Label>
                <Select value={formData.metadata.rights} onValueChange={(value) => handleMetadataChange('rights', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rights classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Community Owned">Community Owned</SelectItem>
                    <SelectItem value="Tribal Sovereignty">Tribal Sovereignty</SelectItem>
                    <SelectItem value="Shared Cultural Heritage">Shared Cultural Heritage</SelectItem>
                    <SelectItem value="Public Domain">Public Domain</SelectItem>
                    <SelectItem value="Restricted Access">Restricted Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ipMetadata">Intellectual Property Metadata</Label>
                <Textarea
                  id="ipMetadata"
                  value={formData.metadata.ipMetadata}
                  onChange={(e) => handleMetadataChange('ipMetadata', e.target.value)}
                  placeholder="Describe intellectual property considerations, traditional knowledge protections, etc."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control & Sensitivity</CardTitle>
              <p className="text-sm text-gray-600">
                Define who can access this information and under what conditions
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sensitivityLevel">Sensitivity Level</Label>
                <Select 
                  value={formData.metadata.sensitivityLevel} 
                  onValueChange={(value) => handleMetadataChange('sensitivityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sensitivity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Public - Open access</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="restricted">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Restricted - Community permission required</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="closed">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Closed - Sacred/sensitive material</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accessProtocol">Access Protocol</Label>
                <Textarea
                  id="accessProtocol"
                  value={formData.metadata.accessProtocol}
                  onChange={(e) => handleMetadataChange('accessProtocol', e.target.value)}
                  placeholder="Describe the protocol for accessing this information, including any permissions required, attribution requirements, or usage restrictions"
                  rows={4}
                />
              </div>

              {formData.metadata.sensitivityLevel === 'closed' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ Closed Access Material
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    This material will not be visible on the public interface and requires special permissions to access.
                    Ensure proper consultation with community elders and traditional knowledge holders.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit">
          {initialData ? 'Update Site' : 'Add Site'}
        </Button>
      </div>
    </form>
  );
}