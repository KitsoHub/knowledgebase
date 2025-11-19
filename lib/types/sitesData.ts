import { id } from './../../node_modules/ci-info/index.d';
// app/types/cultural-site.ts
export type SensitivityLevel = 'public' | 'restricted' | 'closed'
export type SiteVote = 'approve' | 'reject'
export type SiteCategory =
  | 'heritage'
  | 'language'
  | 'botanical'
  | 'tribal'
  | 'migration'

export interface SiteData {
  id: number,
  site_name: string,
  description: string
  category: SiteCategory,
  latitude: number,
  longitude: number,
  population_density?: number | null,
  migration_route: string,
  metadata: {
    unesco: boolean,
    undp: boolean,
    unicef: boolean,
    local_context: string,
    indigenous_system: string,
    rights: string,
    ip_metadata: string,
    sensitivity_level: SensitivityLevel,
    access_protocol: string
  },
  uploaded_images: [

  ]
}


export interface SiteCreationState {
  step: 'TYPE' | 'BASIC' | 'METADATA' | 'UPLOADS' | 'REVIEW'
  siteData: Partial<SiteData>
  currentStepValid: boolean
  nextStep: () => void
  prevStep: () => void
  addSiteData: (data: SiteData) => void;
  updateSiteData: (data: Partial<SiteData>) => void
  resetForm: () => void
}

export type SiteVoteType = {
  siteId?:number,
  vote: SiteVote,
  comment?: string
}
