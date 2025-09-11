"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useProgressStore } from "@/lib/store/progress-store"
import { khoekhoegowabUnits } from "@/app/utils/mock/khoekhoegowab-vocabulary"
import { ikalangaUnits } from "@/app/utils/mock/ikalanga-vocabulary"


interface UnitCardProps {
  unitId: string
  title: string
  animal: string
  color: string
  lessons: {
    id: string
    title: string
  }[]
}

export function UnitCard({ unitId, title, animal, color, lessons }: UnitCardProps) {
  const { progress } = useProgressStore()
  const unitProgress = progress.unitProgress[unitId]

  // refactor to get the correct unit dynamically based on the language
  //const unitData = khoekhoegowabUnits.find((unit) => unit.id === unitId)
  const unitData = ikalangaUnits.find((unit) => unit.id === unitId)

  // Get the appropriate animal icon
  const getAnimalIcon = (animal: string) => {
    switch (animal.toLowerCase()) {
      case "owl":
        return "🦉"
      case "fox":
        return "🦊"
      case "turtle":
        return "🐢"
      case "parrot":
        return "🦜"
      case "beaver":
        return "🦫"
      case "flamingo":
        return "🦩"
      case "eagle":
        return "🦅"
      case "lion":
        return "🦁"
      case "dolphin":
        return "🐬"
      default:
        return "🐾"
    }
  }

  // Get color class based on the color prop
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      yellow: "text-yellow-500",
      orange: "text-orange-500",
      green: "text-green-500",
      purple: "text-purple-500",
      pink: "text-pink-500",
      red: "text-red-500",
      cyan: "text-cyan-500",
      emerald: "text-emerald-500",
      blue: "text-blue-500",
    }

    return colorMap[color] || "text-primary"
  }

  // Calculate which lessons are completed and which is the current one
  const lessonStatus = lessons.map((lesson, index) => {
    const lessonKey = `${unitId}-${lesson.id}`
    const isCompleted = progress.lessonProgress[lessonKey]?.completed || false
    const isCurrent =
      !isCompleted && (index === 0 || progress.lessonProgress[`${unitId}-${lessons[index - 1].id}`]?.completed)

    // Get the lesson data to show phrase counts
    const lessonData = unitData?.lessons.find((l) => l.id === lesson.id)
    const phraseCount = lessonData
      ? lessonData.vocabulary.length +
        (lessonData.phrases ? lessonData.phrases.length : 0) +
        (lessonData.numbers? lessonData.numbers.length : 0)
      : 0

    return {
      ...lesson,
      completed: isCompleted,
      current: isCurrent,
      phraseCount,
    }
  })

  return (
    <div className="border rounded-xl p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className={getColorClass(color)}>{getAnimalIcon(animal)}</span>
        {title}
      </h2>

      <div className="space-y-3">
        {lessonStatus.map((lesson, index) => (
          <Link
            key={index}
            // href={lesson.completed || lesson.current ? `/languages/${unitId}/${lesson.id}` : "#"}
            // update to dynamic language route
            //href={lesson.completed || lesson.current ? `/languages/khoekhoegowab/${unitId}/${lesson.id}` : "#"}
            href={lesson.completed || lesson.current ? `/languages/ikalanga/${unitId}/${lesson.id}` : "#"}

            className={`flex items-center justify-between p-3 rounded-lg ${
              lesson.completed
                ? "bg-green-100 dark:bg-green-900/20"
                : lesson.current
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-muted cursor-not-allowed opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              {lesson.completed ? (
                <div className="bg-green-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white"
                  >
                    <path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"></path>
                    <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7-.7.7m0 11.4.7.7m-12.1-.7-.7.7"></path>
                  </svg>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">{index + 1}</div>
              )}
              <div>
                <span className="font-medium">{lesson.title}</span>
                <p className="text-xs text-muted-foreground">{lesson.phraseCount} phrases</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  )
}
