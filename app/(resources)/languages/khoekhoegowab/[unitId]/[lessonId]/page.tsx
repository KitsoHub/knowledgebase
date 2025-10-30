'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  CheckCircle2,
  Mic,
  MicOff,
  Play,
  Volume2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useProgressStore } from '@/lib/store/progress-store'

import confetti from 'canvas-confetti'
import { khoekhoegowabUnits } from '@/app/utils/mock/khoekhoegowab-vocabulary'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import React from 'react'

type LessonParams = {
  unitId: string
  lessonId: string
}

export default function LessonPage() {
  const params = useParams<LessonParams>()
  const { unitId, lessonId } = params

  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [phrasesPerPage] = useState(10) // Show 10 phrases per page

  const router = useRouter()
  const { completeLesson, startLesson } = useProgressStore()

  const recognitionRef = useRef<any>(null)

  const unit = khoekhoegowabUnits.find(u => u.id === unitId)
  const lesson = unit?.lessons.find(l => l.id === lessonId)

  useEffect(() => {
    if (!unit || !lesson) {
      router.push('/')
      return
    }

    // Mark this lesson as started
    startLesson(unitId, lessonId)
  }, [unit, lesson, router, unitId, lessonId, startLesson])

  // Generate lesson steps from the lesson data
  const generateLessonSteps = () => {
    if (!lesson) return []

    type ListenOrSpeakStep = {
      type: 'listen' | 'speak'
      phrase: string
      translation: string
      example?: string
      exampleTranslation?: string
    }

    type ConversationStep = {
      type: 'conversation'
      phrases: {
        speaker: string
        text: string
        translation: string
      }[]
    }

    type LessonStep = ListenOrSpeakStep | ConversationStep

    const steps: LessonStep[] = []

    // Add vocabulary listening steps - paginated
    const startIndex = currentPage * phrasesPerPage
    const endIndex = startIndex + phrasesPerPage

    // Use the current page of vocabulary items
    const currentVocabulary = lesson.vocabulary.slice(startIndex, endIndex)

    currentVocabulary.forEach(vocab => {
      steps.push({
        type: 'listen',
        phrase: vocab.word,
        translation: vocab.english,
        example: vocab.example,
        exampleTranslation: vocab.exampleTranslation,
      })
    })

    // Add speaking practice steps - also paginated
    const currentPhrases = lesson.phrases.slice(startIndex, endIndex)

    currentPhrases.forEach(phrase => {
      steps.push({
        type: 'speak',
        phrase: phrase.word,
        translation: phrase.english,
        example: phrase.example,
        exampleTranslation: phrase.exampleTranslation,
      })
    })

    // Add conversation practice if available
    if (lesson.conversations && lesson.conversations.length > 0) {
      steps.push({
        type: 'conversation',
        phrases: lesson.conversations[0].speakers.map(speaker => ({
          speaker: speaker.role,
          text: speaker.text,
          translation: speaker.translation,
        })),
      })
    }

    return steps
  }

  const lessonSteps = generateLessonSteps()
  const currentStep = lessonSteps[step]

  // Calculate total pages
  const totalPages = lesson
    ? Math.ceil(lesson.vocabulary.length / phrasesPerPage)
    : 0

  useEffect(() => {
    setProgress(
      Math.round(
        ((currentPage * phrasesPerPage + step) /
          (lesson?.vocabulary.length || 1)) *
          100
      )
    )

    // Initialize speech recognition
    if (
      (typeof window !== 'undefined' && 'SpeechRecognition' in window) ||
      'webkitSpeechRecognition' in window
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-UK'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('')

        setTranscript(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
        // toast({
        //   title: "Error",
        //   description: "There was a problem with the speech recognition. Please try again.",
        //   variant: "destructive",
        // })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      console.error('Not supported')
      // toast({
      //   title: "Not supported",
      //   description: "Speech recognition is not supported in your browser.",
      //   variant: "destructive",
      // })
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [
    step,
    lessonSteps.length,
    currentPage,
    lesson?.vocabulary.length,
    phrasesPerPage,
  ])

  const startListening = () => {
    setTranscript('')
    setResult(null)
    setIsListening(true)
    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)

      // add sophisticated matching
      const expectedPhrase =
        currentStep.type === 'speak'
          ? currentStep.phrase.toLowerCase()
          : currentStep.type === 'conversation'
            ? currentStep.phrases
                .find(p => p.speaker === 'You' || p.speaker === 'Person B')
                ?.text.toLowerCase()
            : ''

      const userSaid = transcript.toLowerCase()

      // add sophisticated matching
      if (
        expectedPhrase &&
        (userSaid.includes(expectedPhrase.toLowerCase()) ||
          expectedPhrase.toLowerCase().includes(userSaid))
      ) {
        setResult('correct')
      } else {
        setResult('incorrect')
      }
    }
  }

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'es-ES' // Set to Spanish
      window.speechSynthesis.speak(utterance)
    } else {
      console.log('Not supported')
      // toast({
      //   title: "Not supported",
      //   description: "Text-to-speech is not supported in your browser.",
      //   variant: "destructive",
      // })
    }
  }

  const nextStep = () => {
    if (step < lessonSteps.length - 1) {
      setStep(step + 1)
      setTranscript('')
      setResult(null)
    } else {
      // Check if there are more pages
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1)
        setStep(0)
        setTranscript('')
        setResult(null)
      } else {
        // Lesson complete
        setLessonComplete(true)

        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })

        // Mark lesson as completed in the store
        completeLesson(unitId, lessonId, 100)

        // toast({
        //   title: "Lesson Complete!",
        //   description: "You've completed this lesson. Great job!",
        // })
      }
    }
  }

  const handleFinishLesson = () => {
    router.push('/')
  }

  if (!unit || !lesson) {
    return null
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">
          {unit.title}: {lesson.title}
        </h1>
        <div className="w-10"></div>
      </header>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </span>
        <span className="text-sm text-muted-foreground">
          {currentPage * phrasesPerPage + step + 1} of{' '}
          {lesson.vocabulary.length + lesson.phrases.length} phrases
        </span>
      </div>

      {/* <Progress value={progress} className="h-2 mb-8" /> */}

      {!lessonComplete ? (
        <Card className="mb-6">
          <CardContent className="p-6">
            {currentStep.type === 'listen' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Listen and Learn</h2>
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-6">
                    <Volume2 className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-medium">{currentStep.phrase}</p>
                  <p className="text-muted-foreground">
                    {currentStep.translation}
                  </p>
                  {currentStep.example && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="italic">{currentStep.example}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentStep.exampleTranslation}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button onClick={() => playAudio(currentStep.phrase)}>
                    <Play className="h-4 w-4 mr-2" />
                    Play Audio
                  </Button>
                </div>
              </div>
            )}

            {currentStep.type === 'speak' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Repeat the Phrase</h2>
                <div className="text-center space-y-2">
                  <p className="text-xl font-medium">{currentStep.phrase}</p>
                  <p className="text-muted-foreground">
                    {currentStep.translation}
                  </p>
                  {currentStep.example && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="italic">{currentStep.example}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentStep.exampleTranslation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? 'destructive' : 'default'}
                    className="rounded-full h-16 w-16"
                  >
                    {isListening ? (
                      <MicOff className="h-6 w-6" />
                    ) : (
                      <Mic className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {transcript && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-center">{transcript}</p>
                  </div>
                )}

                {result && (
                  <div
                    className={`flex items-center justify-center gap-2 ${
                      result === 'correct' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {result === 'correct' ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span>
                          Try again. Listen carefully to the pronunciation.
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentStep.type === 'conversation' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Practice Conversation</h2>

                <div className="space-y-4">
                  {currentStep.phrases.map((phrase, index) => (
                    <div
                      key={index}
                      className={`flex ${phrase.speaker === 'You' || phrase.speaker === 'Person B' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          phrase.speaker === 'You' ||
                          phrase.speaker === 'Person B'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-xs font-medium mb-1">
                          {phrase.speaker}
                        </p>
                        <p>{phrase.text}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {phrase.translation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? 'destructive' : 'default'}
                    className="rounded-full h-16 w-16"
                  >
                    {isListening ? (
                      <MicOff className="h-6 w-6" />
                    ) : (
                      <Mic className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {transcript && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-center">{transcript}</p>
                  </div>
                )}

                {result && (
                  <div
                    className={`flex items-center justify-center gap-2 ${
                      result === 'correct' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {result === 'correct' ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Good job! Your response was appropriate.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span>Try again with the suggested response.</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="py-8 space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Good! Lesson Complete</h2>
              <p className="text-muted-foreground">
                You've successfully completed this lesson with over{' '}
                {lesson.vocabulary.length + lesson.phrases.length} phrases. Keep
                up the good work!
              </p>
              <div className="flex justify-center mt-4">
                <Button onClick={handleFinishLesson} size="lg">
                  Continue Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!lessonComplete && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step > 0) {
                setStep(step - 1)
              } else if (currentPage > 0) {
                setCurrentPage(currentPage - 1)
                setStep(phrasesPerPage - 1)
              }
            }}
            disabled={step === 0 && currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentPage + 1} / {totalPages}
            </span>
          </div>
          <Button
            onClick={nextStep}
            disabled={currentStep.type !== 'listen' && result !== 'correct'}
          >
            {currentPage === totalPages - 1 && step === lessonSteps.length - 1
              ? 'Complete Lesson'
              : 'Continue'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
