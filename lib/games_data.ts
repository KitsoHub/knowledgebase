
import { ReactNode } from "react"


export interface Game {
    objective: any
    icon: string | ReactNode
    players?: string | number
    color(color: any, arg1: string): string | undefined
    id: string
    name: string
    shortDescription: string
    description: string
    thumbnail: string
    rules: string[]
    playLink?: string
    link: string
    cardColor?: string
    category?: string
    iconType?: string
    conditions: string[]
}

export const games: Game[] = [
    {
        id: 'maele',
        name: 'Maele a Setswana',
        shortDescription: 'Match Setswana idioms with their English meanings',
        description: 'A fun and educational game to learn and match Setswana idioms with their English translations.',
        objective: 'To learn and understand Setswana idioms and their meanings.',
        thumbnail:
            'https://englishclassviaskype.com/wp-content/uploads/2023/05/An-Introduction-to-Idioms-and-Expressions.jpg',
        rules: [
            'Players take turns matching Setswana idioms with their correct English meanings.'
        ],
        link: '/games/maele',
        category: 'moheleMaele',
        cardColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        players: '1',
        conditions: ['Time Attacks'],

    },
];
