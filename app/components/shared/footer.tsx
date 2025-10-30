'use client'

import Link from 'next/link'
// import { Logo } from "@/components/ui/logo"
import { navCategories, navigation } from '@/lib/navigation'
import { Github, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  { id: 1, name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { id: 2, name: 'GitHub', href: 'https://github.com', icon: Github },
]

type FooterProps = {
  className?: string
}
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t', className)}>
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              {/* <Logo size="sm" className="text-primary" /> */}
              Knowledge<span className="text-foreground"> Base</span>
            </Link>
            <p className=" mt-4 text-sm text-muted-foreground">
              Preserving and sharing Botswana&apos;s knowledge for future
              generations. Join our community of researchers, academics, and
              enthusiasts to discover, contribute, and connect with diverse
              knowledge across disciplines.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-sm sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            <ul className="space-y-2 text-sm">
              {navCategories.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contributors
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Botswana Indigenous Knowledge Bank.
            All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Developed by @{' '}
            <span>
              <Link
                href="/privacy"
                className="underline underline-offset-1 text-sm text-muted-foreground hover:text-primary "
              >
                WeThemba Plus
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
