"use client"
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, BookOpen, Car, Puzzle } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import MobileNav from '@/app/components/shared/langauges/mobile-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { AudioExercise } from '@/app/components/languages/exercise-types/audio-exercise'
import MatchingExercise from '@/app/components/languages/exercise-types/matching-exercise'

export default function PracticePage() {
    const [ activeExercise, setActiveExercise] = useState<string | null>(null)
    const [testComplete, setTestComplete] = useState(false)
    const [testScore, setTestScore] = useState(0)

    const handleTestComplete=(score: number)=>{
        setTestComplete(true)
        setTestScore(score)

    }


  return (
 <div className="container max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <header className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Practice</h1>
        <div className="w-10"></div>
      </header>


       <Tabs defaultValue="exercises" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="tests">Practice Tests</TabsTrigger>
        </TabsList>

                <TabsContent value="exercises" className="space-y-4">

                    {!activeExercise ?(<>
                    <h2 className="text-lg font-bold mb-2">Speaking Exercises</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveExercise("pronunciation")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pronunciation Practice</CardTitle>
                    <CardDescription>Practice your pronunciation with audio exercises</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm">10 exercises</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveExercise("matching")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vocabulary Matching</CardTitle>
                    <CardDescription>Match words with their definitions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Puzzle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm">8 exercises</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>


                    </div>
                    </>): activeExercise === "pronunciation" ?(
                                    <Card>
              <CardHeader>
                <CardTitle>Pronunciation Practice</CardTitle>
                <CardDescription>Listen and repeat the phrases</CardDescription>
              </CardHeader>
              <CardContent>
                <AudioExercise
                  audioSrc="/placeholder.mp3"
                  transcript="How are you doing today?"
                  translation="O tshogile jang gompieno?"
                  onComplete={() => setActiveExercise(null)}
                />
              </CardContent>
            </Card>
                    ): activeExercise === "matching"?(
                        <MatchingExercise/>
                    ):null}

                </TabsContent>


                <TabsContent value="quizzes" className="space-y-4">

                </TabsContent>

                <TabsContent value="tests" className="space-y-4">

                </TabsContent>

       </Tabs>



       <MobileNav/>

   </div>
  )
}
