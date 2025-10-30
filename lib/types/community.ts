//import { collection } from 'firebase/firestore';
// Core Types for Indigenous Knowledge Portal

import {
  CollectionType,
  CommunityGovernance,
  CulturalProtocol,
  LicensingOption,
  TKLabel,
} from '../constants/community'

export interface Person {
  id: string
  name: string
  email: string
  role: string
  culturalTitle?: string
}

export interface CulturalMetadata {
  culturalNarrative: string
  tkLabels: TKLabel[]
  seasonalRestrictions?: {
    startDate: Date
    endDate: Date
    reason: string
    seasonalGuidance: string
  }[]
  traditionalPlaceNames?: string[]
  culturalContext?: {
    ceremony?: string
    region?: string
    language?: string
    season?: string
    uses?: string[]
    culturalMeaning: string
  }
}

export interface RightsMetadata {
  licensing?: {
    option: LicensingOption
    approvalWorkflow?: {
      requiredFor: TKLabel[]
      approvers: string[]
      approvalStatus: 'Reviewed and approved by the IKMS Council'
    }
  }
  accessLevel: CulturalProtocol
  attribution?: string
  restrictions?: string
}

export type ContentType =
  | 'all'
  | 'audio'
  | 'video'
  | 'text'
  | 'image'
  | 'document'
export interface KnowledgeItem {
  knowledgeItemIdentier: string
  createdBy: Person
  contributors?: Person[]
  title: string
  description: string
  type: ContentType
  targetType: 'existing_collection' | 'new_collection' | 'standalone'
  content?: {
    primary?: string
    metadata?: {
      languages: ['English', 'Setswana']
      topics: ['culture', 'medicinal plants', 'environmental stewardship']
      pages: 24
      wordCount: 5847
      photographDate: '2025-08-13'
      photographer: 'Community Elder Council'
      filmingDate: '2025-08-13'
      recordingDate: '2025-08-10'
      recordingLocation: 'UNIPOD Center'
      location: 'Test location'
      equipment: ['birchbark containers', 'traditional spiles']
      techniques: ['tree selection', 'tapping methods', 'sap collection']
      songCount: 12
      songTypes: ['honor songs', 'social dance songs', 'healing songs']
      instruments: ['water drum', 'hand drums', 'voices']
      season: 'Late Summer'
      timeOfDay: 'Dawn'
      culturalNote: 'Sacred space requires special protocols for viewing and sharing'
    }
    duration?: string
    dimensions?: string
    fileSize?: string
  }
  culturalMetadata?: Partial<CulturalMetadata>
  requiresWorkFlowApproval?: boolean
  rightsMetadata?: RightsMetadata
  colletionId: string
  communityId: string
  subCommunityId: string
  createdAt: Date
  updatedAt: Date
  isAIAssisted?: boolean
  relatedItems?: string[]
  newCollection?: {
    title: string
    collectionType: CollectionType
    description: string
    subjects: string[]
    keywords: string[]
  }
}
export interface CommunityIdentity {
  id: string
  title: string
  description: string
  governanceModel: CommunityGovernance
  leadership: {
    primaryContact: Person
    eldersCouncil?: Person[]
  }
  region: string
  language: string
  establishedDate: Date
}

export interface CommunityCreationState {
  step: 'TYPE' | 'BASIC' | 'GOVERNANCE' | 'PROTOCOLS' | 'REVIEW'
  communityData: Partial<CommunityIdentity>
  currentStepValid: boolean
  nextStep: () => void
  prevStep: () => void
  // addCommunity: (data: Community) => void;
  updateCommunityData: (data: Partial<CommunityIdentity>) => void
  resetForm: () => void
}

export interface TKLabelState {
  labels: TKLabel[]
  selectedLabel: TKLabel | null
  usage: Record<TKLabel, number>
  setSelectedLabel: (label: TKLabel | null) => void
  updateUsage: (label: TKLabel, count: number) => void
}

export interface SubCommunityData {
  title: string
  description: string
  indigenousAuthority: Person
  custodianIds: string[]
  localContextLabels: TKLabel[]
  geographicRegion: string
  communityIdentifier: string
  protocols: CulturalProtocol[]
  collections?: Partial<Collection>[]
  members: Person[]
  establishedDate: Date
  stats?: {
    totalItems?: number
    publicItems?: number
    restrictedItems?: number
    memberCount?: number
    collectionCount?: number
  }
  isActive?: true
}

export interface Collection {
  collectionMetadataIdentifier: string
  title: string
  collectionType: CollectionType
  description: string
  curator: Person
  contributors: Person[]
  dateRange: {
    startDate: Date
    endDate?: Date
  }
  subjects: string[]
  keywords: string[]
  relatedCollections: string[]
  rightsProtocols: CulturalProtocol[]
  tkLabels: TKLabel[]
  knowledgeItems: Partial<KnowledgeItem>[]
  communityId: string
  parentCollectionId?: string
  createdAt: Date
  updatedAt: Date
  isActive: true
}
export interface Community {
  communityIdentifier: string
  identity: Partial<CommunityIdentity>
  members: Person[]
  knowledgeItems: KnowledgeItem[]
  protocols: CulturalProtocol[]
  collections?: Collection[]
  subCommunities?: Partial<SubCommunityData>[]
  stats: {
    totalItems: number
    publicItems: number
    restrictedItems: number
    memberCount: number
    collectionCount: number
    subCommunityCount: number
  }
  isActive?: true
}

export interface AppState {
  currentCommunity: Community | null
  user: Person | null
  darkMode: boolean
  setCurrentCommunity: (community: Community | null) => void
  setUser: (user: Person | null) => void
  toggleDarkMode: () => void
}
