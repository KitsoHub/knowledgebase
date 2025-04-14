// import { CategoryGrid } from '@/app/components/shared/category-section'
// import { FeaturedContent } from '@/app/components/shared/feature-section'
import { Footer } from '@/app/components/shared/footer'
import { HeroSection } from '@/app/components/shared/hero-section'
import Chatbot from '@/app/components/chatbot'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import ArticleSection from './components/articles/article-section'
import CategoryStatsSection from './components/shared/category-stats-section'
import RecentArticlesSection from './components/articles/recent-articles-section'
import HomeNavigation from './utils/nav/homeNavigation'
import ContributeSection from './components/shared/contribute-section'
import prisma from '@/lib/prisma'

export default async function Home() {
    const { userId } = await auth()

    // const href = userId ? '/dashboard' : '/sign-up'
    // const href = userId ? '/onboarding' : '/sign-up'


    const match = await prisma.user.findUnique({
        where: {
            clerkId: userId as string,
        },
    })


    console.log(">> Current User >>", match)
    return (
        <div className="min-h-screen flex flex-col ">


            {/* <HomeNavigation/> */}
            <HomeNavigation />

            <main className="flex-grow">

                {/* TODO: update the hero section */}
                {/* <HeroSection href={href} /> */}

                <HeroSection/>
                {/* featured articles */}
                <ArticleSection />
                {/* categories */}
                <CategoryStatsSection />
                {/* recent articles */}
                <RecentArticlesSection />
                {/* Contribute section */}
                <ContributeSection/>

                {/* footer */}
                <Footer />
                <Chatbot />
            </main>
        </div>
    )
}
