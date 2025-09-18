
export type ContributorRole =
  | 'medical_expert'
  | 'translator'
  | 'reviewer'
  | 'cultural_advisor'
  | 'terminology_specialist'
  | 'quality_controller';

export type ValidationStatus = 'pending' | 'reviewed' | 'verified' | 'disputed';

export type HumanInvolvementLevel = 'minimal' | 'moderate' | 'extensive';

export interface TranslationContributor {
  id: string;
  name: string;
  email: string;
  affiliation?: string;
  country: string;
  roles: ContributorRole[];
  orcidId?: string;
  avatar?: string;
  contributionDate: string;
  verificationStatus: 'pending' | 'verified';
  languageIds?: string[];
}

export interface AIToolUsage {
  toolName: string;
  version: string;
  humanInvolvement: HumanInvolvementLevel;
  verificationDate?: string;
  isHumanVerified: boolean;
  affectedTermsCount: number;
  affectedTerms: string[];
}

export interface TranslationEntry {
  id: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceTerm: string;
  targetTerm: string;
  context: string;
  confidence: number;
  status: ValidationStatus;
  aiAssisted: boolean;
  aiTool?: AIToolUsage;
  lastUpdated: string;
  disputeReason?: string;
  usageExamples: string[];
  verificationHistory: Array<{
    date: string;
    reviewer: string;
    action: string;
    notes: string;
  }>;
}

export interface QualityControlMetadata {
  methodology: string;
  reviewersCount: number;
  verificationDate: string;
  disputes: Array<{
    termId: string;
    reason: string;
    status: 'open' | 'resolved';
    resolution?: string;
  }>;
  complianceStatus: 'pending' | 'verified' | 'non_compliant';
}

export interface TranslationRepositoryMetadata {
  id: string;
  title: string;
  sourceLanguage: string;
  targetLanguage: string;
  contributors: TranslationContributor[];
  qualityControl: QualityControlMetadata;
  aiUsage: AIToolUsage | null;
  createdAt: string;
  lastUpdated: string;
}
