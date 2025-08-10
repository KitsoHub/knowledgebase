'use client'

import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { heroData } from '@/lib/hero_data'
import { ArrowRight } from 'lucide-react'
// import { number } from 'zod'
// import { Label } from 'recharts'

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 md:pt-48 md:pd-32 overflow-hidden">

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent/30 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 filter blur-3xl"></div>
            </div>

            <div className="container p-4 mx-auto ">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-2 mb-6 rounded-full bg-white text-primary text-sm font-medium animate-fade-in">
                        {heroData.titleTag}
                    </span>


                    <h1 className="mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
                        {heroData.title}
                    </h1>
                    <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '0.2s' }}>
                        {heroData.subDescription}
                    </p>

                    {/* hero buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-slide-down" style={{ animationDelay: '0.3s' }}>
                        <Button asChild size='lg' className='text-base rounded-3xl'>
                            <Link href='/browse'>
                                {heroData.buttons[0].label} <ArrowRight className='ml-2 h-4 w-4' /></Link>
                        </Button>
                        <Button asChild size='lg' variant='outline' className='text-base rounded-3xl'>
                            <Link href='/contribute'>
                                {heroData.buttons[1].label}</Link>
                        </Button>
                    </div>

                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden -z-10">
                <img
                    src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Botswana landscape"
                    className="h-full w-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
            </div>

            {/* Static stats section */}
            {/* <div className='container px-4 mx-auto mt-24'>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
               {[{number:'10K+', label:'Articles'},
                    {number:'1K+', label:'Verifiers'},
                    {number:'12K+', label:'Contributors'},
                    {number:'80%', label:'Satisfaction'}
                ].map((stat, index) =>(
                    <div key={index}
                    className='text-center animate-slide-up'
                    style={{animationDelay:`${0.4 + index*0.1}s`}}>
                        <p className='text-4xl font-bold text-primary mb-2'>{stat.number}</p>
                        <p className='text-sm text-foreground/70'>{stat.label}</p>
                    </div>
                ))}
               </div>
            </div> */}

            {/* <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:pb-32 lg:flex lg:px-8 lg:py-48">

                <div className="relative top-0 z-20 w-full image-container">
                    <img
                        className="rounded-full object-cover -top-6 -right-10  absolute h-[500px] w-[500px]"
                        src="https://images.unsplash.com/photo-1531208853003-c1ec1b8a81d7?q=80&w=1866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <img
                        className="rounded-full object-cover top-[30%] left-10  absolute h-[400px] w-[400px] border-t-8  border-r-8 "
                        // src="https://images.unsplash.com/photo-1531208853003-c1ec1b8a81d7?q=80&w=1866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        src="https://images.unsplash.com/photo-1455669175216-9017c9b02fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENob2JlJTIwYmFza2V0fGVufDB8fDB8fHww"
                        alt=""
                    />
                </div>

            </div> */}
        </section>
    )
}
