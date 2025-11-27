"use client"

import React, { useState } from 'react'
import { Button } from '../../ui/button'
import { Shuffle } from 'lucide-react'

export default function MatchingExercise() {
    const [isComplete, setIsComplete] = useState(true)

    const resetExercise = ()=>{
        console.log("reset")
    }


  return (
    <div className='space-y-6'>
              <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Match the pairs</h3>
        <Button variant="outline" size="sm" onClick={resetExercise}>
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-4'>

      </div>

    {isComplete &&(
          <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
          Great job! You've matched all the pairs correctly.
        </div>
    )}

    </div>
  )
}
