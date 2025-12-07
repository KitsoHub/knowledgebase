'use client'

import { UnitCard } from '@/app/components/shared/langauges/unit-card'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { ikalangaUnits } from '@/app/utils/mock/ikalanga-vocabulary'
import { FolkloreItem, RiddleItem } from '@/lib/types/folklore'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSearchParam } from 'react-use'

export default function SetswanaLanguageDashboard() {

  const [item, setItem] = useState<RiddleItem | null>(null);



  const beginnerUnits = ikalangaUnits.filter(unit => unit.level === 'beginner')
    const folklores = [
    {
      id: "riddles",
      label: "Riddles",
      icon: "🧩",
      description: "Solve classic riddles and test your wit",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      id: "idioms",
      label: "Idioms",
      icon: "💬",
      description: "Master English idioms and expressions",
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      id: "proverbs",
      label: "Proverbs",
      icon: "📖",
      description: "Learn wisdom from timeless proverbs",
      color: "from-orange-500/20 to-orange-600/20",
    },
  ]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Setswana</h1>
        </div>
      </header>

        <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground text-center">Figurative Language</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {folklores.map((folklore) => (
              <Link key={folklore.id} href={`/languages/setswana/folklore/${folklore.id}`}>
                <Card
                  className={`p-8 space-y-6 cursor-pointer transition-all hover:scale-105 bg-gradient-to-br ${folklore.color} border-border/50 h-full`}
                >
                  <div className="text-6xl">{folklore.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{folklore.label}</h3>
                    <p className="text-muted-foreground">{folklore.description}</p>
                  </div>
                  <Button className="w-full">Learn {folklore.label}</Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>



      <div className="space-y-6">
        {beginnerUnits.map(unit => (
          <UnitCard
            languageId="ikalanga"
            key={unit.id}
            unitId={unit.id}
            title={unit.title}
            animal={unit.animal}
            color={unit.color}
            lessons={unit.lessons.map(lesson => ({
              id: lesson.id,
              title: lesson.title,
            }))}
          />
        ))}
      </div>
    </div>
  )
}
