import { Book, Gamepad2, Home, Leaf } from 'lucide-react'

export const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Knowledge Base', href: '/browse', icon: Book },
  { name: 'Local Products', href: '/browse', icon: Leaf },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  // { name: "Articles", href: "/articles", icon: Library },
]

export const navCategories = [
  { name: 'Articles', href: '/', icon: Home },
  { name: 'Historical Artifacts', href: '/knowledge', icon: Book },
  { name: 'Plants & Botany', href: '/products', icon: Leaf },
  { name: 'Animals & Wildlife', href: '/games', icon: Gamepad2 },
  { name: 'Indigenous Knowledge', href: '/knowledge', icon: Book },
]

export const navSupport = [
  { name: 'Help Center', href: '/', icon: Home },
  { name: 'Terms of Service', href: '/knowledge', icon: Book },
  { name: 'Privacy Policy', href: '/products', icon: Leaf },
  { name: 'Contact Us', href: '/games', icon: Gamepad2 },
]
