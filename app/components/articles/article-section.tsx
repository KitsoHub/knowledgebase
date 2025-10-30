'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredArticles } from '@/app/utils/mock/articles'
import ArticleCard from './article-card'

export default function ArticleSection() {
  return (
    <section className="py-5 bg-accent/30">
      <div className="container px-4 mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <h2 className="mb-2">Featured Articles</h2>
            <p className="text-muted-foreground">
              Explore our curated selection of outstanding research and articles
            </p>
          </div>
          <Button asChild variant="link" className="mt-4 sm:mt-0">
            <Link href="/browse" className="flex items-center">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              {...article}
              variant={index === 0 ? 'featured' : 'default'}
              className={index === 0 ? 'md:col-span-3 lg:col-span-2' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
