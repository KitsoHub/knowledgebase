"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Shuffle } from "lucide-react"
import Swal from 'sweetalert2'
interface MatchingPair {
  id: string
  term: string
  definition: string
}

interface MatchingExerciseProps {
  pairs: MatchingPair[]
  onComplete: (score: number) => void
}

export function MatchingExercise({ pairs, onComplete }: MatchingExerciseProps) {
  const [terms, setTerms] = useState<(MatchingPair & { selected: boolean })[]>([])
  const [definitions, setDefinitions] = useState<(MatchingPair & { selected: boolean })[]>([])
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null)
  const [matches, setMatches] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const showSwal = () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Exercise Complete',
        text: 'Great job! You have matched all the pairs correctly.',
        showConfirmButton: false,
        timer: 2800,
      })
    }

  useEffect(() => {
    const termsWithSelected = pairs.map((pair) => ({ ...pair, selected: false }))
    const definitionsWithSelected = [...termsWithSelected]

    for (let i = definitionsWithSelected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[definitionsWithSelected[i], definitionsWithSelected[j]] = [
        definitionsWithSelected[j],
        definitionsWithSelected[i],
      ]
    }

    setTerms(termsWithSelected)
    setDefinitions(definitionsWithSelected)
  }, [pairs])

  const handleTermClick = (id: string) => {
    if (matches.includes(id) || isComplete) return

    setSelectedTerm(id)
    setTerms(
      terms.map((term) => ({
        ...term,
        selected: term.id === id,
      })),
    )

    if (selectedDefinition) {
      const matchingTerm = terms.find((term) => term.id === id)
      const matchingDef = definitions.find((def) => def.id === selectedDefinition)

      if (matchingTerm && matchingDef && matchingTerm.id === matchingDef.id) {

        setMatches([...matches, id])
        setSelectedTerm(null)
        setSelectedDefinition(null)
      } else {

        setTimeout(() => {
          setSelectedTerm(null)
          setSelectedDefinition(null)
          setTerms(terms.map((term) => ({ ...term, selected: false })))
          setDefinitions(definitions.map((def) => ({ ...def, selected: false })))
        }, 1000)
      }
    }
  }

  const handleDefinitionClick = (id: string) => {
    if (matches.includes(id) || isComplete) return

    setSelectedDefinition(id)
    setDefinitions(
      definitions.map((def) => ({
        ...def,
        selected: def.id === id,
      })),
    )


    if (selectedTerm) {
      const matchingTerm = terms.find((term) => term.id === selectedTerm)
      const matchingDef = definitions.find((def) => def.id === id)

      if (matchingTerm && matchingDef && matchingTerm.id === matchingDef.id) {

        setMatches([...matches, id])
        // TODO: remove from display once matched
        setSelectedTerm(null)
        setSelectedDefinition(null)
      } else {

        setTimeout(() => {
          setSelectedTerm(null)
          setSelectedDefinition(null)
          setTerms(terms.map((term) => ({ ...term, selected: false })))
          setDefinitions(definitions.map((def) => ({ ...def, selected: false })))
        }, 1000)
      }
    }
  }


  useEffect(() => {
    if (matches.length === pairs.length && !isComplete) {
      setIsComplete(true)
      showSwal()
      onComplete(matches.length)
    }
  }, [matches, pairs, isComplete, onComplete])

  const resetExercise = () => {
    const termsWithSelected = pairs.map((pair) => ({ ...pair, selected: false }))
    const definitionsWithSelected = [...termsWithSelected]


    for (let i = definitionsWithSelected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[definitionsWithSelected[i], definitionsWithSelected[j]] = [
        definitionsWithSelected[j],
        definitionsWithSelected[i],
      ]
    }

    setTerms(termsWithSelected)
    setDefinitions(definitionsWithSelected)
    setSelectedTerm(null)
    setSelectedDefinition(null)
    setMatches([])
    setIsComplete(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Match the pairs</h3>
        <Button variant="outline" size="sm" onClick={resetExercise}>
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Terms</h4>
          {terms.map((term) => (
            <div
              key={`term-${term.id}`}
              onClick={() => handleTermClick(term.id)}
              className={`p-3 rounded-lg border transition-all ${
                matches.includes(term.id)
                  ? "bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-500"
                  : term.selected
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-muted/50 cursor-pointer"
              }`}
            >
              {term.term}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Definitions</h4>
          {definitions.map((definition) => (
            <div
              key={`def-${definition.id}`}
              onClick={() => handleDefinitionClick(definition.id)}
              className={`p-3 rounded-lg border transition-all ${
                matches.includes(definition.id)
                  ? "bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-500"
                  : definition.selected
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-muted/50 cursor-pointer"
              }`}
            >
              {definition.definition}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
