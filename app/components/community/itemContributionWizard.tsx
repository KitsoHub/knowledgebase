import { ContentType, KnowledgeItem } from '@/lib/types/community'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription } from '../ui/alert'
import {
  AlertTriangle,
  CheckCircle,
  Crown,
  FileAudio,
  FileText,
  FileVideo,
  FolderOpen,
  Image,
  Plus,
  Upload,
} from 'lucide-react'
import {
  CollectionType,
  collectionTypeOptions,
  CulturalProtocol,
  protocolOptions,
  TKLabel,
  tkLabelOptions,
} from '@/lib/constants/community'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useCommunityStore } from '@/lib/store/communityStore'
import { v4 as uuidv4 } from 'uuid'

interface ItemContributionWizardProps {
  onComplete?: () => void
  collectionMetadataId?: string
}

export default function ItemContributionWizard({
  onComplete,
  collectionMetadataId,
}: ItemContributionWizardProps) {
  const { currentCommunity, currentSubCommunity, addKnowledgeItemMetadata } =
    useCommunityStore()
  const [step, setStep] = useState<
    'TARGET' | 'TYPE' | 'CONTENT' | 'CULTURAL' | 'LABELS' | 'REVIEW'
  >('TARGET')

  const [knowledgeItemMetadata, setKnowledgeItemMetadata] = useState<
    Partial<KnowledgeItem>
  >({
    knowledgeItemIdentier: '',
    createdBy: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
    contributors: [],
    description: '',
    targetType: 'existing_collection',
    culturalMetadata: {
      culturalNarrative: '',
      tkLabels: [],
      culturalContext: {
        culturalMeaning: '',
      },
    },
    rightsMetadata: {
      accessLevel: CulturalProtocol.PUBLIC,
    },
    colletionId: '',
    isAIAssisted: false,
    requiresWorkFlowApproval: false,
  })

  const nextStep = () => {
    const steps = [
      'TARGET',
      'TYPE',
      'CONTENT',
      'CULTURAL',
      'LABELS',
      'REVIEW',
    ] as const
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const steps = [
      'TARGET',
      'TYPE',
      'CONTENT',
      'CULTURAL',
      'LABELS',
      'REVIEW',
    ] as const
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const contentTypes = [
    {
      type: 'audio' as ContentType,
      title: 'Audio Recording',
      description: 'Traditional songs, stories, or oral histories',
      icon: FileAudio,
      examples: 'Ceremonial songs, elder interviews, language recordings',
    },
    {
      type: 'video' as ContentType,
      title: 'Video Content',
      description: 'Visual demonstrations or ceremonies',
      icon: FileVideo,
      examples: 'Traditional dances, craft demonstrations, land use practices',
    },
    {
      type: 'text' as ContentType,
      title: 'Written Knowledge',
      description: 'Stories, protocols, or documented practices',
      icon: FileText,
      examples: 'Traditional stories, seasonal calendars, governance protocols',
    },
    {
      type: 'image' as ContentType,
      title: 'Visual Materials',
      description: 'Photographs, artwork, or cultural artifacts',
      icon: Image,
      examples:
        'Historical photos, traditional art, sacred sites, cultural maps',
    },
  ]

  const updateData = (updates: Partial<KnowledgeItem>) => {
    setKnowledgeItemMetadata(prev => ({ ...prev, ...updates }))
  }
  const toggleTKLabel = (label: TKLabel) => {
    const current = knowledgeItemMetadata.culturalMetadata?.tkLabels || []
    const updated = current.includes(label)
      ? current.filter(l => l !== label)
      : [...current, label]
    updateData({
      culturalMetadata: {
        ...knowledgeItemMetadata.culturalMetadata,
        tkLabels: updated,
      },
    })
  }

  const generateKIIdentifier = () => {
    return uuidv4()
  }

  const handleItemSubmission = () => {
    addKnowledgeItemMetadata(
      knowledgeItemMetadata,
      currentSubCommunity?.communityIdentifier?.toString() || '',
      collectionMetadataId?.toString() || ''
    )
    alert('Contribution submitted successfully!')
    onComplete?.()
  }

  const renderStepContent = () => {
    switch (step) {
      case 'TARGET':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Choose Contribution Target</h3>
              <p className="text-muted-foreground">
                Select how you want to organize this contribution
              </p>
            </div>

            <div className="space-y-4">
              {/* Existing Collections */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  knowledgeItemMetadata.targetType === 'existing_collection'
                    ? 'ring-2 ring-primary border-primary'
                    : ''
                }`}
                onClick={() =>
                  updateData({ targetType: 'existing_collection' })
                }
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5" />
                    <span>Add to Existing Collection</span>
                  </CardTitle>
                  <CardDescription>
                    Contribute to one of the community's existing thematic
                    collections
                  </CardDescription>
                </CardHeader>
                {knowledgeItemMetadata.targetType === 'existing_collection' && (
                  <CardContent>
                    <div className="space-y-4">
                      <Label htmlFor="existing-collection">
                        Select Collection
                      </Label>
                      <Select
                        value={knowledgeItemMetadata.colletionId}
                        onValueChange={value =>
                          updateData({ colletionId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an existing collection" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentSubCommunity?.collections?.map(collection => (
                            <SelectItem
                              key={collection.collectionMetadataIdentifier}
                              value={
                                collection.collectionMetadataIdentifier?.toString() ||
                                ''
                              }
                            >
                              <div>
                                <div className="font-medium">
                                  {collection.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {collection?.collectionType?.replace(
                                    /_/g,
                                    ' '
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* New Collection */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  knowledgeItemMetadata.targetType === 'new_collection'
                    ? 'ring-2 ring-primary border-primary'
                    : ''
                }`}
                onClick={() => updateData({ targetType: 'new_collection' })}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create New Collection</span>
                  </CardTitle>
                  <CardDescription>
                    Start a new thematic collection with this contribution
                  </CardDescription>
                </CardHeader>
                {knowledgeItemMetadata.targetType === 'new_collection' && (
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="collection-title">
                          Collection Title
                        </Label>
                        <Input
                          id="collection-title"
                          value={
                            knowledgeItemMetadata.newCollection?.title || ''
                          }
                          onChange={e =>
                            updateData({
                              newCollection: {
                                ...knowledgeItemMetadata.newCollection,
                                title: e.target.value,
                                description:
                                  knowledgeItemMetadata.newCollection
                                    ?.description || '',
                                subjects:
                                  knowledgeItemMetadata.newCollection
                                    ?.subjects || [],
                                keywords:
                                  knowledgeItemMetadata.newCollection
                                    ?.keywords || [],
                                collectionType:
                                  knowledgeItemMetadata.newCollection
                                    ?.collectionType ||
                                  CollectionType.TRADITIONAL_KNOWLEDGE,
                              },
                            })
                          }
                          placeholder="Enter collection name"
                          className="font-cultural"
                        />
                      </div>

                      <div>
                        <Label htmlFor="collection-type">Collection Type</Label>
                        <Select
                          value={
                            knowledgeItemMetadata.newCollection?.collectionType
                          }
                          onValueChange={value =>
                            updateData({
                              newCollection: {
                                ...knowledgeItemMetadata.newCollection,
                                collectionType: value as CollectionType,
                                title:
                                  knowledgeItemMetadata.newCollection?.title ||
                                  '',
                                description:
                                  knowledgeItemMetadata.newCollection
                                    ?.description || '',
                                subjects:
                                  knowledgeItemMetadata.newCollection
                                    ?.subjects || [],
                                keywords:
                                  knowledgeItemMetadata.newCollection
                                    ?.keywords || [],
                              },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose collection type" />
                          </SelectTrigger>
                          <SelectContent>
                            {collectionTypeOptions.map(
                              ({ value, label, description }) => (
                                <SelectItem key={value} value={value}>
                                  <div>
                                    <div className="font-medium">{label}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {description}
                                    </div>
                                  </div>
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="collection-description">
                          Collection Description
                        </Label>
                        <Textarea
                          id="collection-description"
                          value={
                            knowledgeItemMetadata.newCollection?.description ||
                            ''
                          }
                          onChange={e =>
                            updateData({
                              newCollection: {
                                ...knowledgeItemMetadata.newCollection,
                                description: e.target.value,
                                title:
                                  knowledgeItemMetadata.newCollection?.title ||
                                  '',
                                subjects:
                                  knowledgeItemMetadata.newCollection
                                    ?.subjects || [],
                                keywords:
                                  knowledgeItemMetadata.newCollection
                                    ?.keywords || [],
                                collectionType:
                                  knowledgeItemMetadata.newCollection
                                    ?.collectionType ||
                                  CollectionType.TRADITIONAL_KNOWLEDGE,
                              },
                            })
                          }
                          placeholder="Describe the collection's purpose and scope"
                          rows={3}
                          className="font-cultural"
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Standalone */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  knowledgeItemMetadata.targetType === 'standalone'
                    ? 'ring-2 ring-primary border-primary'
                    : ''
                }`}
                onClick={() => updateData({ targetType: 'standalone' })}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Standalone Contribution</span>
                  </CardTitle>
                  <CardDescription>
                    Add this as an individual knowledge item not part of a
                    collection
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )
      case 'TYPE':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Select Content Type</h3>
              <p className="text-muted-foreground">
                Choose the format that best represents your knowledge
                contribution
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contentTypes.map(
                ({ type, title, description, icon: Icon, examples }) => (
                  <Card
                    key={type}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      knowledgeItemMetadata.type === type
                        ? 'ring-2 ring-primary border-primary'
                        : ''
                    }`}
                    onClick={() => updateData({ type })}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground italic">
                        Examples: {examples}
                      </p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        )
      case 'CONTENT':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Content Details</h3>
              <p className="text-muted-foreground">
                Provide basic information about your contribution
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={knowledgeItemMetadata.title || ''}
                  onChange={e =>
                    updateData({
                      title: e.target.value,
                      knowledgeItemIdentier: generateKIIdentifier().toString(),
                    })
                  }
                  placeholder="Enter a descriptive title"
                  className="font-cultural"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={knowledgeItemMetadata.description || ''}
                  onChange={e => updateData({ description: e.target.value })}
                  placeholder="Describe the content and its significance"
                  rows={4}
                  className="font-cultural"
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p>Upload your {knowledgeItemMetadata.type} file</p>
                  <Button variant="outline">Choose File</Button>
                  <p className="text-xs text-muted-foreground">
                    Supported formats:{' '}
                    {knowledgeItemMetadata.type === 'audio'
                      ? 'MP3, WAV, M4A'
                      : knowledgeItemMetadata.type === 'video'
                        ? 'MP4, MOV, AVI'
                        : knowledgeItemMetadata.type === 'image'
                          ? 'JPG, PNG, TIFF'
                          : 'PDF, DOC, TXT'}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="identifier">ItemMetadata Identifier</Label>
                <Input
                  id="identifier"
                  value={knowledgeItemMetadata.knowledgeItemIdentier || ''}
                  onChange={e =>
                    updateData({ knowledgeItemIdentier: e.target.value })
                  }
                  placeholder="Unique identifier (auto-generated)"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This unique identifier will be used for referencing item
                </p>
              </div>
            </div>
          </div>
        )

      case 'CULTURAL':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Cultural Context</h3>
              <p className="text-muted-foreground">
                Provide cultural narrative and traditional place names
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="narrative">Cultural Narrative *</Label>
                <Textarea
                  id="narrative"
                  value={
                    knowledgeItemMetadata.culturalMetadata?.culturalNarrative ||
                    ''
                  }
                  onChange={e =>
                    updateData({
                      culturalMetadata: {
                        ...knowledgeItemMetadata.culturalMetadata,
                        culturalNarrative: e.target.value,
                      },
                    })
                  }
                  placeholder="Explain the cultural significance, context, and any relevant protocols"
                  rows={5}
                  className="font-cultural"
                />
              </div>

              <div>
                <Label htmlFor="places">Traditional Place Names</Label>
                <Input
                  id="places"
                  value={(
                    knowledgeItemMetadata.culturalMetadata
                      ?.traditionalPlaceNames || []
                  ).join(', ')}
                  onChange={e =>
                    updateData({
                      culturalMetadata: {
                        ...knowledgeItemMetadata.culturalMetadata,
                        traditionalPlaceNames: e.target.value
                          .split(',')
                          .map(s => s.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  placeholder="Enter traditional place names separated by commas"
                  className="font-cultural"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ai-assisted"
                    checked={knowledgeItemMetadata.isAIAssisted || false}
                    onCheckedChange={checked =>
                      updateData({ isAIAssisted: !!checked })
                    }
                  />
                  <Label htmlFor="ai-assisted">
                    This content was created with AI assistance
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="elder-approval"
                    checked={
                      knowledgeItemMetadata.requiresWorkFlowApproval || false
                    }
                    onCheckedChange={checked =>
                      updateData({ requiresWorkFlowApproval: !!checked })
                    }
                  />
                  <Label htmlFor="elder-approval">
                    Requires council approval
                  </Label>
                </div>

                {/* TODO: update on collection creation */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flow-approval-1"
                    checked={
                      knowledgeItemMetadata.requiresWorkFlowApproval || false
                    }
                  />
                  <Label htmlFor="flow-approval-1">
                    The submission will include an accept/reject step
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flow-approval-2"
                    checked={
                      knowledgeItemMetadata.requiresWorkFlowApproval || false
                    }
                  />
                  <Label htmlFor="flow-approval-2">
                    The submission will have delegated collection administrators
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flow-approval-3"
                    checked={
                      knowledgeItemMetadata.requiresWorkFlowApproval || false
                    }
                  />
                  <Label htmlFor="flow-approval-3">
                    New submission will have some metadata defaults already
                    filled
                  </Label>
                </div>
              </div>

              {knowledgeItemMetadata.isAIAssisted && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    AI-assisted content will be clearly marked and may require
                    additional review processes.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )

      case 'LABELS':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Apply TK Labels</h3>
              <p className="text-muted-foreground">
                Select appropriate Traditional Knowledge labels and access
                protocols
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">
                  Traditional Knowledge Labels
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tkLabelOptions.map(({ label, title, description }) => (
                    <Card
                      key={label}
                      className={`cursor-pointer transition-all ${
                        (
                          knowledgeItemMetadata?.culturalMetadata?.tkLabels ||
                          []
                        ).includes(label)
                          ? 'ring-2 ring-primary'
                          : ''
                      }`}
                      onClick={() => toggleTKLabel(label)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={(
                              knowledgeItemMetadata?.culturalMetadata
                                ?.tkLabels || []
                            ).includes(label)}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <h6 className="font-medium">{title}</h6>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="protocol">Access Protocol *</Label>
                <Select
                  onValueChange={value =>
                    updateData({
                      rightsMetadata: {
                        ...knowledgeItemMetadata.rightsMetadata,
                        accessLevel: value as CulturalProtocol,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    {protocolOptions.map(({ value, title, description }) => (
                      <SelectItem key={value} value={value}>
                        <div>
                          <div className="font-medium">{title}</div>
                          <div className="text-xs text-muted-foreground">
                            {description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Contribution</h3>
              <p className="text-muted-foreground">
                Verify all details before submitting
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{knowledgeItemMetadata.title}</span>
                    {knowledgeItemMetadata.isAIAssisted && (
                      <Badge variant="secondary">AI Assisted</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {knowledgeItemMetadata.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Content Type</Label>
                    <p className="text-sm">
                      {
                        contentTypes.find(
                          t => t.type === knowledgeItemMetadata.type
                        )?.title
                      }
                    </p>
                  </div>

                  <div>
                    <Label>Cultural Narrative</Label>
                    <p className="text-sm text-muted-foreground">
                      {
                        knowledgeItemMetadata.culturalMetadata
                          ?.culturalNarrative
                      }
                    </p>
                  </div>

                  <div>
                    <Label>TK Labels</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(
                        knowledgeItemMetadata.culturalMetadata?.tkLabels || []
                      ).map(label => (
                        <Badge key={label} variant="outline">
                          {label.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Access Protocol</Label>
                    <Badge
                      className={`mt-1 ${
                        knowledgeItemMetadata.rightsMetadata?.accessLevel ===
                        CulturalProtocol.PUBLIC
                          ? 'protocol-public'
                          : knowledgeItemMetadata.rightsMetadata
                                ?.accessLevel ===
                              CulturalProtocol.COMMUNITY_ONLY
                            ? 'protocol-community'
                            : 'protocol-restricted'
                      }`}
                    >
                      {knowledgeItemMetadata.rightsMetadata?.accessLevel?.replace(
                        /_/g,
                        ' '
                      )}
                    </Badge>
                  </div>

                  {knowledgeItemMetadata.requiresWorkFlowApproval && (
                    <Alert>
                      <Crown className="h-4 w-4" />
                      <AlertDescription>
                        This contribution will be sent to the Community Council
                        for approval before publication.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <div className="max-w-4xl mx-auto ">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          {['Target', 'Type', 'Content', 'Cultural', 'Labels', 'Review'].map(
            (stepName, index) => {
              const stepKeys = [
                'TARGET',
                'TYPE',
                'CONTENT',
                'CULTURAL',
                'LABELS',
                'REVIEW',
              ]
              const currentIndex = stepKeys.indexOf(step)
              const isActive = index === currentIndex
              const isCompleted = index < currentIndex

              return (
                <div key={stepName} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`ml-2 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {stepName}
                  </span>
                  {index < 5 && <div className="w-12 h-px bg-border mx-4" />}
                </div>
              )
            }
          )}
        </div>
      </div>

      {/* Content */}

      {/* Nav */}

      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 'TARGET'}
        >
          Previous
        </Button>

        {step === 'REVIEW' ? (
          <Button className="bg-primary" onClick={() => handleItemSubmission()}>
            Submit Contribution
          </Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </div>
    </div>
  )
}
