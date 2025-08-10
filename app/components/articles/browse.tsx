'use client'
import { articles } from '@/app/utils/mock/articles';
import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator';
import ArticleCard from './article-card';
import CategoryFilter from './category-filter';
import ArticleSearchBar from './search-bar';
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button';
import Link from 'next/link';

export default function ArticleBrowse() {

    const [isLoading, setIsLoading] = useState(true);
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    // unique categories
    const categories = [...new Set(articles.map(article => article.category))];
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

    //track selected category and searchquery and set filteredArticles
    useEffect(() => {
        let results = [...articles];
        //set filter based on search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // set filter based on category
        if (selectedCategory !== 'all') {
            results = results.filter(article => article.category === selectedCategory);
        }

        setFilteredArticles(results);

    }, [searchQuery, selectedCategory,])

    const handleSearch = (query: string, filters: Record<string, unknown>) => {
        setSearchQuery(query)

        //by pass eslint
        console.log(filters)
        // implement handling filters
    }
    const pathname = usePathname()
    return <div className='flex min-h-screen flex-col '>
        <main className='flex-grow pt-10 pb-16'>
            <div className='container px-4 mx-a'>
                <div className='mb-10'>
                    {pathname === '/browse' && (
                        <Button asChild variant="link" className="mt-4 sm:mt-0">
                            <Link href="/" className="flex items-center">
                                <ArrowLeft className="ml-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    )}
                    <h1 className='mb-4'>Browse Articles</h1>
                    <p className='text-xl text-muted-foreground max-w-3lx'>
                        Explore our comprehensive collection of articles, research papers, and resources
                        across various disciplines and categories.
                    </p>
                </div>
                {/* Add search bar and filter */}
                <ArticleSearchBar
                    onSearch={handleSearch}
                    className='mb-8' />

                {/* Category filter */}
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    className='mb-8' />

                <Separator className='mb-8' />
                {isLoading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {[1, 3, 4, 5, 6].map((_, index) => (
                            <div
                                key={index}
                                className='h-[300px] rounded-xl bg-muted/60 animate-pulse' />
                        ))}
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className='text-center py-12'>
                        <h3 className='text-2xl font-medium mb-2'>No articles found</h3>
                        <p className='text-muted-foreground'>Try adjusting your search or filter to find what you are looking for.</p>
                    </div>) : (<>
                        <div className='mb-6 flex justify-between items-center'>

                            <p className='text-muted-foreground'>Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'}</p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filteredArticles.map((article) => (
                                <ArticleCard
                                    className="animate-fade-in h-full"
                                    key={article.id}
                                    {...article} />
                            ))}
                        </div>
                    </>)}
            </div>

        </main>


    </div>
}
