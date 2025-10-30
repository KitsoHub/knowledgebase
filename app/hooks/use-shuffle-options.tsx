import { useMemo } from 'react'
import { shuffleArray } from '@/lib/utils'
import { phrases } from '@/lib/questions'

export const useShuffledOptions = (
  question: (typeof phrases)[0] | null,
  options: typeof phrases
) => {
  const allOptions = useMemo(() => {
    // Create the new array with question included, if it's not null
    const newOptions = [
      question && (question as (typeof phrases)[0]), // Typecast question safely
      ...options,
    ].filter(Boolean) // Remove `null` or `undefined` values (like if `question` is null)

    // Shuffle the array
    shuffleArray(newOptions)

    return newOptions
  }, [question, options]) // Dependencies: recompute when `question` or `options` change

  return allOptions
}
