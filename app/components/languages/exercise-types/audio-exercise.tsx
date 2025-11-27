"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Mic, MicOff, Play, Pause, RotateCcw } from "lucide-react"
import { Slider } from "@/app/components/ui/slider"

interface AudioExerciseProps {
  audioSrc: string
  transcript: string
  translation?: string
  onComplete: () => void
}

export function AudioExercise({ audioSrc, transcript, translation, onComplete }: AudioExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [userTranscript, setUserTranscript] = useState("")
  const [hasCompleted, setHasCompleted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(audioSrc)

    audioRef.current.addEventListener("loadedmetadata", () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    })

    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    })

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [audioSrc])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
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
          .map((result) => result.transcript)
          .join("")

        setUserTranscript(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const startRecording = () => {
    if (recognitionRef.current) {
      setUserTranscript("")
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setHasCompleted(true)
      onComplete()
    }
  }

  const resetExercise = () => {
    setUserTranscript("")
    setHasCompleted(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Listen and Repeat</h3>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" onClick={togglePlayPause} className="h-12 w-12 rounded-full">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {transcript && (
          <div className="mt-4">
            <p className="font-medium">{transcript}</p>
            {translation && <p className="text-sm text-muted-foreground mt-1">{translation}</p>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            className="rounded-full h-16 w-16"
            disabled={hasCompleted}
          >
            {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
        </div>

        {userTranscript && (
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Your recording:</h4>
            <p>{userTranscript}</p>
          </div>
        )}

        {hasCompleted && (
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetExercise}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={onComplete}>Continue</Button>
          </div>
        )}
      </div>
    </div>
  )
}
