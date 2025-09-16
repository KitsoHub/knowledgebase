"use client"

import { BookOpen} from "lucide-react"
import { khoekhoegowabUnits } from "@/app/utils/mock/khoekhoegowab-vocabulary"


import { UnitCard } from "@/app/components/shared/langauges/unit-card"


export default function LanguageDashboard() {
  // Group units by level
  const beginnerUnits = khoekhoegowabUnits.filter((unit) => unit.level === "beginner")
  const intermediateUnits = khoekhoegowabUnits.filter((unit) => unit.level === "intermediate")
  const advancedUnits = khoekhoegowabUnits.filter((unit) => unit.level === "advanced")

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Khoekhoegowab</h1>
        </div>
      </header>

      <div className="space-y-6">
        {beginnerUnits.map((unit) => (
          <UnitCard
            languageId='khoekhoegowab'
            key={unit.id}
            unitId={unit.id}
            title={unit.title}
            animal={unit.animal}
            color={unit.color}
            lessons={unit.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
            }))}
          />
        ))}

        {intermediateUnits.map((unit) => (
          <UnitCard
            languageId='khoekhoegowab'
            key={unit.id}
            unitId={unit.id}
            title={unit.title}
            animal={unit.animal}
            color={unit.color}
            lessons={unit.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
            }))}
          />
        ))}

        {advancedUnits.map((unit) => (
          <UnitCard
            languageId='khoekhoegowab'
            key={unit.id}
            unitId={unit.id}
            title={unit.title}
            animal={unit.animal}
            color={unit.color}
            lessons={unit.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
            }))}
          />
        ))}
      </div>


    </div>
  )
}
