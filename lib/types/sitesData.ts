// app/types/cultural-site.ts
export type SensitivityLevel = 'public' | 'restricted' | 'closed'
export type SiteCategory =
  | 'heritage'
  | 'language'
  | 'botanical'
  | 'tribal'
  | 'migration'

export interface SiteData {
  site_name: string,
  description: string
  category: SiteCategory,
  latitude: number,
  longitude: number,
  population_density?: number | null,
  migration_route: string,
  metadata: {
    unesco: true,
    undp: true,
    unicef: true,
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
