import dotenv from 'dotenv'

dotenv.config()

export type CommonPhrase = { word: string; english: string }

export function loadCommonPhrases(): CommonPhrase[] {
  const raw = process.env.NEXT_PUBLIC_COMMON_KHOEKHOEGOWAB_PHRASES
  if (!raw) {
    console.log('No common phrases found for Khoekhoegowab.')
    return []
  }
  try {
    return JSON.parse(raw) as CommonPhrase[]
  } catch (e) {
    console.error('Error parsing KHOEKHOEGOWAB_COMMON_PHRASES:', e)
    return []
  }
}
