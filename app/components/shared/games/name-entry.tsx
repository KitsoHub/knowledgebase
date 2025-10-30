'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Trophy, Users } from 'lucide-react'

interface NameEntryProps {
  onSubmit: (username: string) => void
}

export default function NameEntry({ onSubmit }: NameEntryProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSubmit(username.trim())
    }
  }

  return (
    <div className="h-600 mt-40 relative flex items-center justify-center p-4  overflow-hidden shadow-lg">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b87a4a] to-[#4a2b18] rounded-md"></div>
      {/* Basket pattern overlay */}
      <div className="absolute inset-0 bg-[url('/assets/game/morabaraba.png')] bg-repeat opacity-10"></div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-[#8b5e34] p-4 rounded-full shadow-lg">
              <Trophy className="h-8 w-8 text-[#f4e1c1]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f4e1c1]">
            Welcome to Traditional Idioms Game
          </h1>
          <p className="text-[#f7e9d7]">
            Enter your name to join the leaderboard and compete in traditional
            games
          </p>
        </div>

        {/* Name Entry Form */}
        <Card className="bg-[#f9f4ef]/90 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-[#4a2b18]">
              <Users className="h-5 w-5 text-[#b87a4a]" />
              Player Registration
            </CardTitle>
            <CardDescription className="text-[#6b4f3a]">
              Join our community of traditional game enthusiasts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border-[#d1bfa7] focus:border-[#b87a4a] focus:ring-[#b87a4a]"
              />
              <Button
                type="submit"
                disabled={!username.trim()}
                className="bg-gradient-to-r from-[#b87a4a] to-[#8b5e34] hover:from-[#a1693f] hover:to-[#6e4a28] text-white font-bold py-2 px-6 rounded-full"
              >
                Start Quiz
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Game Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="bg-[#f9f4ef] p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-yellow-600 mx-auto" />
            </div>
            <p className="text-sm font-medium text-[#4a2b18]">Maele</p>
          </div>
          <div className="space-y-2">
            <div className="bg-[#f9f4ef] p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-green-700 mx-auto" />
            </div>
            <p className="text-sm font-medium text-[#4a2b18]">Mohelele</p>
          </div>
          <div className="space-y-2">
            <div className="bg-[#f9f4ef] p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-purple-700 mx-auto" />
            </div>
            <p className="text-sm font-medium text-[#4a2b18]">Morabaraba</p>
          </div>
        </div>

        <div className="text-center text-sm text-[#f4e1c1]">
          <p>Ready to compete in traditional Setswana games?</p>
        </div>
      </div>
    </div>
  )
}
