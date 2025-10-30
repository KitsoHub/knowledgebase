import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { categories } from '@/lib/category_data'

import Link from 'next/link'

export function CategoryGrid() {
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight">
          Explore Categories
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <Icon className="h-8 w-8" />
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-muted-foreground">
                      Click to explore →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
