"use client"

import { useState, useEffect } from "react"
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
} from "@/app/components/ui/sidebar"

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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { ModeToggle } from "../ui/mode-toggle"

export function AdminAppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar, setOpen } = useSidebar()
  const [mounted, setMounted] = useState(false)

  const isOpen = state === "expanded" ? false : true

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <Sidebar collapsible="icon"><SidebarContent /><SidebarFooter /></Sidebar>
  }

  return (
    <>


      <Sidebar collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">Patents</span>
          </div>
          <Button size="icon" variant="ghost" className="group-data-[collapsible=icon]:hidden " onClick={toggleSidebar}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {isOpen && (<Button size="icon" variant="ghost" className="group-data-[collapsible=icon]:visible " onClick={toggleSidebar}>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>)}

        </SidebarHeader>
        <SidebarSeparator />

        <SidebarContent>
          {/* Admin Navigation isAdmin */}
          <SidebarGroup>

          </SidebarGroup>
          {/* Primary Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/community"} tooltip="Dashboard">
                    <Link href="/community"><LayoutDashboard /><span>Dashboard</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/community/admin"} tooltip="AdminOverview">
                    <Link href="/community/admin"><ShieldBanIcon /><span>AdminOverview</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/community/maps"} tooltip="Maps">
                    <Link href="/community/maps"><ShieldBanIcon /><span>Verification</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/communities"} tooltip="Communities">
                    <Link href="/community/resources/communities"><Briefcase /><span>WorkSpace</span></Link>
                  </SidebarMenuButton>

                </SidebarMenuItem>
                           <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/compliance"} tooltip="TkLabels">
                    <Link href="/compliance"><Briefcase /><span>Workflows</span></Link>
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
                    <Link href="/dashboard/enquery"><HelpCircle /><span>Enquiry</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Document Manager (Paperless-ngx)">
                    {/* <Link href="/integrations/paperless"><FileArchive /><span>Documents</span></Link> */}
                    <Link href="/dashboard/documents"><FileArchive /><span>Documents</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Business Intelligence (Metabase)">
                    <Link href="/dashboard/analytics"><Database /><span>Regulatory Analytics</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="AI Assistant (ChatGPT)">
                    <Link href="/dashboard/assistant"><BrainCircuit /><span>AI Assistant</span></Link>
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
                <Link href="/settings"><Settings /><span>Settings</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Help & Docs">
                <Link href="/help"><HelpCircle /><span>Help</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/profile"><User /><span>Profile</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="p-4 flex justify-center">
            <ModeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>


    </>

  )
}
