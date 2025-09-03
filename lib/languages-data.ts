
import { khoekhoegowabUnits } from '@/app/utils/mock/khoekhoegowab-vocabulary';

export interface LanguageFamily {
    name: string;
    description: string;
    regions: string[];
}

type ModalityType = 'written' | 'spoken' | 'signed';

export interface Modality {
    types: ModalityType[];
    description: string;
}
export interface LanguageMetadata {
    id: string;
    name: string;
    /** Native language name (e.g., "San") */
    nativeName?: string;
  // ===== LINGUISTIC PROPERTIES =====
  /** Writing system used (e.g., "Latin", "Cyrillic", "Han") */
  script?: string;
  /** Text direction (LTR/RTL) */
  writingDirection?: 'ltr' | 'rtl' | 'ttb';
  /** Primary modality taught */
  modality?: Modality[];
  /** Regional variant identifier (BCP 47 tag) */
  regionTag?: string;
  /** Language variety/dialect (e.g., "Latin American Spanish") */
  variety?: string;
  description: string;

    // ===== TECHNICAL METADATA =====
  /** Whether RTL layout is needed */
  isRtl?: boolean;
  /** Character set requirements */
  characterSet?: 'latin' | 'cjk' | 'arabic' | 'cyrillic' | 'other';
  /** Minimum Unicode version required */
  minUnicodeVersion?: string;

    // ===== REFERENCE METADATA (for academic use) =====
  /** ISO 639-1 code (2-letter) */
  iso639_1?: string;
  /** Language family classification */
  languageFamily: string | LanguageFamily;
  /** Total speakers (in millions) */
  totalSpeakers?: number;
  /** Geographic distribution */
  regions?: string[];

    // ===== PLATFORM-SPECIFIC =====
  isActive: boolean;
  launchDate?: string;
  puoId?: string;
  version?: string;
}

const khoekhoegowabMetadata: LanguageMetadata = {
    id: 'khoekhoegowab',
        name: 'Khoekhoegowab',
        nativeName: 'Khoekhoegowab',
        script: 'Latin',
        writingDirection: 'ltr',
        modality: [
            {
                types: ['spoken', 'written'],
                description: 'Khoekhoegowab is both a spoken and written language.'
            },

        ],
        regionTag: 'NA', // Southern Africa
        variety: 'Nama/Damara',
        description: 'Learn Khoekhoegowab, a Khoisan language spoken in Namibia and Botswana, known for its unique click consonants.',
        // Technical Metadata
        isRtl: false,
        characterSet: 'latin',
        minUnicodeVersion: '1.1',
        iso639_1: 'naq',
        languageFamily: 'Khoe',
        totalSpeakers: 250000, // Approximate
        regions: ['Namibia', 'Botswana', 'South Africa'],
        isActive: true, // Beta, Supported
        launchDate: '2024-01-15',
        puoId: 'khoekhoegowab',
        version: '1.0.0',

}

export const languagesMetadata: LanguageMetadata[] = [
    khoekhoegowabMetadata,
    // Add other languages here as needed
];
