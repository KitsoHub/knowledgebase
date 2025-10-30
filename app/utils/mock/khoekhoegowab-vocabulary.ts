// TODO:
// - Vocabulary Items
// - Lesson
// - Unit
// - generateVocabularyItemsForUnit
// - generatePhrases

//import { loadCommonPhrases } from "@/lib/languages/config/commonPhrases"
export type VocabularyItem = {
  id: string
  word: string //khoekhoegowab
  english: string
  example?: string
  exampleTranslation?: string
  audioFile?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export type vowelCategory = {
  id: string
  name: string
  description: string
  vowels: VowelItem[]
}
export type VowelItem = {
  id: string
  symbol: string //khoekhoegowab vowel symbol
}

export type Lesson = {
  id: string
  title: string
  description: string
  vocabulary: VocabularyItem[]
  phrases: VocabularyItem[]
  vowels?: VowelItem[]
  conversations?: {
    id: string
    speakers: { role: string; text: string; translation: string }[]
  }[]
}

export type Unit = {
  id: string
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  animal: string
  animalIcon: string
  color: string
  lessons: Lesson[]
}

function generateVocabularyItems(
  unitId: string,
  baseId: string,
  count: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: string[]
): VocabularyItem[] {
  const items: VocabularyItem[] = []

  //  const commonPhrases = loadCommonPhrases();
  const commonPhrases = [
    { word: '!Gâi tsēs', english: 'Good day' },
    { word: 'Mi re?', english: 'How are you?' },
  ]

  // Generate the requested number of items
  for (let i = 0; i < count; i++) {
    // Use items from commonPhrases first, then generate variations
    const basePhrase =
      i < commonPhrases.length
        ? commonPhrases[i]
        : commonPhrases[i % commonPhrases.length]

    // Create variations for items beyond the common phrases list
    const variation =
      i >= commonPhrases.length
        ? ` (variation ${Math.floor(i / commonPhrases.length)})`
        : ''

    const item: VocabularyItem = {
      id: `${baseId}${i + 1}`,
      word: basePhrase.word + variation,
      english: basePhrase.english + variation,
      example: `${basePhrase.word} is a common phrase.`,
      exampleTranslation: `${basePhrase.english} is a common phrase.`,
      audioFile: `/audio/${basePhrase.word.replace(/\s/g, '-').toLowerCase()}.mp3`,
      difficulty,
      tags: [...tags],
    }

    items.push(item)
  }

  return items
}

function generatePhrases(
  unitId: string,
  lessonId: string,
  count: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: string[]
): VocabularyItem[] {
  return generateVocabularyItems(
    unitId,
    `${unitId}-${lessonId}-p`,
    count,
    difficulty,
    tags
  )
}

// template
function generateVowel(lessonId: string, count: number): VowelItem[] {
  const vowelsItems: VowelItem[] = []
  const vowels = [{ symbol: 'a' }, { symbol: 'e' }]

  return vowelsItems
}

export const khoekhoegowabUnits: Unit[] = [
  {
    id: 'beginner-unit-1',
    title: 'First Steps',
    level: 'beginner',
    description: 'Learn basic greetings and introductions in Khoekhoegowab',
    animal: 'Owl',
    animalIcon: 'owl',
    color: 'yellow',
    lessons: [
      {
        id: 'greetings',
        title: 'Greetings',
        description: 'Learn how to say hello and goodbye in Khoekhoegowab',
        vocabulary: generateVocabularyItems(
          'beginner-unit-1',
          'bu1-l1-v',
          5,
          'beginner',
          ['greetings']
        ),
        phrases: generatePhrases(
          'beginner-unit-1',
          'greetings',
          5,
          'beginner',
          ['greetings']
        ),
      },
    ],
  },
]
