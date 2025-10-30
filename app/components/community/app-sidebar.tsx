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
  BarChart,
  Settings,
  HelpCircle,
  User,
  Database,
  FileArchive,
  ChevronLeft,
  BrainCircuit,
  BookIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ShieldBanIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { ModeToggle } from '../ui/mode-toggle'

export function AppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar, setOpen } = useSidebar()
  const [mounted, setMounted] = useState(false)

  const isOpen = state === 'expanded' ? false : true

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
    )
  }

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
              IKMS
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="group-data-[collapsible=icon]:hidden "
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

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
          {/* Admin Navigation isAdmin */}
          <SidebarGroup></SidebarGroup>
          {/* Primary Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
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
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/community/admin'}
                    tooltip="AdminOverview"
                  >
                    <Link href="/community/admin">
                      <ShieldBanIcon />
                      <span>AdminOverview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/community/maps'}
                    tooltip="Maps"
                  >
                    <Link href="/community/maps">
                      <ShieldBanIcon />
                      <span>HeritageMaps</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/communities'}
                    tooltip="Communities"
                  >
                    <Link href="/community/resources/communities">
                      <Briefcase />
                      <span>Communities & Collections</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/compliance'}
                    tooltip="TkLabels"
                  >
                    <Link href="/compliance">
                      <Briefcase />
                      <span>TK Labels</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/compliance'}
                    tooltip="Compliance"
                  >
                    <Link href="/compliance">
                      <Briefcase />
                      <span>Workflow</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Items</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Supervisors</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Curation Tasks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Withdrawn Items</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Private Items</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Import Metadata</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/insights'}
                    tooltip="Insights"
                  >
                    <Link href="/insights">
                      <BarChart />
                      <span>Batch Import</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Primary Navigation */}
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
                  <SidebarMenuButton
                    asChild
                    tooltip="Document Manager (Paperless-ngx)"
                  >
                    {/* <Link href="/integrations/paperless"><FileArchive /><span>Documents</span></Link> */}
                    <Link href="/dashboard/documents">
                      <FileArchive />
                      <span>Documents</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Business Intelligence (Metabase)"
                  >
                    <Link href="/dashboard/analytics">
                      <Database />
                      <span>Regulatory Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="AI Assistant (ChatGPT)">
                    <Link href="/dashboard/assistant">
                      <BrainCircuit />
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
      {/* <div
        className={`
          fixed left-0 top-0 h-full
          bg-white dark:bg-gray-800
          shadow-md transition-all duration-300
          z-50
          w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}

        `}
      >
        <button
          onClick={toggleSidebar}
          className="
          absolute right-0 top-4
            translate-x-full bg-white dark:bg-gray-800
            p-2 rounded-r-md shadow-md hover:bg-indigo-400
          "
        >
          <ChevronRightIcon
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-white
              ${isOpen ? 'rotate-180' : ''} transition-transform`}
          />
        </button>
        <div className="p-4 border-b dark:border-gray-700">
          <img
            src="/logo.svg"
            alt="KitsoHub"
            className="h-10 mx-auto"
          />
        </div>


      </div> */}
    </>
  )
}
