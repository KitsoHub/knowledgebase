import { Book, Gamepad2, Leaf, Library, Users } from 'lucide-react'

export const categories = [
  {
    title: 'Knowledge Base',
    description: 'Access traditional knowledge and practices',
    icon: Book,
    href: '/knowledge',
  },
  {
    title: 'Local Products',
    description: 'Discover indigenous and commercial products',
    icon: Leaf,
    href: '/products',
  },
  {
    title: 'Indigenous Games',
    description: 'Learn about traditional games and activities',
    icon: Gamepad2,
    href: '/games',
  },
  {
    title: 'Expert Articles',
    description: 'Read verified articles from experts',
    icon: Library,
    href: '/articles',
  },
  {
    title: 'Community',
    description: 'Connect with knowledge contributors',
    icon: Users,
    href: '/community',
  },
]
