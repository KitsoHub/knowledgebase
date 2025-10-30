'use client'
import React from 'react'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'
import Container from '@/app/components/shared/games/container'

export default function Games() {
  return (
    <section className=" from-[#b87a4a] to-[#4a2b18] h-400 w-screen p-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Button
            asChild
            variant="link"
            className="mt-4 sm:mt-0 text-white-600"
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="ml-2 h-4 w-4 " />
              Back
            </Link>
          </Button>
        </div>
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#643c1d] to-[#4a2b18]drop-shadow-md mb-4">
            Kitso Games
          </h1>
          <p className="text-xl text-[#af652d] max-w-2xl mx-auto">
            A fun and interactive way to learn about Setswana and its rich
            heritage.
          </p>
        </header>
        <Tabs defaultValue="moheleMaele" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/20 rounded-full p-1">
            <TabsTrigger
              value="moheleMaele"
              className="rounded-full text-lg font-bold data-[state=active]:bg-[#af652d] data-[state=active]:text-white"
            >
              Mohele & Maele
            </TabsTrigger>
            <TabsTrigger
              value="vocabulary"
              className="rounded-full text-lg font-bold data-[state=active]:bg-[#af652d] data-[state=active]:text-white"
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
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          src="/assets/game/morabaraba.png"
          alt="Botswana landscape"
          className="h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
      </div>
    </section>
  )
}
