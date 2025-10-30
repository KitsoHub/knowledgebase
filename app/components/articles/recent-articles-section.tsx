import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { recent_articles } from '@/app/utils/mock/articles'
import ArticleCard from './article-card'

export default function RecentArticlesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <h2 className="mb-2">Recent Contributions</h2>
            <p className="text-muted-foreground">
              The latest articles and research from our contributors
            </p>
          </div>
          <Button asChild variant="link" className="mt-4 sm:mt-0">
            <Link href="/browse" className="flex items-center">
              Browse all recent <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {recent_articles.map(article => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}
