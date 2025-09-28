//import { collection } from 'firebase/firestore';
// Core Types for Indigenous Knowledge Portal

import { CollectionType, CommunityGovernance, CulturalProtocol, LicensingOption, TKLabel } from "../constants/community";



export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  culturalTitle?: string;
}

export interface CulturalMetadata {
  culturalNarrative: string;
  tkLabels: TKLabel[];
  seasonalRestrictions?: {
    startDate: Date;
    endDate: Date;
    reason: string;
  }[];
  traditionalPlaceNames?: string[];
  culturalContext: string;
}

export interface RightsMetadata {
  licensing?: {
    option: LicensingOption;
    approvalWorkflow?: {
      requiredFor: TKLabel[];
      approvers: string[];
    };
  };
  accessLevel: CulturalProtocol;
  attribution?: string;
  restrictions?: string;
}

export type ContentType = 'audio' | 'video' | 'text' | 'image' | 'document';
export interface KnowledgeItem {
  knowledgeItemIdentier: string;
  createdBy: Person;
  contributors?: Person[];
  title: string;
  description: string;
  type: ContentType;
  targetType: 'existing_collection' | 'new_collection' | 'standalone';
  content?: any;
  culturalMetadata?: Partial<CulturalMetadata>;
  requiresWorkFlowApproval?: boolean,
  rightsMetadata?: RightsMetadata;
  colletionId: string;
  communityId: string;
  subCommunityId: string;
  createdAt: Date;
  updatedAt: Date;
  isAIAssisted?: boolean;
  newCollection?: {
    title: string;
    collectionType: CollectionType;
    description: string;
    subjects: string[];
    keywords: string[];
  };
}
export interface CommunityIdentity {
  id: string;
  title: string;
  description: string;
  governanceModel: CommunityGovernance;
  leadership: {
    primaryContact: Person;
    eldersCouncil?: Person[];
  };
  region: string;
  language: string;
  establishedDate: Date;
}




// Zustand Store Types
export interface CommunityCreationState {
  step: 'TYPE' | 'BASIC' | 'GOVERNANCE' | 'PROTOCOLS' | 'REVIEW';
  communityData: Partial<CommunityIdentity>;
  currentStepValid: boolean;
  nextStep: () => void;
  prevStep: () => void;
  // addCommunity: (data: Community) => void;
  updateCommunityData: (data: Partial<CommunityIdentity>) => void;
  resetForm: () => void;
}

export interface TKLabelState {
  labels: TKLabel[];
  selectedLabel: TKLabel | null;
  usage: Record<TKLabel, number>;
  setSelectedLabel: (label: TKLabel | null) => void;
  updateUsage: (label: TKLabel, count: number) => void;
}



export interface SubCommunityData {
  title: string;
  description: string;
  indigenousAuthority: Person;
  custodianIds: string[];
  localContextLabels: TKLabel[];
  geographicRegion: string;
  communityIdentifier: string;
  protocols: CulturalProtocol[];
  collections?: Partial<Collection>[];
  members: Person[];
  establishedDate: Date;
  stats?:{
    totalItems?: number;
    publicItems?: number;
    restrictedItems?: number;
    memberCount?: number;
    collectionCount?: number;
  }
}


export interface Collection {
  collectionMetadataIdentifier: string;
  title: string;
  collectionType: CollectionType;
  description: string;
  curator: Person;
  contributors: Person[];
  dateRange: {
    startDate: Date;
    endDate?: Date;
  };
  subjects: string[];
  keywords: string[];
  relatedCollections: string[];
  rightsProtocols: CulturalProtocol[];
  tkLabels: TKLabel[];
  knowledgeItems: Partial<KnowledgeItem>[];
  communityId: string;
  parentCollectionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Community {
  communityIdentifier: string;
  identity: Partial<CommunityIdentity>;
  members: Person[];
  knowledgeItems: KnowledgeItem[];
  protocols: CulturalProtocol[];
  collections?: Collection[];
  subCommunities?: Partial<SubCommunityData>[];
  stats: {
    totalItems: number;
    publicItems: number;
    restrictedItems: number;
    memberCount: number;
    collectionCount: number;
    subCommunityCount: number;
  };
}

export interface AppState {
  currentCommunity: Community | null;
  user: Person | null;
  darkMode: boolean;
  setCurrentCommunity: (community: Community | null) => void;
  setUser: (user: Person | null) => void;
  toggleDarkMode: () => void;
}
