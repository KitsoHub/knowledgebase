'use client'
import { publicationsData } from '@/app/utils/mock/publications'
import { useState, useEffect } from 'react'

import { ArrowLeft, BookOpen, Globe } from 'lucide-react'

import { usePathname } from 'next/navigation'

import Link from 'next/link'
import { languagesMetadata } from '@/lib/languages-data'
import { Button } from '../../ui/button'

import { Separator } from '../../ui/separator'
import LanguageCard from './language-card'


export default function LanguagesBrowse() {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [filteredLanguages, setFilteredLanguages] = useState(
        languagesMetadata.filter((language) => language.isActive === true)
    )
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    // const handleSearch = (query: string) => {
    //     setSearchQuery(query);
    //     const filtered = publicationsData.categories.flatMap(cat => cat.items).filter(publication => {
    //         const matchesQuery = publication.title.toLowerCase().includes(query.toLowerCase());
    //         const matchesCategory = selectedCategory === 'all' || publication.type === selectedCategory;
    //         return matchesQuery && matchesCategory;
    //     });
    //     setFilteredLanguages(filtered);
    // };

    // const handleCategorySelect = (category: string) => {
    //     setSelectedCategory(category);
    //     const filtered = category === 'all'
    //         ? publicationsData.categories.flatMap(category => category.items)
    //         : publicationsData.categories.find(cat => cat.name === category)?.items || [];
    //     setFilteredLanguages(filtered);
    // };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-590/50 dark:hover:to-indigo-950/50 py-8">
                {pathname === '/learn' && (
                    <Button
                        asChild
                        variant="link"
                        className="mt-4 sm:mt-0 ml-4 sm:ml-0"
                    >
                        <Link href="/" className="flex items-center">
                            <ArrowLeft className="ml-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                )}

                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">

                        <h1 className="text-2xl font-bold">
                             Practice local languages with Puo.io
                        </h1>
                        <br />
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                            Learn smarter, not harder with our simple and
                            interactive tools, Start speaking confidently today!
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="pt-10 pb-16 px-4 mx-auto">
                <div className="container px-4 mx-auto">
                    {/* Search Bar */}
                    {/* <PublicationSearchBar onSearch={handleSearch} className="mb-8" /> */}

                    {/* Category Filter */}
                    {/* <CategoryFilter
                        categories={[...publicationsData.categories.map(cat => cat.name)]}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategorySelect}
                        className="mb-8"
                    /> */}

                    <Separator className="mb-8" />

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div
                                    key={index}
                                    className="h-[300px] rounded-xl bg-muted/60 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : filteredLanguages.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-medium mb-2">
                                No Language found
                            </h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what
                                you are looking for.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <p className="text-muted-foreground">
                                    Showing {filteredLanguages.length}{' '}
                                    {filteredLanguages.length === 1
                                        ? 'result'
                                        : 'results'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredLanguages.map((data) => (
                                    <LanguageCard
                                        lanMetadata={data}
                                        className="animate-fade-in h-full sm:h-auto sm:max-w-sm"
                                        key={data.id}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
