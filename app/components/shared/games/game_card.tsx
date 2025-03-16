'use client'

import { useState } from 'react'
import { Card } from '@/app/components/ui/card'
import { Game } from '@/lib/games_data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface GameCardProps {
    game: Game
}

export function GameCard({ game }: GameCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href={game.link} passHref>
            <Card
                className="group relative cursor-pointer overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="aspect-[4/2] overflow-hidden">
                    <img
                        src={game.thumbnail}
                        alt={game.name}
                        className={cn(
                            'h-full w-full object-cover transition-transform duration-300',
                            isHovered && 'scale-110'
                        )}
                    />
                </div>
                <div
                    className={cn(
                        'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white transition-opacity',
                        !isHovered && 'opacity-0'
                    )}
                >
                    <h3 className="text-xl font-bold">{game.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/90">
                        {game.shortDescription}
                    </p>
                </div>
            </Card>
        </Link>
    )
}
