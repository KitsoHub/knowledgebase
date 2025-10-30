export interface LanguageFamily {
  name: string
  description: string
  regions: string[]
}

type ModalityType = 'written' | 'spoken' | 'signed'

export interface Modality {
  types: ModalityType[]
  description: string
}
export interface LanguageMetadata {
  id: string
  name: string
  /** Native language name (e.g., "San") */
  nativeName?: string
  // ===== LINGUISTIC PROPERTIES =====
  /** Writing system used (e.g., "Latin", "Cyrillic", "Han") */
  script?: string
  /** Text direction (LTR/RTL) */
  writingDirection?: 'ltr' | 'rtl' | 'ttb'
  /** Primary modality taught */
  modality?: Modality[]
  /** Regional variant identifier (BCP 47 tag) */
  regionTag?: string
  /** Language variety/dialect (e.g., "Latin American Spanish") */
  variety?: string
  description: string

  // ===== TECHNICAL METADATA =====
  /** Whether RTL layout is needed */
  isRtl?: boolean
  /** Character set requirements */
  characterSet?: 'latin' | 'cjk' | 'arabic' | 'cyrillic' | 'other'
  /** Minimum Unicode version required */
  minUnicodeVersion?: string

  // ===== REFERENCE METADATA (for academic use) =====
  /** ISO 639-1 code (2-letter) */
  iso639_1?: string
  /** Language family classification */
  languageFamily: string | LanguageFamily
  /** Total speakers (in millions) */
  totalSpeakers?: number
  /** Geographic distribution */
  regions?: string[]

  // ===== PLATFORM-SPECIFIC =====
  isActive: boolean
  launchDate?: string
  puoId?: string
  version?: string
}
