"use client"
import React from 'react'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import Container from '@/app/components/shared/games/container'

export default function Games() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-pink-400 to-purple-600 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4">
                    <Button asChild variant="link" className="mt-4 sm:mt-0">
                        <Link href="/" className="flex items-center">
                            <ArrowLeft className="ml-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
                <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md mb-4">Kitso Games</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            A fun and interactive way to learn about Setswana and its rich heritage.
          </p>
        </header>
                <Tabs defaultValue="moheleMaele" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/20 rounded-full p-1">
                        <TabsTrigger
                            value="moheleMaele"
                            className="rounded-full text-lg font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
                        >
                            Mohele & Maele
                        </TabsTrigger>
                        <TabsTrigger
                            value="vocabulary"
                            className="rounded-full text-lg font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
                        >
                            Vocabulary
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="moheleMaele" className="space-y-6">
                        <Container category="moheleMaele" />
                    </TabsContent>
                    <TabsContent value="vocabulary" className="space-y-6">
                        <Container category="vocabulary" />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
