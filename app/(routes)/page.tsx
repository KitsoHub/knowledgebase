// "use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { HeroSection } from '@/app/components/shared/hero-section'

//import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

import MainFooter from '../components/layout/footer'
import FairUsageProvider from '@/lib/providers/fair-usage-provider'
// import MapPage from './(routes)/map/page'
import Navigation from '../utils/nav/navigation'
import ContributionSection from '../components/shared/landing/contribution-section'
//import prisma from '@/lib/prisma'

export default async function Home() {
    //const { userId } = await auth()

    // const href = userId ? '/dashboard' : '/sign-up'
    // const href = userId ? '/onboarding' : '/sign-up'


    // const match = await prisma.user.findUnique({
    //     where: {
    //         clerkId: userId as string,
    //     },
    // })


    // console.log(">> Current User >>", match)
    return (
        <FairUsageProvider>
           <div className="min-h-screen flex flex-col ">
                {/* <HomeNavigation/> */}
                {/* <Navigation /> */}
                <main className="flex-grow">

                    {/* TODO: update the hero section */}
                    {/* <HeroSection href={href} /> */}

                    <HeroSection />
                    {/* featured articles */}
                    {/* <ArticleSection /> */}
                    {/* categories */}
                    {/* <CategoryStatsSection /> */}
                    {/* recent articles */}
                    {/* <RecentArticlesSection /> */}
                    {/* Contribute section */}
                    {/* <ContributeSection/> */}
                    {/* footer */}
                    {/* <Footer /> */}
                    {/* <MapPage/> */}

                    {/* Contact */}
                    <ContributionSection />
                    {/* <MainFooter /> */}
                    {/* <Chatbot /> */}
                </main>
                {/* <MainFooter /> */}
            </div>
        </FairUsageProvider>
    )
}
