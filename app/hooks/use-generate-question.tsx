import { useState, useEffect } from 'react'
import { phrases } from '@/lib/questions'

const useRandomQuestion = (level: number) => {
  const [chosenQuestion, setChosenQuestion] = useState<
    (typeof phrases)[0] | null
  >(null)
  const [options, setOptions] = useState<typeof phrases>([])

  useEffect(() => {
    const genRandomQuestion = () => {
      const randomIndex = Math.floor(Math.random() * phrases.length)
      return {
        chosenQuestion: phrases[randomIndex],
        chosenIndex: randomIndex,
      }
    }

    const { chosenQuestion, chosenIndex } = genRandomQuestion()
    setChosenQuestion(chosenQuestion)

    const newOptions: typeof phrases = ([] = [])
    for (let i = 0; i < 3; i++) {
      let { chosenQuestion: optionQuestion, chosenIndex: optionIndex } =
        genRandomQuestion()

      // Ensure the option is different from the chosen question
      while (optionIndex === chosenIndex) {
        ;({ chosenQuestion: optionQuestion, chosenIndex: optionIndex } =
          genRandomQuestion())
      }

      // Add the option to the options array
      newOptions.push(optionQuestion)
    }

    setOptions(newOptions)
  }, [level]) // Empty dependency array means this effect runs only once when the component mounts

  return { chosenQuestion, options }
}

export default useRandomQuestion
