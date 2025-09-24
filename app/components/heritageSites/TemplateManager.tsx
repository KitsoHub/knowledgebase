import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Plus, FileText, Eye, Edit, Trash2, Shield, Globe, Users, Database } from 'lucide-react';

interface MetadataTemplate {
  id: string;
  name: string;
  description: string;
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration' | 'sensitive';
  fields: {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'date';
    required: boolean;
    options?: string[];
    placeholder?: string;
    description?: string;
  }[];
  accessLevel: 'public' | 'restricted' | 'closed';
  standardsCompliance: {
    unesco: boolean;
    undp: boolean;
    unicef: boolean;
    localContext: boolean;
    indigenous: boolean;
  };
  createdDate: string;
  lastModified: string;
}

const predefinedTemplates: MetadataTemplate[] = [
  {
    id: '1',
    name: 'UNESCO Heritage Site',
    description: 'Standard template for UNESCO World Heritage Site documentation',
    category: 'heritage',
    accessLevel: 'public',
    standardsCompliance: {
      unesco: true,
      undp: false,
      unicef: false,
      localContext: true,
      indigenous: false,
    },
    fields: [
      { name: 'Site Name', type: 'text', required: true, placeholder: 'Official heritage site name' },
      { name: 'Historical Period', type: 'text', required: true },
      { name: 'Cultural Significance', type: 'textarea', required: true, description: 'Describe the cultural and historical significance' },
      { name: 'Conservation Status', type: 'select', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'] },
      { name: 'Inscription Date', type: 'date', required: false },
      { name: 'UNESCO Criteria', type: 'textarea', required: true },
      { name: 'Threats', type: 'textarea', required: false, description: 'Current or potential threats to the site' },
    ],
    createdDate: '2024-01-15',
    lastModified: '2024-02-01',
  },
  {
    id: '2',
    name: 'Indigenous Language Documentation',
    description: 'Template for documenting indigenous languages and linguistic heritage',
    category: 'language',
    accessLevel: 'restricted',
    standardsCompliance: {
      unesco: true,
      undp: false,
      unicef: true,
      localContext: true,
      indigenous: true,
    },
    fields: [
      { name: 'Language Name', type: 'text', required: true },
      { name: 'Alternative Names', type: 'text', required: false },
      { name: 'Language Family', type: 'text', required: true },
      { name: 'Speaker Count', type: 'number', required: false },
      { name: 'Vitality Status', type: 'select', required: true, options: ['Safe', 'Vulnerable', 'Definitely Endangered', 'Severely Endangered', 'Critically Endangered', 'Extinct'] },
      { name: 'Geographic Distribution', type: 'textarea', required: true },
      { name: 'Cultural Context', type: 'textarea', required: true },
      { name: 'Revitalization Efforts', type: 'textarea', required: false },
      { name: 'Community Permission', type: 'checkbox', required: true, description: 'Community has given permission for documentation' },
    ],
    createdDate: '2024-01-20',
    lastModified: '2024-02-05',
  },
  {
    id: '3',
    name: 'Sacred Site Documentation',
    description: 'Sensitive template for documenting sacred and ceremonial sites',
    category: 'sensitive',
    accessLevel: 'closed',
    standardsCompliance: {
      unesco: false,
      undp: false,
      unicef: false,
      localContext: true,
      indigenous: true,
    },
    fields: [
      { name: 'Site Name (Public)', type: 'text', required: true, description: 'Public name for the site' },
      { name: 'Sacred Designation', type: 'text', required: true },
      { name: 'Associated Tribe/Community', type: 'text', required: true },
      { name: 'Ceremonial Use', type: 'textarea', required: false, description: 'General description without sensitive details' },
      { name: 'Access Restrictions', type: 'textarea', required: true },
      { name: 'Elder Consultation', type: 'checkbox', required: true, description: 'Elders have been consulted about this documentation' },
      { name: 'Cultural Protocols', type: 'textarea', required: true },
      { name: 'Sensitivity Level', type: 'select', required: true, options: ['Community Only', 'Tribal Leadership', 'Ceremonial Participants', 'No Documentation'] },
    ],
    createdDate: '2024-02-01',
    lastModified: '2024-02-08',
  },
  {
    id: '4',
    name: 'Traditional Ecological Knowledge',
    description: 'Template for documenting botanical and ecological knowledge',
    category: 'botanical',
    accessLevel: 'restricted',
    standardsCompliance: {
      unesco: true,
      undp: true,
      unicef: false,
      localContext: true,
      indigenous: true,
    },
    fields: [
      { name: 'Site/Area Name', type: 'text', required: true },
      { name: 'Ecosystem Type', type: 'select', required: true, options: ['Forest', 'Grassland', 'Wetland', 'Desert', 'Coastal', 'Mountain', 'River'] },
      { name: 'Key Species', type: 'textarea', required: true },
      { name: 'Traditional Uses', type: 'textarea', required: true },
      { name: 'Seasonal Practices', type: 'textarea', required: false },
      { name: 'Knowledge Holders', type: 'text', required: false, description: 'General description, not specific names' },
      { name: 'Conservation Status', type: 'select', required: true, options: ['Pristine', 'Good', 'Degraded', 'Severely Impacted'] },
      { name: 'Community Sharing Permission', type: 'checkbox', required: true },
    ],
    createdDate: '2024-01-25',
    lastModified: '2024-02-03',
  },
];

export function TemplateManager() {
  const [templates, setTemplates] = useState<MetadataTemplate[]>(predefinedTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<MetadataTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredTemplates = templates.filter(template => 
    filter === 'all' || template.category === filter
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'heritage': return 'bg-amber-100 text-amber-800';
      case 'language': return 'bg-blue-100 text-blue-800';  
      case 'botanical': return 'bg-green-100 text-green-800';
      case 'tribal': return 'bg-purple-100 text-purple-800';
      case 'migration': return 'bg-red-100 text-red-800';
      case 'sensitive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'restricted': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Manager</h2>
          <p className="text-gray-600">Manage metadata templates for different types of cultural heritage sites</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All Templates
          </TabsTrigger>
          <TabsTrigger value="standards" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Standards Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="heritage">Heritage Sites</SelectItem>
                      <SelectItem value="language">Language Sites</SelectItem>
                      <SelectItem value="botanical">Botanical Sites</SelectItem>
                      <SelectItem value="tribal">Tribal Sites</SelectItem>
                      <SelectItem value="migration">Migration Routes</SelectItem>
                      <SelectItem value="sensitive">Sensitive Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredTemplates.length} templates
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge className={getAccessLevelColor(template.accessLevel)}>
                      {template.accessLevel}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Standards Compliance</p>
                    <div className="flex flex-wrap gap-1">
                      {template.standardsCompliance.unesco && <Badge className="text-xs bg-blue-50 text-blue-700">UNESCO</Badge>}
                      {template.standardsCompliance.undp && <Badge className="text-xs bg-green-50 text-green-700">UNDP</Badge>}
                      {template.standardsCompliance.unicef && <Badge className="text-xs bg-purple-50 text-purple-700">UNICEF</Badge>}
                      {template.standardsCompliance.localContext && <Badge className="text-xs bg-orange-50 text-orange-700">Local Context</Badge>}
                      {template.standardsCompliance.indigenous && <Badge className="text-xs bg-red-50 text-red-700">Indigenous</Badge>}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Fields: {template.fields.length}</p>
                    <p>Required: {template.fields.filter(f => f.required).length}</p>
                    <p>Last modified: {template.lastModified}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTemplate(template)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  UNESCO Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    UNESCO (United Nations Educational, Scientific and Cultural Organization) standards for cultural heritage documentation.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Outstanding Universal Value documentation</li>
                      <li>• Authenticity and integrity assessments</li>
                      <li>• Conservation and management plans</li>
                      <li>• Community involvement protocols</li>
                      <li>• Regular monitoring and reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  UNDP Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    United Nations Development Programme guidelines for sustainable development and cultural preservation.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Focus Areas:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Sustainable development goal alignment</li>
                      <li>• Community-based development approaches</li>
                      <li>• Poverty reduction through cultural preservation</li>
                      <li>• Capacity building and local ownership</li>
                      <li>• Environmental sustainability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  UNICEF Child Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    UNICEF standards for protecting children in cultural heritage documentation and activities.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Protection Measures:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Informed consent for child participation</li>
                      <li>• Age-appropriate documentation methods</li>
                      <li>• Privacy and confidentiality protections</li>
                      <li>• Cultural sensitivity in child involvement</li>
                      <li>• Safe participation environments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-red-600" />
                  Indigenous Knowledge Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Protocols for respecting and protecting indigenous knowledge systems and traditional cultural expressions.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Core Principles:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Free, prior, and informed consent (FPIC)</li>
                      <li>• Community ownership and control</li>
                      <li>• Cultural protocols and ceremonies</li>
                      <li>• Traditional knowledge attribution</li>
                      <li>• Benefit sharing agreements</li>
                      <li>• Sacred and sensitive content protection</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {selectedTemplate.name}
                    <Badge className={getCategoryColor(selectedTemplate.category)}>
                      {selectedTemplate.category}
                    </Badge>
                    <Badge className={getAccessLevelColor(selectedTemplate.accessLevel)}>
                      {selectedTemplate.accessLevel}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Standards Compliance</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.standardsCompliance.unesco && <Badge className="bg-blue-50 text-blue-700">UNESCO</Badge>}
                  {selectedTemplate.standardsCompliance.undp && <Badge className="bg-green-50 text-green-700">UNDP</Badge>}
                  {selectedTemplate.standardsCompliance.unicef && <Badge className="bg-purple-50 text-purple-700">UNICEF</Badge>}
                  {selectedTemplate.standardsCompliance.localContext && <Badge className="bg-orange-50 text-orange-700">Local Context</Badge>}
                  {selectedTemplate.standardsCompliance.indigenous && <Badge className="bg-red-50 text-red-700">Indigenous</Badge>}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Template Fields ({selectedTemplate.fields.length})</h4>
                <div className="space-y-3">
                  {selectedTemplate.fields.map((field, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{field.name}</span>
                          {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                        </div>
                        <Badge variant="outline" className="text-xs">{field.type}</Badge>
                      </div>
                      
                      {field.description && (
                        <p className="text-sm text-gray-600 mb-2">{field.description}</p>
                      )}
                      
                      {field.placeholder && (
                        <p className="text-xs text-gray-500">Placeholder: {field.placeholder}</p>
                      )}
                      
                      {field.options && (
                        <div className="text-xs text-gray-500">
                          Options: {field.options.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button>
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}