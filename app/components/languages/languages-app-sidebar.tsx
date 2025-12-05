'use client'

import { useState, useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarGroupLabel,
} from '@/app/components/ui/sidebar'

import {
  LayoutDashboard,
  Briefcase,
  ShieldBanIcon,
  Settings,
  HelpCircle,
  User,
  Database,
  FileArchive,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpenIcon,
  ChevronRightIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { ModeToggle } from '../ui/mode-toggle'

export function LanguagesAppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const [mounted, setMounted] = useState(false)
  const [languageItemOpen, setLanguageItemOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
    )
  }

  const isCollapsed = state === 'collapsed'

  const toggleWorkspace = () => {
    setLanguageItemOpen(prev => !prev)
  }

  const isOpen = state === 'expanded' ? false : true

  const workSpaceActive =
    pathname.startsWith('/languageItems') ||
    pathname.startsWith('/riddles') ||
    pathname.startsWith('/idioms') ||
    pathname.startsWith('/proverbs')

  return (
    <Sidebar collapsible="icon">
      {/* Header with logo / title and collapse toggle */}
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
            Languages
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="group-data-[collapsible=icon]:hidden"
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {/* {!isCollapsed && (
          <Button
            size="icon"
            variant="ghost"
            className="group-data-[collapsible=icon]:visible"
            onClick={toggleSidebar}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )} */}
        {isOpen && (
          <Button
            size="icon"
            variant="ghost"
            className="group-data-[collapsible=icon]:visible "
            onClick={toggleSidebar}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        )}
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>{/* (Optional) admin-only items */}</SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/community'}
                  tooltip="Dashboard"
                >
                  <Link href="/community">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* AdminOverview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/languages/admin'}
                  tooltip="AdminOverview"
                >
                  <Link href="/languages/admin">
                    <ShieldBanIcon />
                    <span>AdminOverview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>



              {/* WorkSpace parent with toggler */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={toggleWorkspace}
                  tooltip="LanguageItems"
                  isActive={languageItemOpen || workSpaceActive}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center space-x-2">
                    <Briefcase />
                    <span>LanguageItems</span>
                  </div>
                  {languageItemOpen ? (
                    <ChevronUp className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Submenu items, indented */}
              {languageItemOpen && (
                <>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/language/languageitems/riddles'}
                      tooltip="Riddles"
                    >
                      <Link href="/language/languageitems/riddles">
                        <span>Riddles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/language/languageitems/riddles'}
                      tooltip="Idioms"
                    >
                      <Link href="/language/languageitems/riddles">
                        <span>Idioms</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                                    <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/languages/languageitems/riddles'}
                      tooltip="Proverbs"
                    >
                      <Link href="/languages/languageitems/riddles">
                        <span>Proverbs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools & Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Enquiries">
                  <Link href="/dashboard/enquery">
                    <HelpCircle />
                    <span>Enquiry</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Documents">
                  <Link href="/dashboard/documents">
                    <FileArchive />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <Link href="/dashboard/analytics">
                    <Database />
                    <span>Regulatory Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="AI Assistant">
                  <Link href="/dashboard/assistant">
                    <Database />
                    <span>AI Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help & Docs">
              <Link href="/help">
                <HelpCircle />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4 flex justify-center">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
