import {
  CollectionGovernanceSteps,
  CollectionType,
  collectionTypeOptions,
  CommunityGovernanceSteps,
  CulturalProtocol,
  protocolOptions,
  steps,
  stepsCollection,
  TKLabel,
  tkLabelOptions,
} from '@/lib/constants/community'
import { useAppStore } from '@/lib/store/appStore'
import {
  SubCommunityWithCollections,
  useCommunityStore,
  useSubCommunityStore,
} from '@/lib/store/communityStore'
import { Collection, SubCommunityData } from '@/lib/types/community'
import { useCommandState } from 'cmdk'
import { ArrowLeft, CheckCircle, Database, X } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
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

interface CollectionCreationFlowProps {
  onComplete?: () => void
  onCancel?: () => void
  parentCommunity?: Partial<SubCommunityData> | null
}

export default function CollectionCreationFlow({
  onComplete,
  onCancel,
  parentCommunity,
}: CollectionCreationFlowProps) {
  //get the communityID, parentCollectionId
  const { currentCommunity, addCollectionMetaData } = useCommunityStore()
  // const {addCollectionMetaData}=useCollectionStore();
  // const { addCollectionMetadata, updateCollectionMetadata } = useSubCommunityStore();
  const { user } = useAppStore()
  const [step, setStep] = useState<CollectionGovernanceSteps>(
    CollectionGovernanceSteps.BASIC
  )
  const [collectionData, setCollectionData] = useState<Partial<Collection>>({
    collectionMetadataIdentifier: '',
    title: '',
    collectionType: collectionTypeOptions[0].value,
    description: '',
    contributors: [],
    curator: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
    tkLabels: [],
    rightsProtocols: [],
    relatedCollections: [],
    dateRange: {
      startDate: new Date(), //needs to be formatted
    },
    subjects: [],
    keywords: [],
  })

  const updateData = (updates: Partial<Collection>) => {
    setCollectionData(prev => ({ ...prev, ...updates }))
  }

  const addSubject = (subject: string) => {
    if (subject.trim() && !collectionData.subjects?.includes(subject.trim())) {
      updateData({
        subjects: [...(collectionData.subjects || []), subject.trim()],
      })
    }
  }

  const removeSubject = (subject: string) => {
    updateData({
      subjects: collectionData.subjects?.filter(s => s !== subject) || [],
    })
  }

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !collectionData.keywords?.includes(keyword.trim())) {
      updateData({
        keywords: [...(collectionData.keywords || []), keyword.trim()],
      })
    }
  }

  const removeKeyword = (keyword: string) => {
    updateData({
      keywords: collectionData.keywords?.filter(k => k !== keyword) || [],
    })
  }
  const generateCollectionIdentifier = () => {
    return uuidv4()
  }

  const toggleTKLabel = (label: TKLabel) => {
    const current = collectionData.tkLabels || []
    const updated = current.includes(label)
      ? current.filter(l => l !== label)
      : [...current, label]
    updateData({ tkLabels: updated })
  }

  const toggleProtocol = (protocol: CulturalProtocol) => {
    const current = collectionData.rightsProtocols || []
    const updated = current.includes(protocol)
      ? current.filter(p => p !== protocol)
      : [...current, protocol]
    updateData({ rightsProtocols: updated })
  }

  const nextStep = () => {
    const currentIndex = stepsCollection.indexOf(step)
    if (currentIndex < stepsCollection.length - 1) {
      setStep(stepsCollection[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const currentIndex = stepsCollection.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepsCollection[currentIndex - 1])
    }
  }

  const handleSubmit = () => {
    //  console.error('Creating collection:', collectionData.collectionMetadataIdentifier);
    // alert(`Collection create successfully! ${collectionData.collectionMetadataIdentifier}${collectionData.title}`);
    // TODO:addCollectionData -> store
    // addCollectionMetaData(collectionData);
    currentCommunity?.collections
    parentCommunity?.communityIdentifier

    addCollectionMetaData(
      collectionData,
      parentCommunity?.communityIdentifier?.toString() || ''
    )
    //updateCollectionMetadata(collectionData);

    onComplete?.()
  }

  const renderStepContent = () => {
    switch (step) {
      case CollectionGovernanceSteps.BASIC:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Basic Information</h3>
              <p className="text-muted-foreground">
                Define the core details of your collection
              </p>
              <p className="text-muted-foreground">
                CommunityID: {currentCommunity?.communityIdentifier}
              </p>
              <p className="text-muted-foreground">
                Parent: {parentCommunity?.communityIdentifier}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Collection Title *</Label>
                <Input
                  id="title"
                  value={collectionData.title || ''}
                  onChange={e =>
                    updateData({
                      title: e.target.value,
                      collectionMetadataIdentifier:
                        generateCollectionIdentifier(),
                    })
                  }
                  placeholder="Enter collection name"
                  className="font-cultural"
                />
              </div>

              <div>
                <Label htmlFor="collection-type">Collection Type *</Label>
                <Select
                  value={collectionData.collectionType}
                  onValueChange={value =>
                    updateData({ collectionType: value as CollectionType })
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
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={collectionData.description || ''}
                  onChange={e => updateData({ description: e.target.value })}
                  placeholder="Describe the collection's purpose and scope"
                  rows={4}
                  className="font-cultural"
                />
              </div>
              <div>
                <Label htmlFor="identifier">Community Identifier</Label>
                <Input
                  id="identifier"
                  value={collectionData.collectionMetadataIdentifier || ''}
                  onChange={e =>
                    updateData({ collectionMetadataIdentifier: e.target.value })
                  }
                  placeholder="Unique identifier (auto-generated)"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This unique identifier will be used for referencing this
                  sub-community
                </p>
              </div>
            </div>
          </div>
        )

      case CollectionGovernanceSteps.METADATA:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Metadata & Classification</h3>
              <p className="text-muted-foreground">
                Add subjects, keywords, and temporal information
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Subjects</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Add a subject and press Enter"
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        addSubject(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {collectionData.subjects?.map(subject => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{subject}</span>
                        <button onClick={() => removeSubject(subject)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label>Keywords</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Add a keyword and press Enter"
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        addKeyword(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {collectionData.keywords?.map(keyword => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <span>{keyword}</span>
                        <button onClick={() => removeKeyword(keyword)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={
                      collectionData.dateRange?.startDate
                        ? typeof collectionData.dateRange.startDate === 'string'
                          ? collectionData.dateRange.startDate
                          : collectionData.dateRange.startDate
                              .toISOString()
                              .slice(0, 10)
                        : ''
                    }
                    onChange={e =>
                      updateData({
                        dateRange: {
                          ...collectionData.dateRange,
                          startDate: new Date(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date (Optional)</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={
                      collectionData.dateRange?.endDate
                        ? typeof collectionData.dateRange.endDate === 'string'
                          ? collectionData.dateRange.endDate
                          : collectionData.dateRange.endDate
                              .toISOString()
                              .slice(0, 10)
                        : ''
                    }
                    onChange={e =>
                      updateData({
                        dateRange: {
                          startDate:
                            collectionData.dateRange?.startDate ?? new Date(),
                          endDate: new Date(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case CollectionGovernanceSteps.CURATION:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Curation & Management</h3>
              <p className="text-muted-foreground">
                Assign curator and contributors
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="curator">Collection Curator *</Label>
                <Select
                  value={collectionData.curator?.id || user?.id}
                  onValueChange={value => {
                    const selectedCurator =
                      currentCommunity?.members?.find(
                        member => member.id === value
                      ) || user
                    if (selectedCurator) {
                      updateData({ curator: selectedCurator })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select curator" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCommunity?.members?.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {member.culturalTitle || member.role}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                    {user && (
                      <SelectItem value={user.id}>
                        <div>
                          <div className="font-medium">{user.name} (You)</div>
                          <div className="text-xs text-muted-foreground">
                            {user.culturalTitle || user.role}
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Related Collections</Label>
                <Select
                  value=""
                  onValueChange={value => {
                    if (!collectionData.relatedCollections?.includes(value)) {
                      updateData({
                        relatedCollections: [
                          ...(collectionData.relatedCollections || []),
                          value,
                        ],
                      })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Link to related collections" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCommunity?.collections
                      ?.filter(
                        c =>
                          c.collectionMetadataIdentifier !==
                          collectionData.title
                      )
                      .map(collection => (
                        <SelectItem
                          key={collection.collectionMetadataIdentifier}
                          value={collection.collectionMetadataIdentifier}
                        >
                          {collection.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {collectionData.relatedCollections?.map(collectionId => {
                    const collection = currentCommunity?.collections?.find(
                      c => c.collectionMetadataIdentifier === collectionId
                    )
                    return collection ? (
                      <Badge
                        key={collectionId}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{collection.title}</span>
                        <button
                          onClick={() =>
                            updateData({
                              relatedCollections:
                                collectionData.relatedCollections?.filter(
                                  id => id !== collectionId
                                ),
                            })
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      case CollectionGovernanceSteps.PROTOCOLS:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Cultural Protocols</h3>
              <p className="text-muted-foreground">
                Set access controls and TK labels
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
                        (collectionData.tkLabels || []).includes(label)
                          ? 'ring-2 ring-primary'
                          : ''
                      }`}
                      onClick={() => toggleTKLabel(label)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={(collectionData.tkLabels || []).includes(
                              label
                            )}
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
                <Label className="text-base mb-3 block">Access Protocols</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {protocolOptions.map(({ value, title, description }) => (
                    <Card
                      key={value}
                      className={`cursor-pointer transition-all ${
                        (collectionData.rightsProtocols || []).includes(value)
                          ? 'ring-2 ring-primary'
                          : ''
                      }`}
                      onClick={() => toggleProtocol(value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={(
                              collectionData.rightsProtocols || []
                            ).includes(value)}
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
            </div>
          </div>
        )

      case CollectionGovernanceSteps.REVIEW:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Collection</h3>
              <p className="text-muted-foreground">
                Verify all details before creating
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>{collectionData.title}</span>
                </CardTitle>
                <CardDescription>{collectionData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Collection Type</Label>
                    <p className="text-sm">
                      {collectionData.collectionType?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <Label>Curator</Label>
                    <p className="text-sm">
                      {currentCommunity?.members?.find(
                        m => m.id === collectionData.curator?.id
                      )?.name || user?.name}
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Subjects</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {collectionData.subjects?.map(subject => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {collectionData.keywords?.map(keyword => (
                      <Badge key={keyword} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>TK Labels</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {collectionData.tkLabels?.map(label => (
                      <Badge key={label} variant="outline">
                        {label.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Access Protocols</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {collectionData.rightsProtocols?.map(protocol => (
                      <Badge key={protocol} variant="outline">
                        {protocol.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        break
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community
        </Button>
        <div>
          <h2 className="text-2xl">Create New Collection</h2>
          <p className="text-muted-foreground">
            Add a thematic collection to organize knowledge items
          </p>
        </div>
      </div>

      {/* Progress */}

      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          {[...stepsCollection].map((stepName, index) => {
            const stepKeys = [...stepsCollection]
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
                {index < 3 && <div className="w-12 h-px bg-border mx-4" />}
              </div>
            )
          })}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 'BASIC'}
        >
          Previous
        </Button>

        {step === 'REVIEW' ? (
          <Button onClick={handleSubmit} className="bg-primary">
            Create Collection
          </Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </div>
    </div>
  )
}
