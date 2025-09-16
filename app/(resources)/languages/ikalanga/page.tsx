"use client"

import { UnitCard } from '@/app/components/shared/langauges/unit-card'
import { ikalangaUnits } from '@/app/utils/mock/ikalanga-vocabulary'
import { BookOpen } from 'lucide-react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSearchParam } from 'react-use'

export default function IkalangaLanguageDashboard() {
    const beginnerUnits = ikalangaUnits.filter((unit) => unit.level === "beginner")
     const pathname = useSearchParams()
    console.log("<<<<<<<<<<Language ID>>>>>>", pathname)
    return (
        <div className='container max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8'>
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-full p-2">
                        <BookOpen className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Ikalanga</h1>
                </div>
            </header>

            <div className="space-y-6">
                {beginnerUnits.map((unit) => (
                    <UnitCard
                    languageId='ikalanga'
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
                )

                )}

            </div>
        </div>
    )
}
