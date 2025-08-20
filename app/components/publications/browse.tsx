
"use client"
import { publicationsData } from '@/app/utils/mock/publications';
import { ArrowLeft, BookOpen, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Badge } from '../ui/badge';
import PublicationCard from './publication-card';

export default function PublicationsBrowse() {

        const router = useRouter();
     const [isLoading, setIsLoading] = useState(true);
    const [filteredArticles, setFilteredArticles] = useState(publicationsData);
  return (
            <div className="min-h-screen bg-background">
                {/* header */}

         <section className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-590/50 dark:hover:to-indigo-950/50 py-12">
                <div ><button className="text-blue-600 flex pl-5" onClick={() => router.back()}> <ArrowLeft size={20} /> Back</button></div>
                <div className="container mx-auto px-4 text-center">

                    <div className="max-w-2xl mx-auto">
                        <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full md-6">
                            Your Central Hub for IK Publications
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900 dark:text-white">
                           Your IK Publications Library
                        </h2>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Discover a curated collection of knowledge publications.Stay informed with the latest insights and updates in the field of indigenous knowledge.
                                                   </p>

                    </div>
                </div>
            </section>

                {/* Search */}

                {/* filter */}

                {/* Pubs */}

                {/* filtered pubs */}
      {publicationsData.categories.map((category) => (
        <section key={category.name} className="mb-16">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold">{category.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((publication, index) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                index={index}
              />
            ))}
          </div>
        </section>
      ))}


                      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-amber-600" />
          Understanding Indigenous Knowledge Labels
        </h3>
        <p className="text-muted-foreground mb-4">
          Traditional Knowledge Labels help identify cultural sensitivity and usage rights.
          These labels are part of the Local Contexts initiative to support Indigenous data sovereignty.
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
  )
}
