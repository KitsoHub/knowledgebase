/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import React from 'react'

import { Badge } from '../ui/badge'
import { Calendar, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

interface ArticleCardProps {
    id: string
    title: string
    excerpt: string
    category: string
    tags: string[]
    author: string
    date: string
    imageUrl?: string
    views: number
    className?: string
    variant?: 'default' | 'featured'
}
export default function ArticleCard({
    id,
    title,
    excerpt,
    category,
    tags,
    author,
    date,
    imageUrl,
    views,
    className,
    variant = 'featured',
}: ArticleCardProps) {
    const isFeatured = variant === 'featured'

    //to implement tags
    console.log(tags)
    return (
        <div
            className={cn(
                'group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl',
                isFeatured ? 'lg:h-[360px]' : 'h-full',
                className
            )}
        >
            <div className="absolute inset-0 bg-card">
                {imageUrl && (
                    <>
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute indent-0 bg-gradient-to-t from-black/70 via-black to-black/10"></div>
                    </>
                )}
            </div>
            {/* Card content */}
            <div
                className={cn(
                    'relative flex flex-col p-6',
                    imageUrl
                        ? 'text-white h-full justify-end'
                        : 'text-foreground',
                    isFeatured && 'lg:p-8 h-full justify-end'
                )}
            >
                <div>
                <div className="flex items-center justify-between mb-3">
            <Badge
              variant={imageUrl ? "outline" : "secondary"}
              className={cn(
                imageUrl ? "border-white/40 text-white" : "text-foreground",
                "rounded-md"
              )}
            >
{category}

            </Badge>

            <div className='flex items-center text-sm opacity-80'>
              <Eye className='h-3.5 w-3.5 mr-1'/>
              <span>{views}</span>
            </div>
            </div>

            {/* link */}
            <Link href={`/article/${id}`}>
            <h3 className={cn(
              'mb-2 transition-colors',
              isFeatured? 'text-2xl md:text-3xl': 'text-xl',
              imageUrl ? 'text-white group-hover:text-white/90': 'group-hover:text-primary'
            )}>
              {title}
            </h3>

            </Link>

            {/* summary and auther */}
            <p className={cn(
            'mb-4 line-clamp-2',
            imageUrl ? 'text-white/80' : 'text-muted-foreground',
            isFeatured ? 'text-base' : 'text-sm'
          )}>
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1 opacity-70" />
              <span className={imageUrl ? "text-white/90" : "text-foreground/80"}>{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
              <span className={imageUrl ? "text-white/90" : "text-foreground/80"}>{date}</span>
            </div>
          </div>

          {/* read more  */}

          {isFeatured && (
            <div className="mt-6">
              <Button asChild variant={imageUrl ? "secondary" : "default"} className="transition-all duration-300">
                <Link href={`/article/${id}`}>
                  Read More
                </Link>
              </Button>
            </div>
          )}
                </div>
            </div>
        </div>
    )
}
