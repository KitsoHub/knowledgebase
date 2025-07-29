"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Trophy, Users, Gamepad2 } from "lucide-react"

interface NameEntryProps {
  onSubmit: (username: string) => void;
}

export default function NameEntry({ onSubmit }: NameEntryProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome to Setswana Games</h1>
          <p className="text-muted-foreground">
            Enter your name to join the leaderboard and compete in traditional games
          </p>
        </div>

        {/* Name Entry Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Player Registration
            </CardTitle>
            <CardDescription>Join our community of traditional game enthusiasts</CardDescription>
          </CardHeader>
          <CardContent>
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-gray-300"
          />
          <Button
            type="submit"
            disabled={!username.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Start Quiz
          </Button>
        </form>
          </CardContent>
        </Card>

        {/* Game Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto" />
            </div>
            <p className="text-sm font-medium">Maele</p>
          </div>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-green-500 mx-auto" />
            </div>
            <p className="text-sm font-medium">Mohelele</p>
          </div>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Trophy className="h-6 w-6 text-purple-500 mx-auto" />
            </div>
            <p className="text-sm font-medium">Morabaraba</p>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Ready to compete in traditional Setswana games?</p>
        </div>
      </div>
    </div>
  )
}
