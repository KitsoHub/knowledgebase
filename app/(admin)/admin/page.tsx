
import { CategoryBreakdown } from '@/app/components/shared/overview/category-breakdown'
import { DataDistributionChart } from '@/app/components/shared/overview/data-distribution-chart'
import { DataSourceMap } from '@/app/components/shared/overview/data-source-map'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/app/components/ui/tabs'
import React from 'react'
import { ArrowUpRight, BookOpen, Clock, History, Leaf } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { RecentEntries } from '@/app/components/shared/overview/recent-entries'
import { TimeSeriesChart } from '@/app/components/shared/overview/time-series-chart'

import OverviewGridMetrics from '@/app/components/shared/overview/metrics'

export default function DashboardOverview() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        <h1 className="text-xl font-semibold">
                            Research Knowledge Base
                        </h1>
                    </div>
{/*  add contribute button*/}
                </div>
            </header>
            <main className="flex-1 space-y-4 p-4 md:p-8">
                <OverviewGridMetrics />
                <Tabs
                    defaultValue="overview"
                    className="w-full rounded-sm space-y-4"
                >
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="sources">Data Sources</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    {/* overview content */}
                    <TabsContent value="overview" className="space-y-4">
                        {/* <div>Overview Content</div><CategoryBreakdown/> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* distibution card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Data Distribution by Category
                                    </CardTitle>

                                    <CardDescription>
                                        Breakdown of entries across different
                                        knowledge categories
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DataDistributionChart />
                                </CardContent>
                            </Card>
                            {/* category breakdown card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category Distribution</CardTitle>

                                    <CardDescription>
                                        Detailed view of data categories and
                                        their composition
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CategoryBreakdown />
                                </CardContent>
                            </Card>
                        </div>
                        {/* recent entries */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Entries</CardTitle>
                                    <CardDescription>
                                        Latest additions to the knowledge base
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentEntries />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>
                                        Entry Growth Over Time
                                    </CardTitle>
                                    <CardDescription>
                                        Tracking the growth of the knowledge
                                        base
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <TimeSeriesChart />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    {/* Analytics */}
                    <TabsContent value="analytics" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        Cross-Reference Analysis
                                    </CardTitle>
                                    <CardDescription>
                                        Connections between different data types
                                        and sources
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                                        <p className="text-muted-foreground">
                                            Interactive network graph
                                            visualization would appear here
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Research Insights</CardTitle>
                                    <CardDescription>
                                        AI-generated insights from the data
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <History className="h-4 w-4 text-muted-foreground" />
                                                <h3 className="font-medium">
                                                    Historical Correlation
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-sm">
                                                Strong correlation detected
                                                between artifact discoveries and
                                                indigenous knowledge records in
                                                the Kasane region.
                                            </p>
                                            <div className="mt-2 flex items-center text-sm">
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-sm"
                                                >
                                                    View details
                                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <Leaf className="h-4 w-4 text-muted-foreground" />
                                                <h3 className="font-medium">
                                                    Botanical Pattern
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-sm">
                                                Emerging pattern identified in
                                                medicinal plant usage across 3
                                                different indigenous cultures.
                                            </p>
                                            <div className="mt-2 flex items-center text-sm">
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-sm"
                                                >
                                                    View details
                                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <h3 className="font-medium">
                                                    Temporal Trend
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-sm">
                                                Significant increase in
                                                cross-disciplinary research
                                                citations over the past 18
                                                months.
                                            </p>
                                            <div className="mt-2 flex items-center text-sm">
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-sm"
                                                >
                                                    View details
                                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* DataSource */}
                    <TabsContent value="sources" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Geographical Distribution of Data Sources
                                </CardTitle>
                                <CardDescription>
                                    Visual representation of where data
                                    originates from
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[16/9] overflow-hidden rounded-md">
                                    <DataSourceMap />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid gap-4 md:grid-cols-2 ">
                            {/*  source type distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Source Type Distribution
                                    </CardTitle>
                                    <CardDescription>
                                        Breakdown of different types of data
                                        sources
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                                        <p className="text-muted-foreground">
                                            Source type distribution chart would
                                            appear here
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Source credibilty rating */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Source Credibility Ratings
                                    </CardTitle>
                                    <CardDescription>
                                        Evaluation of data source reliability
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                                        <p className="text-muted-foreground">
                                            Credibility rating visualization
                                            would appear here
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    {/* Historical content*/}
                    <TabsContent value="timeline">
                        <Card>
                            <CardHeader>
                                <CardTitle>Historical Timeline</CardTitle>
                                <CardDescription>
                                    Chronological view of data entries and
                                    historical events
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[500px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Interactive timeline visualization would
                                        appear here
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
