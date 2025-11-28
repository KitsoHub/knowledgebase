'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Shuffle } from 'lucide-react';
import { de } from 'zod/v4/locales';

interface MatchingPair {
  id: string;
  term: string;
  definition: string;
}

interface MatchingExerciseProps {
  pairs: MatchingPair[];
  onComplete: (score: number) => void;
}

export default function MatchingExercise({
  pairs,
  onComplete,
}: MatchingExerciseProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [terms, setTerms] = useState<(MatchingPair & { selected: boolean })[]>(
    []
  );
  const [definitions, setDefinitions] = useState<
    (MatchingPair & { selected: boolean })[]
  >([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(
    null
  );
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    const termsWithSelected = pairs.map(pair => ({ ...pair, selected: false }));
    const denintionsWithSelected = [...termsWithSelected];

    for (let i = denintionsWithSelected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [denintionsWithSelected[i], denintionsWithSelected[j]] = [
        denintionsWithSelected[j],
        denintionsWithSelected[i],
      ];
    }

    setTerms(termsWithSelected);
    setDefinitions(denintionsWithSelected);
  }, [pairs]);


  const handleTermClick = (termId: string) => {
//    check if item in matches else set the term then check if condition is set then update matches
    if(matches.includes(termId) || isComplete) return

    setSelectedTerm(termId)
    setTerms(terms.map((term)=>({...term, selected:term.id === termId}))
)

    if (selectedDefinition) {
        const matchingTerm = terms.find((t)=> t.id === termId)
        const matchingDef = definitions.find((d)=> d.id === selectedDefinition)

        if (matchingTerm && matchingDef && matchingTerm.id === matchingDef.id) {
            setMatches([...matches, termId])
            setSelectedTerm(null)
            setSelectedDefinition(null)

        }else{
            setTimeout(()=>{
                setSelectedTerm(null)
                setSelectedDefinition(null)
                setTerms(terms.map((t)=>({...t, selected: false})))
                setDefinitions(definitions.map((d)=>({...d, selected:false})))
            },1000)
        }
    }
  };

  const handleDefinitionClick = (definitionId: string) => {
   if (matches.includes(definitionId) || isComplete) return

   setSelectedDefinition(definitionId)
   setDefinitions(definitions.map((def)=>({...def, selected: def.id === definitionId})))


   if(selectedTerm){
    const matchingTerm = terms.find((t)=>t.id === selectedTerm)
    const matchingDef = definitions.find((d)=>d.id === selectedDefinition)

    if (matchingTerm && matchingDef &&matchingTerm.id === matchingDef.id) {
      setMatches([...matches, definitionId])
      // TODO: remove the matching pair from display but still keep the score, on reset should display every pair
      setSelectedTerm(null)
      setSelectedDefinition(null)

    }  else{
      setTimeout(() => {
        setSelectedTerm(null)
        setSelectedDefinition(null)
        setTerms(terms.map((t)=>({...t, selected:false})))
        setDefinitions(definitions.map((d)=>({...d, selected:false})))

      }, 1000);
    }
  }
  };

  useEffect(()=>{
    if (matches.length === pairs.length && !isComplete) {
        setIsComplete(true)
        onComplete(matches.length)
    }
  },[matches, pairs, isComplete, onComplete])

  const resetExercise = () => {
    const termsWithSelected = pairs.map((pair)=>({...pair, selected: false}))
    const definitionsWithSelected =[...termsWithSelected]

    for(let i = definitionsWithSelected.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [definitionsWithSelected[i], definitionsWithSelected[j]] = [definitionsWithSelected[j], definitionsWithSelected[i]]
    }
    setTerms(termsWithSelected)
    setDefinitions(definitionsWithSelected)
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatches([])
    setIsComplete(false);
  };



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

      {isComplete && (
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
          Great job! You've matched all the pairs correctly.
        </div>
      )}
    </div>
  );
}
