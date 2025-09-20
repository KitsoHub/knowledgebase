// Core Types for Indigenous Knowledge Portal

export enum CommunityGovernance {
  INDIGENOUS_COUNCIL = 'INDIGENOUS_COUNCIL',
  ELDER_COUNCIL = 'ELDER_COUNCIL',
  STEWARDSHIP_CIRCLE = 'STEWARDSHIP_CIRCLE'
}

export enum TKLabel {
  SECRET_SACRED = 'SECRET_SACRED',
  CULTURAL_INFLUENCE = 'CULTURAL_INFLUENCE',
  WOMEN_S_ONLY = 'WOMEN_S_ONLY',
  MEN_S_ONLY = 'MEN_S_ONLY'
}

export enum CulturalProtocol {
  PUBLIC = 'PUBLIC',
  COMMUNITY_ONLY = 'COMMUNITY_ONLY',
  ELDER_APPROVAL_REQUIRED = 'ELDER_APPROVAL_REQUIRED',
  GENDER_RESTRICTED = 'GENDER_RESTRICTED'
}

export enum LicensingOption {
  ATTRIBUTION = 'ATTRIBUTION',
  ATTRIBUTION_SHARE_ALIKE = 'ATTRIBUTION_SHARE_ALIKE',
  ATTRIBUTION_NON_COMMERCIAL = 'ATTRIBUTION_NON_COMMERCIAL',
  COMMUNITY_PROTOCOL = 'COMMUNITY_PROTOCOL',
  ALL_RIGHTS_RESERVED = 'ALL_RIGHTS_RESERVED'
}

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
  licensing: {
    option: LicensingOption;
    approvalWorkflow?: {
      requiredFor: TKLabel[];
      approvers: string[];
    };
  };
  accessLevel: CulturalProtocol;
  attribution: string;
  restrictions?: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'video' | 'text' | 'image' | 'document';
  content: any;
  culturalMetadata: CulturalMetadata;
  rightsMetadata: RightsMetadata;
  communityId: string;
  contributorId: string;
  createdAt: Date;
  updatedAt: Date;
  isAIAssisted?: boolean;
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


export interface Community {
  id: string;
  identity: Partial<CommunityIdentity>;
  members: Person[];
  knowledgeItems: KnowledgeItem[];
  protocols: CulturalProtocol[];
  stats: {
    totalItems: number;
    publicItems: number;
    restrictedItems: number;
    memberCount: number;
  };
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

export interface AppState {
  currentCommunity: Community | null;
  user: Person | null;
  darkMode: boolean;
  setCurrentCommunity: (community: Community | null) => void;
  setUser: (user: Person | null) => void;
  toggleDarkMode: () => void;
}
