/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { ScrollArea, ScrollBar } from '@/app/components/ui/scroll-area'

const featuredItems = [
  {
    title: 'Traditional Medicine',
    description: 'Learn about healing practices using indigenous plants',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cultural Practices',
    description: 'Discover ceremonies and rituals that shape our identity',
    image:
      'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Traditional Games',
    description: 'Explore games that have entertained generations',
    image:
      'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]

export function FeaturedContent() {
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight">
          Featured Knowledge
        </h2>
        <ScrollArea className="mt-6 whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4">
            {featuredItems.map(item => (
              <Card key={item.title} className="w-[350px]">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-video rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}
