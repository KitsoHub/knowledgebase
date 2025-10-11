"use client"
import ArticleCard from '@/app/components/articles/article-card'
import ChartCard from '@/app/components/shared/chart-card'
import MetricsCard from '@/app/components/shared/metrics-card'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/app/components/ui/tabs'
import { featuredArticles, monthlySubmissions, sourceCredibility } from '@/app/utils/mock/articles'
import { categoryData } from '@/app/utils/mock/categories'
import { categoriesExtras } from '@/app/utils/mock/categoryStats'
import { contributors } from '@/app/utils/mock/contributors'
import HomeNavigation from '@/app/utils/nav/homeNavigation'
import { ArrowRight, BarChart, FileText } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Analytics() {
    const [timeRange, setTimeRange] = useState('month');
    return (
        <div className="flex flex-col min-h-screen mt-28">
            <HomeNavigation />
            <main className="flex-grow pt-28 pb-16">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h1 className='mb-2'>Analytics Dashboard</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Our repository trends and real time contribution
                                tracking.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Select
                                defaultValue={timeRange}
                                onValueChange={setTimeRange}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select time range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="week">Last Week</SelectItem>
                                    <SelectItem value="month">Last Month</SelectItem>
                                    <SelectItem value="quarter">Last Quarter</SelectItem>
                                    <SelectItem value="year">Last Year</SelectItem>
                                    <SelectItem value="all">All Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Header metrics */}


                    <MetricsCard />

                    <Tabs defaultValue="cahrts" className="mb-10">
                        <TabsList className="mb-6">
                            <TabsTrigger
                                value="charts"
                                className="flex items-center"
                            >
                                <BarChart className="h-4 w-4 mr-2" />
                                Chart/Analytics
                            </TabsTrigger>
                            <TabsTrigger
                                value="recent"
                                className="flex items-center"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Recent Submissions
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="charts" className='mt-10'>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>

                                <ChartCard
                                    title="Content by Category"
                                    description="Distribution of entries across different categories"
                                    data={categoryData}
                                    type="pie"
                                    dataKey="value"
                                    categoryKey="name"
                                    height={300}
                                />
                                {/* TODO: across regions */}


                                <ChartCard
                                    title="Monthy Submissions"
                                    description="Number of new submissions per month"
                                    data={monthlySubmissions}
                                    type="line"
                                    dataKey="submissions"
                                    categoryKey="month"
                                    height={300}
                                />


                            </div>
                            <ChartCard
                                title="Source Credibility Ratings"
                                description="Average credibility scores by source type"
                                data={sourceCredibility}
                                type="bar"
                                dataKey="credibility"
                                categoryKey="source"
                                height={300}
                            />

                        </TabsContent>
                        <TabsContent value="recent" className="mt-0">
                            <p>Recent Submissions</p>
                            {/* recent submissions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredArticles.map((article) => (
                                    <ArticleCard
                                        className="animate-fade-in h-full"
                                        key={article.id}
                                        {...article}
                                    />
                                ))}
                            </div>

                            {/* view all submissions */}
                            <div className='mt-6 text-center'>
                                <Button asChild variant='outline'>
                                    <Link href="/browse" className='flex items-center'>
                                        View all submissions <ArrowRight className='h-4 w-4 ml-2' />
                                    </Link>
                                </Button>

                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* charts and recent submissions */}

                    {/* additional metrics */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
                        {/* top contributors */}
                        <Card className='shadow-sm md:col-span-2 bg-white' >
                            <CardHeader>
                                <CardTitle>Top Contributors</CardTitle>
                                <CardDescription>Users with the most submissions this {timeRange}</CardDescription>
                            </CardHeader>
                            <CardContent>

                                <div className='space-y-4'>
                                    {contributors.map((contributor, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className='flex items-center'>
                                                <div className='w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mr-4'>
                                                    {contributor.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{contributor.name}</p>
                                                    <p className="text-sm text-muted-foreground">{contributor.institution}</p>
                                                    <p className="text-sm text-muted-foreground">{contributor.region}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-bold">{contributor.submissions}</p>
                                                <p className="text-sm text-muted-foreground">submissions</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </CardContent>
                        </Card>

                        {/* popular tags */}

                        <Card className='shadow-sm bg-white'>
                            <CardHeader>
                                <CardTitle>Popular Tags</CardTitle>
                                <CardDescription>Most frequently used tags in submissions</CardDescription>
                            </CardHeader>
                            <CardContent>

                                <div className='flex flex-wrap gap-2'>
                                    {categoriesExtras.map((tag, index) => (
                                        <div key={index}
                                            className='
                                        rounded-full
                                        py-1 px-3 flex items-center font-medium text-xs bg-primary/20
                                        '
                                        >
                                            <span>
                                                {tag.name}
                                            </span>
                                            <span className='ml-1.5 bg-primary/20 text-primary rounded-full py-0.5 px-1.5 text-[10px]'>{tag.count}</span>
                                        </div>
                                    ))}
                                </div>


                            </CardContent>
                        </Card>


                    </div>
                </div>
            </main>
        </div>
    )
}
