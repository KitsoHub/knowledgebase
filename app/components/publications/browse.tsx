"use client";
import { publicationsData } from '@/app/utils/mock/publications';
import { useState, useEffect } from 'react';
import PublicationCard from './publication-card';
import CategoryFilter from './category-filter';
import PublicationSearchBar from './search-bar';
import { ArrowLeft, Globe } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function PublicationsBrowse() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const [filteredPublications, setFilteredPublications] = useState(publicationsData.categories.flatMap(category => category.items));
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = publicationsData.categories.flatMap(cat => cat.items).filter(publication => {
            const matchesQuery = publication.title.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || publication.type === selectedCategory;
            return matchesQuery && matchesCategory;
        });
        setFilteredPublications(filtered);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        const filtered = category === 'all'
            ? publicationsData.categories.flatMap(category => category.items)
            : publicationsData.categories.find(cat => cat.name === category)?.items || [];
        setFilteredPublications(filtered);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-590/50 dark:hover:to-indigo-950/50 py-12">
                {pathname === '/publications' && (
                  <Button asChild variant="link" className="mt-4 sm:mt-0 ml-4 sm:ml-0">
                    <Link href="/" className="flex items-center">
                      <ArrowLeft className="ml-2 h-4 w-4" />
                      Back
                    </Link>
                  </Button>
                  )}
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full md-6">
                            Your Central Hub for IK Publications
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900 dark:text-white">
                            Your IK Publications Library
                        </h2>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Discover a curated collection of knowledge publications. Stay informed with the latest insights and updates in the field of indigenous knowledge.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="pt-10 pb-16 px-4 mx-auto">
                <div className="container px-4 mx-auto">
                    {/* Search Bar */}
                    <PublicationSearchBar onSearch={handleSearch} className="mb-8" />

                    {/* Category Filter */}
                    <CategoryFilter
                        categories={[...publicationsData.categories.map(cat => cat.name)]}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategorySelect}
                        className="mb-8"
                    />

                    <Separator className="mb-8" />

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div key={index} className="h-[300px] rounded-xl bg-muted/60 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredPublications.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-medium mb-2">No Publications found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what you are looking for.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <p className="text-muted-foreground">
                                    Showing {filteredPublications.length}{' '}
                                    {filteredPublications.length === 1 ? 'result' : 'results'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPublications.map(publication => (
                                    <PublicationCard
                                    publication={publication} index={0} className="animate-fade-in h-full sm:h-auto sm:max-w-sm"
                                    key={publication.id}
                                    {...publication}                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Indigenous Knowledge Labels Section */}
            <div className="mt-12 p-6 bg-muted rounded-lg">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-amber-600" />
                    Understanding Indigenous Knowledge Labels
                </h3>
                <p className="text-muted-foreground mb-4">
                    Traditional Knowledge Labels help identify cultural sensitivity and usage rights. These labels are
                    part of the Local Contexts initiative to support Indigenous data sovereignty.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-300">
                        <Globe className="w-3 h-3 mr-1" />
                        Culturally Sensitive
                    </Badge>
                    <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-300">
                        <Globe className="w-3 h-3 mr-1" />
                        Seasonal Knowledge
                    </Badge>
                    <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-300">
                        <Globe className="w-3 h-3 mr-1" />
                        Restricted
                    </Badge>
                </div>
            </div>
        </div>
    );
}
