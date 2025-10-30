'use client'

import { GameCard } from './game_card'
import { games } from '@/lib/games_data'

export function GameGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:grid-cols-3 m-12">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
