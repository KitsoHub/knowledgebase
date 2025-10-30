import { registerLanguage } from './registry'
import { LanguageMetadata } from './types'

const khoekhoegowabMetadata: LanguageMetadata = {
  id: 'khoekhoegowab',
  name: 'Khoekhoegowab',
  nativeName: 'Khoekhoegowab',
  script: 'Latin',
  writingDirection: 'ltr',
  modality: [
    {
      types: ['spoken', 'written'],
      description: 'Khoekhoegowab is both a spoken and written language.',
    },
  ],
  regionTag: 'NA', // Southern Africa
  variety: 'Nama/Damara',
  description:
    'Learn Khoekhoegowab, a Khoisan language spoken in Namibia and Botswana, known for its unique click consonants.',
  // Technical Metadata
  isRtl: false,
  characterSet: 'latin',
  minUnicodeVersion: '1.1',
  iso639_1: 'naq',
  languageFamily: 'Khoe',
  totalSpeakers: 250000, // Approximate
  regions: ['Namibia', 'Botswana', 'South Africa'],
  isActive: true,
  launchDate: '2024-01-15',
  puoId: 'khoekhoegowab',
  version: '1.0.0',
}

registerLanguage(khoekhoegowabMetadata)

// Export for direct context access
export default khoekhoegowabMetadata
