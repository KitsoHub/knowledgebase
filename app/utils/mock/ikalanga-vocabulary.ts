import { number } from 'zod';


export type VocabularyItem = {
  id: string
  word: string
  english: string
  example?: string
  exampleTranslation?: string
  audioFile?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}



export type Lesson = {
  id: string
  title: string
  description: string
  vocabulary: VocabularyItem[]
  phrases?: VocabularyItem[]
  numbers?: VocabularyItem[]
  conversations?: { id: string; speakers: { role: string; text: string; translation: string }[] }[]
}

export type Unit = {
  id: string
  title: string
  level: "beginner" | "intermediate" | "advanced"
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
  difficulty: "beginner" | "intermediate" | "advanced",
  tags: string[],
): VocabularyItem[] {
  const items: VocabularyItem[] = []

  const commonPhrases = [
    { word: "Dumilani", english: "Good day" },
    { word: "Mamuka tjini?", english: "How are you?" },
    { word: "Zina lilo ndiyani?", english: "What's your name?" }
  ]


  for (let i = 0; i < count; i++) {
    // Use items from commonPhrases first, then generate variations
    const basePhrase = i < commonPhrases.length ? commonPhrases[i] : commonPhrases[i % commonPhrases.length]

    // Create variations for items beyond the common phrases list
    const variation = i >= commonPhrases.length ? ` (variation ${Math.floor(i / commonPhrases.length)})` : ""

    const item: VocabularyItem = {
      id: `${baseId}${i + 1}`,
      word: basePhrase.word + variation,
      english: basePhrase.english + variation,
      example: `${basePhrase.word} is a common phrase.`,
      exampleTranslation: `${basePhrase.english} is a common phrase.`,
      audioFile: `/audio/${basePhrase.word.replace(/\s/g, "-").toLowerCase()}.mp3`,
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
  difficulty: "beginner" | "intermediate" | "advanced",
  tags: string[],
): VocabularyItem[] {
  return generateVocabularyItems(unitId, `${unitId}-${lessonId}-p`, count, difficulty, tags)
}

// numbers
function generateNumberItems(unitId: string,
  baseId: string,
  count: number,
  difficulty: "beginner" | "intermediate" | "advanced",
  tags: string[]): VocabularyItem[] {

  const items: VocabularyItem[] = []

  const basicNumbers = [
    { word: "Ng’ompela", english: "One" },
    { word: "Bubili", english: "Two" },
    { word: "Thatu", english: "Three" },
    { word: "Nna", english: "Four" },
    { word: "Shanu", english: "Five" },
    { word: "Tanatu", english: "Six" },
    { word: "Tendeka", english: "Seven" },
    { word: "Hhanakadzi", english: "Eight" },
    { word: "Hhanalume", english: "Nine" },
    { word: "Gumi", english: "Ten" },

  ]

  for (let i = 0; i < count; i++) {
    const baseNumber = i < basicNumbers.length ? basicNumbers[i] : basicNumbers[i % basicNumbers.length]
    const numberItem: VocabularyItem = {
      id: `${baseId}${i + 1}`,
      word: baseNumber.word,
      english: baseNumber.english,
      audioFile: `/audio/${baseNumber.word.replace(/\s/g, "-").toLowerCase()}.mp3`,
      difficulty,
      tags: [...tags],
    }
    items.push(numberItem)
  }
return items
}


function generateNumbers(
  unitId: string,
  lessonId: string,
  count: number,  difficulty: "beginner" | "intermediate" | "advanced",  tags: string[],
): VocabularyItem[] {
  return generateNumberItems(unitId, `${unitId}-${lessonId}-n`, count, difficulty, tags)
}

export const ikalangaUnits: Unit[] = [
  {
    id: "beginner-unit-1",
    title: "First Steps",
    level: "beginner",
    description: "Learn basic greetings and introductions in ikalanga",
    animal: "Owl",
    animalIcon: "owl",
    color: "yellow",
    lessons: [
      {
        id: "greetings",
        title: "Greetings",
        description: "Learn how to say words in ikalanga",
        vocabulary: generateVocabularyItems("beginner-unit-1", "bu1-l1-v", 5, "beginner", ["greetings"]),
        phrases: generatePhrases("beginner-unit-1", "greetings", 5, "beginner", ["greetings"]),
      }
    ]
  },
    {
    id: "beginner-unit-2",
    title: "Numbers & Time",
    level: "beginner",
    description: "Learn basic numbers and time in ikalanga",
    animal: "Fox",
    animalIcon: "Fox",
    color: "orange",
    lessons: [
      {
        id: "numbers-time",
        title: "Numbers & Time",
        description: "Learn how to say words in ikalanga",
        vocabulary: generateNumberItems("beginner-unit-2", "bu2-numbers", 10, "beginner", ["numbers","time"]),
        phrases: generateNumbers("beginner-unit-2", "numbers-time", 10, "beginner", ["numbers","time"]),
      }
    ]
  }


]
