export interface Message {
  id: string
  createdAt?: Date
  content: string
  role: 'system' | 'user' | 'assistant'
  parts?: Array<TextUIPart>
}

export type TextUIPart = {
  type: 'text'
  text: string
}

export interface ArtifactType {
  key: string
  name: string
}

export interface CategoryType {
  key: string
  name: string
}

/**
 * Patent types
 *
 */

export type ApplicationStage =
  | 'New'
  | 'Verification'
  | 'Search'
  | 'Drafting'
  | 'Publication'
  | 'Examination'
  | 'Awaiting Response'
  | 'Ready for Decision'
  | 'Granted'
  | 'Abandoned'

// Technology areas
export type TechnologyArea =
  | 'Software'
  | 'Hardware'
  | 'Biotechnology'
  | 'Chemical'
  | 'Mechanical'
  | 'Electrical'

// Priority levels
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent'


export interface ExtendedFile extends File {
  preview?: string
  progress?: number
}
