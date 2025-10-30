// app/types/cultural-site.ts
export type SensitivityLevel = 'public' | 'restricted' | 'closed'
export type Category =
  | 'heritage'
  | 'language'
  | 'botanical'
  | 'tribal'
  | 'migration'

export interface CulturalSite {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  category: Category
  language?: string
  tribe?: string
  images: string[]
  videos: string[]
  audio: string[]
  metadata: {
    unesco: boolean
    undp: boolean
    unicef: boolean
    localContext: string
    indigenousSystem: string
    rights: string
    ipMetadata: string
    sensitivityLevel: SensitivityLevel
    accessProtocol: string
  }
  populationDensity?: number
  migrationRoute?: string
  dateCreated: string
  lastUpdated: string
}
