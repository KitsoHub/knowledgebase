import { categories } from '@/app/utils/mock/categoryStats'
import Link from 'next/link'
import React from 'react'

export default function CategoryStatsSection() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="mb-2">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our diverse collection of knowledge organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-sm bg-card border transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="mb-4 text-4xl">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <p className="text-sm text-primary font-medium">
                  {category.count} entries
                </p>
                <Link
                  href="/browse"
                  className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Browse ${category.name}`}
                >
                  <span className="sr-only">Browse {category.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
