//import { collection } from 'firebase/firestore';
// Core Types for Indigenous Knowledge Portal

import { CommunityGovernance, CulturalProtocol, LicensingOption, TKLabel } from "../constants/community";



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
    collectionCount: number;
    subCommunityCount: number;
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


export interface SubCommunityData {
  title: string;
  description: string;
  indigenousAuthorityId: string;
  custodianIds: string[];
  localContextLabels: TKLabel[];
  geographicRegion: string;
  communityIdentifier: string;
  protocols: CulturalProtocol[];
}
