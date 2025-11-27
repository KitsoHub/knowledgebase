"use client"

import { BarChart3, BookOpen, Gamepad2, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"



export default function MobileNav() {
    const pathname = usePathname()
    const navItems = [
        {href:"/", label:"Learn", icon: BookOpen},
        {href:"/practice", label:"Practice", icon: Gamepad2},
        {href:"/progress", label:"Progess", icon: BarChart3},
        {href:"/profile", label:"Profile", icon: User}
    ]
  return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50 md:hidden">
            <div className="flex items-center justify-around">
                {
                    navItems.map((item)=>{
                        const isActive = pathname === item.href
                        return(
                            <Link href={item.href} key={item.href}
                            className={`flex flex-col items-center py-2 px-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                <item.icon className="h-6 w-6"/>
                                <span className="text-xs mt-1">{item.label}</span>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
  )
}
