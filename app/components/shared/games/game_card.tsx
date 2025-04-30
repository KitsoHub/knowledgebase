'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/games_data'

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <Link href={game.link} passHref>
      <Card
        className={cn(
          // Use cardColor if available, otherwise fallback to default gradient.
          game.cardColor ? game.cardColor : "bg-gradient-to-br from-yellow-400 to-yellow-600",
          "border-4 border-white/20 text-white overflow-hidden transition-transform hover:scale-105 cursor-pointer"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-extrabold">{game.name}</CardTitle>
            <div className="rounded-full bg-white/20 p-2">{game.icon}</div>
          </div>
          <CardDescription className="text-white/90 text-base">
            {game.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pb-2">
          {game.objective && (
            <div>
              <span className="text-white/70 font-medium">Learning Objective:</span>
              <p className="font-medium">{game.objective}</p>
            </div>
          )}
          <div>
            <span className="text-white/70 font-medium">Players:</span>
            <p className="font-medium">{(game as any).players ?? "NaN"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 ">
          {game.conditions.map((condition) => (
            <Badge key={condition} className="bg-white/20 hover:bg-white/30 text-white ">
              {condition}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}

export { GameCard }