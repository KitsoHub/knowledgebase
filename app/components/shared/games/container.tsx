'use client'
import React from 'react'
import { games } from '@/lib/games_data'
import { GameCard } from './game_card'
import type { Game } from '@/lib/games_data'

interface ContainerProps {
  category: string
}

export default function Container({ category }: ContainerProps) {
  // Function to filter games based on the provided category
  const filterGamesByCategory = (gamesList: Game[], category: string) => {
    return gamesList.filter((game) => game.category === category)
  }

  const filteredGames = filterGamesByCategory(games, category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
