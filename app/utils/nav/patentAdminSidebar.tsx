'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    HomeIcon,
    CogIcon,
   // BookOpenText,
    MoonIcon,
    SunIcon,
    ChevronRightIcon,
    Headphones,
   // UsersRound,
    //Amphora,
    Newspaper,
    ChevronRight,
    ChevronLeft,
    FileSearch,
    BarChart3,
    Users,
    //BrainCircuit,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/app/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"


interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
    className?: string
}
const PatentAdminSidebar: React.FC<SidebarProps> = ({className, isCollapsed, onToggle }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    const navigationItems = [
        { icon: HomeIcon, label: 'Overview', href: '/overview', active: true },
        { icon: Newspaper, label: 'Applications', href: '/patents',  badge: 'Beta', active: false},
        { icon: Users, label: 'Examiners', href: '/patents',  badge: 'Beta', active: false },
        { icon: FileSearch, label: 'Workplace', href: '/patents',  badge: 'Beta', active: false},
        { icon: BarChart3, label: 'Analytics',  href: '/patents',  badge: 'Beta', active: false },
        // { icon: Headphones, label: 'Support', href: '/support', badge: 'Beta', active: false},
        // { icon: CogIcon, label: 'Settings', href: '/settings', badge: 'Beta', actie: false},
    ]

    const patentProcessItems = [
      { icon: HomeIcon, label: 'Draftings', href: '/overview', active: true },
      { icon: Newspaper, label: 'Examinations', href: '/patents',  badge: 'Beta', active: false},
      { icon: FileSearch, label: 'Publications', href: '/patents',  badge: 'Beta', active: false},
      { icon: Newspaper, label: 'Office Actions', href: '/patents',  badge: 'Beta', active: false},

  ]

    return (
        <div className={cn(
            'bg-background2 text-sidebar-foreground h-screen lex flex-col transition-all duration-300',
            isCollapsed ? "w-16" : "w-64", className
        )}>
             <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground flex items-center">
            <span className="text-patent-blue mr-2">●</span> IKMS Patents
          </h1>
        )}
        <Button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>

      </div>


      {/* nav list */}
      <nav className="flex-1 p-2">
        <TooltipProvider delayDuration={300}>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 transition-colors text-xs text-left p-2 rounded-md overflow-hidden h-8 w-full gap-2 ring-sidebar-ring",
                        item.active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                      {!isCollapsed && item.active && (
                        <div className="ml-auto w-1.5 h-6 bg-patent-blue rounded-full"> </div>
                      )}
                    </a>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
        <span className="pt-14 pb-4 text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0" data-sidebar="group-label">Patent Process</span>
        {/* <span className="border-b border-sidebar-border my-8"> Patent Process</span> */}
        <TooltipProvider delayDuration={300}>
          <ul className="space-y-2">
            {patentProcessItems.map((item) => (
              <li key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 transition-colors text-xs text-left p-2 rounded-md overflow-hidden h-8 w-full gap-2 ring-sidebar-ring",
                        item.active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                      {!isCollapsed && item.active && (
                        <div className="ml-auto w-1.5 h-6 bg-patent-blue rounded-full"> </div>
                      )}
                    </a>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center", isCollapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-patent-blue flex items-center justify-center text-white font-semibold">
            EX
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-medium">Examiner 1</p>
              <p className="text-sm text-sidebar-foreground/70">Patent Officer</p>
            </div>
          )}
        </div>
      </div>
        </div>

    )
}

export default PatentAdminSidebar
